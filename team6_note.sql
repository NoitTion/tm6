create database cloudnote  DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
use cloudnote;

create table user(
id int not null AUTO_INCREMENT,
username text not null,
password text not null,
createTime timestamp not null default current_timestamp,
primary key(`id`)
);

create table notebook(
id int not null auto_increment primary key,
userid int not null,
bookName text not null,
isShare tinyint not null,
isDelete tinyint default 0,
createTime timestamp not null default current_timestamp,
updateTime timestamp not null default current_timestamp on update current_timestamp,
isStart tinyint not null,
noteNumber int not null default 0,
sharedpeople text default null,
foreign key(userid) references user(id)

);
create table note(
id int not null primary key auto_increment,
userid int null,
title text not null;
content text not null,
createtime timestamp not null default current_timestamp,
updatetime timestamp not null default current_timestamp on update current_timestamp,
markID text default null,
notebookID int default null,
remindTime timestamp default null,
isStart tinyint not null,
isShare tinyint not null,
isdelete tinyint not null,
sharedpeople text default null,
foreign key(notebookID) references notebook(id)
);
create table comment(
id int not null primary key auto_increment,
userid int not null,
noteid int not null,
content	text not null,
filename text default null,
ext text default null,
type text default null,
filepath text,
createTime timestamp not null default current_timestamp,
foreign key(userid) references user(id));

create table mark(
id int not null primary key auto_increment,
userid int,
markName text not null,
isStart tinyint not null,
createTime timestamp not null default current_timestamp,
updateTime timestamp not null default current_timestamp on update current_timestamp,
isdelete tinyint default 0,
foreign key (userid) references user(id)
);
