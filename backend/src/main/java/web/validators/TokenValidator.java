package web.validators;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import web.config.JwtConfig;
import web.exceptions.InvalidTokenException;

public class TokenValidator {

    private final Algorithm algorithm;
    private final JWTVerifier verifier;

    public TokenValidator() {
        this.algorithm = Algorithm.HMAC256(JwtConfig.getSecretKey());
        this.verifier = JWT.require(algorithm).build();
    }

    public String validateToken(String token) throws InvalidTokenException {
        try {
            DecodedJWT decodedJWT = verifier.verify(token);
            return decodedJWT.getSubject();
        } catch (Exception e) {
            throw new InvalidTokenException("Invalid or expired token");
        }
    }
}
