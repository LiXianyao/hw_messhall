package edu.graduate.messhall.controller;

import edu.graduate.messhall.bean.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import lombok.Data;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;

@RestController
public class registerController {
    @Autowired // 依赖注入
    private TblUserRepository tblUserRepository;

    @Autowired
    private TblFoodRepository tblFoodRepository;

    private final Logger log = LoggerFactory.getLogger(registerController.class);

    //handle the POST-/regiseter：检查重名-插入数据表-返回结果
    @RequestMapping(value = "/register", method = {RequestMethod.GET, RequestMethod.POST})
    public registerResponse getRegisterInfo(@RequestBody registerEntity entity){
        String userName = entity.getUserName();
        String userPass = entity.getUserPass();
        String userPhone = entity.getUserPhone();
        int userAge = entity.getUserAge();
        int userGender = entity.getUserGender();
        String userType = entity.getUserType();
        log.info("注册请求：" + userName + userPhone);
        System.out.println(userName + userPhone);

        TblUser searchRes = tblUserRepository.findByUserName(userName);
        registerResponse response;
        if(searchRes == null){
            TblUser newUser = new TblUser(userName, userPass, userPhone, userAge, userGender, userType);
            try{
                tblUserRepository.save(newUser);
                response = new registerResponse(true,"注册成功，可以使用已注册的账号进行登录");
            }
            catch (Exception e){
                log.error(e.getMessage());
                response = new registerResponse(false,"数据保存异常，注册失败，请重试或联系管理员检查数据库");
            }
        }
        else{
            //searchRes.setUserName("更新测试");
            //tblUserRepository.save(searchRes);
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
    private int userGender;
    private String userType;
}

@Data
class registerResponse extends responseObject{
    private String userName;

    registerResponse(boolean succeed, String message){
        super(succeed, message);
    }

    registerResponse(String userName, boolean succeed, String message){
        super(succeed, message);
        this.userName = userName;
    }
}