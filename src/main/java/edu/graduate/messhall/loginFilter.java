package edu.graduate.messhall;

import org.slf4j.*;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.*;
import java.io.IOException;

@WebFilter(urlPatterns = "/*", filterName = "loginFilter")
public class loginFilter extends HttpFilter {
    private final Logger log = LoggerFactory.getLogger(loginFilter.class);

    private String[] allowedPatterns = {"/index", "/login"};

    @Override
    public void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws IOException, ServletException {

        String requestUri = request.getRequestURI();
        String contextPath = request.getContextPath();
        String url = requestUri.substring(contextPath.length());
        log.info("=======拦截请求:"+ url + "**"+ requestUri + "======");
        if(checkUriAllowence(url)){
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

    /*
    * check whether the url is allowed
    * */
    private boolean checkUriAllowence(String url){
        for(String allowedPattern: allowedPatterns){
            if(allowedPattern.equals(url))
                return true;
        }
        return false;
    }
}
