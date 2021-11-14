/****** Script de la commande SelectTopNRows à partir de SSMS  ******/
SELECT DISTINCT FriendsMessages.[ID_USER]
      ,FriendsMessages.[NomPrenom]
      ,[LinkMediaMessages]
  FROM [FB].[dbo].[FriendsMessages]--,FriendsList
  --WHERE FriendsList.NomPrenom=FriendsMessages.NomPrenom