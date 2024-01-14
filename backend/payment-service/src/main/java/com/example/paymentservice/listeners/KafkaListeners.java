package com.example.paymentservice.listeners;

import com.example.paymentservice.dtos.PaymentDTO;
import com.example.paymentservice.entities.Payment;
import com.example.paymentservice.repositories.PaymentRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class KafkaListeners {
    private final PaymentRepository repository;

    @KafkaListener(topics = "payment", groupId = "group")
    void listener(String value) throws JsonProcessingException {
        PaymentDTO paymentDTO = new ObjectMapper().readValue(value, PaymentDTO.class);
        if (!repository.existsByFieldIdAndYear(paymentDTO.fieldId(), paymentDTO.year())) {
            repository.save(
                    new Payment(
                            paymentDTO.fieldId(),
                            paymentDTO.year(),
                            paymentDTO.price()
                    )
            );
        }
    }
}
