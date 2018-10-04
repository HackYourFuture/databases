  CREATE TABLE IF NOT EXISTS `mydb`.`tag` (
    `id` INT NULL DEFAULT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX (`name` ASC) VISIBLE
  );
  CREATE TABLE IF NOT EXISTS `mydb`.`todo` (
    `id` INT NULL DEFAULT NULL AUTO_INCREMENT,
    `description` VARCHAR(255) NOT NULL,
    `done` TINYINT NOT NULL,
    `timestamp` DATETIME NULL DEFAULT NULL,
    PRIMARY KEY (`id`)
);
  CREATE TABLE IF NOT EXISTS `mydb`.`tag_todos` (
    `todo` INT NOT NULL,
    `tag` INT NOT NULL,
    PRIMARY KEY (`todo`, `tag`),
    INDEX `idx_tag_todos` (`tag` ASC) VISIBLE,
    CONSTRAINT `fk_tag_todos__tag` FOREIGN KEY (`tag`) REFERENCES `mydb`.`tag` (`id`),
    CONSTRAINT `fk_tag_todos__todo` FOREIGN KEY (`todo`) REFERENCES `mydb`.`todo` (`id`)
  );