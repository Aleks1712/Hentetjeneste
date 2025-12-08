package com.hentetjeneste.repository;

import com.hentetjeneste.model.ApprovedPerson;
import com.hentetjeneste.model.Child;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ApprovedPersonRepository extends JpaRepository<ApprovedPerson, Long> {
    List<ApprovedPerson> findByChild(Child child);
    List<ApprovedPerson> findByChildId(Long childId);
}

