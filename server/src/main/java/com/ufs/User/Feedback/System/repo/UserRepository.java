package com.ufs.User.Feedback.System.repo;

import com.ufs.User.Feedback.System.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
