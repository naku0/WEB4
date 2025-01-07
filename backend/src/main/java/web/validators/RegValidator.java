package web.validators;

import web.DTO.RegDTO;
import web.exceptions.RegistrationImpossibleException;
import web.repositories.UserRepository;


public class RegValidator {
    private final UserRepository userRepository = new UserRepository();

    public boolean arePasswordsValid(String password, String confirmPassword) throws RegistrationImpossibleException {
        if (password != null && confirmPassword != null) {
            return password.equals(confirmPassword);
        }
        else throw new RegistrationImpossibleException("Проверьте правильность написания паролей");
    }

    public boolean isUsernameValid(String username) throws RegistrationImpossibleException {
        if (username != null && username.length() > 3 && username.length() < 30) {
            return userRepository.findByUsername(username) == null;
        }
        else throw new RegistrationImpossibleException("Такой логин уже существует либо с ним что-то не так");
    }

    public boolean isPasswordComplex(String password) throws RegistrationImpossibleException {
        if (password != null && password.length() > 3 && password.length() < 30) {
        return true;
        }else throw new RegistrationImpossibleException("Что-то не так с паролями");
    }

    public boolean canBeRegistered(RegDTO regDTO) throws RegistrationImpossibleException {
        return arePasswordsValid(regDTO.getPassword(), regDTO.getSecondPassword())
                && isPasswordComplex(regDTO.getPassword())
                && isUsernameValid(regDTO.getUsername());
    }
}
