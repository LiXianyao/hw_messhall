CREATE DATABASE IF NOT EXISTS messHall  DEFAULT CHARSET utf8 COLLATE utf8_general_ci;
create table tbluser
(
  userId     int auto_increment
    primary key,
  userName   varchar(100)     not null,
  userPass   varchar(100)     not null,
  userPhone  varchar(100)     not null,
  userAge    int(3)           null,
  userGender int(1) default 0 null comment '0Ϊδ��д��1Ϊ�У�2ΪŮ',
  userType   varchar(50)      not null comment '0Ϊadmin��1Ϊbusiness��2Ϊcustomer'
)
  comment '�û���Ϣ��';



create table tblfood
(
  foodId    int auto_increment
    primary key,
  foodName  varchar(100) not null,
  foodPrice int          not null,
  belongId  int          not null comment '��Ʒ�����̼�',
  constraint tblfood_tbluser_userId_fk
    foreign key (belongId) references tbluser (userId)
      on update cascade on delete cascade
)
  comment '��Ʒ��Ϣ��';



create table tblfood
(
  foodId    int auto_increment
    primary key,
  foodName  varchar(100) not null,
  foodPrice int          not null,
  belongId  int          not null comment '��Ʒ�����̼�',
  constraint tblfood_tbluser_userId_fk
    foreign key (belongId) references tbluser (userId)
      on update cascade on delete cascade
)
  comment '��Ʒ��Ϣ��';

create table tblorder
(
  orderId    varchar(100)                          not null
    primary key,
  businessId int                                   not null,
  customerId int                                   not null,
  time       datetime    default CURRENT_TIMESTAMP not null,
  price      int         default 0                 not null,
  phone      varchar(100)                          not null,
  state      varchar(20) default 'δ֧��'             not null,
  content    varchar(512)                          not null,
  constraint tblorder_tbluser_userId_fk
    foreign key (customerId) references tbluser (userId)
      on update cascade on delete cascade
);



create table tblcomment
(
  commentId   varchar(100)                        not null
    primary key,
  content     varchar(512)                        not null,
  createdTime timestamp default CURRENT_TIMESTAMP not null
);






