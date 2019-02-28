package edu.graduate.messhall.bean;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="tblcart")
@Data
public class TblCart{

    @Id //是主键
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false , length = 11, columnDefinition = "无意义自增主键")
    public int cartId;

    /*多对一映射，一个用户会有多条购物车记录*/
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId",foreignKey = @ForeignKey(name = "tblCart_tbluser_userId_fk"))
    @JsonIgnore
    private TblUser user;

    /*多对一映射，一个用户会点多钟菜*/
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "foodId",foreignKey = @ForeignKey(name = "tblCart_tblfood_foodId_fk"))
    @JsonIgnore
    public TblFood food;

    @Column(nullable = false , length = 11, columnDefinition = "餐品数量")
    private int foodNum;

    @Column(name = "userId", insertable = false, updatable = false, nullable = false , length = 11, columnDefinition = "餐品Id")
    private int belongId;

    @Column(name = "foodId", insertable = false, updatable = false, nullable = false , length = 11, columnDefinition = "餐品Id")
    private int foodId;

    @Transient//非数据库属性
    private String belongName;
    @Transient
    static private boolean checked = false;
    @Transient
    private int foodPrice;
    @Transient
    private String foodName;

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

    public void setCartInfo(){
        this.setFoodName(this.getFood().getFoodName());
        this.setFoodPrice(this.getFood().getFoodPrice());
        this.setBelongName(this.getUser().getUserName());
    }
}

