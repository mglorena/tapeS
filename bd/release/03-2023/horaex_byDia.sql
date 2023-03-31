CREATE DEFINER=`tape`@`localhost` PROCEDURE `horaex_byDia`(
IN d DATE 
)
BEGIN
SELECT
`HorasExtra`.`HoraExId`,
`HorasExtra`.`ChoferId`,
`HorasExtra`.`PersonaId`,
`HorasExtra`.`Fecha`,
`HorasExtra`.`Entrada`,
`HorasExtra`.`Salida`,
`HorasExtra`.`Concepto`,
`HorasExtra`.`Calculado`,
`HorasExtra`.`DescansosId`,
`HorasExtra`.`Zona`,
`HorasExtra`.`HorasNoc`,
`HorasExtra`.`MinNoc`,
`HorasExtra`.`TotalHoras`,
`HorasExtra`.`MinTot`,
`HorasExtra`.`DependenciaId`,
`HorasExtra`.`Create`,
`HorasExtra`.`Modified`,
`HorasExtra`.`VehiculoId`
FROM HorasExtra WHERE Fecha = d;


END