package edu.graduate.messhall.bean;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="tbluser")
public class TblUser {
    @Id //是主键
    @Column(nullable = false , length = 100)
    private String userId;

    @Column(nullable = false , length = 100)
    private String userName;

    @Column(nullable = false , length = 100)
    private String userPass;

    @Column(nullable = false , length = 100)
    private String userPhone;

    @Column(nullable = false , length = 3)
    private Integer userAge;

    @Column(nullable = false , length = 1)
    private Integer userGender;

    @Column(nullable = false , length = 1)
    private Integer userType;

    public TblUser() {}

    public TblUser(String userId, String userName, String userPass, String userPhone, Integer userAge,
                   Integer userGender, Integer userType){
        this.userId = userId;
        this.userName = userName;
        this.userPass = userPass;
        this.userPhone = userPhone;
        this.userAge = userAge;
        this.userGender = userGender;
        this.userType = userType;
    }

    public TblUser(String userId, String userName, String userPass, String userPhone, Integer userAge,
                   Integer userGender){
        this.userId = userId;
        this.userName = userName;
        this.userPass = userPass;
        this.userPhone = userPhone;
        this.userAge = userAge;
        this.userGender = userGender;
    }
}
