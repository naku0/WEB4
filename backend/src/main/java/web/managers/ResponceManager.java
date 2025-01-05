package web.managers;

import jakarta.ws.rs.core.NewCookie;
import jakarta.ws.rs.core.Response;
import web.DTO.LoginDTO;
import web.config.JwtConfig;
import web.repositories.UserRepository;
import web.utils.CookieUtil;

import java.util.HashMap;
import java.util.Map;

public class ResponceManager {
    static TokenCreatorManager tokenCreatorManager = new TokenCreatorManager();
    static UserRepository userRepository = new UserRepository();

    public static Response login(LoginDTO ourSlonyara) {
        String username = ourSlonyara.getUsername();
        Map<String, String> tokens = tokenCreatorManager.createTokensForUser(username);
        String accessToken = tokens.get("accessToken");
        String refreshToken = tokens.get("refreshToken");

        NewCookie refreshCookie = CookieUtil.createHttpOnlyRefreshTokenCookie(
                "refreshToken", refreshToken, (int) (JwtConfig.getRefreshTokenExpiration() / 1000)
        );

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("accessToken", accessToken);
        responseMap.put("user", new HashMap<String, Object>() {{
            put("id", userRepository.findByUsername(username).getId());
            put("username", username);
        }});

        return Response.ok(responseMap)
                .cookie(refreshCookie)
                .build();
    }
}
