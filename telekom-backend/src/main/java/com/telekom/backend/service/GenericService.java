package com.telekom.backend.service;

import com.telekom.backend.dto.GenericDtos.*;
import com.telekom.backend.entity.User;
import com.telekom.backend.entity.UserSetting;
import com.telekom.backend.repository.UserRepository;
import com.telekom.backend.repository.UserSettingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GenericService {

    private final UserRepository userRepository;
    private final UserSettingRepository userSettingRepository;

    @Transactional
    public GenericActionResponse processAction(GenericActionRequest request) {
        User user = userRepository.findById(request.userId())
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        // Normalde burada actionId'ye göre switch-case ile fatura ödeme, kredi kartı vb. işlemler yapılır.
        // Biz generic bir başarılı yanıt dönüyoruz.
        String transactionId = UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        String message = switch (request.actionId()) {
            case "fatura-ode" -> "Faturanız başarıyla ödendi.";
            case "tl-yukle" -> "TL Yükleme işleminiz başarıyla gerçekleşti.";
            case "cihaz-satin-al" -> "Cihaz siparişiniz alındı.";
            case "ek-paket" -> "Ek paket hattınıza tanımlandı.";
            default -> "İşleminiz başarıyla gerçekleştirildi.";
        };

        return new GenericActionResponse(true, message, "TRX-" + transactionId);
    }

    @Transactional
    public void updateSetting(SettingUpdateRequest request) {
        User user = userRepository.findById(request.userId())
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        Optional<UserSetting> existingSetting = userSettingRepository.findByUserIdAndSettingKey(user.getId(), request.settingKey());

        if (existingSetting.isPresent()) {
            UserSetting setting = existingSetting.get();
            setting.setEnabled(request.enabled());
            userSettingRepository.save(setting);
        } else {
            UserSetting newSetting = UserSetting.builder()
                    .user(user)
                    .settingKey(request.settingKey())
                    .enabled(request.enabled())
                    .build();
            userSettingRepository.save(newSetting);
        }
    }

    public Map<String, Boolean> getUserSettings(Long userId) {
        List<UserSetting> settings = userSettingRepository.findAllByUserId(userId);
        Map<String, Boolean> settingsMap = new HashMap<>();
        for (UserSetting setting : settings) {
            settingsMap.put(setting.getSettingKey(), setting.isEnabled());
        }
        return settingsMap;
    }
}
