package web.managers;

import jakarta.ejb.EJB;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.HttpHeaders;
import web.entities.Dot;
import web.entities.Result;
import web.exceptions.IllegalParameterException;
import web.repositories.DotRepository;
import web.validators.AreaValidator;

import java.util.HashMap;
import java.util.List;
import java.util.logging.Logger;

public class DotManager {
    private final DotRepository dotRepository = new DotRepository();
    @EJB
    private AreaValidator areaValidator;
    Logger logger = Logger.getLogger(DotManager.class.getName());

    public Response checkDot(Dot dot, long userId) throws IllegalParameterException {
        boolean status = areaValidator.checkSpot(dot.getX(), dot.getY(), dot.getR());
        Result result = new Result(dot, status, null);
        logger.info(result.toString());
        result.setStatus(status);
        dotRepository.saveDot(result, userId);
        return Response.ok()
                .entity(new HashMap<String, Object>() {{
                    put("result", new HashMap<String, Object>() {{
                        put("userId", userId);
                        put("dot", new HashMap<String, Double>() {
                            {
                                put("x", dot.getX());
                                put("y", dot.getY());
                                put("r", dot.getR());
                            }
                        });
                        put("status", status);
                    }});
                }})
                .build();
    }

    public Response getDots(long userId) {
        try {
            List<Result> results = dotRepository.getDots(userId);
            if (results.isEmpty()) {
                return Response.status(Response.Status.NOT_FOUND).entity("No dots found for user ID" + userId).build();
            }
            return Response.ok(results).build();
        } catch (Exception e) {
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("An error occurred").build();
        }
    }
}