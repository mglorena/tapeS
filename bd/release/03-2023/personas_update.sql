CREATE DEFINER=`tape`@`localhost` PROCEDURE `personas_update`(
IN pId INT,
IN Ap VARCHAR(150),
IN Nn VARCHAR(150),
IN l INT(11),
IN cdesc VARCHAR(150),
IN cat VARCHAR(45),
IN dom VARCHAR(150),
IN tel VARCHAR(45),
IN fn DATE,
IN tipodn varchar(45),
IN dn varchar(45),
IN a BIT,
IN fi DATE

)
BEGIN
SET NAMES 'utf8mb4';
UPDATE `Personas`
SET
`Apellido` = UPPER(Ap),
`Nombre` = UPPER(Nn),
`Legajo` = l,
`CargoDesc` = cdesc,
`Categoria` = cat,
`Domicilio` = dom,
Telefono = tel,
FechaNac = fn,
TipoDNI = tipodn,
DNI = dn,
Active = a,
FechaIngreso = fi
WHERE `PersonaId` =pId;

END