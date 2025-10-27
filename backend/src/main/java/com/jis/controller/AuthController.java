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

@RestController
public class AuthController {
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private AuthService authService;

    @PostMapping("/api/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(credentials.get("username"), credentials.get("password"))
        );
        SecurityContextHolder.getContext().setAuthentication(auth);
        String jwt = authService.generateToken(auth);
        return ResponseEntity.ok(Map.of("token", jwt, "role", auth.getAuthorities().iterator().next().getAuthority()));
    }
}