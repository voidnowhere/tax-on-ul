package com.example.fieldservice.controllers;

import com.example.fieldservice.entities.Category;
import com.example.fieldservice.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService service;

    @GetMapping
    public ResponseEntity<List<Category>> getAll() {
        return service.getAll();
    }

    @PostMapping
    public ResponseEntity<String> store(@RequestBody Category category) {
        return service.store(category);
    }
}
