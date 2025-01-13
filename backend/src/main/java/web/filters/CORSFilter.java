package web.filters;

import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerResponseContext;
import jakarta.ws.rs.container.ContainerResponseFilter;
import jakarta.ws.rs.ext.Provider;

import java.util.logging.Logger;

@Provider
public class CORSFilter implements ContainerResponseFilter {
    Logger logger = Logger.getLogger(CORSFilter.class.getName());
    private static final String ALLOWED_ORIGIN = "http://localhost";

    @Override
    public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext) {
        String path = requestContext.getUriInfo().getPath();
        logger.info("Incoming request to path: " + path);

        responseContext.getHeaders().add("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
        responseContext.getHeaders().add("Access-Control-Allow-Credentials", "true");
        responseContext.getHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        responseContext.getHeaders().add("Access-Control-Allow-Headers", "Origin, Content-Type, Accept, Authorization");

        if ("OPTIONS".equalsIgnoreCase(requestContext.getMethod())) {
            responseContext.setStatus(204);
        }
    }
}
