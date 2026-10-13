package com.telekom.backend.dto;

import java.util.List;

public record TariffsPageResponse(
        List<TariffResponse> tariffs,
        List<DigitalServiceResponse> digitalServices
) {
}
