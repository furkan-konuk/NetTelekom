package com.telekom.backend.controller;

import com.telekom.backend.common.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.telekom.backend.entity.User;
import com.telekom.backend.entity.UserPackage;
import com.telekom.backend.entity.Invoice;
import com.telekom.backend.entity.InvoiceStatus;
import com.telekom.backend.repository.UserPackageRepository;
import com.telekom.backend.repository.UserRepository;
import com.telekom.backend.repository.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.math.BigDecimal;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/packages")
@RequiredArgsConstructor
public class PackageController {

    private final UserPackageRepository userPackageRepository;
    private final UserRepository userRepository;
    private final InvoiceRepository invoiceRepository;

    @PostMapping("/buy")
    public ResponseEntity<ApiResponse<Void>> buyPackage(@RequestBody Map<String, Object> request) {
        User user = userRepository.findById(1L).orElseThrow();
        
        String paymentMethod = (String) request.get("paymentMethod");
        String price = request.get("price") != null ? request.get("price").toString() : "50";
        String packageName = request.get("packageName") != null ? request.get("packageName").toString() : "Ek İnternet Paketi";
        Integer amount = request.get("amount") != null ? Integer.parseInt(request.get("amount").toString()) : 10;
        String unit = request.get("unit") != null ? request.get("unit").toString() : "GB";

        if ("Fatura".equals(paymentMethod)) {
            // Find active/waiting invoice
            Invoice activeInvoice = invoiceRepository.findByUserId(1L).stream()
                    .filter(i -> i.getStatus() == InvoiceStatus.BEKLIYOR)
                    .findFirst()
                    .orElseThrow(() -> new RuntimeException("Aktif faturanız bulunamadı."));
            
            BigDecimal currentAmount = activeInvoice.getAmount();
            String numericPrice = price.replaceAll("[^0-9.]", "");
            if (numericPrice.isEmpty()) numericPrice = "0";
            activeInvoice.setAmount(currentAmount.add(new BigDecimal(numericPrice)));
            invoiceRepository.save(activeInvoice);
        }
        
        UserPackage pkg = UserPackage.builder()
                .user(user)
                .name(packageName)
                .amount(amount)
                .unit(unit)
                .price(price)
                .build();
        userPackageRepository.save(pkg);

        return ResponseEntity.ok(ApiResponse.success(null, "Paket başarıyla satın alındı"));
    }

    @PostMapping("/gift")
    public ResponseEntity<ApiResponse<Void>> giftPackage(@RequestBody Map<String, Object> request) {
        User user = userRepository.findById(1L).orElseThrow();
        
        if (user.getLastWheelSpinDate() != null) {
            long daysBetween = ChronoUnit.DAYS.between(user.getLastWheelSpinDate(), LocalDate.now());
            if (daysBetween < 7) {
                return ResponseEntity.badRequest().body(ApiResponse.error("Hediye çarkını haftada sadece 1 kez çevirebilirsiniz. Kalan gün: " + (7 - daysBetween)));
            }
        }
        
        user.setLastWheelSpinDate(LocalDate.now());
        userRepository.save(user);
        
        Integer amount = request.get("amount") != null ? Integer.parseInt(request.get("amount").toString()) : 1;
        
        UserPackage pkg = UserPackage.builder()
                .user(user)
                .name("Hediye İnternet")
                .amount(amount)
                .unit("GB")
                .price("0")
                .build();
        userPackageRepository.save(pkg);

        return ResponseEntity.ok(ApiResponse.success(null, "Hediye internet hesabınıza tanımlandı"));
    }

    @DeleteMapping("/cancel/{id}")
    public ResponseEntity<ApiResponse<Void>> cancelPackage(@PathVariable Long id) {
        userPackageRepository.deleteById(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Ek paket başarıyla iptal edildi"));
    }
}
