class myClass{
  constructor(stri){
    this.str=stri;
    const date=new Date();
    //console.log(stri);
    //console.log(date);
  }
  sayHello() {
    	console.log('Hello ' + this.str + '!');
	}
}
let mc=new myClass("new instant");
mc.sayHello();