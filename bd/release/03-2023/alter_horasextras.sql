ALTER TABLE HorasExtra ADD COLUMN PersonaId INT NOT NULL DEFAULT 0;
UPDATE HorasExtra
INNER JOIN  Choferes ON Choferes.ChoferId = HorasExtra.ChoferId
SET HorasExtra.PersonaId = Choferes.PersonaId 

ALTER TABLE `tape`.`HorasExtra` 
CHANGE COLUMN `ChoferId` `ChoferId` INT(11) NULL ;
