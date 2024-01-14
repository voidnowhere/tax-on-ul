package com.example.paymentservice.schedules;

import com.example.paymentservice.clients.FieldClient;
import com.example.paymentservice.dtos.FieldDTO;
import com.example.paymentservice.services.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ScheduledTasks {
    private final FieldClient fieldClient;
    private final PaymentService service;

    @Scheduled(cron = "0 * * * * *")
    public void checkFieldPayment() {
        int page = 0;
        Page<FieldDTO> fields;

        do {
            fields = fieldClient.get(page, 100);
            for (FieldDTO field : fields.getContent()) {
                service.checkPayment(field);
            }
            page++;
        } while (fields.hasNext());
    }
}
