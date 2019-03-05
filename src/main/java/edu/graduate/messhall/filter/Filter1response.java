package edu.graduate.messhall.filter;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Enumeration;

@WebFilter(urlPatterns = "/*", filterName = "Filter1response")
public class Filter1response extends HttpFilter {
    private final Logger log = LoggerFactory.getLogger(Filter1response.class);

    private String[] allowedPatterns = {};
    private String[] allowedSuffiexs = {".js", ".css", ".ico", ".json"};

    /*
    * 处理跨域CORS请求，设置请求头的许可*/
    @Override
    public void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws IOException, ServletException {

        String url = commonFunction.getRequestUrl(request);

        /*检查请求中是否有Origin字段，即是否是跨域CORS*/
        String origin = request.getHeader("origin");
        if(origin != null){
            log.info("=======response 拦截请求:"+  url + "======");
            if(commonFunction.checkUriAllowence(url,allowedPatterns,allowedSuffiexs)){
                filterChain.doFilter(request, response);// allowed url, just let go
                return;
            }

            response.setHeader("Access-Control-Allow-Origin",  origin);//设置允许跨域的域名，需要发送cookie信息，所以此处需要指定具体的域名，
            response.setHeader("Access-Control-Allow-Headers", request.getHeader("access-control-request-headers"));
            response.setHeader("Access-Control-Allow-Methods", request.getHeader("access-control-request-method"));//允许跨域的请求方式
            /*
             * ajax请求的时候如果带有xhrFields:{withCredentials:true}，
             * 那么服务器后台在配置跨域的时候就必须要把Access-Control-Allow-Credentials这个请求头加上去
             */
            response.setHeader("Access-Control-Allow-Credentials", "true");//允许发送Cookie信息
            response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // 支持HTTP 1.1.
            response.setHeader("Pragma", "no-cache"); // 支持HTTP 1.0. response.setHeader("Expires", "0");
        }
        filterChain.doFilter(request, response);
    }

}
