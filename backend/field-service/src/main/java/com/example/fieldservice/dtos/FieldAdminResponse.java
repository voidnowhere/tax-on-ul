package com.example.fieldservice.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FieldAdminResponse {
    private Long id;
    private Float surface;
    private String category;
    private Long ownerId;
}
