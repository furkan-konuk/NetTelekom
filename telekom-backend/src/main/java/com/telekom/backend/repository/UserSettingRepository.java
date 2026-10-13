package com.telekom.backend.repository;

import com.telekom.backend.entity.UserSetting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserSettingRepository extends JpaRepository<UserSetting, Long> {
    Optional<UserSetting> findByUserIdAndSettingKey(Long userId, String settingKey);
    List<UserSetting> findAllByUserId(Long userId);
}
