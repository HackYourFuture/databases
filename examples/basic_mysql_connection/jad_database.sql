CREATE TABLE IF NOT EXISTS Jad_football_club (
	FC_name varchar(255),
	country varchar(255),
	language varchar(255),
	PRIMARY KEY (FC_name)
);

CREATE TABLE IF NOT EXISTS Jad_player (
	name varchar(255),
	position varchar(255),
	date_of_birth date,
	language varchar (255),
	FC_name varchar (255),
	PRIMARY KEY (name),
	FOREIGN KEY (FC_name) REFERENCES Jad_football_club(FC_name)
);

CREATE TABLE IF NOT EXISTS Jad_language (
	name varchar (255),
	number_of_speakers int,
	PRIMARY KEY (name)
);

CREATE TABLE IF NOT EXISTS Jad_footballclublanguage (
	FC_name varchar (255) REFERENCES Jad_football_club(FC_name),
	language_name varchar (255) REFERENCES Jad_language(name),
	PRIMARY KEY (FC_name,language_name)
);

INSERT INTO Jad_football_club (FC_name,country,language)
VALUES ("Arsenal","England","English"),
       ("Real madrid","Spain","Spanish"),
	   ("Ajax","Netherlands","Dutch");

INSERT INTO Jad_player (name,position,date_of_birth,language,FC_name)
VALUES ("Santi Cazorla","forward",28-07-1987,"spanish","Arsenal"),
	   ("Sergio Ramos","Defender",28-07-1987,"Spanish","Real madrid"),
	   ("Riechedly Bazoer","Defender",28-07-1987,"Dutch","Ajax");

INSERT INTO Jad_language (name,number_of_speakers)
VALUES ("English",1500000000),
	   ("Spanish",472000000),
	   ("Dutch",23000000);
