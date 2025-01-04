package web.resources;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.*;
import web.dataModels.LoginDTO;
import web.managers.TokenCreatorManager;
import web.validators.LoginValidator;

@Path("/auth")
public class LoginResource {

    LoginValidator loginValidator = new LoginValidator();
    TokenCreatorManager tokenCreatorManager = new TokenCreatorManager();

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(LoginDTO ourSlonyara) {
        if (loginValidator.validate(ourSlonyara)) {
            return tokenCreatorManager.createTokensForUser(ourSlonyara.getUsername());
        }
        return Response.status(Response.Status.UNAUTHORIZED).build();
    }

}
