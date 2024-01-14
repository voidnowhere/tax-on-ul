package com.example.fieldservice.services;

import com.example.fieldservice.entities.Field;
import com.example.fieldservice.repositories.FieldRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InternalFieldService {
    private final FieldRepository repository;

    public ResponseEntity<Page<Field>> getAllWithCategories(int page, int size) {
        return ResponseEntity.ok(repository.findAllWithCategories(PageRequest.of(page, size)));
    }
}
