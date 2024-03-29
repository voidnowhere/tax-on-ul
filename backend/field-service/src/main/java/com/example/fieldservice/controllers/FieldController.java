package com.example.fieldservice.controllers;

import com.example.fieldservice.dtos.FieldAdminResponse;
import com.example.fieldservice.dtos.field.FieldRequest;
import com.example.fieldservice.dtos.field.FieldResponse;
import com.example.fieldservice.dtos.field.FieldUpdateRequest;
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

    @GetMapping
    public ResponseEntity<List<FieldAdminResponse>> getAll() {
        return service.getAll();
    }

    @GetMapping("/by_owner/{id}")
    public ResponseEntity<List<FieldResponse>> getAllByOwner(@PathVariable Long id) {
        return service.getAllByOwnerId(id);
    }

    @PostMapping
    public ResponseEntity<String> store(@RequestBody FieldRequest request) {
        return service.store(new Field(
                request.surface(),
                request.ownerId(),
                request.year(),
                new Category(request.categoryId())
        ));
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }

    @PatchMapping("/{id}")
    public void update(@PathVariable Long id, @RequestBody FieldUpdateRequest request) {
        service.update(id, request);
    }
}
