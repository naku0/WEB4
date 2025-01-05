package web.managers;
import jakarta.ws.rs.core.NewCookie;
import jakarta.ws.rs.core.Response;
import web.entities.User;

import java.util.HashMap;

public class ResponceManager {
    public static Response login(String accessToken, NewCookie refreshCookie, User user) {
        return Response.ok(new HashMap<String, String>() {{
            put("accessToken", accessToken);
            put("user", "{" + user.getId() + ",\n" + user.getUsername()}+"}");
        }}).cookie(refreshCookie).build();
    }
}
