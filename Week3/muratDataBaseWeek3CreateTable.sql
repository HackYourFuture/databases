CREATE database library;
USE library;


CREATE TABLE employee(
    Id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(60) not null,
    password VARCHAR(60) 

);

CREATE TABLE member(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(60),
    last_name VARCHAR(60),
    adress VARCHAR(100),
    employee_id  INT,
    FOREIGN KEY( employee_id) REFERENCES employee(id)
   
);
CREATE TABLE Rock(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name   INT
);

CREATE TABLE Genre(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name INT
);

CREATE TABLE Book_Genres(
    book_id,
    genre_id
);

CREATE TABLE  book(
    id  INT AUTO_INCREMENT PRIMARY KEY,
    book_name VARCHAR(60),
    isbn  VARCHAR (20),
    edition INT,
    Rock_id INT,
    FOREIGN KEY( Rock_id) REFERENCES Rock(id)


);
CREATE TABLE  borrowed(
    id INT AUTO_INCREMENT PRIMARY KEY,
    book_id INT,
    member_id,
    return_date  date,
    returned BOOLEAN,
FOREIGN KEY (book_id) REFERENCES book(id),
FOREIGN KEY (member_id) REFERENCES member (id)
);



CREATE TABLE Author(
    id INT AUTO_INCREMENT PRIMAR KEY,
    first_name VARCHAR(60),
    last_name VARCHAR(60),
);

CREATE TABLE Book_Authors(
    book_id,
    author_id
);


