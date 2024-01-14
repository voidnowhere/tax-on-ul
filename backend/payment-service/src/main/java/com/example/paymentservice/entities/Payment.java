package com.example.paymentservice.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Table(indexes = {@Index(unique = true, columnList = "field_id, year")})
@Getter
@Setter
@NoArgsConstructor
public class Payment implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Long fieldId;
    @Column(nullable = false)
    private int year;
    @Column(nullable = false)
    private Float price;
    @Column(nullable = false)
    private boolean paid;
    private LocalDateTime dateTime;

    public Payment(Long fieldId, int year, Float price) {
        this.fieldId = fieldId;
        this.year = year;
        this.price = price;
        this.paid = false;
    }
}
