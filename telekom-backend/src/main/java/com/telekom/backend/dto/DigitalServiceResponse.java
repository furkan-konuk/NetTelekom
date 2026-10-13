package com.telekom.backend.dto;

import java.math.BigDecimal;

public record DigitalServiceResponse(
        Long id,
        String name,
        String description,
        BigDecimal price,
        String icon
) {
}
