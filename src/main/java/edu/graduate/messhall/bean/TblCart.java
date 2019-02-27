package edu.graduate.messhall.bean;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="tblcart")
@Data
public class TblCart {

    /*多对一映射，一个用户会有多条购物车记录*/
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId",foreignKey = @ForeignKey(name = "tblCart_tbluser_userId_fk"))
    @JsonIgnore
    public TblUser user;

    /*多对一映射，一个用户会点多钟菜*/
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "foodId",foreignKey = @ForeignKey(name = "tblCart_tblfood_foodId_fk"))
    @JsonIgnore
    public TblFood food;

    @Column(nullable = false , length = 11, columnDefinition = "餐品数量")
    private int foodNum;

    @Transient
    private int foodPrice;
    @Transient
    private String foodName;
    @Transient//非数据库属性
    private String belongName;

    @Transient
    static private boolean checked = false;

    public TblCart(){
    }

    public TblCart(TblUser belong, TblFood food, int foodNum){
        this.foodNum = foodNum;
        this.food = food;
        this.user = belong;
    }

    public void addFoodNum(int num){
        this.foodNum += num;
    }

    public void decFoodNum(int num){
        this.foodNum -= num;
    }
}
