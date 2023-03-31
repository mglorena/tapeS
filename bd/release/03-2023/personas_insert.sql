CREATE DEFINER=`tape`@`localhost` PROCEDURE `personas_insert`(

IN aDo  varchar(250),
IN nbre  varchar(250),
IN leg int,
IN tdni varchar(5),
IN cargo varchar(250),
IN cat varchar(10),
IN tel varchar(45),
IN e varchar(45),
IN dom varchar(250),
IN a bit,
IN cl int,
IN fn Date,
IN fi Date,
IN doc varchar(45)

)
BEGIN

INSERT INTO `tape`.`Personas`
(
`Apellido`,
`Nombre`,
`Legajo`,
`TipoDNI`,
`CargoDesc`,
`Categoria`,
`Telefono`,
`Email`,
`Domicilio`,
`Active`,
`CUIL`,
`FechaNac`,
`FechaIngreso`,
`DNI`)
VALUES
( UPPER(aDo),UPPER(nbre), leg, tdni, cargo, cat, tel, e, dom, a, cl,fn, fi, doc);


END