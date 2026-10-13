package com.telekom.backend.repository;

import com.telekom.backend.entity.UserUsage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserUsageRepository extends JpaRepository<UserUsage, Long> {
    List<UserUsage> findByUserId(Long userId);
}
