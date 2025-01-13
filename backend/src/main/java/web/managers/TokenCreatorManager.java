package web.managers;

import web.utils.TokenGenerator;
import web.validators.TokenValidator;
import web.config.JwtConfig;
import web.exceptions.InvalidTokenException;

public class TokenCreatorManager {

    private final TokenGenerator tokenGenerator = new TokenGenerator();
    private final TokenValidator tokenValidator = new TokenValidator();

    public String generateAccessToken(String username) {
        return tokenGenerator.generateToken(username, JwtConfig.getAccessTokenExpiration(), "access");
    }

    public String generateRefreshToken(String username) {
        return tokenGenerator.generateToken(username, JwtConfig.getRefreshTokenExpiration(), "refresh");
    }

    public String refreshAccessToken(String refreshToken) throws IllegalArgumentException {
        try {
            String username = tokenValidator.validateToken(refreshToken, "refresh");

            return generateAccessToken(username);
        } catch (InvalidTokenException e) {
            throw new IllegalArgumentException("Unable to refresh access token: " + e.getMessage(), e);
        }
    }
}
