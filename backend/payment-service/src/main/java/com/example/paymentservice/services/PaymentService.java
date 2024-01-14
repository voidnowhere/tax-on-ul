package com.example.paymentservice.services;

import com.example.paymentservice.dtos.FieldDTO;
import com.example.paymentservice.dtos.PaymentDTO;
import com.example.paymentservice.dtos.PaymentResponse;
import com.example.paymentservice.entities.Payment;
import com.example.paymentservice.repositories.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    public ResponseEntity<List<PaymentResponse>> getAllByFieldId(Long filedId) {
        List<Payment> payments = repository.findAllByFieldId(filedId);

        if (payments.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(payments.stream().map(p -> new PaymentResponse(
                p.getId(),
                p.getYear(),
                p.getPrice(),
                p.isPaid(),
                p.getDateTime()
        )).toList());
    }

    public ResponseEntity<String> setPaid(Long paymentId, boolean value) {
        Optional<Payment> paymentOptional = repository.findById(paymentId);

        if (paymentOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Payment payment = paymentOptional.get();
        payment.setPaid(value);
        if (payment.isPaid()) {
            payment.setDateTime(LocalDateTime.now());
        } else {
            payment.setDateTime(null);
        }
        repository.save(payment);

        return ResponseEntity.ok().build();
    }
}
