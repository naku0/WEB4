package web.validators;

import jakarta.enterprise.context.RequestScoped;
import web.DTO.LoginDTO;
import web.entities.User;
import web.repositories.UserRepository;
import web.utils.PSWDUtil;

import java.util.logging.Logger;


public class LoginValidator {

    private final UserRepository userRepository;
    Logger logger = Logger.getLogger(this.getClass().getName());
    public LoginValidator() {
        this.userRepository = new UserRepository();
    }

    public boolean validate(LoginDTO loginDTO) {
        User user = userRepository.findByUsername(loginDTO.getUsername());
        if (user == null) {
            logger.warning("User not found");
            return false;
        }

        return (PSWDUtil.verifyPassword(loginDTO.getPassword(), user.getSalt(), user.getPasswordHash()));
    }

}
