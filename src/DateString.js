
var DateString = function () {

};

DateString.prototype = {

};
DateString.prototype.constructor = DateString;

//Static Methods

/*
*  Return  = Current date in "YYYY-MM-DD" format.
* */
DateString.today = function (timeZone) {
	//TODO Validate timeZone
	if(DateString._validateTimeZone(timeZone) === true){
		var n = Date.now();
		var nowInDifferentTimezone =
				n - DateString._timeZoneToMilliseconds(DateString.getSystemTimeZone())
				+ DateString._timeZoneToMilliseconds(timeZone);
		return DateString._DateObjToYYYYMMDDformat(new Date(nowInDifferentTimezone));
	}else{
		throw "Invalid TimeZone";
	}

};

module.exports = DateString;


DateString.getSystemTimeZone = function () {
	return (new Date()).toString().split("GMT")[1].split(" ")[0];
};

DateString._validateTimeZone = function (timeZone) {
	//TODO Validate timeZone

	return true;
};

DateString._timeZoneToMilliseconds = function (timeZone) {

	var h = parseInt(timeZone[1] + timeZone[2], 10);
	var m = parseInt(timeZone[3] + timeZone[4], 10);
	return parseInt(timeZone[0] + (h*60+m), 10) * 60000;
};
DateString._DateObjToYYYYMMDDformat = function (d) {
	var yyyy = d.getFullYear().toString();
	var mm = (d.getMonth()+1).toString(); // getMonth() is zero-based
	var dd  = d.getDate().toString();
	return yyyy + "-" +(mm[1]?mm:"0"+mm[0]) + "-" +(dd[1]?dd:"0"+dd[0]); // padding
};