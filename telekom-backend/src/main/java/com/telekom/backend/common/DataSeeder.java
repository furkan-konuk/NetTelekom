package com.telekom.backend.common;

import com.telekom.backend.entity.*;
import com.telekom.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final InvoiceRepository invoiceRepository;
    private final UserUsageRepository userUsageRepository;
    private final TariffRepository tariffRepository;
    private final DigitalServiceRepository digitalServiceRepository;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            User user = User.builder()
                    .nameSurname("Ahmet Yılmaz")
                    .phoneNumber("5320000000")
                    .password("123456")
                    .userType(UserType.BIREYSEL)
                    .email("ahmet.yilmaz@example.com")
                    .birthDate("15.05.1985")
                    .address("Atatürk Mah. Cumhuriyet Cad. No: 15 / Kadıköy, İstanbul")
                    .puk1("83749210")
                    .puk2("52190437")
                    .lineOpenDate("12.04.2018")
                    .build();
            userRepository.save(user);

            invoiceRepository.saveAll(List.of(
                    Invoice.builder().id("F001").user(user).periodMonth("Ağustos").amount(new BigDecimal("350.00")).status(InvoiceStatus.ODENDI).dueDate(LocalDate.now().minusDays(10)).build(),
                    Invoice.builder().id("F002").user(user).periodMonth("Eylül").amount(new BigDecimal("375.50")).status(InvoiceStatus.BEKLIYOR).dueDate(LocalDate.now().plusDays(5)).build()
            ));

            userUsageRepository.saveAll(List.of(
                    UserUsage.builder().user(user).usageType(UsageType.INTERNET).totalAmount(20).usedAmount(15).unit("GB").colorCode("#3b82f6").build(),
                    UserUsage.builder().user(user).usageType(UsageType.MINUTES).totalAmount(1000).usedAmount(450).unit("DK").colorCode("#22c55e").build(),
                    UserUsage.builder().user(user).usageType(UsageType.SMS).totalAmount(1000).usedAmount(50).unit("Adet").colorCode("#a855f7").build()
            ));

            tariffRepository.saveAll(List.of(
                    Tariff.builder().name("Eko 5GB").internetLimit(5).smsLimit(1000).minutesLimit(1000).price(new BigDecimal("120")).isPremium(false).badgeText("").badgeColor("").build(),
                    Tariff.builder().name("Prime 20GB").internetLimit(20).smsLimit(1000).minutesLimit(2000).price(new BigDecimal("250")).isPremium(true).badgeText("Yeni Nesil Prime").badgeColor("bg-violet-600").build(),
                    Tariff.builder().name("Selfy Sınırsız").internetLimit(-1).smsLimit(5000).minutesLimit(5000).price(new BigDecimal("450")).isPremium(false).badgeText("Selfy'e Özel").badgeColor("bg-pink-500").build()
            ));

            digitalServiceRepository.saveAll(List.of(
                    DigitalService.builder().name("Sosyal Medya Sınırsız").description("Instagram, Twitter, Facebook kotadan yemez").price(new BigDecimal("40")).icon("📱").build(),
                    DigitalService.builder().name("Video Paketi").description("YouTube ve Netflix için 10GB ek internet").price(new BigDecimal("60")).icon("🎬").build(),
                    DigitalService.builder().name("Oyun Paketi").description("PUBG, LoL Mobile sıfır gecikme ve sınırsız").price(new BigDecimal("50")).icon("🎮").build()
            ));
        } else {
            // Veritabanındaki sahte kullanıcı verisini temizle
            userRepository.findByPhoneNumber("5320000000").ifPresent(user -> {
                user.setNameSurname("Ahmet Yılmaz");
                user.setEmail("ahmet.yilmaz@example.com");
                user.setBirthDate("15.05.1985");
                user.setAddress("Atatürk Mah. Cumhuriyet Cad. No: 15 / Kadıköy, İstanbul");
                user.setPuk1("83749210");
                user.setPuk2("52190437");
                user.setLineOpenDate("12.04.2018");
                userRepository.save(user);
            });
        }
    }
}
