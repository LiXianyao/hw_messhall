package edu.graduate.messhall.bean;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="tbluser")
@Data
public class TblUser {
    @Id //是主键
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false , length = 11, columnDefinition = "无意义自增主键")
    public int userId;

    @Column(nullable = false , length = 100, columnDefinition = "用户登录名（不可重复）")
    public String userName;

    @Column(nullable = false , length = 100, columnDefinition = "用户密码")
    public String userPass;

    @Column(nullable = false , length = 100)
    public String userPhone;

    @Column(nullable = false , length = 3)
    public int userAge;

    @Column(nullable = false , length = 1)
    public int userGender;

    @Column(nullable = false , length = 50)
    public String userType;

    /*多对一映射，一个（商家用户多种菜）*/
    @OneToMany(mappedBy = "belong",cascade = {CascadeType.REMOVE}, fetch = FetchType.LAZY)
    private Set<TblFood> tblFoods;

    public TblUser(){
    }

    public TblUser(String userName, String userPass, String userPhone, int userAge,
                   int userGender, String userType){
        this.userName = userName;
        this.userPass = userPass;
        this.userPhone = userPhone;
        this.userAge = userAge;
        this.userGender = userGender;
        this.userType = userType;
    }

}
