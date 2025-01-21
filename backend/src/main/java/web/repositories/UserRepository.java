package web.repositories;

import jakarta.ejb.Stateful;
import jakarta.ejb.Stateless;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.persistence.TypedQuery;
import web.entities.User;
import web.exceptions.SaveToDataBaseException;

public class UserRepository {
    private final EntityManagerFactory entityManagerFactory;
    EntityManager em;

    public EntityManager getEntityManager() {
        if (em == null || !em.isOpen()) {
            em = entityManagerFactory.createEntityManager();
        }
        return em;
    }

    public UserRepository() {
        this.entityManagerFactory = Persistence.createEntityManagerFactory("users");
        this.em = entityManagerFactory.createEntityManager();
    }

    public User findByUsername(String username) {
        try {
            String query = "SELECT u FROM User u WHERE u.username = :username";
            TypedQuery<User> typedQuery = getEntityManager().createQuery(query, User.class);
            typedQuery.setParameter("username", username);
            return typedQuery.getResultStream().findFirst().orElse(null);
        } finally {
            getEntityManager().close();
        }
    }

    public void saveUser(User user) throws SaveToDataBaseException {
        try {
             getEntityManager().getTransaction().begin();
             getEntityManager().persist(user);
             getEntityManager().getTransaction().commit();
        } catch (Exception e) {
             getEntityManager().getTransaction().rollback();
            throw new SaveToDataBaseException("Failed to save user");
        } finally {
             getEntityManager().close();
        }
    }

}