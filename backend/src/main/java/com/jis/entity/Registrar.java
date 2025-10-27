package com.jis.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Entity
@DiscriminatorValue("REGISTRAR")
public class Registrar extends User {
    @OneToMany(mappedBy = "registrar", cascade = CascadeType.ALL)
    private List<Case> cases = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Report> reports = new ArrayList<>();

    public Case createCase(Map<String, Object> details) {
        // Implementation: Generate CIN, save case
        Case newCase = new Case();
        newCase.setCin("MUM-2025-" + Math.random() * 1000); // Simplified
        // Set details from map
        return newCase;
    }

    public void updateCase(String cin, Map<String, Object> details) {
        // Implementation: Update case
    }

    public void scheduleHearing(String cin, Date date, Date time, String courtroom) {
        // Implementation: Create hearing
    }

    public void adjournHearing(String hearingID, String reason, Date newDate) {
        // Implementation: Adjourn hearing
    }

    public void recordProceedings(String hearingID, String summary) {
        // Implementation: Record summary
    }

    public void recordJudgment(String cin, String summary) {
        // Implementation: Close case with judgment
    }

    public Report generateReport(Map<String, Object> parameters) {
        // Implementation: Generate report based on params
        return new Report();
    }

    public boolean checkCalendar(Date hearingDate, Date hearingTime) {
        // Implementation: Check availability
        return true;
    }

    // Getters and setters
    public List<Case> getCases() { return cases; }
    public void setCases(List<Case> cases) { this.cases = cases; }
    public List<Report> getReports() { return reports; }
    public void setReports(List<Report> reports) { this.reports = reports; }
}