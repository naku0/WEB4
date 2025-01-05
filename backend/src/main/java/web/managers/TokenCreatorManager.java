package web.managers;

import web.config.JwtConfig;
import web.utils.TokenGenerator;

import java.util.HashMap;
import java.util.Map;

public class TokenCreatorManager {
    TokenGenerator tokenGenerator = new TokenGenerator();
    public Map<String, String> createTokensForUser(String username){
        String accessToken = tokenGenerator.generateToken(username, JwtConfig.getAccessTokenExpiration());
        String refreshToken = tokenGenerator.generateToken(username, JwtConfig.getRefreshTokenExpiration());

        return new HashMap<String, String>() {{
            put("accessToken", accessToken);
            put("refreshToken", refreshToken);
        }};
    }
}
