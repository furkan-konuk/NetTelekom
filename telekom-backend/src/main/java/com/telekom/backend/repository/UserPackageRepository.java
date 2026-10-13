package com.telekom.backend.repository;

import com.telekom.backend.entity.UserPackage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserPackageRepository extends JpaRepository<UserPackage, Long> {
    List<UserPackage> findByUserId(Long userId);
}
