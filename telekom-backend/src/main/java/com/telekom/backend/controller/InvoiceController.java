package com.telekom.backend.controller;

import com.telekom.backend.common.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/invoices")
public class InvoiceController {

    @PostMapping("/pay")
    public ResponseEntity<ApiResponse<Void>> payInvoice(@RequestBody Map<String, Object> request) {
        return ResponseEntity.ok(ApiResponse.success(null, "Fatura başarıyla ödendi"));
    }
}
