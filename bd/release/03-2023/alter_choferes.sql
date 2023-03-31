ALTER TABLE Choferes DROP COLUMN ValorHoraInhabil;
ALTER TABLE Choferes DROP COLUMN ValorHoraHabil;
ALTER TABLE Choferes DROP COLUMN ValorHoraExtra;
ALTER TABLE Choferes ADD COLUMN PersonaId INT NOT NULL DEFAULT 0;
UPDATE Choferes
INNER JOIN  Personas ON Personas.Legajo = Choferes.Legajo
SET Choferes.PersonaId = Personas.PersonaId 