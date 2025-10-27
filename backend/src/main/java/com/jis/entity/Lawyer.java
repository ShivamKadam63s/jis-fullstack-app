package com.jis.entity;

import lombok.Data;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Entity
@Data
@DiscriminatorValue("LAWYER")
public class Lawyer extends User {
    private String barId;

    @OneToMany(mappedBy = "lawyer", cascade = CascadeType.ALL)
    private List<Bill> bills = new ArrayList<>();

    @OneToMany(mappedBy = "lawyer", cascade = CascadeType.ALL)
    private List<Case> cases = new ArrayList<>();

    public List<Case> searchCases(String keyword, Map<String, Object> filters) {
        // Query, generate bill if viewed
        return new ArrayList<>();
    }

    public boolean makePayment(String billId) {
        // Process payment, update bill
        return true;
    }
}