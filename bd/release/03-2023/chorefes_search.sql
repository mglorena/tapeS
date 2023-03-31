CREATE DEFINER=`tape`@`localhost` PROCEDURE `choferes_search`(
 IN chId INT,
 IN fName varchar(100),
 IN lName varchar(100),
 IN leg INT,
 IN a BIT 

)
BEGIN
SET NAMES 'utf8';

SELECT 
	 UPPER(Choferes.FirstName) as FirstName, 
     UPPER(Choferes.LastName) as LastName, 
    -- UPPER(Personas.Nombre) as FirstName, 
    -- UPPER(Personas.Apellido) as LastName, 
    Personas.Legajo,
    Choferes.ChoferId,
    Personas.Telefono,
    CASE WHEN Personas.Active = 1 THEN 'Si' ELSE 'No' END as Active
from Personas

INNER JOIN Choferes ON Choferes.Legajo = Personas.Legajo
WHERE 
      (chId is Null or Choferes.ChoferId = chId)
   AND
     (a is Null or Choferes.Active = a)
   AND
      (fName is NULL or Choferes.FirstName COLLATE utf8_spanish_ci like concat(fName,'%'))
   AND
      (lName is NULL or Choferes.LastName COLLATE utf8_spanish_ci like concat(lName,'%'))
   AND
      (leg is NULL or Choferes.Legajo =leg);
   
END