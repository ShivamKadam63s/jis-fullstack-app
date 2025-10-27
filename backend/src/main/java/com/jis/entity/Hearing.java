package com.jis.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "hearings")
public class Hearing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cin;

    private Date hearingDate;

    private Date hearingTime;

    private String courtroom;

    @Enumerated(EnumType.STRING)
    private HearingStatus status = HearingStatus.HELD;

    private String summary;

    private String adjournmentReason;

    @ManyToOne
    @JoinColumn(name = "cin")
    private Case caseRef;

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getCin() { return cin; }
    public void setCin(String cin) { this.cin = cin; }
    public Date getHearingDate() { return hearingDate; }
    public void setHearingDate(Date hearingDate) { this.hearingDate = hearingDate; }
    public Date getHearingTime() { return hearingTime; }
    public void setHearingTime(Date hearingTime) { this.hearingTime = hearingTime; }
    public String getCourtroom() { return courtroom; }
    public void setCourtroom(String courtroom) { this.courtroom = courtroom; }
    public HearingStatus getStatus() { return status; }
    public void setStatus(HearingStatus status) { this.status = status; }
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
    public String getAdjournmentReason() { return adjournmentReason; }
    public void setAdjournmentReason(String adjournmentReason) { this.adjournmentReason = adjournmentReason; }
    public Case getCaseRef() { return caseRef; }
    public void setCaseRef(Case caseRef) { this.caseRef = caseRef; }
}

enum HearingStatus {
    HELD, ADJOURNED
}