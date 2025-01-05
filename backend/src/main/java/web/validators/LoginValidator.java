package web.validators;

import web.DTO.LoginDTO;
import web.entities.User;
import web.repositories.UserRepository;
import web.utils.PSWDUtil;

public class LoginValidator {

    private final UserRepository userRepository;

    public LoginValidator() {
        this.userRepository = new UserRepository();
    }

    public boolean validate(LoginDTO loginDTO) {
        User user = userRepository.findByUsername(loginDTO.getUsername());
        if (user == null) {
            return false;
        }

        return (PSWDUtil.verifyPassword(loginDTO.getPassword(), user.getSalt(), user.getPasswordHash()));
    }

}
