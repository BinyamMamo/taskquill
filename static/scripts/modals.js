window.addEventListener('load', () => {
	updateTime();

	var confirmBox = document.getElementById("confirmBox");
	var yesButton = document.getElementById("yesButton");
	var noButton = document.getElementById("noButton");
	// confirmBox.innerHTML = message;
	yesButton.addEventListener("click", function () {
		// User clicked "Yes"
		confirmBox.style.display = "none";
	});

	noButton.addEventListener("click", function () {
		// User clicked "No"
		confirmBox.style.display = "none";
	});
	// confirmBox.style.display = "none";
});

function modifySize(container) {
	container.style.height = 'auto';
	container.style.height = container.scrollHeight + 'px';
}

function bgclick(container, query) {
	container.addEventListener("click", e => {
		container2 = container.querySelector(query);
		if (!container2.contains(e.target)) {
			container.style.display = "none";
		}
	})
}
function add_task(group, btn) {
	var taskModal = document.getElementById("taskModal");
	bgclick(taskModal, ".task-modal-content");
	taskModal.querySelector("input[name='title']").value = btn.parentElement.querySelector("input[name='taskInput']").value;
	taskModal.querySelector("input[name='title']").dataset.id = 0;
	taskModal.querySelector("input[name='deadline']").value = null;
	taskModal.querySelector("textarea[name='description']").value = "";
	taskModal.querySelector("h2").innerHTML = "Add Task";
	taskModal.querySelector("button[data-name='submit']").innerHTML = "Add Task";
	taskModal.querySelector("button[data-name='submit']").style.backgroundColor = "#4caf50";
	if (group != null) {
		taskModal.querySelector("select").value = group;
	}
	taskModal.style.display = "block";
}

function edit_task(id, group, title, deadline, description) {
	var taskModal = document.getElementById("taskModal");
	bgclick(taskModal, ".task-modal-content");
	taskModal.querySelector("input[name='title']").value = title;
	taskModal.querySelector("input[name='title']").dataset.id = id;
	taskModal.querySelector("input[name='deadline']").value = deadline;
	taskModal.querySelector("textarea[name='description']").value = description;
	taskModal.querySelector("h2").innerHTML = "Edit Task";
	taskModal.querySelector("button[data-name='submit']").innerHTML = "Save";
	taskModal.querySelector("button[data-name='submit']").style.backgroundColor = "#4c50af";
	if (group != null) {
		taskModal.querySelector("select").value = group;
	}
	taskModal.style.display = "block";
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
		bgclick(confirmBox, ".confirm-box");
		

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

function toggle(profile) {
	console.log("options");
	let options = profile.nextElementSibling;
	if (options.style.display == "block") {
		options.style.display = "none";
	} else {
		options.style.display = "block";
	}
}

