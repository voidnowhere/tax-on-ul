package com.example.fieldservice.controllers;

import com.example.fieldservice.dtos.category.CategoryRequest;
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
    public ResponseEntity<String> store(@RequestBody CategoryRequest request) {
        return service.store(new Category(request.name(), request.price()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> update(
            @PathVariable Long id,
            @RequestBody CategoryRequest request
    ) {
        return service.update(new Category(id, request.name(), request.price()));
    }
}
