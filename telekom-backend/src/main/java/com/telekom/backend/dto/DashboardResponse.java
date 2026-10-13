package com.telekom.backend.dto;

import java.util.List;

public record DashboardResponse(
        UserDto user,
        TariffDto tariff,
        List<InvoiceResponse> invoices,
        List<UsageResponse> usages,
        List<ExtraPackageDto> activePackages,
        List<ApplicationDto> applications
) {
    public record UserDto(
        String phone, 
        String name, 
        String surname,
        String email,
        String birthDate,
        String address,
        String puk1,
        String puk2,
        String lineOpenDate,
        String lastWheelSpinDate
    ) {}
    public record TariffDto(Long id, String name, String price, String endDate) {}
    public record ExtraPackageDto(Long id, String name, Integer amount, String unit, String price) {}
    public record ApplicationDto(String id, String type, String status, String date) {}
}
