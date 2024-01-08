package com.example.ownerservice.repositories;

import com.example.ownerservice.entities.Owner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OwnerRepository extends JpaRepository<Owner, Long> {
    boolean existsByNic(String nic);
}
