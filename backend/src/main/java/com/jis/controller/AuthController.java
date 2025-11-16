package com.jis.controller;

import com.jis.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;
import java.util.logging.Logger;

@RestController
public class AuthController {
    private static final Logger logger = Logger.getLogger(AuthController.class.getName());

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        try {
            logger.info("Login attempt with credentials keys: " + credentials.keySet());
            String username = credentials.get("username");
            String password = credentials.get("password");
            logger.info("Username: " + username + ", Password present: " + (password != null && !password.isEmpty()));

            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );
            SecurityContextHolder.getContext().setAuthentication(auth);
            String jwt = authService.generateToken(auth);
            return ResponseEntity.ok(Map.of("token", jwt, "role", auth.getAuthorities().iterator().next().getAuthority()));
        } catch (Exception ex) {
            logger.severe("Authentication failed: " + ex.getMessage());
            ex.printStackTrace();
            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials: " + ex.getMessage()));
        }
    }
}