package web.resources;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;
import web.managers.TokenCreatorManager;

import java.util.logging.Logger;

@Path("authentication")
public class RefreshResource {
    Logger logger = Logger.getLogger(RefreshResource.class.getName());
    private final TokenCreatorManager tokenCreatorManager = new TokenCreatorManager();

    @POST
    @Path("refresh")
    @Produces(MediaType.APPLICATION_JSON)
    public Response refresh(@Context HttpHeaders headers) {
        try {
            Cookie refreshCookie = headers.getCookies().get("refreshToken");
            if (refreshCookie == null || refreshCookie.getValue().isEmpty()) {
                return Response.status(Response.Status.BAD_REQUEST)
                        .entity("{\"error\": \"Missing or invalid refresh token\"}")
                        .type(MediaType.APPLICATION_JSON)
                        .build();
            }

            String refreshToken = refreshCookie.getValue();

            String newAccessToken = tokenCreatorManager.refreshAccessToken(refreshToken);

            return Response.ok()
                    .entity("{\"accessToken\": \"" + newAccessToken + "\"}")
                    .type(MediaType.APPLICATION_JSON)
                    .build();
        } catch (IllegalArgumentException e) {
            logger.severe("Error refreshing access token: " + e.getMessage());
            return Response.status(Response.Status.UNAUTHORIZED)
                    .entity("{\"error\": \"Invalid or expired refresh token\"}")
                    .type(MediaType.APPLICATION_JSON)
                    .build();
        } catch (Exception e) {
            logger.severe("Unexpected error: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("{\"error\": \"Token refresh failed\"}")
                    .type(MediaType.APPLICATION_JSON)
                    .build();
        }
    }
}
