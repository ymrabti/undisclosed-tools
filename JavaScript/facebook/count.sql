/****** Script de la commande SelectTopNRows à partir de SSMS  ******/
SELECT HeaderActivity,COUNT(HeaderActivity) AS 'NOMBR'
FROM AdminRec
GROUP BY HeaderActivity
ORDER BY NOMBR DESC
/*SELECT TOP (1000) [ID_Activity]
      ,[HeaderActivity]
      ,[Created]
      ,[IpAdress]
      ,[Browser]
      ,[Cookie]
      ,[NomUser]
      ,[DateInsertRow]
  FROM [MyDataFacebook].[dbo].[AdminRec]*/