package web.resources;


import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;

public class AbobaRes {
    @Path("/aboba")
    @GET

    public Response getAboba() {
        return Response.ok("aboba").build();
    }
}
