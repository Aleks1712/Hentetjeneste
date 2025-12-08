package com.hentetjeneste.repository;

import com.hentetjeneste.model.DailyInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface DailyInfoRepository extends JpaRepository<DailyInfo, Long> {
    List<DailyInfo> findByDate(LocalDate date);
    List<DailyInfo> findByDateGreaterThanEqualOrderByDateDesc(LocalDate date);
    List<DailyInfo> findByTargetGroup(String targetGroup);
}

