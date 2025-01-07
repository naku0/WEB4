package web.managers;

import web.DTO.LoginDTO;
import web.DTO.RegDTO;
import web.entities.User;
import web.exceptions.SaveToDataBaseException;
import web.repositories.UserRepository;
import web.utils.PSWDUtil;

import java.util.logging.Logger;

public class UserRegistrationManager {
    User newUser;
    UserRepository userRepository = new UserRepository();
    Logger logger = Logger.getLogger(UserRegistrationManager.class.getName());

    public void register(RegDTO newSlonyara) throws SaveToDataBaseException {
        userRepository.saveUser(makeNewSlonyaraUser(newSlonyara));
        logger.info("NewSlonyara has been saved to database");
    }

    private User makeNewSlonyaraUser(RegDTO newSlonyara) {
        newUser = new User();
        newUser.setUsername(newSlonyara.getUsername());
        newUser.setSalt(PSWDUtil.generateSalt());
        newUser.setPasswordHash(PSWDUtil.hashPassword(newSlonyara.getPassword(), newUser.getSalt()));
        return newUser;
    }
}
