CREATE DEFINER=`tape`@`localhost` PROCEDURE `horaex_getAll`()
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
`HorasExtra`.`Zona`,
`HorasExtra`.`TotalHoras`,
`HorasExtra`.`DependenciaId`,
`HorasExtra`.`Create`,
`HorasExtra`.`Modified`,
`HorasExtra`.`VehiculoId`,
`HorasExtra`.`TMEntrada`,
`HorasExtra`.`TMSalida`,
`HorasExtra`.`TTEntrada`,
`HorasExtra`.`TTSalida`,
`HorasExtra`.`Responsable`,
`HorasExtra`.`Hora50`,
`HorasExtra`.`Hora100`
FROM `tape`.`HorasExtra`;


END