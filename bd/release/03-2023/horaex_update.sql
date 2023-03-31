CREATE DEFINER=`tape`@`localhost` PROCEDURE `horaex_update`( 

IN hExId INT,
IN perId INT,
IN F DATE,
IN E TIME,
IN S TIME,
IN Con VARCHAR(150),
IN Cal BIT,
IN Z INT,
IN TH FLOAT,
IN DepId INT,
IN VeId INT,
IN TME TIME,
IN TMS TIME,
IN TTE TIME,
IN TTS TIME,
IN Resp VARCHAR(150),
IN H50 TIME,
IN H100 TIME,
IN Jo BIT
)
BEGIN

  IF(H50 = "00:00:00") THEN SET H50=NULL; END IF;
  IF(H100 = "00:00:00") THEN SET H100=NULL; END IF;
  IF(TME = "00:00:00") THEN SET TME=NULL; END IF;
  IF(TMS = "00:00:00") THEN SET TMS=NULL; END IF;
  IF(TTS = "00:00:00") THEN SET TTS=NULL; END IF;
  IF(TTE = "00:00:00") THEN SET TTE=NULL; END IF;
  IF(TH = "00:00") THEN SET TH=NULL; END IF;
  IF(TH = '0') THEN SET TH=NULL; END IF;
  SET TH=IFNULL(TH, 0) ;

 

    IF(hExId = 0 OR hExId IS NULL) 
     THEN
     
        INSERT INTO HorasExtra
        (`PersonaId`,`Fecha`,`Entrada`,`Salida`,`Concepto`,`Calculado`,`Zona`,`TotalHoras`,`DependenciaId`,`Create`,`Modified`,`VehiculoId`,`TMEntrada`,`TMSalida`,`TTEntrada`,`TTSalida`,`Responsable`,`Hora50`,`Hora100`,`Jornada`)
        VALUES
        (perId,F,E,S,Con,Cal,Z,TH,DepId,CURDATE(),CURDATE(),VeId,TME,TMS,TTE,TTS,Resp,H50,H100,Jo);
        SELECT LAST_INSERT_ID() as Id;
    ELSE
        UPDATE HorasExtra
        SET
        `PersonaId` = perId,
        `Fecha` = F,
        `Entrada` = E,
        `Salida` = S,
        `Concepto` = Con,
        `Calculado` = Cal,
        `Zona` = Z,
        `TotalHoras` = TH,
        `DependenciaId` = DepId,
        `Modified` = CURDATE(),
        `VehiculoId` = VeId,
        `TMEntrada` = TME,
        `TMSalida` = TMS,
        `TTEntrada` = TTE,
        `TTSalida` = TTS,
        `Responsable` = Resp,
        `Hora50` = H50,
        `Hora100` = H100,
         Jornada = Jo
        WHERE HoraExId = hExId;
        SELECT hExId as Id;
    END IF;



END