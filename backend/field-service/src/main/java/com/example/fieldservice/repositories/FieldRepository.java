package com.example.fieldservice.repositories;

import com.example.fieldservice.entities.Field;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FieldRepository extends JpaRepository<Field, Long> {
    @Query("""
            select f from Field f
                join fetch f.category
                where f.ownerId = :ownerId
            """)
    List<Field> findAllByOwnerId(Long ownerId);

    @Query("""
            select f from Field f
                join fetch f.category
            """)
    Page<Field> findAllWithCategories(Pageable pageable);
}
