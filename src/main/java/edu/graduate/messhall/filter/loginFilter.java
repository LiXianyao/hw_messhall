package edu.graduate.messhall.filter;

import org.slf4j.*;
import org.springframework.core.annotation.Order;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.*;
import java.io.IOException;
import edu.graduate.messhall.filter.commonFunction;

//@WebFilter(urlPatterns = "/*", filterName = "loginFilter")
//@Order(1)
public class loginFilter extends HttpFilter {
    private final Logger log = LoggerFactory.getLogger(loginFilter.class);

    private String[] allowedPatterns = {"/", "/login","/register"};
    private String[] allowedSuffiexs = {".js", ".css", ".ico", ".json"};

    @Override
    public void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws IOException, ServletException {

        String url = commonFunction.getRequestUrl(request);
        log.info("=======拦截请求:"+  url + "======");
        if(commonFunction.checkUriAllowence(url, allowedPatterns, allowedPatterns)){
            filterChain.doFilter(request, response);// allowed url, just let go
            return;
        }

        //check the session to figure out weather the user is login or not
        String userid = (String)request.getSession().getAttribute("user");
        if(userid == null){ //if not redirect he to the '/login'page
                log.info("被拦截：跳转到login页面");
                request.getRequestDispatcher("/login").forward(request, response);
        }else{// already login do nothing
            filterChain.doFilter(request, response);
        }

    }
}
