package edu.graduate.messhall.controller;

import edu.graduate.messhall.bean.*;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class foodController {
    @Autowired // 依赖注入
    private TblUserRepository tblUserRepository;

    @Autowired
    private TblFoodRepository tblFoodRepository;

    private final Logger log = LoggerFactory.getLogger(foodController.class);

    //handle the POST-/regiseter：检查重名-插入数据表-返回结果
    @RequestMapping(value = "/foodAdd", method = {RequestMethod.POST})
    public responseObject addFoodRequest(@RequestBody foodAddEntity entity){
        String foodName = entity.getFoodName();
        int foodPrice = entity.getFoodPrice();
        int belongId = entity.getBelongId();
        log.info("添加食品请求：" + foodName + belongId);

        TblUser searchRes = tblUserRepository.findByUserId(belongId);
        responseObject response;
        if(searchRes != null){
            try{
                this.upsertFood(foodName, foodPrice, searchRes);
                response = new responseObject(true,"餐品添加成功！！");
            }
            catch (Exception e){
                response = new responseObject(false,"数据保存异常，操作失败，请重试或联系管理员检查数据库");
            }
        }
        else{
            response = new responseObject(false,"商户不存在，添加失败");
        }
        return response;
    }

    private void upsertFood(String foodName, int foodPrice, TblUser belong){
        TblFood newFood = new TblFood(foodName, foodPrice, belong);
        log.info("插入食物" + newFood);
        tblFoodRepository.save(newFood);
    }
}


@Data
class foodAddEntity{
    private String foodName;
    private String foodPrice;
    private int belongId;
}

@Data
class foodModifyEntity{
    private String foodName;
    private String foodPrice;
    private int foodId;
}

@Data
class foodDeleteEntity{
    private int foodId;
}

@Data
class foodQueryEntity{
    private int userId;
    private String userType;
}

@Data
class foodResponse extends responseObject{
    private String userName;

    foodResponse(boolean succeed, String message){
        super(succeed, message);
    }

    foodResponse(String userName, boolean succeed, String message){
        super(succeed, message);
        this.userName = userName;
    }
}