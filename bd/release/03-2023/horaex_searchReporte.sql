CREATE DEFINER=`tape`@`localhost` PROCEDURE `horaex_searchReporte`(
IN desde varchar(25),
IN hasta varchar(25),
IN mes INT,
IN anio INT,
IN perId INT,
IN dep INT

)
BEGIN
	IF(perId = 0 ) THEN SET perId = NULL;END IF;
IF(dep = 0 ) THEN SET dep = NULL;END IF;
IF(desde = DATE('0000-00-00')) THEN SET desde = NULL; END IF;
IF(hasta = DATE('0000-00-00')) THEN SET hasta = NULL; END IF;
IF(desde = 'null') THEN SET desde = NULL; END IF;
IF(hasta = 'null') THEN SET hasta = NULL; END IF;
IF(desde is NOT NULL AND hasta IS NOT NULL) THEN SET mes = NULL;SET anio= NULL; END IF;
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
REPLACE(CONCAT(DATE_FORMAT(HorasExtra.Entrada,"%H:%i"),' a ',DATE_FORMAT(HorasExtra.Salida,"%H:%i")),'00:00','24:00') as Horario,
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
HorasExtra.Responsable,
 CONCAT(Personas.Apellido,', ',Personas.Nombre) as PersonaName,
 GROUP_CONCAT(CONCAT(Descansos.Entrada," a ",Descansos.Salida) SEPARATOR ' <br/> ') as Interrupciones
FROM HorasExtra
INNER JOIN Personas ON Personas.PersonaId = HorasExtra.PersonaId
INNER JOIN Dependencias ON Dependencias.DependenciaId = HorasExtra.DependenciaId
LEFT JOIN Descansos ON Descansos.HoraExId = HorasExtra.HoraExId

WHERE 
      (chId is Null or HorasExtra.ChoferId = chId)
   AND
      ((mes IS NULL OR anio IS NULL) OR
      DATE(HorasExtra.Fecha) BETWEEN DATE(CONCAT(anio,'-',mes,'-','01'))  AND LAST_DAY( DATE(CONCAT(anio,'-',mes,'-','01'))) )
   AND
      (dep is NULL or HorasExtra.DependenciaId = dep)
    AND
      (
        (desde is NULL or hasta is NULL)  
 or 
        (DATE(HorasExtra.Fecha) BETWEEN DATE(desde)  AND  DATE(hasta) )
 )
AND EstadoId = 0
GROUP BY HorasExtra.HoraExId
ORDER BY HorasExtra.Fecha,CONCAT(Personas.Apellido,', ',Personas.Nombre),Dependencias.Nombre;
END