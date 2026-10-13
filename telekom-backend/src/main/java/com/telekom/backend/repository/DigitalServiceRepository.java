package com.telekom.backend.repository;

import com.telekom.backend.entity.DigitalService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DigitalServiceRepository extends JpaRepository<DigitalService, Long> {
}
