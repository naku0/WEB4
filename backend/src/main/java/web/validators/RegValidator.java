package web.validators;

import web.DTO.RegDTO;
import web.repositories.UserRepository;

public class RegValidator {
    private final UserRepository userRepository = new UserRepository();

    public boolean arePasswordsValid(String password, String confirmPassword) {
        if (password == null || confirmPassword == null) {
            return false;
        }
        return password.equals(confirmPassword);
    }

    public boolean isUsernameValid(String username) {
        if (username == null || username.length() < 3 || username.length() > 30) {
            return false;
        }
        return userRepository.findByUsername(username) == null;
    }

    public boolean isPasswordComplex(String password) {
        return password != null && password.length() >= 8;
    }

    public boolean canBeRegistered(RegDTO regDTO) {
        return arePasswordsValid(regDTO.getPassword(), regDTO.getSecondPassword())
                && isPasswordComplex(regDTO.getPassword())
                && isUsernameValid(regDTO.getUsername());
    }
}
