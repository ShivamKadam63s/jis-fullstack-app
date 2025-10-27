package com.jis.repository;

import com.jis.entity.Case;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface CaseRepository extends JpaRepository<Case, String> {
    List<Case> findByStatus(Case.CaseStatus status);

    @Query("SELECT c FROM Case c WHERE c.startDate BETWEEN :start AND :end ORDER BY c.startDate")
    List<Case> findResolvedBetween(@Param("start") Date start, @Param("end") Date end);

    @Query("SELECT c FROM Case c JOIN c.hearings h WHERE h.hearingDate = :date")
    List<Case> findUpcomingOnDate(@Param("date") Date date);
}