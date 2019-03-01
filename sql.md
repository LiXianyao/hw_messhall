CREATE DATABASE IF NOT EXISTS messHall  DEFAULT CHARSET utf8 COLLATE utf8_general_ci;
create table tbluser
(
  userId     int auto_increment
    primary key,
  userName   varchar(100)     not null,
  userPass   varchar(100)     not null,
  userPhone  varchar(100)     not null,
  userAge    int(3)           null,
  userGender int(1) default 0 null comment '0为未填写，1为男，2为女',
  userType   varchar(50)      not null comment '0为admin，1为business，2为customer'
)
  comment '用户信息表';



create table tblfood
(
  foodId    int auto_increment
    primary key,
  foodName  varchar(100) not null,
  foodPrice int          not null,
  belongId  int          not null comment '餐品所属商家',
  constraint tblfood_tbluser_userId_fk
    foreign key (belongId) references tbluser (userId)
      on update cascade on delete cascade
)
  comment '餐品信息表';



create table tblorder
(
  orderId    varchar(100)                       not null
    primary key,
  businessId int                                not null,
  customerId int                                not null,
  time       datetime default CURRENT_TIMESTAMP not null,
  price      int default '0'                    not null,
  phone      varchar(100)                       not null,
  state      varchar(20) default '未支付'          not null,
  content    varchar(512)                       not null,
  constraint tblorder_tbluser_userId_fk
  foreign key (customerId) references tbluser (userId)
    on update cascade
    on delete cascade,
  constraint tblorder_tbluser_userId_fk_2
  foreign key (businessId) references tbluser (userId)
);





create table tblcomment
(
  commentId   varchar(100)                        not null
    primary key,
  content     varchar(512)                        not null,
  createdTime timestamp default CURRENT_TIMESTAMP not null
);

create table tblcart
(
  cartId  int auto_increment
    primary key,
  userId  int             null,
  foodId  int             null,
  foodNum int default '1' not null,
  constraint tblCart_tblfood_foodId_fk
  foreign key (foodId) references tblfood (foodId)
    on delete cascade,
  constraint tblCart_tbluser_userId_fk
  foreign key (userId) references tbluser (userId)
    on delete cascade
);









