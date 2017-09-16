CREATE SCHEMA IF NOT EXISTS `storage` DEFAULT CHARACTER SET utf8 ;
USE `storage` ;

CREATE TABLE IF NOT EXISTS `storage`.`material` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `unit` VARCHAR(15) NOT NULL,
  `minimum_quantity_allowed` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `storage`.`supplier` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `phone_1` VARCHAR(20) NOT NULL,
  `phone_2` VARCHAR(20) NULL,
  `email` VARCHAR(45) NOT NULL,
  `address` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `storage`.`purchase_order` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATETIME NOT NULL,
  `supplier_id` INT NOT NULL,
  PRIMARY KEY (`id`, `supplier_id`),
  INDEX `fk_purchase_order_supplier_idx` (`supplier_id` ASC),
  CONSTRAINT `fk_purchase_order_supplier`
    FOREIGN KEY (`supplier_id`)
    REFERENCES `storage`.`supplier` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `storage`.`purchase_material` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `material_id` INT NOT NULL,
  `purchase_order_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  `expiration_date` DATE NOT NULL,
  `purchasing_price` DECIMAL NOT NULL,
  `selling_price` DECIMAL NOT NULL,
  PRIMARY KEY (`id`, `material_id`, `purchase_order_id`),
  INDEX `fk_storage_material1_idx` (`material_id` ASC),
  INDEX `fk_storage_purchase_order1_idx` (`purchase_order_id` ASC),
  CONSTRAINT `fk_storage_material1`
    FOREIGN KEY (`material_id`)
    REFERENCES `storage`.`material` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_storage_purchase_order1`
    FOREIGN KEY (`purchase_order_id`)
    REFERENCES `storage`.`purchase_order` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `storage`.`sale_order` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `storage`.`sale_material` (
  `purchase_material_id` INT NOT NULL,
  `sale_order_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  PRIMARY KEY (`purchase_material_id`, `sale_order_id`),
  INDEX `fk_sale_material_sale_order1_idx` (`sale_order_id` ASC),
  CONSTRAINT `fk_sale_material_purchase_material1`
    FOREIGN KEY (`purchase_material_id`)
    REFERENCES `storage`.`purchase_material` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_sale_material_sale_order1`
    FOREIGN KEY (`sale_order_id`)
    REFERENCES `storage`.`sale_order` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;