package web.DTO;

import web.entities.Dot;

public class ResultDTO {
    private long id;
    private Dot dot;
    private boolean status;

    public ResultDTO() {
    }

    public ResultDTO(long id, Dot dot, boolean status) {
        this.id = id;
        this.dot = dot;
        this.status = status;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Dot getDot() {
        return dot;
    }

    public void setDot(Dot dot) {
        this.dot = dot;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }
}


