package com.example.ownerservice.controllers;

import com.example.ownerservice.entities.Owner;
import com.example.ownerservice.services.OwnerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/owners")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class OwnerController {
    private final OwnerService service;

    @GetMapping
    public ResponseEntity<List<Owner>> getAll() {
        return service.getAll();
    }

    @PostMapping
    public ResponseEntity<String> store(@RequestBody Owner owner) {
        return service.store(owner);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Owner> getOwner(@PathVariable Long id) {
        return service.getOwner(id);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Owner owner) {
        return service.update(id, owner);

    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
