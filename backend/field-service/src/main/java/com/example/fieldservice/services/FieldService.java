package com.example.fieldservice.services;

import com.example.fieldservice.dtos.FieldAdminResponse;
import com.example.fieldservice.dtos.field.FieldResponse;
import com.example.fieldservice.dtos.field.FieldUpdateRequest;
import com.example.fieldservice.entities.Category;
import com.example.fieldservice.entities.Field;
import com.example.fieldservice.repositories.CategoryRepository;
import com.example.fieldservice.repositories.FieldRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FieldService {
    private final FieldRepository repository;
    private final CategoryRepository repositoryCategory;

    public ResponseEntity<List<FieldResponse>> getAllByOwnerId(Long ownerId) {
        List<Field> fields = repository.findAllByOwnerId(ownerId);


        if (fields.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(fields.stream()
                .map(f -> new FieldResponse(
                        f.getId(),
                        f.getSurface(),
                        f.getCategory().getId(),
                        f.getCategory().getName(),
                        f.getYear()
                )).toList()
        );
    }

    public ResponseEntity<List<FieldAdminResponse>> getAll() {
        List<Field> fields = repository.findAll();

        if (fields.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(fields.stream()
                .map(f -> new FieldAdminResponse(f.getId(), f.getSurface(), f.getCategory().getName(), f.getOwnerId()))
                .toList()
        );
    }

    public ResponseEntity<String> store(Field field) {
        repository.save(field);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    public Optional<Field> findById(Long id) {
        return repository.findById(id);
    }

    public void update(Long id, FieldUpdateRequest request) {
        Field field = repository.findById(id).orElseThrow();
        if (request.surface() != null) {
            field.setSurface(request.surface());
        }
        if (request.categoryId() != null) {
            Optional<Category> category = repositoryCategory.findById(request.categoryId());
            field.setCategory(category.get());
        }
        field.setYear(request.year());
        repository.save(field);
    }

    public void delete(Long id) {
        Field field = repository.findById(id).orElseThrow();
        if (field != null) {
            repository.deleteById(id);
        }
    }

}
