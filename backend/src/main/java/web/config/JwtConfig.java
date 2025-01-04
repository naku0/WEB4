package web.config;

public class JwtConfig {
    private static final String SECRET_KEY = "PUDGE_MID";
    private static final long ACCESS_TOKEN_EXPIRATION = 15 * 60 * 1000;
    private static final long REFRESH_TOKEN_EXPIRATION = 7 * 24 * 60 * 60 * 1000;

    private JwtConfig() {

    }

    public static long getAccessTokenExpiration() {
        return ACCESS_TOKEN_EXPIRATION;
    }

    public static long getRefreshTokenExpiration() {
        return REFRESH_TOKEN_EXPIRATION;
    }

    public static String getSecretKey() {
        return SECRET_KEY;
    }
}
