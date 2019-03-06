package edu.graduate.messhall.bean;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="tblfood")
@Data
public class TblFood {
    @Id //是主键
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false , length = 11, columnDefinition = "无意义自增主键")
    public int foodId;

    @Column(nullable = false , length = 100, columnDefinition = "菜名")
    public String foodName;

    @Column(nullable = false , length = 11, columnDefinition = "价格")
    public double foodPrice;

    /*多对一映射，一个（商家用户多种菜）*/
    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "belongId",foreignKey = @ForeignKey(name = "tblfood_tbluser_userId_fk"))
    @JsonIgnore
    public TblUser belong;

    //@Column(nullable = false , length = 11, columnDefinition = "用户id")
    //public int belongId;

    @Transient
    private int belongId;
    @Transient//非数据库属性
    private String belongName;

    public TblFood(){
    }

    public TblFood(String foodName, double foodPrice, TblUser belong){
        this.foodName = foodName;
        this.foodPrice = foodPrice;
        this.belong = belong;
    }

    public void setFoodInfo(){
        this.setBelongId(this.getBelong().getUserId());
        this.setBelongName(this.getBelong().getUserName());
    }
}
