package edu.graduate.messhall.filter;

import javax.servlet.http.HttpServletRequest;

public class commonFunction {

    static String getRequestUrl(HttpServletRequest request){
        String requestUri = request.getRequestURI();
        String contextPath = request.getContextPath();
        return requestUri.substring(contextPath.length());
    }

    /*
     * check whether the url is allowed
     * */
    static boolean checkUriAllowence(String url, String[] allowedPatterns, String[] allowedSuffiexs){
        for(String allowedPattern: allowedPatterns){
            if(allowedPattern.equals(url))
                return true;
        }

        for(String allowedSuffiex: allowedSuffiexs){
            if(url.lastIndexOf(allowedSuffiex) != -1)
                return true;
        }
        return false;
    }
}
