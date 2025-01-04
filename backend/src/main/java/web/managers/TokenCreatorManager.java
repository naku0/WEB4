package web.managers;

import jakarta.ws.rs.core.NewCookie;
import jakarta.ws.rs.core.Response;
import web.config.JwtConfig;
import web.utils.CookieUtil;
import web.utils.TokenGenerator;

import java.util.HashMap;

public class TokenCreatorManager {
    TokenGenerator tokenGenerator = new TokenGenerator();
    public Response createTokensForUser(String username){
        String accessToken = tokenGenerator.generateToken(username, JwtConfig.getAccessTokenExpiration());
        String refreshToken = tokenGenerator.generateToken(username, JwtConfig.getRefreshTokenExpiration());

        NewCookie refreshCookie = CookieUtil.createHttpOnlyRefreshTokenCookie(
                "refreshToken", refreshToken, (int) (JwtConfig.getRefreshTokenExpiration() / 1000)
        );

        return Response.ok(new HashMap<String, String>() {{
            put("accessToken", accessToken);
        }}).cookie(refreshCookie).build();
    }
}
