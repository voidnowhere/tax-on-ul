package com.example.fieldservice.dtos.field;

public record FieldRequest(
        Float surface,
        Long ownerId,
        Long categoryId,
        int year
) {
}
