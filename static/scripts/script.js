// document.getElementById('taskForm').addEventListener('submit', function (event) {
// 	event.preventDefault();
// 	var taskInput = document.getElementById('taskInput');
// 	var taskList = document.getElementById('taskList');
// 	var taskText = taskInput.value;
// 	if (taskText.trim() !== '') {
// 		var taskItem = document.createElement('div');
// 		taskItem.textContent = taskText;
// 		taskList.appendChild(taskItem);
// 		taskInput.value = '';
// 	}
// });

function collapse(caret, group_id) {
	let state = caret.parentElement.parentElement.querySelector('.group-body').style.display;
	let display = state;
	caret.style.transition = 'transform 0.05s';
	if (state === 'none') {
		caret.parentElement.parentElement.querySelector('.group-body').style.display = 'block';
		caret.parentElement.parentElement.querySelector('.group-body').transion = '2s';
		caret.style.transform = 'rotate(180deg)';
		display = "block";
	} else {
		caret.parentElement.parentElement.querySelector('.group-body').style.display = 'none';
		caret.parentElement.parentElement.style.border = 'none';
		caret.style.transform = 'rotate(0deg)';
		display = "none";
	}

	$.ajax({
		type: "POST",
		// url: "/save_activity",
		url: "/save_display",
		data: { display: display, id: group_id },
		success: function(response) {
			console.log("Data sent successfully!");
		},
		error: function(xhr, status, error) {
			console.error("Error sending data:", error);
		}
	});
}

function promptYesNo(message, yes = "yes", no = "no") {
	return new Promise((resolve, reject) => {
		var confirmBox = document.getElementById("confirmBox");
		var yesButton = document.getElementById("yesButton");
		var noButton = document.getElementById("noButton");
		yesButton.innerHTML = yes;
		noButton.innerHTML = no;
		confirmBox.querySelector('p').innerHTML = message;
		confirmBox.style.display = "block";

		yesButton.addEventListener("click", function () {
			// User clicked "Yes"
			confirmBox.style.display = "none";
			resolve(true);
		});

		noButton.addEventListener("click", function () {
			// User clicked "No"
			// confirmBox.style.display = "none";
			resolve(false);
		});
	});
}

function request(message, fun1, fun2=() => {}, yes = "yes", no = "no") {
	promptYesNo(message, yes, no).then((result) => {
		if (result) {
			// User clicked "Yes"
			fun1();
		} else {
			// User clicked "No"
			fun2();
		}
	});
}

function show_desc(id) {
	alert("This is clicked!");
	let query = "p[data-descid='" + id + "']";
	if (document.querySelector(query).style.display == "block")
		document.querySelector(query).style.display = "none";
	else
		document.querySelector(query).style.display = "block"; 
}

function update_time(time_display) {
	let deadline = time_display.dataset.datetime;

	console.log(deadline);
}

function toggle(profile) {
	let options = profile.nextElementSibling;
	console.log(options);
	console.log(options.style.display);
	if (options.style.display == "block") {
		options.style.display = "none";
	} else {
		options.style.display = "block";
	}
}