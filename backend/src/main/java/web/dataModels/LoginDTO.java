package web.dataModels;

public class LoginDTO {
    private final String username;
    private final String password;

    public LoginDTO(String password, String username) {
        this.password = password;
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
