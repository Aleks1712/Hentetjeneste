package com.hentetjeneste.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "pickup_logs")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PickupLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String pickedUpBy;
    
    @Column(nullable = false)
    private LocalDateTime pickedUpAt;
    
    @Column(nullable = false)
    private LocalTime checkedOutTime;
    
    @Column(nullable = false)
    private String verifiedBy; // Staff member name
    
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "child_id", nullable = false)
    private Child child;
}

