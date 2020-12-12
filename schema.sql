### Schema
CREATE DATABASE pab_db;
USE pab_db;

CREATE TABLE users
(
	id int NOT NULL AUTO_INCREMENT,
	userName varchar(255) NOT NULL,
	password varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    post_ids var
	PRIMARY KEY (id)
);
CREATE TABLE blogs
(
    id int NOT NULL AUTO_INCREMENT,
	post_title varchar(255) NOT NULL,
	post_content TEXT NOT NULL,
    post_author int NOT NULL,
    post_date datetime
    PRIMARY KEY (id)
)
