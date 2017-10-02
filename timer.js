var minutes, totalSecs, seconds, timer, oldWind, newWind, timeNow, oldSize, newSize
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] 

var appendTime = function(t) {
	if (t < 10) {
		t = "0" + t
	} 
	return t
}

var pmTime = function(hr, min) {
	if (hr === 12) {
		$("#hrsMins").html(hr + ":" + appendTime(min) + " PM")
	} else {
		$("#hrsMins").html((hr-12) + ":" + appendTime(min) + " PM")
	} 
}

var amTime = function(hr, min) {
	if (hr === 0) {
		$("#hrsMins").html(12 + ":" + appendTime(min) + " AM")
	} else {
		$("#hrsMins").html(hr + ":" + appendTime(min) + " AM")
	} 
}


var clockSet = function() {
	timeNow = new Date()
	var hrs = timeNow.getHours()
	var mins = timeNow.getMinutes()
	var secs = timeNow.getSeconds()
	var date = months[timeNow.getMonth()] + " " + timeNow.getDate()  + " " + timeNow.getFullYear()
	if (hrs > 11) {
		pmTime(hrs, mins)
	} else {
		amTime(hrs, mins)
	}
	$("#secs").html(appendTime(secs))
	$("#date").html(date)
}

var timerSet = function(mins, total, secs) {
	secs = appendTime(secs)
	mins = Math.floor(total/60)
	mins = appendTime(mins)
	if (total > 0) {
		$("#timer").html(mins+":"+secs)
	} else {
		clearInterval(timer)
		$("#timer").html("OVER")
		var alarm = new Audio('./alarm.mp3').play()
		setTimeout(function(){location.reload()},6000)
	}
	totalSecs = total - 1
	seconds = totalSecs%60	
}

var startTimer = function(choice) {
	clearInterval(timer)
	$("#hrsMins, #secs, #date").css("display", "none")
	$("#timer").css("display", "block")
	totalSecs = minutes*60
	seconds = 0
	timerSet(minutes, totalSecs, seconds)
	timer = setInterval(function() {
		timerSet(minutes, totalSecs, seconds)
	}, 1000)
}


$(document).ready(function() {
	clockSet()
	timer = setInterval(function() {
		clockSet()
	}, 1000)
})

$(document).on('click', '.btn-primary', function() {
	minutes = parseInt($(this).html())
	startTimer(minutes)
})

$(document).on('keypress', function(event) {
	minutes = parseInt(event.key) * 5
	startTimer(minutes)
})

$(window).resize(function() {
	$("#timer").css("font-size", Math.floor($(window).width()/2.5))
})




