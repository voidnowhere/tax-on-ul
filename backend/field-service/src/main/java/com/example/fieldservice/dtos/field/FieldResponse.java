package com.example.fieldservice.dtos.field;

public record FieldResponse(
        Long id,
        Float surface,
        Long categoryId,
        String categoryName,
        int year
) {
}
