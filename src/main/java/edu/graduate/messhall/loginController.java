package edu.graduate.messhall;

import edu.graduate.messhall.bean.User;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class loginController {
    @RequestMapping(value = "/login")
    public String hello(){
        return "test json";
    }
}