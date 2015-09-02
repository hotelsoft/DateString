var DateString = require("../src/DateString");

//Get System Timezone.
console.log(DateString.getSystemTimeZone());
//This will return +0530 if you are on India.

//Today in timezone -1000
console.log(DateString.today("-1000"));
//2015-09-01

//Today in timezone +0530
console.log(DateString.today("+0530"));
//2015-09-02

var x = new DateString("2014-04-01");
console.log("Year " + x.getYear());//
console.log("Month " + x.getMonth());//
console.log("Date " + x.getDate());//
console.log(x);
console.log(x.val());
console.log(JSON.stringify(x));
console.log({date: x});
console.log(JSON.stringify({date: x}));
console.log("-== clone");
console.log(x.clone().add(-20));
console.log("Yesterday as per India timeZone");
console.log((new DateString(DateString.today("+0530"))).clone().add(0).val());




