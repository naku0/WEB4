package web.resources;

import jakarta.ws.rs.Path;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import web.DTO.LoginDTO;
import web.DTO.RegDTO;
import web.managers.LoginManager;
import web.managers.UserRegistrationManager;
import web.validators.RegValidator;

import java.util.logging.Logger;

@Path("/authentication")
public class RegResource {
    Logger logger = Logger.getLogger(RegResource.class.getName());
    private final RegValidator regValidator = new RegValidator();
    private final UserRegistrationManager userRegistrationManager = new UserRegistrationManager();

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("register")
    public Response register(RegDTO newSlonyara) {
        try {
            if (!regValidator.canBeRegistered(newSlonyara)) {
                logger.warning("can't register" + newSlonyara);
                return Response.status(Response.Status.BAD_REQUEST).build();
            } else {
                try {
                    logger.fine("registering " + newSlonyara);
                    userRegistrationManager.register(newSlonyara);
                    return LoginManager.response(new LoginDTO(newSlonyara.getUsername(), newSlonyara.getPassword()));
                } catch (Exception e) {
                    return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                            .entity("Failed to register user")
                            .build();
                }
            }
        } catch (Exception e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e).build();
        }
    }
}
