package com.jis.entity;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "cases")
public class Case {
    @Id
    private String cin;

    private String defendantName;

    private String defendantAddress;

    private String crimeType;

    private Date crimeDate;

    private String crimeLocation;

    private String arrestingOfficer;

    private Date arrestDate;

    private String presidingJudge;

    private String publicProsecutor;

    private Date startDate;

    private Date expectedCompletionDate;

    @OneToMany(mappedBy = "cin", cascade = CascadeType.ALL)
    private List<Hearing> hearings;

    private String judgementInfo;

    @Enumerated(EnumType.STRING)
    private CaseStatus status = CaseStatus.PENDING;

    public CaseStatus getStatus() { return status; }
    public void setStatus(CaseStatus status) { this.status = status; }

    public void sendNotification() {
        // Implementation: Send notification
    }

    public void setJudgementInfo(String summary) { this.judgementInfo = summary; }

    // Getters and setters
    public String getCin() { return cin; }
    public void setCin(String cin) { this.cin = cin; }
    public String getDefendantName() { return defendantName; }
    public void setDefendantName(String defendantName) { this.defendantName = defendantName; }
    public String getDefendantAddress() { return defendantAddress; }
    public void setDefendantAddress(String defendantAddress) { this.defendantAddress = defendantAddress; }
    public String getCrimeType() { return crimeType; }
    public void setCrimeType(String crimeType) { this.crimeType = crimeType; }
    public Date getCrimeDate() { return crimeDate; }
    public void setCrimeDate(Date crimeDate) { this.crimeDate = crimeDate; }
    public String getCrimeLocation() { return crimeLocation; }
    public void setCrimeLocation(String crimeLocation) { this.crimeLocation = crimeLocation; }
    public String getArrestingOfficer() { return arrestingOfficer; }
    public void setArrestingOfficer(String arrestingOfficer) { this.arrestingOfficer = arrestingOfficer; }
    public Date getArrestDate() { return arrestDate; }
    public void setArrestDate(Date arrestDate) { this.arrestDate = arrestDate; }
    public String getPresidingJudge() { return presidingJudge; }
    public void setPresidingJudge(String presidingJudge) { this.presidingJudge = presidingJudge; }
    public String getPublicProsecutor() { return publicProsecutor; }
    public void setPublicProsecutor(String publicProsecutor) { this.publicProsecutor = publicProsecutor; }
    public Date getStartDate() { return startDate; }
    public void setStartDate(Date startDate) { this.startDate = startDate; }
    public Date getExpectedCompletionDate() { return expectedCompletionDate; }
    public void setExpectedCompletionDate(Date expectedCompletionDate) { this.expectedCompletionDate = expectedCompletionDate; }
    public List<Hearing> getHearings() { return hearings; }
    public void setHearings(List<Hearing> hearings) { this.hearings = hearings; }
    public String getJudgementInfo() { return judgementInfo; }
    public void setJudgementInfo(String judgementInfo) { this.judgementInfo = judgementInfo; }
}

enum CaseStatus {
    PENDING, CLOSED
}