package com.hentetjeneste.repository;

import com.hentetjeneste.model.Child;
import com.hentetjeneste.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ChildRepository extends JpaRepository<Child, Long> {
    List<Child> findByParent(User parent);
    List<Child> findByStatus(Child.ChildStatus status);
    List<Child> findByGroup(String group);
}

