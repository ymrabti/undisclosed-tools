USE [MyDataFacebook]


CREATE TABLE [dbo].[Polls](
	[ID_Activity] uniqueidentifier PRIMARY KEY DEFAULT (newid()),
	
	[HeaderActivity] [nvarchar](200) NOT NULL,
	[TextActivity] [nvarchar](200) NOT NULL,
	[DateActivity] [datetime] NOT NULL,


	[NomUser] [nvarchar](50) NOT NULL,
	[DateInsertRow] [datetime] DEFAULT GETDATE()
) 


