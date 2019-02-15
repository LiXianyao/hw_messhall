package edu.graduate.messhall.controller;

import edu.graduate.messhall.bean.TblUser;
import edu.graduate.messhall.bean.TblUserRepository;
import edu.graduate.messhall.filter.loginFilter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import lombok.Data;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class registerController {
    @Autowired // 依赖注入
    private TblUserRepository tblUserRepository;

    private final Logger log = LoggerFactory.getLogger(registerController.class);

    //handle the GET-/login url: return the page
    @RequestMapping(value = "/register", method = {RequestMethod.GET, RequestMethod.POST})
    public registerResponse getRegisterInfo(@RequestBody registerEntity entity){
        String userName = entity.getUserName();
        String userPass = entity.getUserPass();
        String userPhone = entity.getUserPhone();
        int userAge = entity.getUserAge();
        String userGender = entity.getUserGender();
        log.info("注册请求：" + userName + userPhone);
        System.out.println(userName + userPhone);

        TblUser searchRes = tblUserRepository.findByUserId(userName);
        registerResponse response;
        if(searchRes == null){
            response = new registerResponse(true,"用户名可以注册");
        }
        else{
            response = new registerResponse(false,"用户名" + userName + "已存在，不可注册");
        }

        return response;
    }
}


@Data
class registerEntity{
    private String userName;
    private String userPass;
    private String userPhone;
    private int userAge;
    private String userGender;
}

@Data
class registerResponse{
    private String userName;
    private String message;
    private boolean succeed;

    registerResponse(boolean succeed, String message){
        this.message = message;
        this.succeed = succeed;
    }
}