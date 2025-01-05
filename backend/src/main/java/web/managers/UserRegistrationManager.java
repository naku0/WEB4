package web.managers;

import web.DTO.LoginDTO;
import web.DTO.RegDTO;
import web.entities.User;
import web.exceptions.SaveToDataBaseException;
import web.repositories.UserRepository;
import web.utils.PSWDUtil;

public class UserRegistrationManager {
    User newUser;
    UserRepository userRepository = new UserRepository();

    public void register(RegDTO newSlonyara) throws SaveToDataBaseException {
        userRepository.saveUser(makeNewSlonyaraUser(newSlonyara));
    }

    private User makeNewSlonyaraUser(RegDTO newSlonyara) {
        newUser = new User();
        newUser.setUsername(newSlonyara.getUsername());
        newUser.setSalt(PSWDUtil.generateSalt());
        newUser.setPasswordHash(PSWDUtil.hashPassword(newSlonyara.getPassword(), newUser.getSalt()));
        return newUser;
    }
}
