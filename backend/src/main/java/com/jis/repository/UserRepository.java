package com.jis.repository;

import com.jis.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserID(String userID);
    User findByEmail(String email);
}