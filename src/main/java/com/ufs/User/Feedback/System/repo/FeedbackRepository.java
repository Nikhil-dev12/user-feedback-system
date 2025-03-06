package com.ufs.User.Feedback.System.repo;


import com.ufs.User.Feedback.System.model.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    List<Feedback> findByRatingAndDate(Integer rating, LocalDate date);
}
