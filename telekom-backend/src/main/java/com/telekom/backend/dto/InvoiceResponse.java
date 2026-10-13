package com.telekom.backend.dto;

import java.math.BigDecimal;

public record InvoiceResponse(
        String id,
        String month,
        BigDecimal amount,
        String status
) {
}
