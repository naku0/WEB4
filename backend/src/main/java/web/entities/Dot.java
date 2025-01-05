package web.entities;

import jakarta.persistence.Embeddable;

import java.io.Serializable;

@Embeddable
public class Dot implements Serializable {
    private double x;
    private double y;
    private double r;

    public Dot() {
    }

    public Dot(double x, double y, double r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }
}
