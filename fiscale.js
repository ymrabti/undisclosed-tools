var emissions = 145
var horsepower = 140
var kilwatts = 0.736 * horsepower
var kilwattsRound = Math.round(kilwatts)
var fsc = (emissions / 45) + (kilwatts / 45) * 1.6
var fscRound = Math.round(fsc)
console.table({ kilwatts, kilwattsRound, fsc, fscRound });