create database boardgame;

drop table if exists boardgames;
create table boardgames
(
	id int auto_increment,
	name varchar(80) not null,
	publisher varchar(60) not null,
	category int not null,
	description varchar(200) null,
	year int null,
	constraint boardgames_pk
		primary key (id)
);

drop table if exists favorites;
create table favorites
(
	id int auto_increment,
	boardgame_id int not null,
	constraint favorites_pk
		primary key (id),
	constraint favorites_boardgames_id_fk
		foreign key (boardgame_id) references boardgames (id)
);
