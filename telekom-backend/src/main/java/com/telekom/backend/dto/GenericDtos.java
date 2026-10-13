package com.telekom.backend.dto;

public class GenericDtos {

    public record GenericActionRequest(
            Long userId,
            String actionId
    ) {}

    public record GenericActionResponse(
            boolean success,
            String message,
            String transactionId
    ) {}

    public record SettingUpdateRequest(
            Long userId,
            String settingKey,
            boolean enabled
    ) {}
}
