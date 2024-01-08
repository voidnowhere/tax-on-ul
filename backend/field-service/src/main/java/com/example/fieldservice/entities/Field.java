package com.example.fieldservice.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Field {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Float surface;
    @Column(nullable = false)
    private Long ownerId;
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private Category category;

    public Field(Float surface, Long ownerId, Category category) {
        this.surface = surface;
        this.ownerId = ownerId;
        this.category = category;
    }
}
