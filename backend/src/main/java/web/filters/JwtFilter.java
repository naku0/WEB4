package web.filters;

import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;
import web.validators.TokenValidator;

import java.util.logging.Logger;

@Provider
public class JwtFilter implements ContainerRequestFilter {

    private final TokenValidator tokenValidator;
    Logger logger = Logger.getLogger(JwtFilter.class.getName());

    public JwtFilter() {
        this.tokenValidator = new TokenValidator();
    }

    @Override
    public void filter(ContainerRequestContext requestContext) {
        String path = requestContext.getUriInfo().getPath();
        logger.info("Incoming request to path: " + path);

        if (isPublicEndpoint(path)) {
            logger.info("Public endpoint detected: " + path);
            return;
        }

        String authorizationHeader = requestContext.getHeaderString("Authorization");

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            abortRequest(requestContext, "Authorization header must be provided");
            return;
        }

        String token = authorizationHeader.substring("Bearer ".length()).trim();

        try {
            String username = tokenValidator.validateToken(token);
            requestContext.setProperty("username", username);
        } catch (Exception e) {
            logger.warning("You have an issue with a token");
            abortRequest(requestContext, "Invalid or expired access token");
        }
    }

    private boolean isPublicEndpoint(String path) {
        return path.equals("/auth/login") || path.equals("/auth/register");
    }

    private void abortRequest(ContainerRequestContext requestContext, String message) {
        requestContext.abortWith(
                Response.status(Response.Status.FORBIDDEN)
                        .entity(message)
                        .build()
        );
    }
}
