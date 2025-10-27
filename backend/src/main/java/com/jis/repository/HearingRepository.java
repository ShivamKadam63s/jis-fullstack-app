package com.jis.repository;

import com.jis.entity.Hearing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HearingRepository extends JpaRepository<Hearing, Long> {
}