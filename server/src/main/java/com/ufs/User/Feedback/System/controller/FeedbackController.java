package com.ufs.User.Feedback.System.controller;

import com.ufs.User.Feedback.System.model.Feedback;
import com.ufs.User.Feedback.System.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @PostMapping("/auth/submit")
    public ResponseEntity<?> submitFeedback(@RequestBody Feedback feedback, @AuthenticationPrincipal UserDetails userDetails){
        feedback.setUsername(userDetails.getUsername());
        feedbackService.saveFeedbackFeedback(feedback);
        return ResponseEntity.ok("Feedback submitted successfully");
    }

    @GetMapping("/public/all")
    public ResponseEntity<?> getAllFeedback() {
        return ResponseEntity.ok(feedbackService.getAllFeedback());
    }

    @GetMapping("/filter")
    public List<Feedback> filterFeedback(@RequestParam int rating,
                                         @RequestParam String startDate,
                                         @RequestParam String endDate) {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        LocalDate start = LocalDate.parse(startDate, formatter);
        LocalDate end = LocalDate.parse(endDate, formatter);

        return feedbackService.findByRatingAndDate(rating, start, end);
    }
}

