package edu.graduate.messhall.bean;

import edu.graduate.messhall.bean.TblUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TblUserRepository extends JpaRepository<TblUser, Integer> {
    TblUser findByUserName(String userName);

    TblUser findByUserNameAndUserPass(String userName, String userPass);

    TblUser findByUserId(int userId);
}
