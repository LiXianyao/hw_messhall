package edu.graduate.messhall.bean;

import edu.graduate.messhall.bean.TblUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TblUserRepository extends JpaRepository<TblUser, Integer> {
    TblUser findByUserId(String userId);
}
