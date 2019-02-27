package edu.graduate.messhall.bean;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TblFoodRepository extends JpaRepository<TblFood, Integer> {
    TblFood findByBelong(TblUser Belong);
    //TblFood findByBelongId(int BelongId);

    TblFood findByFoodNameAndFoodId(String FoodName, int FoodId);

    TblFood findByFoodId(int FoodId);

    List<TblFood> findAllByBelong_UserIdOrderByFoodIdAsc(int userId);
}
