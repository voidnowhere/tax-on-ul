package com.example.fieldservice.services;

import com.example.fieldservice.dtos.FieldResponse;
import com.example.fieldservice.entities.Field;
import com.example.fieldservice.repositories.FieldRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class FieldService {
    private final FieldRepository repository;

    public ResponseEntity<List<FieldResponse>> getAll(Long ownerId) {
        List<Field> fields = repository.findAllByOwnerId(ownerId);

        if (fields.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(fields.stream()
                .map(f -> new FieldResponse(f.getId(), f.getSurface(), f.getCategory().getName()))
                .toList()
        );
    }

    public ResponseEntity<String> store(Field field) {
        repository.save(field);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
