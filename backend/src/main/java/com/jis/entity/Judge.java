package com.jis.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Entity
@DiscriminatorValue("JUDGE")
public class Judge extends User {
    @OneToMany(mappedBy = "judge", cascade = CascadeType.ALL)
    private List<Case> cases = new ArrayList<>();

    public Case viewCase(String cin) {
        // Implementation: Fetch case (free access)
        return null;
    }

    public List<Case> searchCases(String keyword, Map<String, Object> filters) {
        // Implementation: Search cases
        return new ArrayList<>();
    }

    // Getters and setters
    public List<Case> getCases() { return cases; }
    public void setCases(List<Case> cases) { this.cases = cases; }
}