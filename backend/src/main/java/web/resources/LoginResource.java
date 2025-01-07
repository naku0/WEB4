package web.resources;

import jakarta.enterprise.context.*;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;
import web.DTO.LoginDTO;
import web.managers.ResponceManager;
import web.validators.LoginValidator;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

@Path("/auth")
public class LoginResource {

    private final LoginValidator loginValidator = new LoginValidator();
    Logger log = Logger.getLogger(LoginResource.class.getName());

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(LoginDTO ourSlonyara) {
        log.info(String.format("Login %s %s", ourSlonyara.getUsername(), ourSlonyara.getPassword()));
        if (loginValidator.validate(ourSlonyara)) {
            return ResponceManager.response(ourSlonyara);
        }
        Map<String, String> message = new HashMap<>();
        message.put("message", "Проверьте правильность введеных данных");
        return Response.status(Response.Status.BAD_REQUEST)
                .entity(message)
                .build();
    }
}
