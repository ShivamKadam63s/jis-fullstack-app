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
        return null;
    }

    public List<Case> searchCases(String keyword, Map<String, Object> filters) {
        return new ArrayList<>();
    }

    public List<Case> getCases() { return cases; }
    public void setCases(List<Case> cases) { this.cases = cases; }
}