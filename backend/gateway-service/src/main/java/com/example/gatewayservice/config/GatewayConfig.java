package com.example.gatewayservice.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GatewayConfig {
    @Bean
    public RouteLocator routes(RouteLocatorBuilder builder) {
        return builder.routes()
                .route("owner-service", r -> r
                        .path("/api/owners/**")
                        .uri("lb://owner-service")
                ).route("field-service", r -> r
                        .path("/api/categories/**")
                        .or()
                        .path("/api/fields/**")
                        .uri("lb://field-service")
                ).build();
    }
}
