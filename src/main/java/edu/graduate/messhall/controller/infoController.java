package edu.graduate.messhall.controller;

import edu.graduate.messhall.bean.TblUser;
import edu.graduate.messhall.bean.TblUserRepository;
import edu.graduate.messhall.bean.responseObject;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class infoController {
    @Autowired // 依赖注入
    private TblUserRepository tblUserRepository;

    private final Logger log = LoggerFactory.getLogger(infoController.class);

    //handle the POST-/infoModify：检查重名-插入数据表-返回结果
    @RequestMapping(value = "/infoModify", method = {RequestMethod.GET, RequestMethod.POST})
    public infoResponse modifyInfoRequest(@RequestBody infoEntity entity){
        int userId = entity.getUserId();
        String userName = entity.getUserName();
        String userPhone = entity.getUserPhone();
        int userAge = entity.getUserAge();
        int userGender = entity.getUserGender();

        log.info("信息修改请求：" + userName + userPhone);
        System.out.println(userName + userPhone);

        TblUser searchRes = tblUserRepository.findByUserName(userName);
        TblUser toModify = tblUserRepository.findByUserId(userId);
        infoResponse response;
        if(searchRes == null || searchRes.equals(toModify)){
            /*没有重名用户（除了自己）*/
            toModify.setUserName(userName);
            toModify.setUserPhone(userPhone);
            toModify.setUserAge(userAge);
            toModify.setUserGender(userGender);
            try{
                tblUserRepository.save(toModify);
                response = new infoResponse(true,"用户信息修改成功");
            }
            catch (Exception e){
                response = new infoResponse(false,"数据保存异常，修改失败，请重试或联系管理员检查数据库");
            }
        }
        else{
            response = new infoResponse(false,"用户名" + userName + "已存在，不可重名");
        }
        return response;
    }
}


@Data
class infoEntity{
    private String userName;
    private String userPhone;
    private int userAge;
    private int userGender;
    private int userId;
}

@Data
class infoResponse extends responseObject{

    infoResponse(boolean succeed, String message){
        super(succeed, message);
    }
}