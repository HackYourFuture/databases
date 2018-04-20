CREATE database bag;
use bag;


CREATE TABLE `product` ( 
    `id` int(10) NOT NULL AUTO_INCREMENT, 
    `name` varchar(45) NOT NULL , 
    `price` double ,
     PRIMARY KEY (`id`));



CREATE tABLE `product material` ( 
    `product_id` int(10) NOT NULL , 
    `color` varchar(45) , 
    `size` varchar(45),
    `number_of_paint_colors` int(10), 
    `color_type` varchar(45),
    `leather_type` varchar(45),
    UNIQUE (`product_id`), 
    FOREIGN KEY (`product_id`) REFERENCES `product` (`id`));



CREATE tABLE `product material` ( 
    `product_id` int(10) NOT NULL ,
    `color` varchar(45) , 
    `size` varchar(45), 
    `number_of_paint_colors` int(10), 
    `color_type` varchar(45), 
    `leather_type` varchar(45),
    UNIQUE KEY `product_id` (`product_id`),
    CONSTRAINT `fk_material` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`));  



CREATE TABLE `product_photos` ( 
    `product_id` int(10) NOT NULL ,
    `photo` varchar(100) NOT NULL,   
    CONSTRAINT `fk_photo` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`));



 CREATE TABLE `customer` (
    `id` int(10) NOT NULL AUTO_INCREMENT,
    `email` varchar(45) NOT NULL ,
    `password` varchar(45) NOT NULL ,
    `first_name` varchar(45),
    `last_name` varchar(45),
    PRIMARY KEY (`id`),
    UNIQUE KEY `email` (`email`));



CREATE TABLE `order` ( 
    `order_id` int(10) NOT NULL AUTO_INCREMENT , 
    `customer_id` int(10) NOT NULL , 
    `product_id` int(10) NOT NULL, 
    PRIMARY KEY (`order_id`), 
    CONSTRAINT `fk_customer` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`), 
    CONSTRAINT `fk_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`));



CREATE TABLE `sale_offices` (    -> `id` int(10) NOT NULL AUTO_INCREMENT ,    -> `name` varchar(45) NOT NULL ,
    `address` varchar(100) NOT NULL ,
    `tel` int(10) ,
    `email` varchar(100),
    `more_detail` varchar(100),
    PRIMARY KEY (`id`));