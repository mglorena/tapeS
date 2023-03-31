CREATE DEFINER=`tape`@`localhost` PROCEDURE `personas_getAllPersons`()
BEGIN
SET character_set_client = 'utf8';
SET character_set_results = 'utf8';
SET collation_connection = @@collation_database;
SET NAMES 'utf8';
SELECT 
   `Personas`.`PersonaId`,
    UPPER(CONCAT(Apellido,',  ',Nombre)) as 'Empleado',
    UPPER(`Personas`.`Apellido`) as Apellido,
	UPPER(Personas.Nombre) as Nombre,
    `Personas`.`Legajo`,
    `Personas`.`TipoDNI`,
    `Personas`.`CargoDesc`,
    `Personas`.`Categoria`,
    `Personas`.`UserId`,
    `Personas`.`Telefono`,
    `Personas`.`Email`,
    `Personas`.`Domicilio`,
    CASE WHEN `Personas`.`Active` = 1 THEN 'on' ELSE 'off' END as Activo,
    `Personas`.`VacacionesDias`,
    `Personas`.`Observaciones`,
    `Personas`.`Antiguedad`,
    `Personas`.`Compensatorio`,
    `Personas`.`CUIL`,
  DATE_FORMAT(    `Personas`.`FechaNac`,"%d/%m/%Y") as FechaNac,
DATE_FORMAT(    `Personas`.`FechaIngreso`,"%d/%m/%Y") as FechaIngreso,

    `Personas`.`DNI`,
    `Personas`.`AntAnses`
FROM `tape`.`Personas` ORDER BY Apellido asc;

END