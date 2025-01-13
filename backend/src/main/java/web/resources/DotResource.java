package web.resources;

import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.HttpHeaders;
import web.DTO.DotDTO;
import web.entities.Dot;
import web.entities.Result;
import web.exceptions.IllegalParameterException;
import web.managers.DotManager;

public class DotResource {

    private final DotManager manager = new DotManager();

    @POST
    @Path("dot")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response processDot(DotDTO dto) {
        try {
            return manager.checkDot(new Dot(dto.getX(), dto.getY(), dto.getR()), dto.getUserId());
        } catch (IllegalParameterException e) {
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        }
    }

    @GET
    @Path("/points/{userId}")
    public Response getPoints(@PathParam("userId") long userId) {
        return manager.getDots(userId);
    }

}