[0, 1, 2, 3, 4].reduce(function(accumulator, currentValue, currentIndex, array) {
  return accumulator + currentValue;
  console.log("currentIndex = " + currentIndex);
  console.log("array = " + array);
})