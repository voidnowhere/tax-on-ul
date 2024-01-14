package com.example.ownerservice.repositories;

import com.example.ownerservice.entities.Owner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OwnerRepository extends JpaRepository<Owner, Long> {
    boolean existsByNic(String nic);

    Optional<Owner> findByNic(String nic);
}
