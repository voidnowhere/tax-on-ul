package com.example.fieldservice.controllers;

import com.example.fieldservice.entities.Field;
import com.example.fieldservice.services.InternalFieldService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/internal/fields")
@RequiredArgsConstructor
public class InternalFiledController {
    private final InternalFieldService service;

    @GetMapping
    public ResponseEntity<Page<Field>> getAll(
            @RequestParam int page,
            @RequestParam int size
    ) {
        return service.getAllWithCategories(page, size);
    }
}
