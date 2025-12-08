package com.hentetjeneste.controller;

import com.hentetjeneste.model.Child;
import com.hentetjeneste.model.User;
import com.hentetjeneste.repository.ChildRepository;
import com.hentetjeneste.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/children")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class ChildController {
    
    private final ChildRepository childRepository;
    
    @GetMapping
    public ResponseEntity<List<Child>> getAllChildren(Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        // Parents only see their own children; staff/admin see all
        if (userDetails.getUser().getRole() == User.UserRole.PARENT) {
            List<Child> ownChildren = childRepository.findAll().stream()
                .filter(c -> c.getParent() != null && c.getParent().getId().equals(userDetails.getId()))
                .toList();
            return ResponseEntity.ok(ownChildren);
        }

        return ResponseEntity.ok(childRepository.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Child> getChildById(@PathVariable Long id, Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Optional<Child> childOpt = childRepository.findById(id);

        if (childOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Child child = childOpt.get();
        if (userDetails.getUser().getRole() == User.UserRole.PARENT &&
            (child.getParent() == null || !child.getParent().getId().equals(userDetails.getId()))) {
            return ResponseEntity.status(403).build();
        }

        return ResponseEntity.ok(child);
    }
    
    @PostMapping
    public ResponseEntity<Child> createChild(@RequestBody Child child, Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        // Parents can only create children for themselves
        if (userDetails.getUser().getRole() == User.UserRole.PARENT) {
            child.setParent(userDetails.getUser());
        }

        Child saved = childRepository.save(child);
        return ResponseEntity.ok(saved);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Child> updateChild(@PathVariable Long id, @RequestBody Child child, Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        return childRepository.findById(id)
            .map(existing -> {
                if (userDetails.getUser().getRole() == User.UserRole.PARENT &&
                    (existing.getParent() == null || !existing.getParent().getId().equals(userDetails.getId()))) {
                    return ResponseEntity.status(403).build();
                }
                child.setId(id);
                if (userDetails.getUser().getRole() == User.UserRole.PARENT) {
                    child.setParent(userDetails.getUser());
                }
                return ResponseEntity.ok(childRepository.save(child));
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PatchMapping("/{id}/check-in")
    public ResponseEntity<Child> checkIn(@PathVariable Long id, Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        return childRepository.findById(id)
            .map(child -> {
                if (userDetails.getUser().getRole() == User.UserRole.PARENT &&
                    (child.getParent() == null || !child.getParent().getId().equals(userDetails.getId()))) {
                    return ResponseEntity.status(403).build();
                }
                child.setStatus(Child.ChildStatus.PRESENT);
                child.setCheckInTime(java.time.LocalTime.now());
                return ResponseEntity.ok(childRepository.save(child));
            })
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PatchMapping("/{id}/check-out")
    public ResponseEntity<Child> checkOut(@PathVariable Long id, Authentication authentication) {
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        return childRepository.findById(id)
            .map(child -> {
                if (userDetails.getUser().getRole() == User.UserRole.PARENT &&
                    (child.getParent() == null || !child.getParent().getId().equals(userDetails.getId()))) {
                    return ResponseEntity.status(403).build();
                }
                child.setStatus(Child.ChildStatus.HOME);
                child.setCheckOutTime(java.time.LocalTime.now());
                return ResponseEntity.ok(childRepository.save(child));
            })
            .orElse(ResponseEntity.notFound().build());
    }
}
