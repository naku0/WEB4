package web.resources;

import jakarta.ws.rs.Path;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import web.DTO.LoginDTO;
import web.DTO.RegDTO;
import web.managers.ResponceManager;
import web.managers.UserRegistrationManager;
import web.validators.RegValidator;

@Path("/auth")
public class RegResource {

    private final RegValidator regValidator = new RegValidator();
    private final UserRegistrationManager userRegistrationManager = new UserRegistrationManager();

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/register")
    public Response register(RegDTO newSlonyara) {

        if (!regValidator.canBeRegistered(newSlonyara)) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        } else{
            try {
                userRegistrationManager.register(newSlonyara);
                return ResponceManager.response(new LoginDTO(newSlonyara.getUsername()));
            } catch (Exception e) {
                return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                        .entity("Failed to register user")
                        .build();
            }
        }
    }
}
