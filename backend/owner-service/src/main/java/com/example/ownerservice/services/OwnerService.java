package com.example.ownerservice.services;

import com.example.ownerservice.entities.Owner;
import com.example.ownerservice.repositories.OwnerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OwnerService {
    private final OwnerRepository repository;

    public ResponseEntity<List<Owner>> getAll() {
        List<Owner> owners = repository.findAll();

        if (owners.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(owners);
    }

    public ResponseEntity<String> store(Owner owner) {
        if (repository.existsByNic(owner.getNic())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Nic already exists!");
        }

        repository.save(owner);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    public ResponseEntity<Owner> getOwner(Long id) {
        Owner owner = repository.findById(id).orElse(null);

        if (owner == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(owner);
    }

    public ResponseEntity<?> update(Long id, Owner owner) {
        Owner owner1 = repository.findById(id).orElse(null);

        if (owner1 == null) {
            return ResponseEntity.notFound().build();
        }

        owner1.setNic(owner.getNic());

        repository.save(owner1);
        return ResponseEntity.ok(owner1);
    }

    public void delete(Long id) {
        Owner owner = repository.findById(id).orElse(null);

        if (owner != null) {
            repository.delete(owner);
        }


    }
}
