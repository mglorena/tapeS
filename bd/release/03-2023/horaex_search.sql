CREATE DEFINER=`tape`@`localhost` PROCEDURE `horaex_search`(
IN mes INT,
IN anio INT,
IN perId INT,
IN dep INT

)
BEGIN


IF(perId = 0 ) THEN SET perId = NULL;END IF;
IF(dep = 0 ) THEN SET dep = NULL;END IF;


SET NAMES 'utf8';

 SELECT
`HorasExtra`.`HoraExId`,
`HorasExtra`.`ChoferId`,
`HorasExtra`.`PersonaId`,
HorasExtra.Fecha,
DATE_FORMAT(HorasExtra.Fecha,"%d/%m/%y") as FechaG,
DATE_FORMAT(HorasExtra.Entrada,"%H:%i") as Entrada,
DATE_FORMAT(HorasExtra.Salida,"%H:%i") as Salida,
DATE_FORMAT(HorasExtra.TMSalida,"%H:%i") as TMSalida,
DATE_FORMAT(HorasExtra.TMEntrada,"%H:%i") as TMEntrada,
DATE_FORMAT(HorasExtra.TTSalida,"%H:%i") as TTSalida,
DATE_FORMAT(HorasExtra.TTEntrada,"%H:%i") as TTEntrada,
CONCAT(DATE_FORMAT(HorasExtra.Entrada,"%H:%i"),' a ',DATE_FORMAT(HorasExtra.Salida,"%H:%i")) as Horario,
`HorasExtra`.`Concepto`,
`HorasExtra`.`Calculado`,
`HorasExtra`.`Zona`,
Descansos.DescansoId,
`HorasExtra`.`TotalHoras`,
HorasExtra.Hora50,
HorasExtra.Hora100,
CONCAT(
    IFNULL(
        CONCAT(
            DATE_FORMAT(HorasExtra.TMEntrada,"%H:%i"),' a ',DATE_FORMAT(HorasExtra.TMSalida,"%H:%i")
               ),''
         )
     ,'',
IFNULL(
        CONCAT(
            DATE_FORMAT(HorasExtra.TTEntrada,"%H:%i"),' a ',DATE_FORMAT(HorasExtra.TTSalida,"%H:%i")
                ),''
      )
) as Laboral,
CASE 
     WHEN Jornada = 0 AND Zona = 1 THEN ''
     WHEN Jornada = 1 AND Zona = 1 THEN 'Completa' 
     WHEN Zona = 2 THEN ' '
     WHEN Jornada is NULL THEN '' END as Jornada,

`HorasExtra`.`DependenciaId`,
Dependencias.Nombre as Dependencia,
`HorasExtra`.`Create`,
`HorasExtra`.`Modified`,
`HorasExtra`.`VehiculoId`,
CASE WHEN HorasExtra.EstadoId = 0 THEN 'Pendiente' ELSE 'Presentada' END as Estado,
IFNULL(HorasExtra.EstadoId,0) as EstadoId,
HorasExtra.Responsable,
 CONCAT(Personas.Apellido,', ',Personas.Nombre) as PersonaName,
 GROUP_CONCAT(CONCAT(Descansos.Entrada," a ",Descansos.Salida) SEPARATOR ' <br/> ') as Interrupciones
 
FROM HorasExtra
INNER JOIN Personas ON Personas.PersonaId = HorasExtra.PersonaId
INNER JOIN Dependencias ON Dependencias.DependenciaId = HorasExtra.DependenciaId
LEFT JOIN Descansos ON Descansos.HoraExId = HorasExtra.HoraExId

WHERE 
      (perId is Null or HorasExtra.PersonaId = perId)
   AND
      DATE(HorasExtra.Fecha) BETWEEN DATE(CONCAT(anio,'-',mes,'-','01'))  AND LAST_DAY( DATE(CONCAT(anio,'-',mes,'-','01'))) 
   AND
      (dep is NULL or HorasExtra.DependenciaId = dep)
GROUP BY HorasExtra.HoraExId
ORDER BY HorasExtra.Fecha,CONCAT(Personas.Apellido,', ',Personas.Nombre),Dependencias.Nombre;
END