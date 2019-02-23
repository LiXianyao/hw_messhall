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
public class commentController {

    @Autowired
    private TblCommentRepository tblCommentRepository;

    private final Logger log = LoggerFactory.getLogger(commentController.class);

    //handle the POST-/commentAdd：插入数据表-返回结果
    @RequestMapping(value = "/commentAdd", method = {RequestMethod.POST})
    public responseObject addCommentRequest(@RequestBody commentAddEntity entity){
        String content = entity.getContent();

        TblComment newComment = new TblComment(content);
        responseObject response;
        try{
            tblCommentRepository.save(newComment);
            response = new responseObject(true,"留言添加成功！！");
        }
        catch (Exception e){
            response = new responseObject(false,"数据保存异常，操作失败，请重试或联系管理员检查数据库");
        }
        return response;
    }

    //handle the POST-/commentDelete：检查留言存在-删除数据表-返回结果
    @RequestMapping(value = "/commentDelete", method = {RequestMethod.POST})
    public responseObject deleteCommentRequest(@RequestBody commentDeleteEntity entity){
        String commentId = entity.getCommentId();

        TblComment searchRes = tblCommentRepository.findByCommentId(commentId);
        responseObject response;
        if(searchRes != null){
            try{
                /*根据请求删除指定的餐品*/
                tblCommentRepository.delete(searchRes);
                response = new responseObject(true,"留言删除成功！！");
            }
            catch (Exception e){
                response = new responseObject(false,"数据保存异常，操作失败，请重试或联系管理员检查数据库");
            }
        }
        else{
            response = new responseObject(false,"留言不存在，操作失败");
        }
        return response;
    }

    //handle the POST-/commentQuery：检查用户类型-查询数据表-返回结果
    @RequestMapping(value = "/commentQuery", method = {RequestMethod.POST})
    public  List<TblComment> queryCommentRequest(){
        /*返回所有留言*/
        List<TblComment> searchRes = tblCommentRepository.findAllByOrderByCreatedTimeDesc();
        return searchRes;
    }
}


@Data
class commentAddEntity{
    private String content;
}

@Data
class commentDeleteEntity{
    private String commentId;
}

@Data
class commentQueryEntity{
    private int userId;
    private String userType;
}

@Data
class commentResponse extends responseObject{
    private String userName;

    commentResponse(boolean succeed, String message){
        super(succeed, message);
    }

    commentResponse(String userName, boolean succeed, String message){
        super(succeed, message);
        this.userName = userName;
    }
}