package com.jis.repository;

import com.jis.entity.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {
    List<Bill> findByLawyerIdAndStatus(Long lawyerId, String status);

    @Query("SELECT b FROM Bill b WHERE b.generatedDate >= :startDate")
    List<Bill> findBillsSince(@Param("startDate") Date startDate);
}