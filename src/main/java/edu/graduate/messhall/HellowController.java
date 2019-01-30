package edu.graduate.messhall;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class HellowController {
    @RequestMapping(value = "/", method = {RequestMethod.GET})
    public String hello(){
        return "index";
    }
}
