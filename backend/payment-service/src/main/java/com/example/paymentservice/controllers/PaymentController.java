package com.example.paymentservice.controllers;

import com.example.paymentservice.dtos.PaymentResponse;
import com.example.paymentservice.services.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService service;

    @GetMapping("/by_field/{id}")
    public ResponseEntity<List<PaymentResponse>> getAllByFieldId(@PathVariable Long id) {
        return service.getAllByFieldId(id);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<String> setPaid(@PathVariable Long id, @RequestBody boolean value) {
        return service.setPaid(id, value);
    }
}
