select ReactionType,count( ReactionType ) as 'compteur' from MyReactions
WHERE DateActivity<'2016-03-07 21:32:00.000'
group by ReactionType
order by compteur