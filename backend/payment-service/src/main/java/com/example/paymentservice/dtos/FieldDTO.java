package com.example.paymentservice.dtos;

public record FieldDTO(
        Long id,
        Float surface,
        int year,
        Long ownerId,
        CategoryDTO category
) {
}
