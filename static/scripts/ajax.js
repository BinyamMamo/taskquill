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
	request('Do you want to proceed?', () => {
		del("/delete_task", task);
	});
}

function delete_group(group) {
	request('Are u sure u want to delete this group?', () => {
		del("/delete_group", group);
	});
}

function del(url, id) {
	$.ajax({
		type: "POST",
		// url: "/save_activity",
		url: url,
		data: JSON.stringify({ "id": id }),
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
			}, 2000);
			console.log(response["status"]);
			console.log("Data sent successfully!");
		},
		error: function (xhr, status, error) {
			console.error("Error sending data:", error);
		}
	});
}
