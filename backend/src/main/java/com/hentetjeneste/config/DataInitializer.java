package com.hentetjeneste.config;

import com.hentetjeneste.model.*;
import com.hentetjeneste.repository.ApprovedPersonRepository;
import com.hentetjeneste.repository.ChildRepository;
import com.hentetjeneste.repository.DailyInfoRepository;
import com.hentetjeneste.repository.IncidentRepository;
import com.hentetjeneste.repository.PickupLogRepository;
import com.hentetjeneste.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashSet;
import java.util.List;

@Component
@Profile({"default", "dev"})
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final ChildRepository childRepository;
    private final ApprovedPersonRepository approvedPersonRepository;
    private final IncidentRepository incidentRepository;
    private final PickupLogRepository pickupLogRepository;
    private final DailyInfoRepository dailyInfoRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public void run(String... args) {
        if (childRepository.count() > 0 || userRepository.count() > 0) {
            return; // Preserve existing data
        }

        // Users
        User parent = new User();
        parent.setEmail("parent@example.com");
        parent.setPassword(passwordEncoder.encode("Pass123!"));
        parent.setName("Oda Forelder");
        parent.setPhone("+47 4000 0001");
        parent.setRole(User.UserRole.PARENT);
        parent.setActive(true);

        User staff = new User();
        staff.setEmail("staff@example.com");
        staff.setPassword(passwordEncoder.encode("Pass123!"));
        staff.setName("Eirik Ansatt");
        staff.setPhone("+47 4000 0002");
        staff.setRole(User.UserRole.STAFF);
        staff.setActive(true);

        User savedParent = userRepository.save(parent);
        User savedStaff = userRepository.save(staff);

        // Child with approved persons
        Child child = new Child();
        child.setName("Emma Nordmann");
        child.setGroup("Solstråla");
        child.setStatus(Child.ChildStatus.PRESENT);
        child.setCheckInTime(LocalTime.now().minusHours(2));
        child.setPickupStatus(Child.PickupStatus.APPROVED);
        child.setPickupPerson("Bestemor");
        child.setParent(savedParent);

        ApprovedPerson approved1 = new ApprovedPerson();
        approved1.setName("Anne Nordmann");
        approved1.setRelation("Mor");
        approved1.setPhone("+47 4000 0003");
        approved1.setStatus(ApprovedPerson.ApprovalStatus.APPROVED);
        approved1.setApprovedDate(LocalDate.now().minusDays(10));
        approved1.setBlocked(false);
        approved1.setChild(child);

        ApprovedPerson approved2 = new ApprovedPerson();
        approved2.setName("Kari Hansen");
        approved2.setRelation("Bestemor");
        approved2.setPhone("+47 4000 0004");
        approved2.setStatus(ApprovedPerson.ApprovalStatus.APPROVED);
        approved2.setApprovedDate(LocalDate.now().minusDays(2));
        approved2.setBlocked(false);
        approved2.setChild(child);

        // Set the bidirectional relationship properly
        child.setApprovedPersons(new HashSet<>(List.of(approved1, approved2)));

        Child savedChild = childRepository.save(child);

        // Incident
        Incident incident = new Incident();
        incident.setType(Incident.IncidentType.INJURY);
        incident.setTitle("Liten skrubbsår på kne");
        incident.setDescription("Snublet i sandkassen, renset og plaster satt på.");
        incident.setSeverity(Incident.Severity.LOW);
        incident.setActionTaken("Renset og plaster");
        incident.setNotifiedParents(true);
        incident.setReportedAt(LocalDateTime.now().minusHours(1));
        incident.setChild(savedChild);
        incident.setReportedBy(savedStaff);

        incidentRepository.save(incident);

        // Pickup log
        PickupLog pickupLog = new PickupLog();
        pickupLog.setChild(savedChild);
        pickupLog.setPickedUpBy("Bestemor");
        pickupLog.setPickedUpAt(LocalDateTime.now().minusDays(1).withHour(15).withMinute(30));
        pickupLog.setCheckedOutTime(LocalTime.of(15, 30));
        pickupLog.setVerifiedBy("Eirik Ansatt");

        pickupLogRepository.save(pickupLog);

        // Daily Info
        DailyInfo dailyInfo1 = new DailyInfo();
        dailyInfo1.setDate(LocalDate.now());
        dailyInfo1.setType(DailyInfo.InfoType.MENU);
        dailyInfo1.setTitle("Lunsj i dag");
        dailyInfo1.setDescription("Fiskesuppe med grovbrød og smør. Dessert: Frukt og yoghurt.");

        DailyInfo dailyInfo2 = new DailyInfo();
        dailyInfo2.setDate(LocalDate.now());
        dailyInfo2.setType(DailyInfo.InfoType.ACTIVITY);
        dailyInfo2.setTitle("Utetur til skogen");
        dailyInfo2.setDescription("I dag skal vi på tur til skogen klokken 10:00. Husk ekstra klær og godt fottøy!");
        dailyInfo2.setTargetGroup("Solstråla");

        dailyInfoRepository.saveAll(List.of(dailyInfo1, dailyInfo2));

        System.out.println("✅ Data initialized successfully!");
        System.out.println("📧 Test users created:");
        System.out.println("   - parent@example.com / Pass123!");
        System.out.println("   - staff@example.com / Pass123!");
    }
}
