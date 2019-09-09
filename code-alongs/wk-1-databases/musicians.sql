DROP database IF EXISTS hyf_musicians2;
CREATE database hyf_musicians2;
USE hyf_musicians2;

CREATE TABLE Musicians(
    Id INT NOT NULL,
    FirstName TEXT NOT NULL,
    LastName TEXT NOT NULL,
    Born INT NOT NULL,
    PRIMARY KEY (Id)
);

CREATE TABLE Instruments(
    Id INT NOT NULL,
    Name TEXT NOT NULL,
    Type TEXT NOT NULL,
    PRIMARY KEY (Id)
);

CREATE TABLE InstrumentsPlayed(
    Id INT NOT NULL,
    Musician INT NOT NULL,
    Instrument INT NOT NULL,
    PRIMARY KEY (Id),
    FOREIGN KEY (Musician) REFERENCES Musicians(Id),
    FOREIGN KEY (Instrument) REFERENCES Instruments(Id)
);

INSERT INTO Musicians (Id, FirstName, LastName, Born) VALUES (1, 'Thelonious', 'Monk', 1917);
INSERT INTO Musicians (Id, FirstName, LastName, Born) VALUES (2, 'Sonny', 'Rollins', 1930);
INSERT INTO Musicians (Id, FirstName, LastName, Born) VALUES (3, 'Steve', 'Lehman', 1978);

INSERT INTO Instruments (Id, Name, Type) VALUES (1, 'Piano', 'Keys');
INSERT INTO Instruments (Id, Name, Type) VALUES (2, 'Tenor saxophone', 'Wind');
INSERT INTO Instruments (Id, Name, Type) VALUES (3, 'Soprano saxophone', 'Wind');
INSERT INTO Instruments (Id, Name, Type) VALUES (4, 'Alto saxophone', 'Wind');
INSERT INTO Instruments (Id, Name, Type) VALUES (5, 'Guitar', 'String');

INSERT INTO InstrumentsPlayed (Id, Musician, Instrument) VALUES (1, 1, 1);
INSERT INTO InstrumentsPlayed (Id, Musician, Instrument) VALUES (2, 2, 2);
INSERT INTO InstrumentsPlayed (Id, Musician, Instrument) VALUES (3, 2, 3);
INSERT INTO InstrumentsPlayed (Id, Musician, Instrument) VALUES (4, 3, 4);
