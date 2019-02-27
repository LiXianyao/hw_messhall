package edu.graduate.messhall.bean;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TblCartRepository extends JpaRepository<TblCart, Integer> {
    List<TblCart> findAllByUser(TblUser Belong);

    TblCart findByUserAndFood(TblUser user, TblFood food);
}
