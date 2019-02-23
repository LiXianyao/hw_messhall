package edu.graduate.messhall.bean;

import org.springframework.data.jpa.repository.JpaRepository;

import java.sql.Timestamp;
import java.util.List;

public interface TblCommentRepository extends JpaRepository<TblComment, Integer> {
    TblComment findByCommentId(String CommentId);

    List<TblComment> findAllByOrderByCreatedTimeDesc();
}
