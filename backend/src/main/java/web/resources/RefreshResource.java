package web.resources;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;
import web.managers.TokenCreatorManager;

import java.util.logging.Logger;

@Path("/auth")
public class RefreshResource {

    Logger logger = Logger.getLogger(RefreshResource.class.getName());
    private final TokenCreatorManager tokenCreatorManager = new TokenCreatorManager();
    @POST
    @Path("/refresh")
    @Produces(MediaType.APPLICATION_JSON)
    public Response refresh(@Context HttpHeaders headers) {
        try {
            String oldToken = headers.getHeaderString(HttpHeaders.AUTHORIZATION).substring("Bearer ".length()).trim();

            String newToken = tokenCreatorManager.refreshToken(oldToken);
            if (newToken == null) {
                return Response.status(Response.Status.UNAUTHORIZED)
                        .entity("Unable to refresh token. Please log in again.")
                        .build();
            }

            logger.info("Token refreshed successfully");
            return Response.ok()
                    .entity(newToken)
                    .build();
        } catch (Exception e) {
            logger.severe("Error during token refresh: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Token refresh failed")
                    .build();
        }
    }
}
