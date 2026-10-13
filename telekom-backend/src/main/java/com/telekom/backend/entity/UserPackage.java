package com.telekom.backend.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_packages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserPackage extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String name;

    private Integer amount;

    private String unit;

    private String price;
}
