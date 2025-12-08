package com.hentetjeneste.repository;

import com.hentetjeneste.model.Child;
import com.hentetjeneste.model.Incident;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface IncidentRepository extends JpaRepository<Incident, Long> {
    List<Incident> findByChild(Child child);
    List<Incident> findByChildOrderByReportedAtDesc(Child child);
}

