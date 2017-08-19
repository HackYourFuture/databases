create table home_owner
(
    owner_id        SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    first_name      VARCHAR(10),
    last_name       VARCHAR(20)
);

create table email
(
    email_id        SMALLINT UNSIGNED PRIMARY KEY,
    email_address   VARCHAR(40)
);

create table owner_email
(
    owner_id        SMALLINT UNSIGNED,
    email_id        SMALLINT UNSIGNED,
    PRIMARY KEY emails_PK(owner_id, email_id),
    CONSTRAINT owner_email_FK FOREIGN KEY(owner_id) REFERENCES    home_owner(owner_id) ON DELETE CASCADE,
    CONSTRAINT email_owner_FK FOREIGN KEY(email_id) REFERENCES email(email_id) ON DELETE CASCADE
);

insert into home_owner (first_name, last_name) values
("Angel", "Flop"),
("Bob", "Hoe"),
("Sue", "Hoe");

insert into email values
(1, "angel@hio.com"),
(2, "bob@ioj.com"),
(3, "sue@iojoiv.com");

