package edu.graduate.messhall;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JsonController {
    @RequestMapping(value = "/json", method = {RequestMethod.GET})
    public String hello(){
        return "test json";
    }
}
