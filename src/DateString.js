var DateString = function (str) {
	//TODO validate str
	//this._d = str;
	Object.defineProperty(this, "_d", {
		value: str,
		enumerable: false,
		configurable: false,
		writable: true
	});
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
		return this._d.split("-")[0];
	},
	getMonth: function () {
		return this._d.split("-")[1];
	},
	getDate: function () {
		return this._d.split("-")[2];
	},
	val: function () {
		return this + "";
	},

	/*       Chaining Methods            */

	clone: function () {
		return new DateString(this.val())
	},
	add: function (n) {
		//TODO validate , n should be a +/- integer
		//Convert to timestamp with current timzone
		var newStr = DateString._DateObjToYYYYMMDDformat(new Date(new Date(this.val()).getTime() + n * 24 * 3600000));
		this._d = newStr;
		return this;
	}


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

module.exports = DateString;


DateString.getSystemTimeZone = function () {
	return (new Date()).toString().split("GMT")[1].split(" ")[0];
};

DateString._validateTimeZone = function (timeZone) {
	//TODO Validate timeZone
	if (typeof timeZone !== "string") {
		throw "Error: Timezone must be +/-hhmm format, Ex +0530 , -1000"
	} else if (timeZone.length !== 5) {
		throw "Error: Timezone must be +/-hhmm format, Ex +0530 , -1000, Hint- 5 characters are needed"
	} else if (!(timeZone[0] === "+" || timeZone[0] === "-")) {
		throw "Error: Timezone must start with +/-, Ex +0530 , -1000"
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