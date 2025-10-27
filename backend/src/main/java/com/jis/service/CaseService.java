package com.jis.service;

import com.jis.entity.Case;
import com.jis.repository.CaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CaseService {
    @Autowired
    private CaseRepository caseRepository;

    public Case createCase(Map<String, Object> details) {
        Case c = new Case();
        c.setCaseId((String) details.get("caseId"));
        c.setTitle((String) details.get("title"));
        c.setStatus(Case.CaseStatus.valueOf((String) details.get("status")));
        c.setStartDate((java.util.Date) details.get("startDate"));
        return caseRepository.save(c);
    }

    public List<Case> searchCases(String keyword, Map<String, Object> filters) {
        // Simple keyword search on title
        return caseRepository.findAll().stream()
                .filter(c -> c.getTitle().contains(keyword))
                .toList();
    }

    public Case getByCin(String cin) {
        return caseRepository.findById(cin).orElse(null);
    }
}