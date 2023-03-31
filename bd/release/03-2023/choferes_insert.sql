CREATE DEFINER=`tape`@`localhost` PROCEDURE `choferes_insert`(
IN fName varchar(100),
IN lName varchar(100),
IN leg varchar(100),
IN cel varchar(100),
IN a BIT
)
BEGIN
    INSERT INTO Choferes (FirstName,LastName,Legajo,Celular,Active)
    VALUES(fName,lName,leg,cel,a);
    
END