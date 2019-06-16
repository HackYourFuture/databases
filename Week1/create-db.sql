CREATE DATABASE hackyourfuture;

USE hackyourfuture;

CREATE TABLE classes(
  `number` INT PRIMARY KEY,
  date_started DATE
);

CREATE TABLE students(
  `name` VARCHAR
(250),
  country_of_origin VARCHAR
(50),
  birth_date DATE,
  surname VARCHAR
(250),
  id INT PRIMARY KEY,
  class_number INT,
  FOREIGN KEY
(class_number) REFERENCES classes
(`number`)
);

CREATE TABLE courses
(
  id INT PRIMARY KEY,
  `name` VARCHAR
  (250),
  `description` VARCHAR
  (250),
  duration_in_weeks SMALLINT
);

  CREATE TABLE enrollment
  (
    student_id INT,
    course_id INT,
    is_finished BOOLEAN,
    FOREIGN KEY (student_id) REFERENCES students(id),
    FOREIGN KEY (course_id) REFERENCES courses(id)
  );

  INSERT INTO classes
    (`number`, date_started
  )
  VALUES
  (20,'2019-01-01'),
  (19, '2018-12-01');

  SELECT *
  FROM classes
  WHERE date_started >= '2018-12-31';

  INSERT INTO students
    (id, `name`, country_of_origin,birth_date,surname,class_number
  )
  VALUES
  (1, 'Martin','Slovakia','2000-01-01','Joshua',20),
  (2,'Jan','The Netherlands', '1985-05-05','Vermeer', 20);

  SELECT *
  FROM students
  WHERE class_number = 20;

  INSERT INTO courses
    (id, `name`, `decription
  `, duration_in_weeks)
  VALUES
  (1, 'HTML/CSS','Teaching basic HTML',3),
  (2, 'JS1','Teaching basic JavaScript',3),
  (3, 'JS2','Teaching more advanced JavaScript',3),
  (4, 'Database','Teaching basic Database',3),

  INSERT INTO enrollment
    (student_id, course_id, is_finished)
  VALUES
    (1, 1, 1),
    (1, 2, 1),
    (1, 3, 0),

    (2, 1, 1),
    (2, 2, 1),
    (2, 3, 1),
    (2, 4, 0),

    (3, 1, 1),
    (3, 2, 0),
    (3, 3, 0),
    (3, 4, 0);



  -- the name of the students who finished the second course

  SELECT `name
  `
  FROM students
  JOIN enrollment ON enrollment.student_id = students.id
  WHERE enrollment.course_id = 2
  AND enrollment.is_finished = 1;

  -- all the enrollments with the student name and the course name
  -- if the enrollnent is finished

  SELECT students.name, courses.name
  FROM students
    JOIN enrollment ON enrollment.student_id = students.id
    JOIN courses ON enrollment.course_id = courses.id
  WHERE enrollment.is_finished=1;

  -- find the student whose name start with M

  SELECT *
  FROM students
  WHERE `name` LIKE 'M%';
  -- NOT LIKE



  SELECT *
  FROM students
  ORDER BY `name` DESC;


SELECT COUNT
  (*)
FROM students;