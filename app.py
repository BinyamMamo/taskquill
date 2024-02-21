#!env/bin/python3
"""
simple flask application
"""
from flask import render_template, request, jsonify, abort
from model import app, db, Group, Member

@app.route("/", strict_slashes=False)
def index():
	groups = Group.query.all()
	return render_template("index.html", groups=groups, members=Member, sort_by="title")

@app.route("/search")
def search():
	tag = request.args["q"]
	results = []
	if tag:
		results = Member.query.filter(Member.title.ilike(f"%{tag}%")).all()
	return render_template("search.html", results=results)

@app.route("/searchbtn", methods=["POST"])
def searchbtn():
	print(request.form)
	print(request.args)
	# tag = request.args["q"]
	return "tr"

@app.route("/add_task", methods=["POST"])
def add_task():
	task = {}
	response = request.get_json()
	print("------------")
	task["title"] = response["title"]
	print(response["group_id"])
	print("---------------")
	if response["group_id"] == "add":
		group = Group(title=response["group_name"], color="#1e1e1e")
		db.session.add(group)
		db.session.commit()
		task["group_id"] = group.id # think about changing group id to created date
	elif response["group_id"] == "none":
		task["group_id"] = 0
	else:
		print(response["group_id"])
		task["group_id"] = response["group_id"]
	print("---------------")
	task["deadline"] = response["deadline"] if response["deadline"] else None
	task["description"] = response["description"] if response["description"] else ""

	member = Member.query.filter_by(id=response["id"]).one_or_none()
	if not member:
		db.session.add(Member(title=task["title"], group_id=task["group_id"], deadline=task["deadline"]))
	else:
		member.title = task["title"]
		member.group_id = task["group_id"]
		member.deadline = task["deadline"]
		member.description = task["description"] 
		# don't use db.session.add no need for updating data
	print(member)
	db.session.commit()
	return {"status": "task added successfully!"}

# @app.route('/save_activity', methods=['POST'])
@app.route('/save_color', methods=['POST'])
def save_color():
	color = request.form.get('color')
	id = request.form.get('id')

	group = Group.query.filter_by(id=id).first() #one_or_none
	group.color = color
	db.session.commit()

	return jsonify({"message": "Data received successfully!"})

@app.route('/save_title', methods=['POST'])
def save_title():
	title = request.form.get('title')
	id = request.form.get('id')

	group = Group.query.filter_by(id=id).first() #one_or_none
	group.title = title
	db.session.commit()
	return jsonify({"message": "Data received successfully!"})

@app.route('/save_display', methods=['POST'])
def save_display():
	display = request.form.get('display')
	id = request.form.get('id')

	group = Group.query.filter_by(id=id).first() #one_or_none
	group.display = display
	db.session.commit()
	return jsonify({"message": "Data received successfully!"})


@app.route("/delete_task", methods=["POST"])
def delete_task():
	id = request.json["id"]
	print(id)
	member = Member.query.filter_by(id=id).one_or_none()
	if not member:
		abort(404)
	db.session.delete(member)
	db.session.commit()
	return {"status": "task deleted!"}


if __name__ == "__main__":
	app.run(debug=True)
