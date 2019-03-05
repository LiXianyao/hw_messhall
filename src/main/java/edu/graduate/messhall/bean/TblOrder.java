package edu.graduate.messhall.bean;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.gson.Gson;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="tblorder")
@Data
public class TblOrder {
    @Id //是主键
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false , length = 11, columnDefinition = "无意义自增主键")
    public int orderId;

    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    @Column(nullable = false , insertable = false, updatable = false, columnDefinition = "订单生成时间")
    public Date time;

    @Column(nullable = false , length = 11, columnDefinition = "价格")
    public int price;

    @Column(nullable = false , length = 100, columnDefinition = "手机号码")
    public String phone;

    @Column(nullable = false , length = 20, columnDefinition = "订单状态")
    public String state;

    @Column(updatable = false, nullable = false , length = 512, columnDefinition = "订单内容")
    public String content;

    /*多对一映射，一个用户多条订单信息*/
    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "businessId",foreignKey = @ForeignKey(name = "tblorder_tbluser_userId_fk_2"))
    @JsonIgnore
    public TblUser business;

    @Column(insertable = false, updatable = false, nullable = false , length = 11, columnDefinition = "卖家Id")
    private int businessId;

    /*多对一映射，一个用户多条订单信息*/
    @ManyToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "customerId",foreignKey = @ForeignKey(name = "tblorder_tbluser_userId_fk"))
    @JsonIgnore
    public TblUser customer;

    @Column(name = "customerId", insertable = false, updatable = false, nullable = false , length = 11, columnDefinition = "用户id")
    private int customerId;

    @Transient
    private String businessName;
    @Transient//非数据库属性
    private String customerName;

    public TblOrder(){
    }

    public TblOrder(TblUser business, TblUser customer, int price, String content){
        this.business = business;
        this.customer = customer;
        this.price = price;
        this.phone = customer.getUserPhone();
        this.state = "等待接单";
        this.content = content;
    }

    public void setOrderInfo(){
        this.businessName = this.business.getUserName();
        this.customerName = this.customer.getUserName();
    }
}
