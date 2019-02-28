package edu.graduate.messhall.bean;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TblCartRepository extends JpaRepository<TblCart, Integer> {

    List<TblCart> findAllByUser_UserId(int userId);

    TblCart findByUserAndFood(TblUser user, TblFood food);

    TblCart findByUser_UserIdAndFood_FoodId(int userId, int foodId);
}
