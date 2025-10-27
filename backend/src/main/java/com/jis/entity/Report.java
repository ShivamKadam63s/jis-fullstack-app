package com.jis.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "reports")
public class Report {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String reportID;

    private Date generatedDate;

    private String content;

    @ManyToMany
    private List<Case> cases = new ArrayList<>();

    public Report generatePendingCases() {
        // Implementation: Query pending cases, sort by CIN
        return this;
    }

    public Report generateResolvedCases(Date startDate, Date endDate) {
        // Implementation: Chronological list
        return this;
    }

    public Report generateCaseStatus(String cin) {
        // Implementation: Status by CIN
        return this;
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getReportID() { return reportID; }
    public void setReportID(String reportID) { this.reportID = reportID; }
    public Date getGeneratedDate() { return generatedDate; }
    public void setGeneratedDate(Date generatedDate) { this.generatedDate = generatedDate; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public List<Case> getCases() { return cases; }
    public void setCases(List<Case> cases) { this.cases = cases; }
}