package com.example.gatewayservice.config;

import lombok.RequiredArgsConstructor;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class GatewayConfig {
    private final AuthFilter filter;
    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("auth-service", r -> r
                        .path("/api/auth/**")
                        .filters(f -> f.filter(filter))
                        .uri("lb://auth-service")
                ).route("owner-service", r -> r
                        .path("/api/owners/**")
                        .filters(f -> f.filter(filter))
                        .uri("lb://owner-service")
                ).route("field-service", r -> r
                        .path("/api/categories/**")
                        .or()
                        .path("/api/fields/**")
                        .filters(f -> f.filter(filter))
                        .uri("lb://field-service")
                ).route("payment-service", r -> r
                        .path("/api/payments/**")
                        .filters(f -> f.filter(filter))
                        .uri("lb://payment-service")
                ).build();
    }
}
