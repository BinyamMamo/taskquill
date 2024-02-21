window.addEventListener('load', () => {
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

function add_task(group, btn) {
	var add_task = document.getElementById("taskModal");
	add_task.querySelector("input[name='title']").value = btn.parentElement.querySelector("input[name='taskInput']").value;
	add_task.querySelector("input[name='title']").dataset.id = 0;
	add_task.querySelector("input[name='deadline']").value = null;
	add_task.querySelector("textarea[name='description']").value = "";
	add_task.querySelector("h2").innerHTML = "Add Task";
	add_task.querySelector("button[data-name='submit']").innerHTML = "Add Task";
	add_task.querySelector("button[data-name='submit']").style.backgroundColor = "#4caf50";
	if (group != null) {
		add_task.querySelector("select").value = group;
	}
	add_task.style.display = "block";
}

function edit_task(id, group, title, deadline, description) {
	var add_task = document.getElementById("taskModal");
	add_task.querySelector("input[name='title']").value = title;
	add_task.querySelector("input[name='title']").dataset.id = id;
	add_task.querySelector("input[name='deadline']").value = deadline;
	add_task.querySelector("textarea[name='description']").value = description;
	add_task.querySelector("h2").innerHTML = "Edit Task";
	add_task.querySelector("button[data-name='submit']").innerHTML = "Save";
	add_task.querySelector("button[data-name='submit']").style.backgroundColor = "#4c50af";
	if (group != null) {
		add_task.querySelector("select").value = group;
	}
	add_task.style.display = "block";
}

function change_color(picker, group_id) {
	picker.parentElement.parentElement.parentElement.style.backgroundColor = picker.value;
	var color = picker.value;

	$.ajax({
		type: "POST",
		// url: "/save_activity",
		url: "/save_color",
		data: { color: color, id: group_id },
		success: function (response) {
			console.log("Data sent successfully!");
		},
		error: function (xhr, status, error) {
			console.error("Error sending data:", error);
		}
	});

}

function save_title(header, group_id) {
	var title = header.value;

	$.ajax({
		type: "POST",
		// url: "/save_activity",
		url: "/save_title",
		data: { title: title, id: group_id },
		success: function (response) {
			alert("Data sent successfully!");
		},
		error: function (xhr, status, error) {
			console.error("Error sending data:", error);
		}
	});

}


function submit_task() {
	var add_task = document.getElementById("taskModal");
	let title = add_task.querySelector("input[name='title']").value;
	let id = add_task.querySelector("input[name='title']").dataset.id;
	let deadline = add_task.querySelector("input[name='deadline']").value;
	let description = add_task.querySelector("textarea[name='description']").value;
	let group_id = "";
	let group_name = "";
	var selector = add_task.querySelector("select");
	group_id = selector.value;
	if(group_id == "add") {
		group_name = add_task.querySelector("input[name='group_name']").value;
	}
	else {
		group_name = selector.options[selector.selectedIndex].text;
	}
	
	$.ajax({
		type: "POST",
		url: "/add_task",
		data: JSON.stringify({
			"id": id,
			"group_id": group_id,
			"group_name": group_name,
			"title": title,
			"deadline": deadline,
			"description": description
		}),
		contentType: "application/json; charset=utf-8",
		dataType: "json",
		success: function (response) {
			add_task.style.display = "block";
			add_task.querySelector("form.taskForm").innerHTML = response["status"];
			console.log("Data sent successfully!");
		},
		error: function (xhr, status, error) {
			console.error("Error sending data:", error);
		}
	});

}

function delete_task(task) {
	request('Are u sure u want to delete this?', () => {
		// delete it	
		console.log("sending request...");
		$.ajax({
			type: "POST",
			// url: "/save_activity",
			url: "/delete_task",
			data: JSON.stringify({ "id": task }),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function (response) {
				const spanElement = document.createElement('span');
				spanElement.className = 'close';
				spanElement.innerHTML = '&times;'; // Set its content to the close symbol (×)
				spanElement.onclick = function () {
					location.reload(); // Reload the page when the span is clicked
				};
				document.getElementById("confirmBox").style.display = "block";
				document.getElementById("confirmBox").innerHTML = response["status"];
				document.getElementById("confirmBox").appendChild(spanElement);
				setTimeout(function () {
					document.getElementById("confirmBox").style.display = "none";
				}, 5000);
				console.log(response["status"]);
				console.log("Data sent successfully!");
			},
			error: function (xhr, status, error) {
				console.error("Error sending data:", error);
			}
		});
	});
}

$(document).ready(function() {
    // Your jQuery code here
	$("taskModal").click(function(event) {
	// If the clicked element is not the modal and not a descendant of the modal
	if (!$(event.target).closest('.task-modal-content').length) {
	  $('.task-modal-content').hide();
	}
  });
});
