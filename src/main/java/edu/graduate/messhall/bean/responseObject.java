package edu.graduate.messhall.bean;

import lombok.Data;

@Data
public class responseObject {
    //protected int resCode;  //错误代码
    protected boolean succeed; //ajax调用成功或者失败
    protected String message;  //调用失败的回执消息

    public responseObject(){}

    public responseObject(boolean succeed, String message){
        this.message = message;
        this.succeed = succeed;
    }
}
