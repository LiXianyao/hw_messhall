package edu.graduate.messhall.bean;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TblOrderRepository extends JpaRepository<TblOrder, Integer> {
    TblOrder findByOrderId(String orderId);

    List<TblOrder> findAllByBusinessIdOrderByTimeAsc(int businessId);

    List<TblOrder> findAllByCustomerIdOrderByTimeAsc(int customerId);

    List<TblOrder> findAllByOrderByTimeAsc();
}
