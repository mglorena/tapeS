CREATE DEFINER=`tape`@`localhost` PROCEDURE `horaex_RepByChofer`(
IN meses VARCHAR(50),
IN a INT
)
BEGIN
DECLARE c INT DEFAULT 0;
DECLARE mes INT DEFAULT 0;
call split_string(meses,',');
SELECT Count(*) FROM SplitValues INTO c;
SET lc_time_names = 'es_AR';
SET c = c + 1;

CREATE TEMPORARY TABLE RepPersona
(
 Leg INT(5) NOT NULL ,
 Nombre varchar(250),
 Mes varchar(15),
 HorasHabiles TIME,
 HorasInhabiles TIME,
 Dependencia varchar(250)
);


WHILE c > 0 DO
    SELECT value FROM SplitValues  LIMIT 1 into mes ;

    INSERT INTO RepPersona (Leg,Nombre, Mes,HorasHabiles,HorasInhabiles,Dependencia)
    SELECT 
    Legajo as Leg,
    UPPER(CONCAT(Personas.Nombre,' ',Personas.Apellido)) as Persona,
    CONCAT(CONVERT(MONTHNAME(HorasExtra.Fecha),char(15)),'/',CONVERT(DATE_FORMAT(HorasExtra.Fecha,'%y'),char(5))) as Mes,
    SEC_TO_TIME( SUM( TIME_TO_SEC( `Hora50` ) ) )  as 'Hs. Habiles',
    SEC_TO_TIME( SUM( TIME_TO_SEC( `Hora100` ) ) ) as 'Hs. Inhabiles',
    Dependencias.Nombre as Dependencia
    FROM 
    HorasExtra
    INNER JOIN Personas ON Personas.PersonaId = HorasExtra.PersonaId
    INNER JOIN Dependencias ON Dependencias.DependenciaId = HorasExtra.DependenciaId
    WHERE 
    DATE(HorasExtra.Fecha) BETWEEN DATE(CONCAT(a,'-',mes,'-','01'))  AND LAST_DAY( DATE(CONCAT(a,'-',mes,'-','01')))
	AND EstadoId = 0
    GROUP BY Personas.PersonaId
    ORDER BY Legajo asc, Dependencias.Nombre asc;
    DELETE FROM SplitValues WHERE value = mes;
    SET c = c-1;
END WHILE;

SELECT * FROM RepPersona
GROUP BY Leg,Nombre,Dependencia
;
DROP TABLE RepPersona;
END