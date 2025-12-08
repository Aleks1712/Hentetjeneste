package com.hentetjeneste.dto;

import com.hentetjeneste.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthResponse {
    private String token;
    private String email;
    private String name;
    private User.UserRole role;
    private Long userId;
}

