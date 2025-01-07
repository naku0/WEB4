package web.filters;

import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerResponseContext;
import jakarta.ws.rs.container.ContainerResponseFilter;
import jakarta.ws.rs.ext.Provider;


@Provider
public class CORSFilter implements ContainerResponseFilter {

    private static final String ALLOWED_ORIGIN = "http://localhost:3000";

    @Override
    public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext) {
        String origin = requestContext.getHeaderString("Origin");

        if (ALLOWED_ORIGIN.equals(origin)) {
            responseContext.getHeaders().add("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
            responseContext.getHeaders().add("Access-Control-Allow-Headers", "origin, content-type, accept, authorization");
            responseContext.getHeaders().add("Access-Control-Allow-Credentials", "true");
            responseContext.getHeaders().add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
        } else {
            responseContext.getHeaders().add("Access-Control-Allow-Origin", "null");
        }
    }
}