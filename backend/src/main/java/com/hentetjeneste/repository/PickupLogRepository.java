package com.hentetjeneste.repository;

import com.hentetjeneste.model.Child;
import com.hentetjeneste.model.PickupLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PickupLogRepository extends JpaRepository<PickupLog, Long> {
    List<PickupLog> findByChildOrderByPickedUpAtDesc(Child child);
}

