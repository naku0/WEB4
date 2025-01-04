package web.repositories;

import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.persistence.TypedQuery;
import web.dataModels.User;
import web.exceptions.SaveToDataBaseException;

public class UserRepository {
    private final EntityManagerFactory entityManagerFactory;
    EntityManager em;


    public UserRepository() {
        this.entityManagerFactory = Persistence.createEntityManagerFactory("default");
        this.em = entityManagerFactory.createEntityManager();
    }

    public User findByUsername(String username) {
        try {
            String query = "SELECT u FROM User u WHERE u.username = :username";
            TypedQuery<User> typedQuery = em.createQuery(query, User.class);
            typedQuery.setParameter("username", username);
            return typedQuery.getResultStream().findFirst().orElse(null);
        } finally {
            em.close();
        }
    }

    public void saveUser(User user) throws SaveToDataBaseException {
        try {
            em.getTransaction().begin();
            em.persist(user);
            em.getTransaction().commit();
        } catch (Exception e) {
            em.getTransaction().rollback();
            throw new SaveToDataBaseException("Failed to save user");
        } finally {
            em.close();
        }
    }


}

