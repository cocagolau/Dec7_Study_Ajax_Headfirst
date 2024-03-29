window.onload = initPage;
var usernameValid = false;
var passwordValid = false;

function initPage() {
	document.getElementById("username").onblur = checkUsername;
	document.getElementById("password2").onblur = checkPassword;
	document.getElementById("register").disabled = true;
	document.getElementById("register").onclick = registerUser;
}

function checkFormStatus() {
	if (usernameValid && passwordValid) {
		document.getElementById("register").disabled = false;		
	} else {
		document.getElementById("register").disabled = true;
	}
}

function registerUser() {
	t = setInterval("scrollImages()", 50);
	document.getElementById("register").value = "Processing..."
	registerRequest = createRequest();
	if (registerRequest == null) {
		alert("Unable to create Request");
	} else {
		var url = "register.php";
		registerRequest.onreadystatechange = registrationProcessed;
		registerRequest.open("GET", url, true);
		registerRequest.send(null);
	}
}

function registrationProcessed() {
	if (registerRequest.readyState == 4) {
		if (registerRequest.status == 200) {
			document.getElementById("wrapper").innerHTML = registerRequest.responseText;
		}
	}
}

function scrollImages() {
	var coverBarDiv = document.getElementById("coverBar");
	var images = coverBarDiv.getElementsByTagName("img");
	for (var i=0; i<images.length; i++) {
		var left = images[i].style.left.substr(0, images[i].style.left.length-2);
		if (left <= -86) {
			left = 532;
		}
		images[i].style.left = (left-1) + "px";
	}
}


function checkUsername() {
	document.getElementById("username").className = "thinking";
	usernameRequest = createRequest();
	if (usernameRequest == null) {
		alert("Unable to create Request");
	} else {
		var theName = document.getElementById("username").value;
		var username = escape(theName);
		var url = "checkName.php?username=" + username;

		usernameRequest.open ("GET", url, true);
		usernameRequest.onreadystatechange = showUsernameStatus;
		usernameRequest.send(null);
	}
}

function showUsernameStatus() {
	if (usernameRequest.readyState == 4) {
		if (usernameRequest.status == 200) {
			if (usernameRequest.responseText == "okay") {
				document.getElementById("username").className = "approved";
				usernameValid = true;
			} else {
				document.getElementById("username").className = "denied";
				document.getElementById("username").focus();
				document.getElementById("username").select();
				usernameValid = false;
			}
			checkFormStatus();
		}
	}
}

function checkPassword() {
	var password1 = document.getElementById("password1");
	var password2 = document.getElementById("password2");
	password1.className = "thinking";

	if( (password1.value == "") || (password1.value != password2.value)) {
		password1.className = "denied";
		passwordValid = false;
		checkFormStatus();
		return;
	}
	
	passwordRequest = createRequest();
	if (passwordRequest == null) {
		alert("Unable to create Request");
	} else {
		var password = escape(password1.value);
		var url = "checkPass.php?password=" + password;
		passwordRequest.onreadystatechange = showPasswordStatus;
		passwordRequest.open("GET", url, true);
		passwordRequest.send(null);
	}
}

function showPasswordStatus() {
	if (passwordRequest.readyState == 4) {
		if (passwordRequest.status == 200) {
			var password1 = document.getElementById("password1");

			if (passwordRequest.responseText == "okay") {
				password1.className = "approved";
				passwordValid = true;
			} else {
				password1.className = "denied";
				password1.focus();
				password1.select();
				passwordValid = false;
			}
			checkFormStatus();
		}
	}
}




