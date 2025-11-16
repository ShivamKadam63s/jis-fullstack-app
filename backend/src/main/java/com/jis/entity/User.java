package com.jis.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String userID;

    private String name;

    @Column(unique = true)
    private String email;

    private String password;

    private String role;

    // Removed direct collection mappings here because the target entities
    // do not declare corresponding association fields. Manage relationships
    // from the specific subclasses/entities that actually own them.

    public boolean login(String username, String password) {
        // Implementation: Validate credentials
        return true;
    }

    public void logout() {
        // Implementation: Clear session
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUserID() { return userID; }
    public void setUserID(String userID) { this.userID = userID; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    // note: subclass-specific getters/setters (e.g., in Lawyer/Judge)
    // provide access to related collections when appropriate.
}