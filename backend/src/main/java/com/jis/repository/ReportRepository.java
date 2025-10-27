package com.jis.repository;

import com.jis.entity.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    @Query("SELECT r FROM Report r WHERE r.generatedDate = :date AND r.type = :type")
    List<Report> findByDateAndType(@Param("date") Date date, @Param("type") String type);
}