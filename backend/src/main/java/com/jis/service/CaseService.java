package com.jis.service;

import com.jis.entity.Case;
import com.jis.repository.CaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class CaseService {
    @Autowired
    private CaseRepository caseRepository;

    public Case createCase(Map<String, Object> details) {
        Case c = new Case();
        c.setCin((String) details.get("cin"));
        c.setTitle((String) details.get("title"));
        return caseRepository.save(c);
    }
    public void updateCase(String cin, Map<String, Object> details) {
        Case c = caseRepository.findById(cin).orElseThrow();
        caseRepository.save(c);
    }

    public List<Case> searchCases(String keyword, Map<String, Object> filters) {
        return caseRepository.findAll().stream()
                .filter(c -> c.getTitle().toLowerCase().contains(keyword.toLowerCase()))
                .toList();
    }

    public Case getByCin(String cin) {
        return caseRepository.findById(cin).orElse(null);
    }
}