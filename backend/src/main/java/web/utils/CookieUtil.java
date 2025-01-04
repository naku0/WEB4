package web.utils;

import jakarta.ws.rs.core.NewCookie;

public class CookieUtil {

    public static NewCookie createHttpOnlyRefreshTokenCookie(String name, String value, int maxAgeSeconds) {
        return new NewCookie.Builder(name)
                .value(value)
                .path("/")
                .httpOnly(true)
                .maxAge(maxAgeSeconds)
                .build();
    }
}
