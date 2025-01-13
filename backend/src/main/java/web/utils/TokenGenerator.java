package web.utils;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import web.config.JwtConfig;

import java.util.Date;

public class TokenGenerator {

    private final Algorithm algorithm;

    public TokenGenerator() {
        this.algorithm = Algorithm.HMAC256(JwtConfig.getSecretKey());
    }

    public String generateToken(String username, long expirationTime, String type) {
        return JWT.create()
                .withSubject(username)
                .withClaim("type", type)
                .withIssuedAt(new Date())
                .withExpiresAt(new Date(System.currentTimeMillis() + expirationTime))
                .sign(algorithm);
    }
}
