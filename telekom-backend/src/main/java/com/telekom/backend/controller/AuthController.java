package com.telekom.backend.controller;

import com.telekom.backend.common.ApiResponse;
import com.telekom.backend.dto.LoginRequest;
import com.telekom.backend.dto.LoginResponse;
import com.telekom.backend.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(@RequestBody LoginRequest request) {
        LoginResponse data = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success(data, "Giriş başarılı"));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Void>> resetPassword(@RequestBody Map<String, String> request) {
        authService.resetPassword(request.get("phoneNumber"), request.get("newPassword"));
        return ResponseEntity.ok(ApiResponse.success(null, "Şifreniz başarıyla güncellendi"));
    }
}
