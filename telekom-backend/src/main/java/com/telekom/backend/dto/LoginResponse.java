package com.telekom.backend.dto;

public record LoginResponse(
        Long userId,
        String name,
        String phoneNumber
) {
}
