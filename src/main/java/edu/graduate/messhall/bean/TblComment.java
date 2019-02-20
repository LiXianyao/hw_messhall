package edu.graduate.messhall.bean;

import lombok.Data;
import org.hibernate.annotations.Generated;
import org.hibernate.annotations.GenerationTime;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name="tblcomment")
@Data
public class TblComment {
    @Id //是主键
    @GenericGenerator(strategy = "uuid", name = "commentId")
    @GeneratedValue(generator = "commentId")
    @Column(nullable = false , length = 100, columnDefinition = "无意义uuid主键")
    private String commentId;

    @Column(nullable = false , length = 512, columnDefinition = "评论正文")
    private String content;

    @Column(name = "createdTime", insertable = false, updatable = false, columnDefinition = "创建时间")
    @Generated(GenerationTime.INSERT)
    private Timestamp createdTime;

    public TblComment(String content){
        this.content = content;
    }

}
