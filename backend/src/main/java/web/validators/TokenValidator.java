package web.validators;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import web.config.JwtConfig;
import web.exceptions.InvalidTokenException;

import java.util.Date;

public class TokenValidator {

    private final Algorithm algorithm;
    private final JWTVerifier verifier;

    public TokenValidator() {
        this.algorithm = Algorithm.HMAC256(JwtConfig.getSecretKey());
        this.verifier = JWT.require(algorithm).build();
    }


    public String validateToken(String token, String expectedType) throws InvalidTokenException {
        try {
            DecodedJWT decodedJWT = verifier.verify(token);

            if (decodedJWT.getExpiresAt().before(new Date())) {
                throw new InvalidTokenException("Token has expired");
            }

            String tokenType = decodedJWT.getClaim("type").asString();
            if (!expectedType.equals(tokenType)) {
                throw new InvalidTokenException("Token type mismatch. Expected: " + expectedType + ", but got: " + tokenType);
            }

            return decodedJWT.getSubject();
        } catch (Exception e) {
            throw new InvalidTokenException("Invalid or expired token: " + e.getMessage());
        }
    }


    public String validateToken(String token) throws InvalidTokenException {
        try {
            DecodedJWT decodedJWT = verifier.verify(token);

            if (decodedJWT.getExpiresAt().before(new Date())) {
                throw new InvalidTokenException("Token has expired");
            }

            return decodedJWT.getSubject();
        } catch (Exception e) {
            throw new InvalidTokenException("Invalid or expired token: " + e.getMessage());
        }
    }
}
