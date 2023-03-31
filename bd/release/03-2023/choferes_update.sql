CREATE DEFINER=`tape`@`localhost` PROCEDURE `choferes_update`(
IN chId INT,
IN fName varchar(100),
IN lName varchar(100),
IN leg varchar(100),
IN cel varchar(100),
IN a BIT
)
BEGIN  
    
    IF(chId = 0 OR chId IS NULL) 
     THEN
        INSERT INTO Choferes (FirstName,LastName,Legajo,Celular,Active)
        VALUES(fName,lName,leg,cel,a);
    ELSE
        UPDATE Choferes SET FirstName=fName, LastName=lName, 
        Legajo=leg,Celular=cel,Active=a
        WHERE ChoferId = chId;
    END IF;

END