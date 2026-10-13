package com.telekom.backend.controller;

import com.telekom.backend.common.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/applications")
public class ApplicationController {

    @PostMapping("/new")
    public ResponseEntity<ApiResponse<Void>> newApplication(@RequestBody Map<String, Object> request) {
        return ResponseEntity.ok(ApiResponse.success(null, "Başvurunuz başarıyla alındı"));
    }
}
