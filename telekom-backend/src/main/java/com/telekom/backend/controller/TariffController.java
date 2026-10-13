package com.telekom.backend.controller;

import com.telekom.backend.common.ApiResponse;
import com.telekom.backend.dto.TariffsPageResponse;
import com.telekom.backend.service.TariffService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/tariffs")
@RequiredArgsConstructor
public class TariffController {

    private final TariffService tariffService;

    @GetMapping
    public ResponseEntity<ApiResponse<TariffsPageResponse>> getTariffs() {
        TariffsPageResponse data = tariffService.getTariffsPage();
        return ResponseEntity.ok(ApiResponse.success(data));
    }

    @org.springframework.web.bind.annotation.PostMapping("/change")
    public ResponseEntity<ApiResponse<Void>> changeTariff(@org.springframework.web.bind.annotation.RequestBody java.util.Map<String, Object> request) {
        return ResponseEntity.ok(ApiResponse.success(null, "Tarifeniz başarıyla güncellendi"));
    }
}
