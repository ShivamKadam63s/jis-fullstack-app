package com.jis.controller;

import com.jis.entity.Case;
import com.jis.service.CaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cases")
public class CaseController {
    @Autowired
    private CaseService caseService;

    @PostMapping
    @PreAuthorize("hasRole('REGISTRAR')")
    public Case createCase(@RequestBody Map<String, Object> details) {
        return caseService.createCase(details);
    }

    @GetMapping("/{cin}")
    public Case getCase(@PathVariable String cin) {
        return caseService.getByCin(cin);
    }

    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('JUDGE', 'LAWYER', 'REGISTRAR')")
    public List<Case> search(@RequestParam String keyword, @RequestBody Map<String, Object> filters) {
        return caseService.searchCases(keyword, filters);
    }
}