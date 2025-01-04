package web.dataModels;

import jakarta.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "results")
public class Result implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Embedded
    private Dot dot;

    @Column(nullable = false)
    private boolean status;

    @Column(nullable = false)
    private String currentTime;

    @Column(nullable = false)
    private double timeOfCalculating;

    public Result() {
    }

    public Result(Dot dot, boolean status, double timeOfCalculating, String currentTime) {
        this.dot = dot;
        this.status = status;
        this.currentTime = currentTime;
        this.timeOfCalculating = timeOfCalculating;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public String getCurrentTime() {
        return currentTime;
    }

    public void setCurrentTime(String currentTime) {
        this.currentTime = currentTime;
    }

    public double getTimeOfCalculating() {
        return timeOfCalculating;
    }

    public void setTimeOfCalculating(double timeOfCalculating) {
        this.timeOfCalculating = timeOfCalculating;
    }
}
