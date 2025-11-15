package com.jis.service;

import com.jis.entity.Report;
import com.jis.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class ReportService {
    @Autowired
    private ReportRepository reportRepository;

    public Report generatePendingCases() {
        Report r = new Report();
        r.setType("PENDING");
        r.setGeneratedDate(new Date());
        r.setContent("Pending cases sorted by CIN");
        return reportRepository.save(r);
    }

    public Report generateResolvedCases(Date startDate, Date endDate) {
        Report r = new Report();
        r.setType("RESOLVED");
        r.setGeneratedDate(new Date());
        r.setContent("Resolved cases from " + startDate + " to " + endDate);
        return reportRepository.save(r);
    }

    public Report generateCaseStatus(String cin) {
        Report r = new Report();
        r.setType("STATUS");
        r.setGeneratedDate(new Date());
        r.setContent("Status for CIN: " + cin);
        return reportRepository.save(r);
    }

    public Report generateUpcomingHearings(Date date) {
        Report r = new Report();
        r.setType("UPCOMING");
        r.setGeneratedDate(new Date());
        r.setContent("Hearings on " + date);
        return reportRepository.save(r);
    }
}