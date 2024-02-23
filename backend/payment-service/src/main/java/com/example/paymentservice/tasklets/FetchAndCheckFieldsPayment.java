package com.example.paymentservice.tasklets;

import com.example.paymentservice.clients.FieldClient;
import com.example.paymentservice.dtos.FieldDTO;
import com.example.paymentservice.services.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.StepContribution;
import org.springframework.batch.core.scope.context.ChunkContext;
import org.springframework.batch.core.step.tasklet.Tasklet;
import org.springframework.batch.repeat.RepeatStatus;
import org.springframework.data.domain.Page;

@RequiredArgsConstructor
public class FetchAndCheckFieldsPayment implements Tasklet {
    private final FieldClient fieldClient;
    private final PaymentService service;

    @Override
    public RepeatStatus execute(StepContribution contribution, ChunkContext chunkContext) {
        int page = 0;
        Page<FieldDTO> fields;

        do {
            fields = fieldClient.get(page, 100);
            fields.stream().parallel().forEach(service::checkPayment);
            page++;
        } while (fields.hasNext());

        return RepeatStatus.FINISHED;
    }
}
