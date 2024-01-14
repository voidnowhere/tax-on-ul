package com.example.fieldservice.dtos.field;

public record FieldUpdateRequest(
        Float surface,
        Long categoryId,
        int year
) {
}
