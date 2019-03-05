package edu.graduate.messhall.filter;

import org.slf4j.*;
import org.springframework.core.annotation.Order;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.*;
import java.io.IOException;
import edu.graduate.messhall.filter.commonFunction;

@WebFilter(urlPatterns = "/*", filterName = "Filter2login")
@Order(2)
public class Filter2login extends HttpFilter {
    private final Logger log = LoggerFactory.getLogger(Filter2login.class);

    private String[] allowedPatterns = {"/", "/login","/register"};
    private String[] allowedSuffiexs = {".js", ".css", ".ico", ".json"};

    @Override
    public void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws IOException, ServletException {

        String url = commonFunction.getRequestUrl(request);
        if(commonFunction.checkUriAllowence(url, allowedPatterns, allowedSuffiexs)){
            filterChain.doFilter(request, response);// allowed url, just let go
            return;
        }

        //check the session to figure out weather the user is login or not
        log.info("=======登陆验证拦截拦截请求:"+  url + "======");
        String sessionId = request.getSession().getId();
        String userid = (String)request.getSession().getAttribute("sessionId");
        if(userid==null || !userid.equals(sessionId)){ //if not redirect he to the '/login'page
                log.info("被拦截：跳转到loginRequire页面" + request.getSession().getId());
                request.getRequestDispatcher("/loginRequire").forward(request, response);
        }else{// already login do nothing
            filterChain.doFilter(request, response);
        }

    }
}
