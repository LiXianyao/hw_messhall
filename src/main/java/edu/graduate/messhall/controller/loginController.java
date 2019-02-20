package edu.graduate.messhall.controller;

import edu.graduate.messhall.bean.TblUserRepository;
import edu.graduate.messhall.bean.responseObject;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import edu.graduate.messhall.bean.TblUser;

@RestController
class loginRestController{
    //连接数据库User表
    private TblUserRepository tblUserRepository;

    private final Logger log = LoggerFactory.getLogger(loginRestController.class);

    @RequestMapping(value = "/login", method = {RequestMethod.POST})
    public loginResponse getLoginPage(@RequestBody loginEntity entity){
        String userName = entity.getUserName();
        String userPass = entity.getUserPass();


        loginResponse response;
        TblUser searchRes = tblUserRepository.findByUserNameAndUserPass(userName, userPass);
        if(searchRes != null){
            //验证正确，返回结果以及用户id\类型
            int userId = searchRes.getUserId();
            String userType = searchRes.getUserType();
            response = new loginResponse(userId,userType,true,"登录成功，欢迎光临");
        }
        else{
            response = new loginResponse(false,"登录验证失败，请检查用户名和密码是否正确");
        }
        return response;
    }
}

@Data
class loginEntity{
    private String userName;
    private String userPass;
}

@Data
class loginResponse extends responseObject {
    private int userId;
    private String userType;

    loginResponse(boolean succeed, String message){
        super(succeed, message);
    }

    loginResponse(int userId, String userType, boolean succeed, String message){
        super(succeed, message);
        this.userId = userId;
        this.userType = userType;
    }
}