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

