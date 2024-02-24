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
		caret.parentElement.querySelector('.delete-item').style.display = 'none';
		caret.parentElement.querySelector('.group-clr').style.display = 'block';
		caret.style.transform = 'rotate(180deg)';
		display = "block";
	} else {
		caret.parentElement.parentElement.querySelector('.group-body').style.display = 'none';
		caret.parentElement.parentElement.style.border = 'none';
		caret.parentElement.querySelector('.delete-item').style.display = 'block';
		caret.parentElement.querySelector('.group-clr').style.display = 'none';
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

function show_desc(id) {
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

function updateTime() {
    var buttons = document.querySelectorAll('button[data-datetime]');
    buttons.forEach(function(button) {
        var deadline = new Date(button.getAttribute('data-datetime')).getTime();
        var now = new Date().getTime();
        var distance = now - deadline;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		button.innerHTML = "⏰ " + minutes + "min";
		if (hours)
			button.innerHTML = "⏰ " + hours + "hrs " + minutes + "min ";
		if (hours == 1)
			button.innerHTML = "⏰ " + hours + "hr " + minutes + "min ";
		if (days)
        	button.innerHTML = "⏰ " + days + "days " + hours + "hrs ";
		if (days == 1)
        	button.innerHTML = "⏰ " + days + "day " + hours + "hrs ";
    });
}

// If you choose beauty:
// button.title = minutes + "min";
// if (hours)
// 	button.title = hours + "hrs " + minutes + "min ";
// if (hours == 1)
// 	button.title = hours + "hr " + minutes + "min ";
// if (days)
// 	button.title = days + "days " + hours + "hrs ";
// if (days == 1)
// 	button.title = days + "day " + hours + "hrs ";

setInterval(updateTime, 1000); // Update every minute

// Add this event listener to your script
document.addEventListener('click', function(event) {
	var insideProfile = document.querySelector("div[data-target='profile-options']").contains(event.target);
	var insideOptions = document.querySelector("div[data-toggle='profile-options']").contains(event.target);

	if (!insideProfile && !insideOptions) {
		var options = document.querySelector("div[data-toggle='profile-options']");
		if (options.style.display == "block") {
			options.style.display = "none";
		}
	}
});