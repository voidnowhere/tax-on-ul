package com.example.fieldservice.controllers;

import com.example.fieldservice.dtos.field.FieldRequest;
import com.example.fieldservice.dtos.field.FieldResponse;
import com.example.fieldservice.entities.Category;
import com.example.fieldservice.entities.Field;
import com.example.fieldservice.services.FieldService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/fields")
@RequiredArgsConstructor
public class FieldController {
    private final FieldService service;

    @GetMapping("/by_owner/{id}")
    public ResponseEntity<List<FieldResponse>> getAll(@PathVariable Long id) {
        return service.getAll(id);
    }

    @PostMapping
    public ResponseEntity<String> store(@RequestBody FieldRequest request) {
        return service.store(new Field(
                request.getSurface(),
                request.getOwnerId(),
                new Category(request.getCategoryId())
        ));
    }
}
