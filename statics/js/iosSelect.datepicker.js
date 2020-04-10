function Utils() {

	

	//获取当前时间，格式YYYY-MM-DD
	this.getNowFormatDate = function() {
		var date = new Date();
		var seperator1 = "-";
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var currentdate = year + seperator1 + month + seperator1 + strDate;
		return currentdate;
	}

	/**
	 * 根据毫秒数获取时间字符串，格式为YYYY-MM-DD
	 * @param t 时间毫秒数
	 */
	this.getFormatDate = function(t) {
		var date = new Date(t);
		var seperator1 = "-";
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var currentdate = year + seperator1 + month + seperator1 + strDate;
		return currentdate;
	}

	/**
	 * 根据毫秒数获取日期数组，格式[YYYY,MM,DD]
	 * @param t 时间毫秒数
	 */
	this.getDateArray = function(t) {
		var date = new Date(t);
		var mArr = new Array();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var strDate = date.getDate();

		mArr.push(year);
		mArr.push(month);
		mArr.push(strDate);

		return mArr;
	}


	/**
	 * 使用iosSelect 实现日期选择器
	 * @param minArr 设定的最小可选日期，格式为：[YYYY,MM,DD]
	 * @param maxArr 设定的最大可选日期，格式为：[YYYY,MM,DD]，当@param len不为-1时，按当前日期向后推len年
	 * @param defaultArr 设定的默认选中日期，格式为：[YYYY,MM,DD]
	 * @param len 为-1时不做运算，否则重新根据len计算最大可选日期
	 * @param callbc 日期选择回调，参数分别的年，月，日
	 * 注:当minArr 为空或者格式不对时，默认向前推50年作为起始选择日期
	 * 	  当maxArr 为空或者格式不对时并且len=-1，默认向后推50年作为起始选择日期
	 *    当defaultArr 为空或者格式不对时，默认选中日期为当前日期
	 */
	this.DatePicker = function(minArr, maxArr, defaultArr, len, callbc) {
		var date = new Date();
		// console.log(maxArr);
		var _this = this;
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if (len != -1) {
			maxArr = [];
			maxArr.push((year + len));
			maxArr.push(month);
			maxArr.push(strDate);

		} else {
			// console.log(" here0 "+(typeof maxArr != "undefined" ) +  "   "+(maxArr instanceof Array) );
			if (typeof maxArr != "undefined" && maxArr instanceof Array && maxArr.length == 3) {
				// console.log(" here "+(typeof maxArr != "undefined" ) +  "   "+(maxArr instanceof Array) );
			} else {
				maxArr = [];
				maxArr.push(year + 50);
				maxArr.push(month);
				maxArr.push(strDate);
			}
		}

		if (typeof defaultArr != "undefined" && defaultArr instanceof Array && defaultArr.length == 3) {

		} else {
			defaultArr = [];
			defaultArr.push(year);
			defaultArr.push(month);
			defaultArr.push(strDate);
		}

		if (typeof minArr != "undefined" && minArr instanceof Array && minArr.length == 3) {

		} else {
			minArr = [];
			minArr.push(year - 50);
			minArr.push(month);
			minArr.push(strDate);
		}

		var yearData = function(innerCallbc) {
			innerCallbc(_this.InitYears(minArr[0], maxArr[0]));
		};

		var monthData = function(ye, innerCallbc) {
			innerCallbc(_this.InitMonths(ye, maxArr[0], maxArr[1]));
		};

		var dateData = function(ye, mon, innerCallbc) {
			// innerCallbc(_this.InitDays(ye,mo,maxArr[0],maxArr[1],maxArr[2]));
			innerCallbc(_this.InitDays(ye, mon, maxArr[0], maxArr[1], maxArr[2]));
		};
		var iosSelect = new IosSelect(3,
			[yearData, monthData, dateData], {
				title: '请选择',
				itemHeight: 35,
				oneLevelId: defaultArr[0],
				twoLevelId: defaultArr[1],
				threeLevelId: defaultArr[2],
				showLoading: false,
				callback: function(selectOneObj, selectTwoObj, selectThreeObj) {
					callbc(selectOneObj.value, selectTwoObj.value, selectThreeObj.value);
				}
			});


	}

	//计算DatePicker的年数组
	this.InitYears = function(min, max) {
		var arrY = new Array();
		for (var i = min; i <= max; i++) {
			arrY.push({
				id: i,
				value: i
			});
		}
		return arrY;
	}
	//计算DatePicker的月数组
	this.InitMonths = function(cYear, maxYear, maxMonth) {
		var arrM = new Array();
		var mM = 12;
		if (cYear == maxYear) {
			mM = maxMonth;
		}
		for (var i = 1; i <= mM; i++) {
			arrM.push({
				id: i,
				value: i
			});
		}
		return arrM;
	}
	//计算DatePicker的日数组
	this.InitDays = function(cYear, cMonth, maxYear, maxMonth, maxDays) {
		var isCurent = false;
		var arrD = new Array();
		var mDay = 31;
		if (/^(1|3|5|7|8|10|12)$/.test(cMonth)) {
			mDay = 31;
		} else if (/^(4|6|9|11)$/.test(cMonth)) {
			mDay = 30;
		} else if (/^2$/.test(cMonth)) {
			if (cYear % 4 === 0 && cYear % 100 !== 0 || cYear % 400 === 0) {
				mDay = 29;
			} else {
				mDay = 28;
			}
		} else {
			throw new Error('month is illegal');
		}

		if (cYear == maxYear && cMonth == maxMonth) {
			mDay = maxDays;
		}

		for (var i = 1; i <= mDay; i++) {
			arrD.push({
				id: i,
				value: i
			});
		}
		return arrD;

	}

	
}
