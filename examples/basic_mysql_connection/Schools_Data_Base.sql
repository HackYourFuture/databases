CREATE TABLE IF NOT EXISTS aws_schools (
	name varchar(255),
	postcode varchar(10),
	start_date date,
	PRIMARY KEY (name)
);

CREATE TABLE IF NOT EXISTS aws_classes (
	calsses_id       int  NOT NULL  AUTO_INCREMENT,
	name   		     varchar(255),
	school 		     varchar(255),
	max_no_students  int,
	location         varcahar(255),
	PRIMARY KEY (id),
	FOREIGN KEY (school) REFERANCES aws_schools(name)
);

CREATE TABLE IF NOT EXISTS aws_teacher(
	teacher_id int  NOT NULL  AUTO_INCREMENT,
	name varchar(255),
	birth_date	date,
	gender bit(1),
	PRIMARY KEY(teacher_id)
);

CREATE TABLE IF NOT EXISTS aws_students(
	student_id   int  NOT NULL  AUTO_INCREMENT,
	name 		 varcahar(255),
    birth_date   date,
	gender       bit(1),
	PRIMARY KEY(student_id)	
);

CREATE TABLE IF NOT EXISTS aws_teacher_classes(
	teacher_id int REFERENCES aws_teacher(teacher_id),
	class_id   int REFERENCES aws_classes(classes_id),
	PRIMARY KEY(teacher_id, class_id)
);

CREATE TABLE  IF NOT EXISTS aws_students_classes(
	teacher_id int REFERENCES aws_students(student_id),
	class_id   int REFERENCES aws_classes(classes_id),
	PRIMARY KEY(teacher_id, class_id)
);

INSERT INTO aws_schools
VALUES ('Amsterdam Primary school','2033 XM', '2015-07-09'),
	   ('Rotterdam Primary School','1254 AS','2005-02-05');
	  
INSERT INTO aws_teacher(name, birth_date,gender)
VALUES ('Jason','1980-08-01','1'),
	   ('Gijs','1992-10-03',1),
	   ('Unmesh ','1987-07-07',1),
	   ('Joost','1965-04-05',1);

INSERT INTO aws_students(name, birth_date,gender)
VALUES ('Ahmad','1980-08-01',1),
	   ('Adel','1992-10-03',1),
	   ('Said','1987-07-07',1),
	   ('Jad','1965-04-05',1),
	   ('Nada','1980-08-01',0),
	   ('Suad','1992-10-03',0),
	   ('Said','1987-07-07',1),
	   ('Mustafa','1965-04-05',1);


	   



		
