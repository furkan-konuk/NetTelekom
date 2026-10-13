package com.telekom.backend.dto;

import java.math.BigDecimal;

public record TariffResponse(
        Long id,
        String name,
        Object internet, // String or Integer depending on unlimited
        Integer sms,
        Integer minutes,
        BigDecimal price,
        Boolean isPremium,
        String badge,
        String badgeColor
) {
}
