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
public class cartController {
    @Autowired
    private TblUserRepository tblUserRepository;
    @Autowired
    private TblFoodRepository tblFoodRepository;

    @Autowired
    private TblCartRepository tblCartRepository;

    private final Logger log = LoggerFactory.getLogger(cartController.class);

    //handle the POST-/cartAdd：检查用户存在-插入数据表-返回结果
    @RequestMapping(value = "/cartAdd", method = {RequestMethod.POST})
    public responseObject addcartRequest(@RequestBody cartAddEntity entity){
        int userId = entity.getUserId();
        int foodId = entity.getFoodId();

        TblUser toAddUser = tblUserRepository.findByUserId(userId);
        TblFood toAddFood = tblFoodRepository.findByFoodId(foodId);
        TblCart searchRes = tblCartRepository.findByUserAndFood(toAddUser, toAddFood);
        responseObject response;
        try{
            if(searchRes != null){
                //购物车里已经存在这样的组合

                    searchRes.addFoodNum(1);
                    tblCartRepository.save(searchRes);
                    response = new responseObject(true,"购物车餐品数量添加成功！！");

            }
            else{
                TblCart newCart = new TblCart(toAddUser, toAddFood, 1);
                tblCartRepository.save(newCart);
                response = new responseObject(false,"购物车添加成功！！");
            }
        }
        catch (Exception e){
            response = new responseObject(false,"数据保存异常，操作失败，请重试或联系管理员检查数据库");
        }
        return response;
    }

    //handle the POST-/cartModify：检查餐品存在-插入数据表-返回结果
    @RequestMapping(value = "/cartModify", method = {RequestMethod.POST})
    public responseObject modifycartRequest(@RequestBody cartModifyEntity entity){
        int userId = entity.getUserId();
        int foodId = entity.getFoodId();
        int foodNum = entity.getFoodNum();

        TblUser toModifyUser = tblUserRepository.findByUserId(userId);
        TblFood toModifyFood = tblFoodRepository.findByFoodId(foodId);
        TblCart searchRes = tblCartRepository.findByUserAndFood(toModifyUser, toModifyFood);
        responseObject response;
        if(searchRes != null){
            try{
                /*根据请求修改指定的餐品*/
                searchRes.setcartPrice(cartPrice);
                searchRes.setcartName(cartName);
                tblcartRepository.save(searchRes);
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

    //handle the POST-/cartDelete：检查餐品存在-删除数据表-返回结果
    @RequestMapping(value = "/cartDelete", method = {RequestMethod.POST})
    public responseObject deletecartRequest(@RequestBody cartDeleteEntity entity){
        int cartId = entity.getcartId();

        Tblcart searchRes = tblcartRepository.findBycartId(cartId);
        responseObject response;
        if(searchRes != null){
            try{
                /*根据请求删除指定的餐品*/
                tblcartRepository.delete(searchRes);
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

    //handle the POST-/cartQuery：检查用户类型-查询数据表-返回结果
    @RequestMapping(value = "/cartQuery", method = {RequestMethod.POST})
    public  List<Tblcart> querycartRequest(@RequestBody cartQueryEntity entity){
        int userId = entity.getUserId();
        String userType = entity.getUserType();

        /*如果是business返回id下的餐品; 如果是admin和customer返回所有餐品*/
        List<Tblcart> searchRes;
        if(userType.equals("business"))
            searchRes = tblcartRepository.findAllByBelong_UserIdOrderBycartIdAsc(userId);
        else
            searchRes = tblcartRepository.findAll();

        for(Tblcart cart: searchRes){
            cart.setBelongId(cart.getBelong().getUserId());
            cart.setBelongName(cart.getBelong().getUserName());
        }
        return searchRes;
    }
}


@Data
class cartAddEntity{
    private int userId;
    private int foodId;
}

@Data
class cartModifyEntity{
    private int foodNum;
    private int userId;
    private int foodId;
}

@Data
class cartDeleteEntity{
    private int userId;
    private int foodId;
}

@Data
class cartQueryEntity{
    private int userId;
}

@Data
class cartResponse extends responseObject{
    private String userName;

    cartResponse(boolean succeed, String message){
        super(succeed, message);
    }

    cartResponse(String userName, boolean succeed, String message){
        super(succeed, message);
        this.userName = userName;
    }
}