function pow2(n){
  var pw=1;var p=0;
  while(n>=pw){
    pw*=2;p++;
        }
  return [p-1,p];
}
function lastByMath(n,start){
  var m=pow2(n)[0];
  return (n-2**m)*2+start;
}
console.log(lastByMath(129,3));