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

import java.util.List;

@RestController
public class foodController {
    @Autowired // 依赖注入
    private TblUserRepository tblUserRepository;

    @Autowired
    private TblFoodRepository tblFoodRepository;

    private final Logger log = LoggerFactory.getLogger(foodController.class);

    //handle the POST-/foodAdd：检查用户存在-插入数据表-返回结果
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
                TblFood newFood = new TblFood(foodName, foodPrice, searchRes);
                tblFoodRepository.save(newFood);
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

    //handle the POST-/foodModify：检查餐品存在-插入数据表-返回结果
    @RequestMapping(value = "/foodModify", method = {RequestMethod.POST})
    public responseObject modifyFoodRequest(@RequestBody foodModifyEntity entity){
        String foodName = entity.getFoodName();
        int foodPrice = entity.getFoodPrice();
        int foodId = entity.getFoodId();

        TblFood searchRes = tblFoodRepository.findByFoodId(foodId);
        responseObject response;
        if(searchRes != null){
            try{
                /*根据请求修改指定的餐品*/
                searchRes.setFoodPrice(foodPrice);
                searchRes.setFoodName(foodName);
                tblFoodRepository.save(searchRes);
                response = new responseObject(true,"餐品修改成功！！");
            }
            catch (Exception e){
                response = new responseObject(false,"数据保存异常，操作失败，请重试或联系管理员检查数据库");
            }
        }
        else{
            response = new responseObject(false,"餐品不存在，操作失败");
        }
        return response;
    }

    //handle the POST-/foodDelete：检查餐品存在-删除数据表-返回结果
    @RequestMapping(value = "/foodDelete", method = {RequestMethod.POST})
    public responseObject deleteFoodRequest(@RequestBody foodDeleteEntity entity){
        int foodId = entity.getFoodId();

        TblFood searchRes = tblFoodRepository.findByFoodId(foodId);
        responseObject response;
        if(searchRes != null){
            try{
                /*根据请求删除指定的餐品*/
                tblFoodRepository.delete(searchRes);
                response = new responseObject(true,"餐品删除成功！！");
            }
            catch (Exception e){
                response = new responseObject(false,"数据保存异常，操作失败，请重试或联系管理员检查数据库");
            }
        }
        else{
            response = new responseObject(false,"餐品不存在，操作失败");
        }
        return response;
    }

    //handle the POST-/foodQuery：检查用户类型-查询数据表-返回结果
    @RequestMapping(value = "/foodQuery", method = {RequestMethod.POST})
    public  List<TblFood> queryFoodRequest(@RequestBody foodQueryEntity entity){
        int userId = entity.getUserId();
        String userType = entity.getUserType();

        /*如果是business返回id下的餐品; 如果是admin和customer返回所有餐品*/
        List<TblFood> searchRes;
        if(userType.equals("business"))
            searchRes = tblFoodRepository.findAllByBelong_UserIdOrderByFoodIdAsc(userId);
        else
            searchRes = tblFoodRepository.findAll();

        for(TblFood food: searchRes){
            food.setBelongId(food.getBelong().getUserId());
            food.setBelongName(food.getBelong().getUserName());
        }
        return searchRes;
    }
}


@Data
class foodAddEntity{
    private String foodName;
    private int foodPrice;
    private int belongId;
}

@Data
class foodModifyEntity{
    private String foodName;
    private int foodPrice;
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