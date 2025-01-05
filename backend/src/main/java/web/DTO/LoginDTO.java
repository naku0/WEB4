package web.DTO;

public class LoginDTO {
    private final String username;
    private String password;

    public LoginDTO(String username) {
        this.username = username;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
