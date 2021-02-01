USE [FB]
GO

SELECT *
  FROM animeFillerList
  WHERE nomAnime='NarutoShippuden' AND -- nom de l'anime
  typeepisode!='filler' AND -- type episode
  numberepisode>=141 AND -- borne inferieur
  numberepisode<=270  -- borne supperieur
GO


