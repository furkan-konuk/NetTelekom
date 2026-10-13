package com.telekom.backend.dto;

public record LoginRequest(
        String phoneNumber,
        String password
) {
}
