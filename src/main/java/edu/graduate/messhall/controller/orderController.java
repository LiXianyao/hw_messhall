package edu.graduate.messhall.controller;

import com.google.gson.Gson;
import edu.graduate.messhall.bean.*;
import lombok.Data;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.criteria.CriteriaBuilder;
import javax.transaction.Transactional;
import java.util.*;

@RestController
public class orderController {
    @Autowired
    private TblUserRepository tblUserRepository;
    @Autowired
    private TblFoodRepository tblFoodRepository;
    @Autowired
    private TblCartRepository tblCartRepository;

    @Autowired
    private TblOrderRepository tblOrderRepository;

    private final Logger log = LoggerFactory.getLogger(orderController.class);

    //handle the POST-/orderAdd：检查用户存在-插入数据表-返回结果
    @RequestMapping(value = "/orderAdd", method = {RequestMethod.POST})
    public responseObject addOrderRequest(@RequestBody List<orderAddEntity> entities){
        HashMap<Integer, List<orderAddEntity>> orderHashMap = new HashMap<Integer, List<orderAddEntity>>();
        HashMap<Integer, Double> orderPriceHashMap = new HashMap<Integer, Double>();
        ArrayList<Integer>FoodIdSet = new ArrayList<Integer>();
        TblUser customer = tblUserRepository.findByUserId(entities.get(0).getBelongId());

        for(orderAddEntity entity: entities) {
            //首先，把belongId的商品收在一起
            int foodId = entity.getFoodId();
            FoodIdSet.add(foodId);
            TblFood food = tblFoodRepository.findByFoodId(foodId);
            TblUser business = food.getBelong();
            Integer businessId = business.getUserId();

            //集合
            List<orderAddEntity> collection = orderHashMap.getOrDefault(businessId, new ArrayList<orderAddEntity>() );
            collection.add(entity);
            orderHashMap.put(businessId, collection);

            //消费累计
            double priceRecord = orderPriceHashMap.getOrDefault(businessId,0.0);
            priceRecord += (double)entity.getFoodPrice() *  entity.getFoodNum();
            orderPriceHashMap.put(businessId, priceRecord);
        }

        responseObject response;
        try{
            addOrderAndCleanCart(orderHashMap, orderPriceHashMap, FoodIdSet, customer);
            response = new responseObject(true,"订单保存成功！！");
        }
        catch (Exception e){
            log.error(e.getMessage());
            response = new responseObject(false, e.getMessage());
        }
        return response;
    }

    @Transactional
    public void addOrderAndCleanCart(HashMap<Integer, List<orderAddEntity>> orderHashMap, HashMap<Integer, Double> orderPriceHashMap ,
                                     ArrayList<Integer>FoodIdSet, TblUser customer ){
        for(Integer businessId: orderHashMap.keySet()){
                //计算同一个商家下的所有开销
                List<orderAddEntity> cartOfBusiness = orderHashMap.get(businessId);
                double price = orderPriceHashMap.get(businessId);
                TblUser business = tblUserRepository.findByUserId(businessId);
                String content = new Gson().toJson(cartOfBusiness);
                TblOrder newOrder = new TblOrder(business, customer, price, content);
                tblOrderRepository.save(newOrder);
            }

            //保存订单后，清除购物车对应项目
            for(Integer foodId: FoodIdSet){
                TblCart searchRes = tblCartRepository.findByUser_UserIdAndFood_FoodId(customer.getUserId(),foodId);
                tblCartRepository.delete(searchRes);
            }
    }

    //handle the POST-/orderModify：检查订单项目存在-插入数据表-返回结果
    @RequestMapping(value = "/orderModify", method = {RequestMethod.POST})
    public responseObject modifyOrderRequest(@RequestBody orderModifyEntity entity){
        int orderId = entity.getOrderId();
        Date time = entity.getTime();
        double price = entity.getPrice();
        String phone = entity.getPhone();
        String state = entity.getState();

        TblOrder searchRes = tblOrderRepository.findByOrderId(orderId);
        responseObject response;
        if(searchRes != null){
            try{
                searchRes.setTime(time);
                searchRes.setPrice(price);
                searchRes.setPhone(phone);
                searchRes.setState(state);
                tblOrderRepository.save(searchRes);
                response = new responseObject(true,"订单修改成功！！");
            }
            catch (Exception e){
                log.error(e.getMessage());
                response = new responseObject(false,"数据保存异常，操作失败，请重试或联系管理员检查数据库");
            }
        }
        else{
            response = new responseObject(false,"订单项目不存在，操作失败");
        }
        return response;
    }

    //handle the POST-/orderDelete：检查订单项目存在-删除数据表-返回结果
    @RequestMapping(value = "/orderDel", method = {RequestMethod.POST})
    public responseObject deleteorderRequest(@RequestBody orderDeleteEntity entity){
        int orderId = entity.getOrderId();

        TblOrder searchRes = tblOrderRepository.findByOrderId(orderId);
        responseObject response;
        try{
            if(searchRes != null){
                    /*根据请求删除指定的订单*/
                    tblOrderRepository.delete(searchRes);
                    response = new responseObject(true,"订单删除成功！！");
            }
            else{
                response = new responseObject(false,"订单项目不存在，操作失败");
            }
        }
        catch (Exception e){
            log.error(e.getMessage());
            response = new responseObject(false,"数据保存异常，操作失败，请重试或联系管理员检查数据库");
        }
        return response;
    }

    //handle the POST-/orderCheck：检查订单项目存在-删除数据表-返回结果
    @RequestMapping(value = "/orderCheck", method = {RequestMethod.POST})
    public orderResponse checkOrderRequest(@RequestBody orderCheckEntity entity){
        int orderId = entity.getOrderId();

        TblOrder searchRes = tblOrderRepository.findByOrderId(orderId);
        orderResponse response;
        try{
            if(searchRes != null){
                    /*根据请求删除指定的订单*/
                    response = new orderResponse(searchRes.getState(),true,"订单删除成功！！");
            }
            else{
                response = new orderResponse(false,"订单项目不存在，操作失败");
            }
        }
        catch (Exception e){
            log.error(e.getMessage());
            response = new orderResponse(false,"数据保存异常，操作失败，请重试或联系管理员检查数据库");
        }
        return response;
    }

    private static String[] userTypes = {"admin", "business", "customer"};

    //handle the POST-/orderQuery：查询数据表-返回结果
    @RequestMapping(value = "/orderQuery", method = {RequestMethod.POST})
    public  List<TblOrder> queryorderRequest(@RequestBody orderQueryEntity entity){
        int userId = entity.getUserId();
        String userType = entity.getUserType();

        /*如果是business返回id下的餐品; 如果是admin和customer返回所有餐品*/
         List<TblOrder> searchRes;
        if(userType.equals(userTypes[0])){
            searchRes = tblOrderRepository.findAllByOrderByTimeAsc();
        }else if(userType.equals(userTypes[1])){
            searchRes = tblOrderRepository.findAllByBusinessIdOrderByTimeAsc(userId);
        }else{
            searchRes = tblOrderRepository.findAllByCustomerIdOrderByTimeAsc(userId);
        }

        for(TblOrder order: searchRes){
            order.setOrderInfo();
        }
        return searchRes;
    }

    //handle the POST-/orderStatistic：统计数据表-返回结果
    @RequestMapping(value = "/orderStatistic", method = {RequestMethod.POST})
    public  List<TblOrder> statisticOrderRequest(@RequestBody orderStatisticEntity entity){
        Date startDate = entity.getStartDate();
        Date endDate = entity.getEndDate();
        String userType = entity.getUserType();
        int userId = entity.getUserId();
        String state = entity.getState();

         List<TblOrder> searchRes;
        if(userType.equals(userTypes[0])){
            searchRes = tblOrderRepository.findAllByTimeBetweenAndStateEqualsOrderByTimeAsc(startDate, endDate, state);
        }else if(userType.equals(userTypes[1])){
            searchRes = tblOrderRepository.findAllByTimeBetweenAndBusinessIdAndStateEqualsOrderByTimeAsc(startDate, endDate, userId, state);
        }else{
            searchRes = tblOrderRepository.findAllByTimeBetweenAndCustomerIdAndStateEqualsOrderByTimeAsc(startDate, endDate, userId, state);
        }

        for(TblOrder order: searchRes){
            order.setOrderInfo();
        }
        return searchRes;
    }
}


@Data
class orderAddEntity{
    private int foodId;
    private String foodName;
    private double foodPrice;
    private int foodNum;
    private String belongName;
    private int belongId;
    private boolean checked;

    public TblCart toTblCart(TblUser user, TblFood food){
        TblCart cartEntity = new TblCart(user, food, this.foodNum);
        cartEntity.setCartInfo();
        return cartEntity;
    }
}

@Data
class orderModifyEntity{
    private int orderId;
    private Date time;
    private double price;
    private String phone;
    private String state;
}

@Data
class orderDeleteEntity{
    private int orderId;
}

@Data
class orderCheckEntity{
    private int orderId;
}

@Data
class orderQueryEntity{
    private int userId;
    private String userType;
}

@Data
class orderStatisticEntity{
    private Date startDate;
    private Date endDate;
    private int userId;
    private String userType;
    private String state;
}

@Data
class orderResponse extends responseObject{
    private String state;

    orderResponse(String state, boolean succeed, String message){
        super(succeed, message);
        this.state = state;
    }

    orderResponse(boolean succeed, String message){
        super(succeed, message);
    }
}