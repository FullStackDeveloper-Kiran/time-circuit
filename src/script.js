power = "on";
audiosrc = "https://josetxu.com/demos/audio/";
var months = ["Jan", "Feb",	"Mar", "Apr",	"May", "Jun",	"Jul", "Aug",	"Sep", "Oct",	"Nov", "Dec"
];

function startTime() {
	const today = new Date();
	let d = today.getDate();
	let mo = months[today.getMonth()];
	let y = today.getFullYear();
	let h = today.getHours();
	let m = today.getMinutes();
	let s = today.getSeconds();
	let ampm = h >= 12 ? "pm" : "am";
	h = h % 12;
	h = h ? h : 00;
	if (h == 00 && ampm == "pm") h = 12;
	d = checkTime(d);
	h = checkTime(h);
	m = checkTime(m);
	s = checkTime(s);
	if (ampm == "pm") {
		elem("am-pre").classList.add("off");
	} else {
		elem("pm-pre").classList.add("off");
	}
	elem("p-day").innerHTML = d;
	elem("p-month").innerHTML = mo;
	elem("p-year").innerHTML = y;
	elem("p-hour").innerHTML = h;
	elem("p-minute").innerHTML = m;
	setTimeout(startTime, 1000);
}

startTime();

function checkTime(i) {
	if (i < 10) {	i = "0" + i; }
	return i;
}

function elem(id) {
	var element = document.getElementById(id);
	return element;
}

function playAudio(url) {
	new Audio(url).play();
}

function playIfPowerOn(url) {
	if (power == "on") new Audio(url).play();
}

desTime = [];

function setDesTime(n) {
	if (power == "off") return;
	if (desTime.length < 12) desTime.push(n);
	else playAudio("input-error.mp3");
	elem("error").style.display = "none";
}

function inpDesTime() {
	if (power == "off") return;
	x = desTime; /*CHECK*/
	error = elem("error");

	checkMonth = function () {
		if ((x[0] == 0 && x[1] == 0) || x[0] + x[1] > 12) {
			error.innerText = "* INVALID * MONTH ";
			error.style.display = "block";
		} else {
			//insert month
			var mon = x[0] + x[1];
			mon = parseInt(mon - 1);
			elem("d-month").innerHTML = months[mon];
		}
	};

	checkDay = function () {
		if ((x[2] == 0 && x[3] == 0) || x[2] + x[3] > 31) {
			error.innerText = "* INVALID * DAY";
			error.style.display = "block";
		} else {
			//insert day
			var day = x[2] + x[3];
			elem("d-day").innerHTML = day;
		}
	};

	checkYear = function () {
		//insert year
		var yea = x[4] + x[5] + x[6] + x[7];
		elem("d-year").innerHTML = yea;
	};

	checkHour = function () {
		var hou = x[8] + x[9];
		if (hou > 23) {
			error.innerText = "* INVALID * HOUR";
			error.style.display = "block";
		} else {
			if (hou > 12) {
				hou = hou - 12;
				if (hou < 10) {
					hou = "0" + hou;
				}
				elem("am-des").classList.add("off");
				elem("pm-des").classList.remove("off");
			} else {
				elem("am-des").classList.remove("off");
				elem("pm-des").classList.add("off");
			}
			if (hou == 12) {
				elem("am-des").classList.add("off");
				elem("pm-des").classList.remove("off");
			}
			//insert hour
			elem("d-hour").innerHTML = hou;
		}
	};

	checkMin = function () {
		var min = x[10] + x[11];
		if (min > 59) {
			error.innerText = "* INVALID * MINUTE";
			error.style.display = "block";
		} else {
			//insert minute
			elem("d-minute").innerHTML = min;
		}
	};

	if (x.length % 2 || x.length == 6) {
		error.innerText = "* INVALID * INPUT";
		error.style.display = "block";
	} else if (x.length == 2) {
		checkMonth();
	} else if (x.length == 4) {
		checkMonth();	checkDay();
	} else if (x.length == 8) {
		checkMonth();	checkDay();	checkYear();
	} else if (x.length == 10) {
		checkMonth();	checkDay();	checkYear();	checkHour();
	} else if (x.length == 12) {
		checkMonth();	checkDay();	checkYear(); checkHour();	checkMin();
	}
	
	//console.log(desTime)

	if (desTime.length == 0 || error.style.display == "block") {
		playAudio(audiosrc + "bttf-input-error.mp3");
	} else {
		playAudio(audiosrc + "bttf-input-success.mp3");
	}

	desTime = [];

	playAudio(audiosrc + "bttf-input-button.mp3");
}

/* TURN ON-OFF TIME CIRCUITS */
var turOnOff = document.querySelector(".knob");
var group = document.querySelector(".group");

turOnOff.addEventListener("click", function () {
	if (power == "on") power = "off";
	else power = "on";
	console.log(power);
	setTimeout(function () {
		playAudio(audiosrc + "bttf-time-circuits-on.mp3");
	}, 250);
	setTimeout(function () {
		playAudio(audiosrc + "bttf-time-circuits-whirs.mp3");
	}, 500);
	group.classList.toggle("power-off");
});

/* RESET BUTTON */
var reset = elem("reset");
reset.addEventListener("click", function () {
	if (power == "on") {
		turOnOff.click();
		setTimeout(function () {
			turOnOff.click();
		}, 500);
	}
});

/*** SWITCHES ***/
var switches = document.querySelectorAll(".switch-actuator");
for (var i = 0; i < switches.length; i++) {
	switches[i].addEventListener("click", function (e) {
		this.classList.toggle("switch-on");
		playAudio(audiosrc + "bttf-input-button.mp3");
		if (this.classList.contains("switch-on")) {
			switch (this.id) {
				case "a01":	elem("as1").play();	break;
				case "a02":	elem("as2").play();	break;
				case "a03":	elem("as3").play();	break;
				case "a04":	elem("as4").play();	break;
				case "a05":	elem("as5").play();	break;
				case "a06":	elem("as6").play();	break;
				case "a07":	elem("as7").play();	break;
				default:	  elem("as7").play();
			}
		} else {
			switch (this.id) {
				case "a01":	elem("as1").pause();	elem("as1").currentTime = 0;	break;
				case "a02":	elem("as2").pause(); elem("as2").currentTime = 0; break;
				case "a03":	elem("as3").pause(); elem("as3").currentTime = 0;	break;
				case "a04":	elem("as4").pause(); elem("as4").currentTime = 0;	break;
				case "a05":	elem("as5").pause(); elem("as5").currentTime = 0;	break;
				case "a06":	elem("as6").pause(); elem("as6").currentTime = 0;	break;
				case "a07":	elem("as7").pause(); elem("as7").currentTime = 0;	break;
				default:		elem("as7").pause();
			}
		}
	});
}

/*** MODULES ***/
function hsModule(id) {
	var x = id.substring(3);
	group.classList.toggle("hide-" + x);
	elem(id).classList.toggle("active");
	elem(id).nextElementSibling.disabled = !elem(id).nextElementSibling.disabled;
}

function lyModule(id) {
	var x = id.substring(3);
	group.classList.toggle("layer-" + x);
	elem(id).classList.toggle("active");
}

/*** MENU CLICKS ***/
var icons = document.querySelectorAll(".menu-icon");
for (var i = 0; i < icons.length; i++) {
	icons[i].addEventListener("click", function (e) {
		this.parentElement.classList.toggle("hide");
	});
}

/*** MOVE SCENE ***/
let sceneCamera = document.querySelector("section[data-camera]");
let scene = document.querySelector(".scene");
let moveBy = 1;
window.addEventListener("load", () => {
	scene.style.left = 0;
	scene.style.top = 0;
});

window.addEventListener("keydown", (e) => {
	switch (e.key) {
		case "ArrowLeft":
			if (scene.style.left.slice(0, -4) > -135)
				scene.style.left = parseInt(scene.style.left) - moveBy + "vmin";
			break;
		case "ArrowRight":
			if (scene.style.left.slice(0, -4) < 135)
				scene.style.left = parseInt(scene.style.left) + moveBy + "vmin";
			break;
		case "ArrowUp":
			if (scene.style.top.slice(0, -4) > -135)
				scene.style.top = parseInt(scene.style.top) - moveBy + "vmin";
			break;
		case "ArrowDown":
			if (scene.style.top.slice(0, -4) < 135)
				scene.style.top = parseInt(scene.style.top) + moveBy + "vmin";
			break;
		case "Escape":
			scene.style.left = 0;
			scene.style.top = 0;
			sceneCamera.style = "--scale:80";
			break;
		case "1":
			setDesTime("1");
			playIfPowerOn(audiosrc + "bttf-dial-1.mp3");
			break;
		case "2":
			setDesTime("2");
			playIfPowerOn(audiosrc + "bttf-dial-2.mp3");
			break;
		case "3":
			setDesTime("3");
			playIfPowerOn(audiosrc + "bttf-dial-3.mp3");
			break;
		case "4":
			setDesTime("4");
			playIfPowerOn(audiosrc + "bttf-dial-1.mp3");
			break;
		case "5":
			setDesTime("5");
			playIfPowerOn(audiosrc + "bttf-dial-2.mp3");
			break;
		case "6":
			setDesTime("6");
			playIfPowerOn(audiosrc + "bttf-dial-3.mp3");
			break;
		case "7":
			setDesTime("7");
			playIfPowerOn(audiosrc + "bttf-dial-1.mp3");
			break;
		case "8":
			setDesTime("8");
			playIfPowerOn(audiosrc + "bttf-dial-2.mp3");
			break;
		case "9":
			setDesTime("9");
			playIfPowerOn(audiosrc + "bttf-dial-3.mp3");
			break;
		case "0":
			setDesTime("0");
			playIfPowerOn(audiosrc + "bttf-dial-2.mp3");
			break;
		case "Enter":
			inpDesTime();
			playAudio(audiosrc + "bttf-input-button.mp3");
			break;
	}
});

/*** CAMERA SYSTEM ***/
/*** Camera from this pen by S.Shahriar ***/
/*** https://codepen.io/ShadowShahriar/pen/gOGrbev ***/

window.addEventListener("load", () => {
	new Camera()
		.setOptimalPerspective()
		.with({
			debug: true,
			zoom: {
				range: [25, 300]
			},
			rotate: {
				speed: 1.2
			}
		})
		.init();
});

/*** SET FOCUS ***/
window.addEventListener("click", () => {
	window.focus();
});