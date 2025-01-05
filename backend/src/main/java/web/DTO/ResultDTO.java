package web.DTO;

import web.entities.Dot;

public class ResultDTO {
    private Dot dot;
    private boolean status;
    private String currentTime;
    private double timeOfCalculating;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
