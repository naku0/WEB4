package web.resources;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;
import java.util.logging.Logger;

@Path("authentication")
public class LogoutResource {

    Logger logger = Logger.getLogger(LogoutResource.class.getName());

    @POST
    @Path("logout")
    @Produces(MediaType.APPLICATION_JSON)
    public Response logout() {
        try {
            logger.info("User logged out successfully");
            return Response.ok()
                    .entity("Successfully logged out")
                    .build();
        } catch (Exception e) {
            logger.severe("Error during logout: " + e.getMessage());
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Logout failed")
                    .build();
        }
    }
}
