package com.jis.controller;

import com.jis.entity.Report;
import com.jis.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.Map;

@RestController
@RequestMapping("/api/reports")
public class ReportController {
    @Autowired
    private ReportService reportService;

    @PostMapping("/pending")
    public Report pendingCases() {
        return reportService.generatePendingCases();
    }

    @PostMapping("/resolved")
    public Report resolved(@RequestBody Map<String, Date> dates) {
        return reportService.generateResolvedCases(dates.get("start"), dates.get("end"));
    }

    @GetMapping("/upcoming/{date}")
    public Report upcoming(@PathVariable String date) {
        long ts = Long.parseLong(date);
        return reportService.generateUpcomingHearings(new Date(ts));
    }

    @GetMapping("/status/{cin}")
    public Report status(@PathVariable String cin) {
        return reportService.generateCaseStatus(cin);
    }
}