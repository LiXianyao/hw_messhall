package edu.graduate.messhall.bean;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface TblOrderRepository extends JpaRepository<TblOrder, Integer> {
    TblOrder findByOrderId(int orderId);

    List<TblOrder> findAllByBusinessIdOrderByTimeDesc(int businessId);

    List<TblOrder> findAllByCustomerIdOrderByTimeDesc(int customerId);

    List<TblOrder> findAllByOrderByTimeAsc();

    List<TblOrder> findAllByTimeBetweenAndStateEqualsOrderByTimeDesc(Date start, Date end, String status);

    List<TblOrder> findAllByTimeBetweenAndBusinessIdAndStateEqualsOrderByTimeDesc(Date start, Date end, int businessId, String status);

    List<TblOrder> findAllByTimeBetweenAndCustomerIdAndStateEqualsOrderByTimeDesc(Date start, Date end, int customerId, String status);
}
