package com.example.paymentservice.clients;

import com.example.paymentservice.dtos.FieldDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient("FIELD-SERVICE")
public interface FieldClient {
    @GetMapping(path = "/api/internal/fields")
    Page<FieldDTO> get(@RequestParam int page, @RequestParam int size);
}
