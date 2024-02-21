#!env/bin/python3
from datetime import datetime
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///site3.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Group(db.Model):
	__tablename__ = 'groups'

	id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	title = db.Column(db.String)
	color = db.Column(db.String)
	display = db.Column(db.String, default="block")
	members = db.relationship("Member", backref="group")

class Member(db.Model):
	__tablename__ ='members'

	id = db.Column(db.Integer, primary_key=True, autoincrement=True)
	group_id = db.Column(db.Integer, db.ForeignKey('groups.id'))
	title = db.Column(db.String(250))
	description = db.Column(db.String(2500))
	deadline = db.Column(db.String(250))
	# date_created/id? = db.Column(db.DateTime, default=datetime.now)

if __name__ == '__main__':
	db.create_all()