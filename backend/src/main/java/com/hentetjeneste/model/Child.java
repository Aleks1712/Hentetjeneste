package com.hentetjeneste.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Set;

@Entity
@Table(name = "children")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Child {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(name = "group_name", nullable = false)
    private String group; // e.g., "Blåklokka", "Solstråla"
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ChildStatus status = ChildStatus.HOME;
    
    private LocalTime checkInTime;
    
    private LocalTime checkOutTime;
    
    @Enumerated(EnumType.STRING)
    private PickupStatus pickupStatus;
    
    private String pickupPerson;
    
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    private LocalDateTime updatedAt = LocalDateTime.now();
    
    // Relationships
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id", nullable = false)
    private User parent;
    
    @OneToMany(mappedBy = "child", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ApprovedPerson> approvedPersons;
    
    @OneToMany(mappedBy = "child", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Incident> incidents;
    
    @OneToMany(mappedBy = "child", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PickupLog> pickupLogs;
    
    public enum ChildStatus {
        PRESENT, HOME
    }
    
    public enum PickupStatus {
        PENDING, APPROVED, NULL
    }
}
