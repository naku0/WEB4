package web.managers;

import jakarta.ejb.EJB;
import jakarta.ejb.Stateless;
import jakarta.ws.rs.core.NewCookie;
import jakarta.ws.rs.core.Response;
import web.DTO.LoginDTO;
import web.config.JwtConfig;
import web.repositories.UserRepository;
import web.utils.CookieUtil;

import java.util.HashMap;
import java.util.Map;

@Stateless

public class LoginManager {
    @EJB
    static TokenCreatorManager tokenCreatorManager;
    static UserRepository userRepository = new UserRepository();

    public static Response response(LoginDTO ourSlonyara) {
        String username = ourSlonyara.getUsername();
        String accessToken = tokenCreatorManager.generateAccessToken(username);
        String refreshToken = tokenCreatorManager.generateRefreshToken(username);

        NewCookie refreshCookie = CookieUtil.createHttpOnlyRefreshTokenCookie(
                "refreshToken", refreshToken, (int) (JwtConfig.getRefreshTokenExpiration() / 1000)
        );

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("user", new HashMap<String, Object>() {{
            put("id", userRepository.findByUsername(username).getId());
            put("username", username);
            responseMap.put("accessToken", accessToken);
        }});

        return Response.ok(responseMap)
                .cookie(refreshCookie)
                .build();
    }
}
