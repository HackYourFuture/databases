DROP DATABASE IF EXISTS hyf_musicians;
CREATE DATABASE hyf_musicians;
USE hyf_musicians;

CREATE TABLE Musicians(
    Id INT NOT NULL,
    FirstName TEXT NOT NULL,
    LastName TEXT NOT NULL,
    Born INT NOT NULL,
    PRIMARY KEY (Id)
);

CREATE TABLE InstrumentsPlayed(
    Id INT NOT NULL,
    Musician INT NOT NULL,
    Instrument TEXT NOT NULL,
    PRIMARY KEY (Id),
    FOREIGN KEY (Musician) REFERENCES Musicians(Id)
);

INSERT INTO Musicians (Id, FirstName, LastName, Born) VALUES (1, 'Thelonious', 'Monk', 1917);
INSERT INTO Musicians (Id, FirstName, LastName, Born) VALUES (2, 'Sonny', 'Rollins', 1930);
INSERT INTO Musicians (Id, FirstName, LastName, Born) VALUES (3, 'Steve', 'Lehman', 1978);

INSERT INTO InstrumentsPlayed (Id, Musician, Instrument) VALUES (1, 1, 'Piano');
INSERT INTO InstrumentsPlayed (Id, Musician, Instrument) VALUES (2, 2, 'Tenor saxophone');
INSERT INTO InstrumentsPlayed (Id, Musician, Instrument) VALUES (3, 2, 'Soprano saxophone');
INSERT INTO InstrumentsPlayed (Id, Musician, Instrument) VALUES (4, 3, 'Alto saxophone');
