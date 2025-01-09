package web.repositories;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.persistence.TypedQuery;
import web.entities.Dot;
import web.entities.Result;
import web.entities.User;

import java.util.List;

public class DotRepository {
    private final EntityManagerFactory entityManagerFactory;
    private EntityManager em;

    public EntityManager getEntityManager() {
        if (em == null || !em.isOpen()) {
            em = entityManagerFactory.createEntityManager();
        }
        return em;
    }

    public DotRepository() {
        this.entityManagerFactory = Persistence.createEntityManagerFactory("users");
        this.em = entityManagerFactory.createEntityManager();
    }

    public void saveDot(Result result, Long userId) {
        EntityManager em = getEntityManager();
        em.getTransaction().begin();
        try {
            User user = em.find(User.class, userId);
            if (user == null) {
                throw new IllegalArgumentException("User  not found with ID: " + userId);
            }
            result.setUser (user);
            em.getTransaction().commit();
        } catch (Exception e) {
            em.getTransaction().rollback();
            throw e;
        } finally {
            em.close();
        }
    }

    public List<Result> getDots(Long userId) {
        EntityManager em = getEntityManager();
        TypedQuery<Result> query = em.createQuery("SELECT r FROM Result r WHERE r.user.id = :userId", Result.class);
        query.setParameter("userId", userId);
        return query.getResultList();
    }
}