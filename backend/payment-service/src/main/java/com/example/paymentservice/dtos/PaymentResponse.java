package com.example.paymentservice.dtos;

import java.time.LocalDateTime;

public record PaymentResponse(
        Long id,
        int year,
        Float price,
        boolean paid,
        LocalDateTime dateTime
) {
}
