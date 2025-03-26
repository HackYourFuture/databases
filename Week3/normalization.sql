-- Table: Member
CREATE TABLE Member (
    member_id INT PRIMARY KEY,
    member_name VARCHAR(100),
    member_address VARCHAR(200)
);

-- Table: Venue
CREATE TABLE Venue (
    venue_code VARCHAR(10) PRIMARY KEY,
    venue_name VARCHAR(100)
);

-- Table: Food
CREATE TABLE Food (
    food_id VARCHAR(10) PRIMARY KEY,
    food_description VARCHAR(100)
);

-- Table: Dinner
CREATE TABLE Dinner (
    dinner_id VARCHAR(10) PRIMARY KEY,
    dinner_date DATE,
    venue_code VARCHAR(10),
    food_id VARCHAR(10),
    FOREIGN KEY (venue_code) REFERENCES Venue(venue_code),
    FOREIGN KEY (food_id) REFERENCES Food(food_id)
);

-- Table: Dinner_Attendance
CREATE TABLE Dinner_Attendance (
    member_id INT,
    dinner_id VARCHAR(10),
    PRIMARY KEY (member_id, dinner_id),
    FOREIGN KEY (member_id) REFERENCES Member(member_id),
    FOREIGN KEY (dinner_id) REFERENCES Dinner(dinner_id)
);

-- Member data
INSERT INTO Member (member_id, member_name, member_address) VALUES
(1, 'Amit', '325 Max park'),
(2, 'Ben', '242 Hudson lane'),
(3, 'Cristina', '516 6th Ave'),
(4, 'Dan', '389 John St'),
(5, 'Gabor', '325 Max park'),
(6, 'Hema', '516 Gavildal St'),
(7, NULL, '89 Peter St');

-- Venue data
INSERT INTO Venue (venue_code, venue_name) VALUES
('B01', 'Grand Ball Room'),
('B02', 'Zoku Roof Top'),
('B03', 'Goat Farm'),
('B04', 'Mama\'s Kitchen'),
('B05', 'Hungry Hungary');

-- Food data
INSERT INTO Food (food_id, food_description) VALUES
('F01',  'Curry'),
('F02', 'Cake'),
('F03',  'Soup'),
('F04', 'Pie'),
('F05', Mousse');

-- Dinner data
INSERT INTO Dinner (dinner_id, dinner_date, venue_code, food_id) VALUES
('D0000101', '2020-03-15', 'B01', 'F01'),
('D0000102', '2020-03-15', 'B02', 'F02'),
('D0000103', '2020-03-16', 'B02', 'F02'),
('D0000104', '2020-03-20', 'B03', 'F03'),
('D0000105', '2020-03-22', 'B03', 'F03'),
('D0000106', '2020-03-25', 'B04', 'F04'),
('D0000107', '2020-04-01', 'B05', 'F05');

-- Dinner_Attendance data
INSERT INTO Dinner_Attendance (member_id, dinner_id) VALUES
(1, 'D0000101'),
(2, 'D0000102'),
(3, 'D0000103'),
(4, 'D0000104'),
(1, 'D0000105'),
(3, 'D0000105'),
(5, 'D0000106'),
(6, 'D0000107'),
(7, 'D0000103');