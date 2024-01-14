package com.example.paymentservice.services;

import com.example.paymentservice.dtos.FieldDTO;
import com.example.paymentservice.dtos.PaymentDTO;
import com.example.paymentservice.entities.Payment;
import com.example.paymentservice.repositories.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentService {
    private final PaymentRepository repository;
    private final KafkaTemplate<String, PaymentDTO> kafkaTemplate;

    public void checkPayment(FieldDTO field) {
        List<Integer> years = new ArrayList<>();
        for (int i = field.year(), y = LocalDate.now().getYear(); i <= y; i++) {
            years.add(i);
        }

        int page = 0;
        Page<Payment> payments;

        do {
            payments = repository.findAllByFieldId(field.id(), PageRequest.of(page, 100));

            for (Payment payment : payments.getContent()) {
                years.removeIf(i -> i == payment.getYear());
            }

            page++;
        } while (payments.hasNext());

        for (Integer year : years) {
            kafkaTemplate.send(
                    "payment",
                    new PaymentDTO(field.id(), year, field.surface() * field.category().price())
            );
        }
    }
}
