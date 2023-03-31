CREATE DEFINER=`tape`@`localhost` PROCEDURE `horaex_checkDuplicates`(
IN hexId INT,
IN perId INT,
IN fe DATETIME,
IN depId INT,
IN veId INT,
IN e TIME,
IN s TIME
)
BEGIN

    SELECT HoraExId as Duplicate ,'' as DuplicateHora, Fecha
    FROM HorasExtra
    WHERE
        PersonaId = perId 
    AND
        Fecha = DATE_FORMAT(fe,"%Y-%m-%d")
    AND
        DependenciaId = depId
    AND 
        VehiculoId = veId
    AND
        HoraExId <> hexId

    UNION

    SELECT '' as Duplicate, HoraExId as DuplicateHora , Fecha
    FROM HorasExtra
    WHERE
        Fecha = DATE_FORMAT(fe,"%Y-%m-%d") 
    AND 
        VehiculoId = veId
    AND 
       (( HorasExtra.Entrada BETWEEN e AND s) OR
         (HorasExtra.Salida BETWEEN e AND S)
        )
    AND 
        ChoferId <> chId

     AND
        HoraExId <> hexId;
        


END