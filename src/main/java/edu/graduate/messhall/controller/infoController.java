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
    public infoResponse modifyInfoRequest(@RequestBody infoModifyEntity entity){
        int userId = entity.getUserId();
        String userName = entity.getUserName();
        String userPhone = entity.getUserPhone();
        int userAge = entity.getUserAge();
        int userGender = entity.getUserGender();

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
                log.error(e.getMessage());
                response = new infoResponse(false,"数据保存异常，修改失败，请重试或联系管理员检查数据库");
            }
        }
        else{
            response = new infoResponse(false,"用户名" + userName + "已存在，不可重名");
        }
        return response;
    }

    //handle the POST-/infoQuery：检查数据表-返回结果
    @RequestMapping(value = "/infoQuery", method = {RequestMethod.GET, RequestMethod.POST})
    public infoQueryResponse modifyInfoRequest(@RequestBody infoQueryEntity entity){
        int userId = entity.getUserId();
        TblUser user = tblUserRepository.findByUserId(userId);
        return new infoQueryResponse(user);
    }
}


@Data
class infoModifyEntity{
    private String userName;
    private String userPhone;
    private int userAge;
    private int userGender;
    private int userId;
}

@Data
class infoQueryEntity{
    private int userId;
}

@Data
class infoQueryResponse{
    private String userName;
    private String userPhone;
    private int userAge;
    private int userGender;

    infoQueryResponse(TblUser user){
        this.userName = user.getUserName();
        this.userAge = user.getUserAge();
        this.userGender = user.getUserGender();
        this.userPhone = user.getUserPhone();
    }
}

@Data
class infoResponse extends responseObject{

    infoResponse(boolean succeed, String message){
        super(succeed, message);
    }
}