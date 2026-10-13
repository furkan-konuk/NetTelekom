package com.telekom.backend.service;

import com.telekom.backend.dto.LoginRequest;
import com.telekom.backend.dto.LoginResponse;
import com.telekom.backend.entity.User;
import com.telekom.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    public LoginResponse login(LoginRequest request) {
        Optional<User> userOptional = userRepository.findByPhoneNumberAndPassword(request.phoneNumber(), request.password());
        
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            return new LoginResponse(user.getId(), user.getNameSurname(), user.getPhoneNumber());
        } else {
            throw new RuntimeException("Telefon numarası veya şifre hatalı.");
        }
    }

    public void resetPassword(String phoneNumber, String newPassword) {
        Optional<User> userOptional = userRepository.findByPhoneNumber(phoneNumber);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword(newPassword);
            userRepository.save(user);
        } else {
            throw new RuntimeException("Bu numaraya ait kullanıcı bulunamadı.");
        }
    }
}
