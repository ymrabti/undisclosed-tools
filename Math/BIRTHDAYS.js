function joinBirthdays(brth1,brth2,n,etapes=100) {
	birth1 = Math.max(brth1,brth2);
	birth2 = Math.min(brth1,brth2);
	var now = birth1;n = Math.max(n,2);
	var age1 = now - birth1;var age2 = now - birth2;
	var etape = 0;
	while(age2!=n*age1 && etape <etapes){
		now ++;etape ++;
		age1 = now - birth1;
		age2 = now - birth2;
	}
	if (etape==etapes) {console.log("Impossible !");}
	else{
	console.log("now = " + now);
	console.log("etape = " + etape);
	console.log("age1 = " + age1);
	console.log("age2 = " + age2);}
}
// joinBirthdays(1990,2000,2)