package com.telekom.backend.dto;

public record UsageResponse(
        String type,
        Integer total,
        Integer used,
        String unit,
        String color
) {
}
