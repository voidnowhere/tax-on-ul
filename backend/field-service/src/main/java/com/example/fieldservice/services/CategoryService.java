package com.example.fieldservice.services;

import com.example.fieldservice.entities.Category;
import com.example.fieldservice.repositories.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository repository;

    public ResponseEntity<List<Category>> getAll() {
        List<Category> categories = repository.findAll();

        if (categories.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(categories);
    }

    public ResponseEntity<String> store(Category category) {
        if (repository.existsByName(category.getName())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Name already exists!");
        }

        repository.save(category);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    public ResponseEntity<String> update(Category category) {
        repository.save(category);
        return ResponseEntity.ok().build();
    }
}
