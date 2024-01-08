package com.example.fieldservice.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FieldRequest {
    private Float surface;
    private Long ownerId;
    private Long categoryId;
}
