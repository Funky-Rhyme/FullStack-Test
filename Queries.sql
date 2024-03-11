-- Задание 1

USE [SQLTest]

GO

INSERT INTO dbo.Clients (Id, ClientName) VALUES (1, 'Client A');
INSERT INTO dbo.Clients (Id, ClientName) VALUES (2, 'Client B');
INSERT INTO dbo.Clients (Id, ClientName) VALUES (3, 'Client C');

INSERT INTO ClientContacts (Id, ClientId, ContactType, ContactValue) VALUES (1, 1, 'Email', 'clientA@example.com');
INSERT INTO ClientContacts (Id, ClientId, ContactType, ContactValue) VALUES (2, 1, 'Phone', '123-456-7890');
INSERT INTO ClientContacts (Id, ClientId, ContactType, ContactValue) VALUES (3, 2, 'Email', 'clientB@example.com');
INSERT INTO ClientContacts (Id, ClientId, ContactType, ContactValue) VALUES (4, 2, 'Phone', '987-654-3210');
INSERT INTO ClientContacts (Id, ClientId, ContactType, ContactValue) VALUES (5, 3, 'Email', 'clientC@example.com');
INSERT INTO ClientContacts (Id, ClientId, ContactType, ContactValue) VALUES (6, 3, 'Phone', '555-555-5555');




USE [Test]

GO

SELECT
	ClientName,
	COUNT(cc.Id) AS ContactCount
FROM 
	Clients AS c
	left join ClientContacts AS cc ON c.Id = cc.ClientId
GROUP BY 
	c.ClientName



USE [Test]

GO

SELECT
	c.ClientName,
	COUNT(cc.Id) AS ContactCount
FROM 
	Clients AS c
	join ClientContacts AS cc ON c.Id = cc.ClientId
GROUP BY 
	c.ClientName
HAVING 
	COUNT(cc.Id) > 2
	
	
	
-- Задание 2
	

USE [Test]

DELETE FROM Dates

INSERT INTO Dates VALUES 
(1, CONVERT(DATE, '01/01/2021', 103)),
(1, CONVERT(DATE, '10/01/2021', 103)),
(1, CONVERT(DATE, '30/01/2021', 103)),
(2, CONVERT(DATE, '15/01/2021', 103)),
(2, CONVERT(DATE, '30/01/2021', 103));


SELECT 
	d1.Id,
	d1.Date AS Sd,
	MIN(d2.Date) AS Ed
FROM 
	Dates d1
JOIN Dates d2 ON d1.Id = d2.Id and d1.Date < d2.Date
GROUP BY d1.Id, d1.Date
ORDER BY d1.Id, Sd;
	