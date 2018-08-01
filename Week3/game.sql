CREATE database clash_of_clans;
USE clash_of_clans;

CREATE TABLE users (
  user_id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR (1024),
  password VARCHAR (1024),
  PRIMARY KEY (user_id)
);

CREATE TABLE village (
  village_id INT NOT NULL AUTO_INCREMENT,
  user_id INT,
  name VARCHAR (1024),
  PRIMARY KEY (village_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE clan (
    clan_id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR (1024),
    PRIMARY KEY (clan_id)
);

CREATE TABLE user_clan (
  user_id INT,
  clan_id INT,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (clan_id) REFERENCES clan(clan_id),
  CONSTRAINT my_constraint PRIMARY KEY (user_id, clan_id)
);

