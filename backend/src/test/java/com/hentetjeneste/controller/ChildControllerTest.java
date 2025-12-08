package com.hentetjeneste.controller;

import com.hentetjeneste.model.Child;
import com.hentetjeneste.model.User;
import com.hentetjeneste.repository.ChildRepository;
import com.hentetjeneste.repository.UserRepository;
import com.hentetjeneste.service.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@TestPropertySource(properties = {
        "spring.datasource.url=jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1",
        "spring.jpa.hibernate.ddl-auto=validate",
        "spring.flyway.enabled=true",
        "jwt.secret=0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
        "jwt.expiration=3600000"
})
class ChildControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChildRepository childRepository;

    @Autowired
    private JwtService jwtService;

    private User parent;
    private Child child;
    private String token;

    @BeforeEach
    void setup() {
        childRepository.deleteAll();
        userRepository.deleteAll();

        parent = new User();
        parent.setEmail("parent@test.no");
        parent.setPassword("encoded"); // Password not validated in this test, token is
        parent.setName("Test Parent");
        parent.setRole(User.UserRole.PARENT);
        parent.setActive(true);
        parent = userRepository.save(parent);

        child = new Child();
        child.setName("Test Barn");
        child.setGroup("Solstråla");
        child.setStatus(Child.ChildStatus.HOME);
        child.setPickupStatus(Child.PickupStatus.NULL);
        child.setCreatedAt(LocalDateTime.now());
        child.setParent(parent);
        child = childRepository.save(child);

        token = jwtService.generateToken(parent);
    }

    @Test
    void listChildren_returnsChildrenForAuthenticatedUser() throws Exception {
        mockMvc.perform(get("/api/children")
                        .header("Authorization", "Bearer " + token)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Test Barn"))
                .andExpect(jsonPath("$[0].group").value("Solstråla"));
    }

    @Test
    void checkIn_updatesStatusToPresent() throws Exception {
        mockMvc.perform(patch("/api/children/{id}/check-in", child.getId())
                        .header("Authorization", "Bearer " + token)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("PRESENT"));
    }
}
