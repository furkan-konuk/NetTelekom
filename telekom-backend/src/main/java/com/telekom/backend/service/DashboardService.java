package com.telekom.backend.service;

import com.telekom.backend.dto.DashboardResponse;
import com.telekom.backend.dto.InvoiceResponse;
import com.telekom.backend.dto.UsageResponse;
import com.telekom.backend.entity.User;
import com.telekom.backend.repository.InvoiceRepository;
import com.telekom.backend.repository.UserPackageRepository;
import com.telekom.backend.repository.UserRepository;
import com.telekom.backend.repository.UserUsageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UserRepository userRepository;
    private final InvoiceRepository invoiceRepository;
    private final UserUsageRepository userUsageRepository;
    private final UserPackageRepository userPackageRepository;

    public DashboardResponse getDashboardData(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        List<InvoiceResponse> invoices = invoiceRepository.findByUserId(userId).stream()
                .map(inv -> new InvoiceResponse(inv.getId(), inv.getPeriodMonth(), inv.getAmount(), inv.getStatus().name()))
                .collect(Collectors.toList());

        List<UsageResponse> usages = userUsageRepository.findByUserId(userId).stream()
                .map(use -> new UsageResponse(use.getUsageType().name(), use.getTotalAmount(), use.getUsedAmount(), use.getUnit(), use.getColorCode()))
                .collect(Collectors.toList());

        // Capitalize specific type names for frontend compatibility if needed
        usages.forEach(u -> {
            if (u.type().equals("INTERNET")) u = new UsageResponse("İnternet", u.total(), u.used(), u.unit(), u.color());
            if (u.type().equals("MINUTES")) u = new UsageResponse("Dakika", u.total(), u.used(), u.unit(), u.color());
        });

        // Map proper casing
        List<UsageResponse> mappedUsages = usages.stream().map(u -> switch (u.type()) {
            case "INTERNET" -> new UsageResponse("İnternet", u.total(), u.used(), u.unit(), u.color());
            case "MINUTES" -> new UsageResponse("Dakika", u.total(), u.used(), u.unit(), u.color());
            case "SMS" -> new UsageResponse("SMS", u.total(), u.used(), u.unit(), u.color());
            default -> u;
        }).collect(Collectors.toList());
        
        List<InvoiceResponse> mappedInvoices = invoices.stream().map(inv -> switch(inv.status()) {
            case "ODENDI" -> new InvoiceResponse(inv.id(), inv.month(), inv.amount(), "Ödendi");
            case "BEKLIYOR" -> new InvoiceResponse(inv.id(), inv.month(), inv.amount(), "Bekliyor");
            default -> inv;
        }).collect(Collectors.toList());

        DashboardResponse.UserDto userDto = new DashboardResponse.UserDto(
                user.getPhoneNumber(),
                user.getNameSurname().split(" ")[0],
                user.getNameSurname().contains(" ") ? user.getNameSurname().substring(user.getNameSurname().indexOf(" ") + 1) : "",
                user.getEmail(),
                user.getBirthDate(),
                user.getAddress(),
                user.getPuk1(),
                user.getPuk2(),
                user.getLineOpenDate(),
                user.getLastWheelSpinDate() != null ? user.getLastWheelSpinDate().toString() : null
        );

        DashboardResponse.TariffDto tariffDto = new DashboardResponse.TariffDto(
                1L,
                "Net Prime 20GB",
                "250",
                "12 Ekim 2027"
        );

        List<DashboardResponse.ExtraPackageDto> packages = userPackageRepository.findByUserId(userId).stream()
                .map(p -> new DashboardResponse.ExtraPackageDto(p.getId(), p.getName(), p.getAmount(), p.getUnit(), p.getPrice()))
                .collect(Collectors.toList());

        return new DashboardResponse(
                userDto,
                tariffDto,
                mappedInvoices,
                mappedUsages,
                packages, // activePackages
                List.of()  // applications
        );
    }
}
