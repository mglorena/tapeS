ALTER DATABASE tape CHARACTER SET utf8 COLLATE utf8_spanish_ci;
ALTER TABLE Personas CONVERT TO CHARACTER SET utf8 COLLATE utf8_spanish_ci;
ALTER TABLE Personas MODIFY Nombre VARCHAR(150) CHARACTER SET utf8 COLLATE utf8_spanish_ci;
ALTER TABLE Personas MODIFY Apellido VARCHAR(150) CHARACTER SET utf8 COLLATE utf8_spanish_ci;
ALTER TABLE `tape`.`Personas` 
CHANGE COLUMN `Nombre` `Nombre` VARCHAR(150) CHARACTER SET 'utf8' COLLATE 'utf8_spanish_ci' NOT NULL ;
SET character_set_client = 'utf8';
SET character_set_results = 'utf8';
SET collation_connection = @@collation_database;