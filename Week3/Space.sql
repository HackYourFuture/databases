CREATE DATABASE Space;
USE Space;

CREATE TABLE constellation (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255),
  best_seen DATE,
  brightest_star VARCHAR(255),
  discovery_date DATE,
  right_ascension VARCHAR(255),
  declination INT,
  PRIMARY KEY (id)
)

CREATE TABLE star (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(255),
  constellation_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (constellation_id) REFERENCES constellation(id)
)

CREATE TABLE user (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL,
  country VARCHAR(255),
  city VARCHAR(255),
  PRIMARY KEY (id)
)

CREATE TABLE user_constellation (
  user_id INT NOT NULL,
  constellation_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id),
  FOREIGN KEY (constellation_id) REFERENCES constellation(id)
)