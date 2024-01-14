package com.example.authservice.dtos;

public record LoginRequest(
        String email,
        String password
) {
}
