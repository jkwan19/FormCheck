DROP DATABASE IF EXISTS progress;

CREATE DATABASE progress;

USE progress;

CREATE TABLE workout (
  id int NOT NULL AUTO_INCREMENT,
  workout_name varchar(50) NOT NULL,
  photo_id int NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE photos (
  id int NOT NULL AUTO_INCREMENT,
  date_posted varchar(50) NOT NULL
  PRIMARY KEY (id)
)

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
