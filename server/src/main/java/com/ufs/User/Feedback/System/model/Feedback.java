package com.ufs.User.Feedback.System.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private int rating;
    private String username;
    @Column(name = "feedback_text")
    private String feedbackText;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @Column(name = "feedback_date")
    private LocalDate date;

    @PrePersist
    protected void onCreate(){
        this.date=LocalDate.now();
    }

}
