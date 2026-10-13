package com.telekom.backend.repository;

import com.telekom.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByPhoneNumberAndPassword(String phoneNumber, String password);
    Optional<User> findByPhoneNumber(String phoneNumber);
}
