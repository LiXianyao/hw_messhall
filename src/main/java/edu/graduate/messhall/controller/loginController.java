package edu.graduate.messhall.controller;

import edu.graduate.messhall.bean.User;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;

@Controller
public class loginController {
    //handle the GET-/login url: return the page
    @RequestMapping(value = "/login", method = {RequestMethod.GET})
    public String getLoginPage(){
        return "index";
    }
}

@RestController
class loginRestController{
    //handle the POST-/login url: return the page

    @RequestMapping(value = "/login", method = {RequestMethod.POST})
    public String getLoginPage(){
        return "login";
    }
}