package com.ufs.User.Feedback.System.service;

import com.ufs.User.Feedback.System.model.Feedback;
import com.ufs.User.Feedback.System.repo.FeedbackRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FeedbackService {
    @Autowired
    private FeedbackRepository feedbackRepository;

    public Feedback saveFeedbackFeedback(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }

    public List<Feedback> findByRatingAndDate(int rating, LocalDate startDate, LocalDate endDate){
        return feedbackRepository.findAll().stream()
                .filter(f -> f.getRating() == rating)
                .filter(f -> !f.getDate().isBefore(startDate) && !f.getDate().isAfter(endDate))
                .collect(Collectors.toList());
    }
}
