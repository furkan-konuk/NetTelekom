package com.telekom.backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "tariffs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tariff extends BaseEntity {

    @Column(nullable = false, length = 100)
    private String name;

    @Column(nullable = false)
    private Integer internetLimit; // -1 for unlimited

    @Column(nullable = false)
    private Integer smsLimit;

    @Column(nullable = false)
    private Integer minutesLimit;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Column(nullable = false)
    private Boolean isPremium;

    @Column(length = 50)
    private String badgeText;

    @Column(length = 50)
    private String badgeColor;
}
