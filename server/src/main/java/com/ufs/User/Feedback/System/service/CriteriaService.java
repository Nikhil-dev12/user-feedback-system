package com.ufs.User.Feedback.System.service;

import java.time.LocalDate;
import java.util.List;

import org.hibernate.Session;

import com.ufs.User.Feedback.System.model.Feedback;
import com.ufs.User.Feedback.System.util.HibernateUtil;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;

public class CriteriaService {
    public List<Feedback> getEntityByCriteria(int rating, LocalDate startDate, LocalDate endDate) {

         
        Session session = HibernateUtil.getSession();
        try {

            CriteriaBuilder cb = session.getCriteriaBuilder();
            CriteriaQuery<Feedback>  cq = cb.createQuery(Feedback.class);
            Root<Feedback> root = cq.from(Feedback.class);

            Predicate ratingPredicate = cb.equal(root.get("rating"), rating);
            Predicate datePredicate = cb.between(root.get("date"), startDate, endDate);

            cq.select(root).where(cb.and(ratingPredicate, datePredicate));
            return session.createQuery(cq).getResultList();
            
        } finally {
            session.close();
        }

    }
}
