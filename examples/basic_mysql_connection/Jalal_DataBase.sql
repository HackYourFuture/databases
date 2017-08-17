
create table jalal_doctors(
    fullName varchar(255) not null,
        email varchar (255), primary key(email)
    );

create table jalal_patients(
        fullName varchar(255) not null, 
        email varchar (255), primary key(email)
    );


CREATE TABLE jalal_healthRelation (
        doctorEmail  varchar(255) not null ,
        patientEmail varchar(255) not null,
        FOREIGN KEY (doctorEmail) REFERENCES jalal_doctors(email),
        FOREIGN KEY (patientEmail) REFERENCES jalal_patients(email)
    );


INSERT INTO jalal_doctors values 
    ('jalal' , 'jalal@gmail.com'), 
    ('karam', 'karam@hotmail.com'), 
    ('jan', 'jan@live.com');

INSERT INTO jalal_patients values 
    ('waseem' , 'waseem@gmail.com'), 
    ('aws', 'aws@hotmail.com'), 
    ('ahmad', 'ahmad@live.com');

INSERT INTO jalal_healthRelation values ('jalal@gmail.com' , 'waseem@gmail.com'), ('jalal@gmail.com', 'aws@hotmail.com'), ('jan@live.com', 'ahmad@live.com'),
('karam@hotmail.com','waseem@gmail.com'),('karam@hotmail.com','ahmad@live.com');
