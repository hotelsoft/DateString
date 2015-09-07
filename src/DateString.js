/**
 * Created by narendrasisodiya on 03/09/15.
 */

let monthNames = [undefined, "January", "February", "March", "April", "May", "June", "July", "August", "September",
	"October", "November", "December"];
//Remember - monthNames[0] is undefined
//Remember - monthNames[1] is January

var intToMonthStr = [undefined, "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];


var DateString = function (str) {
	//TODO validate str
	//this._d = str;
	if (DateString._validateDateString(str) === true) {
		Object.defineProperty(this, "_d", {
			value: str,
			enumerable: false,
			configurable: false,
			writable: true
		});
	}
};

DateString.prototype = {
	toString: function () {
		return this._d;
	},
	toJSON: function () {
		return this._d;
	},
	valueOf: function () {
		return "" + this._d + "";
	},
	getYear: function () {
		return parseInt(this._d.split("-")[0]);
	},
	getMonth: function () {
		return parseInt(this._d.split("-")[1]);
	},
	getDate: function () {
		return parseInt(this._d.split("-")[2]);
	},
	getYearStr: function () {
		return this._d.split("-")[0];
	},
	getMonthStr: function () {
		return this._d.split("-")[1];
	},
	getDateStr: function () {
		return this._d.split("-")[2];
	},
	val: function () {
		return this + "";
	},
	getDayString: function () {
		return DateString._weekdaysFull[(new Date(new Date(this.val())).getDay())];
	},
	getDayIndex: function () {
		return (new Date(new Date(this.val())).getDay());
	},
	getMonthName: function () {
		return monthNames[this.getMonth()];
	},
	/*       Chaining Methods            */

	clone: function () {
		return new DateString(this.val())
	},
	add: function (n) {
		if (isInt(n)) {
			//Convert to timestamp with current timzone
			var newStr = DateString._DateObjToYYYYMMDDformat(new Date(new Date(this.val()).getTime() + n * 24 * 3600000));
			this._d = newStr;
			return this;
		} else {
			throw "Error, argument provided on add() function is not a integer.";
		}
	},
	takeItToFirstDayOfCurrentMonth(){
		var arr = this._d.split("-");
		arr[2] = "01";
		this._d = arr.join("-");
		return this;
	},
	takeItToFirstDayOfCurrentYear(){
		var arr = this._d.split("-");
		arr[1] = "01";
		arr[2] = "01";
		this._d = arr.join("-");
		return this;
	},
	takeItToFirstDayOfNextMonth(){
		if (this.getMonth() + 1 === 13) {
			this._d = (this.getYear() + 1) + "-01-01";
		} else {
			this._d = this.getYear() + "-" + intToMonthStr[this.getMonth() + 1] + "-01";
		}
		return this;
	},
	takeItToFirstDayOfPrevMonth(){
		if (this.getMonth() - 1 === 0) {
			this._d = (this.getYear() - 1) + "-12-01";
		} else {
			this._d = this.getYear() + "-" + intToMonthStr[this.getMonth() - 1] + "-01";
		}
		return this;
	}

};
var isInt = function (n) {
	return n.constructor.name === "Number" && (n + "").indexOf(".") === -1
};
DateString.prototype.constructor = DateString;

//Static Methods

/*
 *  Return  = Current date in "YYYY-MM-DD" format.
 * */
DateString.today = function (timeZone) {
	//TODO Validate timeZone
	if (arguments.length === 0) {
		throw "DateString.today method need timeZone as argument, Hint +0530"
	}
	if (DateString._validateTimeZone(timeZone) === true) {
		var n = Date.now();
		var nowInDifferentTimezone =
				n - DateString._timeZoneToMilliseconds(DateString.getSystemTimeZone())
				+ DateString._timeZoneToMilliseconds(timeZone);
		return DateString._DateObjToYYYYMMDDformat(new Date(nowInDifferentTimezone));
	} else {
		throw "Invalid TimeZone";
	}

};

DateString.getSystemTimeZone = function () {
	return (new Date()).toString().split("GMT")[1].split(" ")[0];
};
DateString._weekdaysFull = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
DateString._weekdaysSmall = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

DateString._validateTimeZone = function (timeZone) {
	if (typeof timeZone !== "string") {
		throw "Error: Timezone must be +/-hhmm format, Ex +0530 , -1000"
	} else if (timeZone.length !== 5) {
		throw "Error: Timezone must be +/-hhmm format, Ex +0530 , -1000, Hint- 5 characters are needed"
	} else if (!(timeZone[0] === "+" || timeZone[0] === "-")) {
		throw "Error: Timezone must start with +/-, Ex +0530 , -1000"
	}
	return true;
};

DateString._validateDateString = function (str) {
	var validMonths = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
	var validDates = [
		"01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
		"11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
		"21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
		"31"
	];
	if (typeof str !== "string") {
		throw "Error: DateString must be string. Ex - 2015-09-20";
	} else if (str.split("-").length !== 3) {
		throw "Error: DateString must have two 2 dashs. Ex - 2015-09-20";
	} else if (validMonths.indexOf(str.split("-")[1]) === -1) {
		throw "Error: DateString month is not valid. use " + validMonths;
	} else if (validDates.indexOf(str.split("-")[2]) === -1) {
		throw "Error: DateString date is not valid. use " + validDates;
	}
	return true;
};

DateString._timeZoneToMilliseconds = function (timeZone) {

	var h = parseInt(timeZone[1] + timeZone[2], 10);
	var m = parseInt(timeZone[3] + timeZone[4], 10);
	return parseInt(timeZone[0] + (h * 60 + m), 10) * 60000;
};
DateString._DateObjToYYYYMMDDformat = function (d) {
	var yyyy = d.getFullYear().toString();
	var mm = (d.getMonth() + 1).toString(); // getMonth() is zero-based
	var dd = d.getDate().toString();
	return yyyy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]); // padding
};


DateString.getMonthLayout = function (dateStr) {
	var today = new DateString(dateStr);

	var firstDateOfMonth = today.clone().takeItToFirstDayOfCurrentMonth();
	var firstDateNextMonth = today.clone().takeItToFirstDayOfNextMonth();


	var currWeek = [undefined, undefined, undefined, undefined, undefined, undefined, undefined];
	var currDate = firstDateOfMonth.clone();
	var currMonth = [];

	while (currDate.val() !== firstDateNextMonth.val()) {
		if (currDate.getDayString() === "Sunday" && JSON.stringify(currWeek) !== '[null,null,null,null,null,null,null]') {
			currMonth.push(currWeek);
			currWeek = [undefined, undefined, undefined, undefined, undefined, undefined, undefined];
		}
		currWeek[currDate.getDayIndex()] = currDate;
		currDate = currDate.clone().add(1);
	}
	currMonth.push(currWeek);
	return currMonth;
};

module.exports = DateString;