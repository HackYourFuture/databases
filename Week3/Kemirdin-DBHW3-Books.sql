CREATE DATABASE DBBooks;
USE DBBooks;
--    Database: Books
-- ------------------------------------------------------
-- Table structure for table `Authors`


DROP TABLE IF EXISTS Authors;

CREATE TABLE Authors
(
    author_id int(11) NOT NULL
    AUTO_INCREMENT,
  last_name text COLLATE utf8_unicode_ci NOT NULL,
  first_name text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY
    ( author_id )
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- Dumping data for table `Authors`
LOCK TABLES Authors WRITE;

    INSERT INTO Authors
    VALUES
        (1, 'Lopez Baranda', 'Christina'),
        (2, 'Jin-Soon', 'Sin'),
        (3, 'Jones', 'Hannah'),
        (4, 'Novak', 'Stanislaw'),
        (5, 'Turay', 'Tandice'),
        (6, 'Roy', 'Shanta'),
        (7, 'Berger', 'Henry')
    ,
 
UNLOCK TABLES;
    -- Table structure for table `Books`
    DROP TABLE IF EXISTS Books;

    CREATE TABLE Books
    (
        book_id int(11) NOT NULL
        AUTO_INCREMENT,
  title text COLLATE utf8_unicode_ci NOT NULL,
  ISBN text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY
        (book_id)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


-- Dumping data for table `Books`

LOCK TABLES Books WRITE;

        INSERT INTO Books
        VALUES
            (1, 'Creating relational databases for fun and profit', '7654321123456'),
            (2, 'Relational databases for really, really smart people', '9876543212345'),
            (3, 'My life with relational databases: a memoir', '3212345678909'),
            (4, 'Relational databases: an existential journey', '8172635412345');

        UNLOCK TABLES;

        -- Table structure for table `BooksAuthors`

        DROP TABLE IF EXISTS BooksAuthors;

        CREATE TABLE BooksAuthors
        (
            book_id int (11) NOT NULL,
            author_id int(11) NOT NULL,
            KEY book_id
            (book_id),
  KEY author_id
            (author_id),
  CONSTRAINT BooksAuthors_ibfk_2 FOREIGN KEY
            (author_id) REFERENCES Authors
            (author_id),
  CONSTRAINT BooksAuthors_ibfk_1 FOREIGN KEY
            (book_id) REFERENCES Books
            (book_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



-- Dumping data for table `BooksAuthors`;


LOCK TABLES BooksAuthors WRITE;

            INSERT INTO BooksAuthors
            VALUES
                (3, 6),
                (2, 4),
                (2, 5),
                (1, 1),
                (1, 3),
                (1, 5),
                (4, 8);

            UNLOCK TABLES;


            -- Table structure for table `Editions`


            DROP TABLE IF EXISTS Editions;

            CREATE TABLE Editions
            (
                edition_id int(11) NOT NULL
                AUTO_INCREMENT,
  book_id int
                (11) NOT NULL,
  date_of_publication year
                (4) NOT NULL,
  edition_number text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY
                (edition_id),
  KEY book_id
                (book_id),
CONSTRAINT Editions_ibfk_1 FOREIGN KEY
                (book_id) REFERENCES Books
                (book_id)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



-- Dumping data for table `Editions`


LOCK TABLES Editions WRITE;

                INSERT INTO Editions
                VALUES
                    (1, 3, 2001, '1'),
                    (2, 3, 2003, '2'),
                    (3, 4, 2003, '1'),
                    (5, 1, 2000, '1'),
                    (6, 3, 2005, '3'),
                    (8, 2, 2012, '1')
                ,

UNLOCK TABLES;