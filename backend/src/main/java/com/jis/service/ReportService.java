package com.jis.service;

import com.jis.entity.Report;
import com.jis.repository.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class ReportService {
    @Autowired
    private ReportRepository reportRepository;

    public Report generatePending() {
        Report report = new Report();
        report.setType("PENDING");
        report.setGeneratedDate(new Date());
        report.setContent("Pending cases report generated at " + new Date());
        return reportRepository.save(report);
    }

    public Report generateResolved(Date start, Date end) {
        Report report = new Report();
        report.setType("RESOLVED");
        report.setGeneratedDate(new Date());
        report.setContent("Resolved cases from " + start + " to " + end);
        return reportRepository.save(report);
    }

    public Report generateUpcoming(Date date) {
        Report report = new Report();
        report.setType("UPCOMING");
        report.setGeneratedDate(new Date());
        report.setContent("Upcoming hearings on " + date);
        return reportRepository.save(report);
    }

    public Report generateStatus(String cin) {
        Report report = new Report();
        report.setType("STATUS");
        report.setGeneratedDate(new Date());
        report.setContent("Status report for case " + cin);
        return reportRepository.save(report);
    }
}