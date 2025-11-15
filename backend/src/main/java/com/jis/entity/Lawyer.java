package com.jis.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Entity
@DiscriminatorValue("LAWYER")
public class Lawyer extends User {
    private String barID;

    @OneToMany(mappedBy = "lawyer", cascade = CascadeType.ALL)
    private List<Bill> bills = new ArrayList<>();

    @OneToMany(mappedBy = "lawyer", cascade = CascadeType.ALL)
    private List<Case> cases = new ArrayList<>();

    public List<Case> searchCases(String keyword, Map<String, Object> filters) {
        return new ArrayList<>();
    }

    public boolean makePayment(String billID) {
        return true;
    }

    public String getBarID() { return barID; }
    public void setBarID(String barID) { this.barID = barID; }
    public List<Bill> getBills() { return bills; }
    public void setBills(List<Bill> bills) { this.bills = bills; }
    public List<Case> getCases() { return cases; }
    public void setCases(List<Case> cases) { this.cases = cases; }
}