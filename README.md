# DateString
Insanity Free Date Library for "YYYY-MM-DD" format.

# What is it
It a Date Utility library. If your application need to deal with multiple time zone and this library will help you out.

# Why we need it ?
Well, in most of the applications, "YYYY-MM-DD" format more than sufficient. We are over engineering with date object. for example, there are many thing in Application which has a daywise attribute. birthdate or start of a season or revenue earned on a perticular day. All these example do not need a preceise notation `new Date()` of date. In practicle, for almost many purpose, "YYYY-MM-DD" format is minimum sufficient format to work it.

# I like "MM-DD-YYYY" format.
Here is the mistake, I think, you are talking about UI Display format for date. Yes, it can be anything. We are not talking about what date to display. It can be anything. You can show anything on UI. We are talking on what format to send to server, in which format we must receive it and process it.

# API

## DateString.getSystemTimeZone()

```js
var p  = DateString.getSystemTimeZone();
console.log(p);
//This will return +0530 if you are on India.
```
# DateString.today()

```js
//Today in timezone -1000
console.log(DateString.today("-1000"));    //2015-09-01
//
//Today in timezone +0530
console.log(DateString.today("+0530"));    //2015-09-02
```

# Author
(C) 2015 Narendra Sisodiya, MIT License
