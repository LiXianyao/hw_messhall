package edu.graduate.messhall.bean;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface TblOrderRepository extends JpaRepository<TblOrder, Integer> {
    TblOrder findByOrderId(int orderId);

    List<TblOrder> findAllByBusinessIdOrderByTimeAsc(int businessId);

    List<TblOrder> findAllByCustomerIdOrderByTimeAsc(int customerId);

    List<TblOrder> findAllByOrderByTimeAsc();

    List<TblOrder> findAllByTimeBetweenAndStateEqualsOrderByTimeAsc(Date start, Date end, String status);

    List<TblOrder> findAllByTimeBetweenAndBusinessIdAndStateEqualsOrderByTimeAsc(Date start, Date end, int businessId, String status);

    List<TblOrder> findAllByTimeBetweenAndCustomerIdAndStateEqualsOrderByTimeAsc(Date start, Date end, int customerId, String status);
}
