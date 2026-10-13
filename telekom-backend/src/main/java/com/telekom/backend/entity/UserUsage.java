package com.telekom.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_usages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserUsage extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private UsageType usageType;

    @Column(nullable = false)
    private Integer totalAmount;

    @Column(nullable = false)
    private Integer usedAmount;

    @Column(nullable = false, length = 10)
    private String unit;

    @Column(nullable = false, length = 20)
    private String colorCode;
}
