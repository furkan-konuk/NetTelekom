package com.telekom.backend.controller;

import com.telekom.backend.common.ApiResponse;
import com.telekom.backend.dto.DashboardResponse;
import com.telekom.backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<ApiResponse<DashboardResponse>> getDashboard(@RequestParam(defaultValue = "1") Long userId) {
        DashboardResponse data = dashboardService.getDashboardData(userId);
        return ResponseEntity.ok(ApiResponse.success(data));
    }
}
