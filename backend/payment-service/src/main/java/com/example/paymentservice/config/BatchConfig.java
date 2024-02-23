package com.example.paymentservice.config;

import com.example.paymentservice.clients.FieldClient;
import com.example.paymentservice.services.PaymentService;
import com.example.paymentservice.tasklets.FetchAndCheckFieldsPayment;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
public class BatchConfig {
    @Bean
    public Job checkFieldsPaymentJob(JobRepository jobRepository, Step checkFieldsPaymentStep) {
        return new JobBuilder("checkFieldsPaymentJob", jobRepository)
                .incrementer(new RunIdIncrementer())
                .start(checkFieldsPaymentStep)
                .build();
    }

    @Bean
    public Step checkFieldsPaymentStep(
            JobRepository jobRepository,
            PlatformTransactionManager transactionManager,
            FieldClient fieldClient,
            PaymentService service
    ) {
        return new StepBuilder("checkFieldsPaymentStep", jobRepository)
                .tasklet(new FetchAndCheckFieldsPayment(fieldClient, service), transactionManager)
                .allowStartIfComplete(true)
                .build();
    }
}
