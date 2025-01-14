package web.validators;

import web.exceptions.IllegalParameterException;

public class AreaValidator {

    public boolean checkSpot(double x, double y, double r) throws IllegalParameterException {
        return checkAxis(x, y, r);
    }

    private boolean checkAxis(double x, double y, double r) throws IllegalParameterException {
        if (!(x >= -4 && x <= 4 && y >= -3 && y <= 5 && r >= 0 && r <= 5)) {
            System.out.println("Wrong parameters");
            throw new IllegalParameterException("Wrong parameters");
        }
        else{
            if (x * r >= 0 && y * r >= 0) {
                return checkRectangle(x, y, r);
            } else if (x * r <= 0 && y * r >= 0) {
                return checkTriangle(x, y, r);
            } else if (x * r <= 0 && y * r <= 0) {
                return false;
            } else if (x * r >= 0 && y * r <= 0) {
                return checkCircle(x, y, r);
            } else return x == 0 && y == 0;
        }
    }

    private boolean checkTriangle(double x, double y, double r) {
        return (y <= x + r);
    }

    private boolean checkRectangle(double x, double y, double r) {
        return (x <= 0.5*r && y <= r);
    }

    private boolean checkCircle(double x, double y, double r) {
        return (x * x + y * y) <= 0.5*r * 0.5*r;
    }
}
