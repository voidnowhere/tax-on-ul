package com.example.authservice.services;

import com.example.authservice.dtos.LoginRequest;
import com.example.authservice.dtos.LoginResponse;
import com.example.authservice.entities.Admin;
import com.example.authservice.repositories.AdminRepository;
import lombok.RequiredArgsConstructor;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final JWTUtil jwtUtil;
    private final AdminRepository repository;

    public ResponseEntity<LoginResponse> login(LoginRequest request) {
        Optional<Admin> optionalUser = repository.findByEmail(request.email());

        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        Admin admin = optionalUser.get();

        if (!BCrypt.checkpw(request.password(), admin.getPassword())) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(new LoginResponse(jwtUtil.generate(admin.getId().toString())));
    }
}
