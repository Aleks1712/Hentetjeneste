package com.hentetjeneste.service;

import com.hentetjeneste.dto.AuthResponse;
import com.hentetjeneste.dto.LoginRequest;
import com.hentetjeneste.dto.RegisterRequest;
import com.hentetjeneste.model.User;
import com.hentetjeneste.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
        
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setName(request.getName());
        user.setPhone(request.getPhone());
        user.setRole(request.getRole() != null ? request.getRole() : User.UserRole.PARENT);
        
        User savedUser = userRepository.save(user);
        String token = jwtService.generateToken(savedUser);
        
        return new AuthResponse(
            token,
            savedUser.getEmail(),
            savedUser.getName(),
            savedUser.getRole(),
            savedUser.getId()
        );
    }
    
    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new UsernameNotFoundException("Invalid email or password"));
        
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new BadCredentialsException("Invalid email or password");
        }
        
        if (!user.getActive()) {
            throw new RuntimeException("Account is deactivated");
        }
        
        String token = jwtService.generateToken(user);
        
        return new AuthResponse(
            token,
            user.getEmail(),
            user.getName(),
            user.getRole(),
            user.getId()
        );
    }
}
