package com.example.paymentservice.repositories;

import com.example.paymentservice.entities.Payment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    Page<Payment> findAllByFieldId(Long fieldId, Pageable pageable);
    boolean existsByFieldIdAndYear(Long fieldId, int year);
}
