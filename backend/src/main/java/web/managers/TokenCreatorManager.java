package web.managers;

import web.config.JwtConfig;
import web.exceptions.InvalidTokenException;
import web.utils.TokenGenerator;
import web.validators.TokenValidator;

import java.util.HashMap;
import java.util.Map;

public class TokenCreatorManager {
    private final TokenValidator tokenValidator = new TokenValidator();
    TokenGenerator tokenGenerator = new TokenGenerator();

    public Map<String, String> createTokensForUser(String username) {
        String accessToken = tokenGenerator.generateToken(username, JwtConfig.getAccessTokenExpiration());
        String refreshToken = tokenGenerator.generateToken(username, JwtConfig.getRefreshTokenExpiration());

        return new HashMap<>() {{
            put("accessToken", accessToken);
            put("refreshToken", refreshToken);
        }};
    }

    public String refreshToken(String refreshToken) throws IllegalArgumentException, InvalidTokenException {
        String username = tokenValidator.validateToken(refreshToken);

        if (username == null) {
            throw new IllegalArgumentException("Invalid or expired refresh token");
        }

        return tokenGenerator.generateToken(username, JwtConfig.getAccessTokenExpiration());
    }
}
