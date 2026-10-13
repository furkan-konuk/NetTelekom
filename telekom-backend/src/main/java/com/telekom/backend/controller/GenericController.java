package com.telekom.backend.controller;

import com.telekom.backend.common.ApiResponse;
import com.telekom.backend.dto.GenericDtos.*;
import com.telekom.backend.service.GenericService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/generic")
@RequiredArgsConstructor
public class GenericController {

    private final GenericService genericService;

    @PostMapping("/action")
    public ResponseEntity<ApiResponse<GenericActionResponse>> processAction(@RequestBody GenericActionRequest request) {
        GenericActionResponse response = genericService.processAction(request);
        return ResponseEntity.ok(ApiResponse.success(response, response.message()));
    }

    @PostMapping("/setting")
    public ResponseEntity<ApiResponse<Void>> updateSetting(@RequestBody SettingUpdateRequest request) {
        genericService.updateSetting(request);
        return ResponseEntity.ok(ApiResponse.success(null, "Ayar güncellendi"));
    }

    @GetMapping("/settings")
    public ResponseEntity<ApiResponse<Map<String, Boolean>>> getUserSettings(@RequestParam Long userId) {
        Map<String, Boolean> settings = genericService.getUserSettings(userId);
        return ResponseEntity.ok(ApiResponse.success(settings, "Ayarlar getirildi"));
    }
}
