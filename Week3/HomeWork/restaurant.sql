drop database if exists `restaurant`;
create database `restaurant`;
use `restaurant`;

drop table if exists `USER`;
create table `USER`(
	`User_Id` int NOT NULL AUTO_INCREMENT,
	`Fname` varchar(50) NOT NULL,
	`Lname` varchar(50) NOT NULL,
	`Password` varchar(50) NOT NULL,
	PRIMARY KEY (`User_Id`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

drop table if exists `RESTAURANT`;
create table `RESTAURANT`(
	`Name` varchar(100) NOT NULL,
	`Location` varchar(100) NOT NULL,
	`Contact` varchar(100) NOT NULL,
	`Opening_Closing_Time` varchar(100) NOT NULL,
	`Details` varchar(500) default NULL,
	PRIMARY KEY (`Name`)
)ENGINE=InnoDB DEFAULT CHARSET=latin1;

drop table if exists `OWNER`;
create table `OWNER`(
	`Fname` varchar(15) NOT NULL,
	`Lname` varchar(15) NOT NULL,
	`Contact` varchar(100) NOT NULL,
	`Rest_Name` varchar(100) NOT NULL,
	PRIMARY KEY (`Fname`,`Lname`,`Contact`),
	FOREIGN KEY (`Rest_Name`) REFERENCES `RESTAURANT`(`Name`)
	ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

drop table if exists `BILL`;
create table `BILL`(
	`Order_Id` int NOT NULL AUTO_INCREMENT,
	`Customer_Fname` varchar (20) NOT NULL,
	`Customer_Lname` varchar (20) NOT NULL,
	`Customer_id` int NOT NULL,
	`Total_Amount` double NOT NULL,	
	PRIMARY KEY (`Order_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

drop table if exists `MENU_BILL`;
create table `MENU_BILL`(
	`Order_Id` int NOT NULL,
	`Name` varchar(100) NOT NULL,
	`Quantity` varchar(20) NOT NULL,
	`Price` varchar(20) NOT NULL,
	FOREIGN KEY(`Order_Id`) REFERENCES `BILL`(`Order_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

drop table if exists `CUSTOMER`;
create table `CUSTOMER`(
	`Customer_Id` int NOT NULL AUTO_INCREMENT,
	`Fname` varchar(15) NOT NULL,
	`Lname` varchar(15) NOT NULL,
	`Contact` varchar(20) DEFAULT NULL,
	`Email_Id` varchar(50) DEFAULT NULL,	
	PRIMARY KEY (`Customer_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

drop table if exists `MANAGER`;
create table `MANAGER`(
	`Manager_Id` int NOT NULL AUTO_INCREMENT,
	`Fname` varchar(15) NOT NULL,
	`Lname` varchar(15) NOT NULL,
	`Contact` varchar(20) NOT NULL,
 	`Address` varchar(30) DEFAULT NULL,
  	`Salary` varchar(30) DEFAULT NULL,
	`Sex` char(1) DEFAULT NULL,
	`Bdate` date DEFAULT NULL,
	`Join_Date` date NOT NULL,
	PRIMARY KEY (`Manager_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

drop table if exists `WAITER`;
create table `WAITER`(
	`Waiter_Id` int NOT NULL AUTO_INCREMENT,
	`Fname` varchar(15) NOT NULL,
	`Lname` varchar(15) NOT NULL,
	`Contact` varchar(20) NOT NULL,
 	`Address` varchar(30) DEFAULT NULL,
  	`Salary` varchar(30) DEFAULT NULL,
	`Sex` char(1) DEFAULT NULL,
	`Bdate` date DEFAULT NULL,
	`Join_Date` date NOT NULL,
	PRIMARY KEY (`Waiter_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

drop table if exists `CASHIER`;
create table `CASHIER`(
	`Cashier_Id` int NOT NULL AUTO_INCREMENT,
	`Fname` varchar(15) NOT NULL,
	`Lname` varchar(15) NOT NULL,
	`Contact` varchar(20) NOT NULL,
 	`Address` varchar(30) DEFAULT NULL,
  	`Salary` varchar(30) DEFAULT NULL,
	`Sex` char(1) DEFAULT NULL,
	`Bdate` date DEFAULT NULL,
	`Join_Date` date NOT NULL,
	PRIMARY KEY (`Cashier_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

drop table if exists `COOK`;
create table `COOK`(
	`Cook_Id` int NOT NULL AUTO_INCREMENT,
	`Fname` varchar(15) NOT NULL,
	`Lname` varchar(15) NOT NULL,
	`Contact` varchar(20) NOT NULL,
 	`Address` varchar(30) DEFAULT NULL,
  	`Salary` varchar(30) DEFAULT NULL,
	`Sex` char(1) DEFAULT NULL,
	`Bdate` date DEFAULT NULL,
	`Join_Date` date NOT NULL,
	`Specialization` varchar(50) DEFAULT NULL,
	PRIMARY KEY (`Cook_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

drop table if exists `HOME_DELIVERY`;
create table `HOME_DELIVERY`(
	`Delivery_Id` int NOT NULL AUTO_INCREMENT,
	`Address` varchar(50) NOT NULL,
	`Contact` varchar(20) NOT NULL,
	`Cust_Id` int NOT NULL,
	`Order_Id` int NOT NULL,
	PRIMARY KEY(`Delivery_Id`),
	FOREIGN KEY (`Cust_Id`) REFERENCES `CUSTOMER`(`Customer_Id`),
	FOREIGN KEY (`Order_Id`) REFERENCES `BILL`(`Order_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

drop table if exists `DELIVERY_BOY`;
create table `DELIVERY_BOY`(
	`Delivery_Boy_Id` int NOT NULL AUTO_INCREMENT,
	`Fname` varchar(15) NOT NULL,
	`Lname` varchar(15) NOT NULL,
	`Contact` varchar(20) NOT NULL,
 	`Address` varchar(30) DEFAULT NULL,
  	`Salary` varchar(30) DEFAULT NULL,
	`Sex` char(1) DEFAULT NULL,
	`Bdate` date DEFAULT NULL,
	`Join_Date` date NOT NULL,
	PRIMARY KEY (`Delivery_Boy_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

drop table if exists `DELIVERY_BOY_2`;
create table `DELIVERY_BOY_2`(
	`Boy_Id` int NOT NULL,
	`Delivery_Id` int NOT NULL,
	FOREIGN KEY (`Boy_Id`) REFERENCES `DELIVERY_BOY`(`Delivery_Boy_Id`),
	FOREIGN KEY (`Delivery_Id`) REFERENCES `HOME_DELIVERY`(`Delivery_Id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

drop table if exists `MENU`;
create table `MENU`(
	`Menu_Id` int NOT NULL AUTO_INCREMENT,
	`Name` varchar(100) NOT NULL,
	`Price` varchar(20) NOT NULL,	
	`Type` varchar(20) DEFAULT NULL,
	`Category` varchar(30) NOT NULL,
	PRIMARY KEY(`Menu_Id`,`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

drop table if exists `SALE_DETAIL`;
create table `SALE_DETAIL`(
	`Date` date NOT NULL,
	`Daily` int NOT NULL,
	`Weekly` int DEFAULT NULL,
	`Monthly` int DEFAULT NULL,
	`Rname` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

drop table if exists `SUPPLIER`;
create table `SUPPLIER`(
	`Fname` varchar(15) NOT NULL,
	`Lname` varchar(15) NOT NULL,
	`Address` varchar(30) NOT NULL,
	`Contact` varchar(20) NOT NULL,
	`Details` varchar(500) DEFAULT NULL,
	PRIMARY KEY (`Fname`,`Lname`,`Address`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

drop table if exists `TABLES`;
create table `TABLES`(
	`Table_Number` varchar(9) NOT NULL,
	`Details` varchar(200) DEFAULT NULL,
	PRIMARY KEY (`Table_Number`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

drop table if exists `BOOKING`;
create table `BOOKING`(
	`Booking_Id` int NOT NULL AUTO_INCREMENT,
	`Table_Num` varchar(30) NOT NULL,
	`Date` varchar(30) NOT NULL,
	`Time` varchar(30) NOT NULL,
	`Cust_Id` int NOT NULL,
	PRIMARY KEY (`Booking_Id`),
	FOREIGN KEY (`Cust_Id`) REFERENCES `CUSTOMER`(`Customer_Id`),
	FOREIGN KEY (`Table_Num`) REFERENCES `TABLES`(`Table_Number`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

drop table if exists `INGREDIENT`;
create table `INGREDIENT`(
	`Ingredient_Id` int NOT NULL AUTO_INCREMENT,
	`Name` varchar(30) NOT NULL,
	`Quantity` varchar(15) NOT NULL,
	`Description` varchar(100) DEFAULT NULL,
	`Supp_Name` varchar(50) NOT NULL,
	PRIMARY KEY (`Ingredient_Id`,`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

insert into `RESTAURANT`(`Name`,`Location`,`Contact`,`Opening_Closing_Time`,`Details`)
values 
("Tandoori By Nature","Gandhi Nagar Jammu And Kashmir","09642540626/09581871321","10:00 AM - 12:00 AM","None");

insert into `OWNER`(`Fname`,`Lname`,`Contact`,`Rest_Name`)
values
("Yash","Vadalia","9999999999","Tandoori By Nature");

insert into `MANAGER`(`Fname`,`Lname`,`Contact`,`Address`,`Salary`,`Sex`,`Bdate`,`Join_Date`)
values
("Rishi Raj","Singh Jhelumi","9642540626","E-28 OBH , IIIT Hyderabad","30000","M","1992-09-29","2012-08-01"),
("Prachish","Gora","9581871321","E-27 OBH , IIIT Hyderabad","30000","M","1993-11-18","2012-08-01");

insert into `WAITER`(`Fname`,`Lname`,`Contact`,`Address`,`Salary`,`Sex`,`Bdate`,`Join_Date`)
values
("Raghav","Sharma","123456","E-22 OBH , IIIT Hyderabad","8000","U","1993-10-12","2012-08-01"),
("Rishav","Kumar","132244","E-28 OBH , IIIT Hyderabad","8000","M","1992-12-22","2012-08-01"),
("Vinil","Narang","213122","E-27 OBH , IIIT Hyderabad","8000","M","1993-05-12","2012-08-01"),
("Bharat","Jain","121232","E-26 OBH , IIIT Hyderabad","8000","M","1992-03-12","2012-08-01"),
("Megan","Fox","213122","Hollywood USA","9000","F","1986-10-13","2012-08-01"),
("Sunny","Leone","323322","Bollywood INDIA","9000","F","1982-10-13","2012-08-01");

insert into `CASHIER`(`Fname`,`Lname`,`Contact`,`Address`,`Salary`,`Sex`,`Bdate`,`Join_Date`)
values
("Abhinav","Mittal","124142","E-19 OBH , IIIT Hyderabad","12000","M","1993-11-30","2012-08-01"),
("Sanchit","Gangwar","113332","E-24 OBH , IIIT Hyderabad","12000","M","1993-02-21","2012-08-01"),
("Abhishek","Kumar","122121","E-25 OBH , IIIT Hyderabad","12000","M","1992-07-21","2012-08-01");

insert into `COOK`(`Fname`,`Lname`,`Contact`,`Address`,`Salary`,`Sex`,`Specialization`,`Bdate`,`Join_Date`)
values
("Bhavshuk","Jindal","123211","E-18 OBH , IIIT Hyderabad","15000","M","Maggi","1992-08-02","2012-08-01"),
("Japneet","Singh","231312","E-19 OBH , IIIT Hyderabad","15000","M","Samosa","1992-10-12","2012-08-01"),
("Dinesh","Singla","874594","E-18 OBH , IIIT Hyderabad","15000","M","Omlette","1992-03-14","2012-08-01"),
("Siddharth","Sinha","587654","E-26 OBH , IIIT Hyderabad","15000","M","Bonda","1992-01-01","2012-08-01"),
("Himanshu","Aggarwal","142355","E-24 OBH , IIIT Hyderabad","15000","M","Jalebi","1992-02-22","2012-08-01"),
("Priya","Rai","897933","HOLLYWOOD USA","15000","F","None","1980-01-02","2012-08-01");

insert into `DELIVERY_BOY`(`Fname`,`Lname`,`Contact`,`Address`,`Salary`,`Sex`,`Bdate`,`Join_Date`)
values
("Tarang","Goyal","133132","E-17 OBH , IIIT Hyderabad","10000","M","1993-02-21","2012-08-01"),
("Saksham","Maheshwari","657569","E-17 OBH , IIIT Hyderabad","10000","M","1992-10-21","2012-08-01"),
("Rajat","Agarwal","596509","E-16 OBH , IIIT Hyderabad","10000","M","1993-02-21","2012-08-01"),
("Vidit","Bhaskar","344244","E-15 OBH , IIIT Hyderabad","10000","M","1993-10-22","2012-08-01");

insert into `MENU`(`Name`,`Price`,`Type`,`Category`)
values
("Vegetable Pakora","3.00","Veg","Starters"),
("Vegetable Samosa","3.00","Veg","Starters"),
("Onion Bhaji ","3.00","Veg","Starters"),
("Potato and Mushroom Chaat","3.00","Veg","Starters"),
("Mushroom Garlic Fry","3.00","Veg","Starters"),
("Chicken Tikka","4.00","Non-Veg","Starters"),
("Tandoori Chicken","4.00","Non-Veg","Starters"),
("Chicken Garlic Fry","4.00","Non-Veg","Starters"),
("Chicken Tikka on Puree","4.00","Non-Veg","Starters"),
("Lamb Tikka","4.00","Non-Veg","Starters"),
("Tandoori King Prawn","6.95","Non-Veg","SeaFood"),
("King Prawn Rosun","5.95","Non-Veg","SeaFood"),
("King Prawn on Puree","5.95","Non-Veg","SeaFood"),
("Prawn Bhuna on Puree","3.95","Non-Veg","SeaFood"),
("Prawn Cocktail","3.95","Non-Veg","SeaFood"),
("Chi/Lam Sashlik Chi","9.95","Non-Veg","Tandoori Specials"),
("Tandoori Deluxe","12.95","Non-Veg","Tandoori Specials"),
("Tandoori Chicken Main","9.95","Non-Veg","Tandoori Specials"),
("Chicken Tikka","7.95","Non-Veg","Tandoori Specials"),
("Lamb Tikka","9.95","Non-Veg","Tandoori Specials"),
("Bombay Aloo ","6.50","Veg","Vegetable Dishes"),
("Mushroom Bhaji ","6.50","Veg","Vegetable Dishes"),
("Saag Dall","6.50","Veg","Vegetable Dishes"),
("Mattor Paneer","6.50","Veg","Vegetable Dishes"),
("Vegetable Roshun","6.50","Veg","Vegetable Dishes"),
("Boiled Rice","2.50","Veg","Side Orders - Rice"),
("Keema Pilau Rice","3.50","Non-Veg","Side Orders - Rice"),
("Mushroom Rice","3.20","Veg","Side Orders - Rice"),
("Garlic Naan","3.00","Veg","Side Orders - Bread"),
("Stuffed Naan","3.50","Veg","Side Orders - Bread"),
("Chapati","1.00","Veg","Side Orders - Bread"),
("Green Salad","2.00","Veg","Side Orders - Sundries"),
("Spice Popadum","0.80","Veg","Side Orders - Sundries"),
("Chutney","0.70","Veg","Side Orders - Sundries"),
("Ras Malai","2.95","Veg","Dessert"),
("Ice Cream","2.95","Veg","Dessert"),
("Gulab Jamun","2.95","Veg","Dessert"),
("Kulfi","2.95","Veg","Dessert"),
("Kheer","2.95","Veg","Dessert");

insert into `SUPPLIER`(`Fname`,`Lname`,`Address`,`Contact`,`Details`)
values
("Varun","Vashisht","E-121 OBH , IIIT Hyderabad","123211","Provides Non-Veg Stuff."),
("Aneeq","Dholakia","E-15 OBH , IIIT Hyderabad","678668","Provides Sea Food."),
("Sharad","Gupta","E-16 OBH , IIIT Hyderabad","856855","Provides Grocery.");

insert into `TABLES`(`Table_Number`,`Details`)
values
("1","Capacity 4 People"),
("2","Capacity 4 People Near Window"),
("3","Capacity 3 People"),
("4","Capacity 2 People"),
("5","Capacity 8 People Family Table");

insert into `CUSTOMER`(`Fname`,`Lname`,`Contact`,`Email_Id`)
values
("Arpit","Sharma","938912","arpit.sharma@students.iiit.ac.in"),
("Yash","Shah","289374","yash.shah@students.iiit.ac.in"),
("Darshit","Serna","234322","darshit.serna@students.iiit.ac.in"),
("Aditya","Sharma","778989","aditya.sharma@students.iiit.ac.in"),
("Pallav","Shah","364932","pallav.shah@students.iiit.ac.in"),
("Rajat","Bharadwaj","734277","rajat.bharadwaj@students.iiit.ac.in"),
("Achintya","Madhav","347534","achintya.madhav@students.iiit.ac.in");

insert into `USER`(`Fname`,`Lname`,`Password`)
values
("admin","admin","admin"),
("Akhil","Jindal","cheetah"),
("Deepak","Goyal","manga"),
("RoopGUN","Deeep","sodhi");
