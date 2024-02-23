package com.example.paymentservice.schedules;

import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParameters;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ScheduledTasks {
    private final JobLauncher jobLauncher;
    private final Job checkFieldsPaymentJob;

    @Scheduled(cron = "0 * * * * *")
    public void checkFieldPayment() throws Exception {
        jobLauncher.run(checkFieldsPaymentJob, new JobParameters());
    }
}
