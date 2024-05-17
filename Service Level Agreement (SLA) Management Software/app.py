from flask import Flask, render_template, request, redirect, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///sla_management.db'
db = SQLAlchemy(app)

class SLA(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

@app.route('/')
def index():
    slas = SLA.query.all()
    return render_template('index.html', slas=slas)

@app.route('/add_sla', methods=['POST'])
def add_sla():
    data = request.get_json()
    new_sla = SLA(
        name=data['name'],
        description=data['description'],
        start_date=datetime.strptime(data['start_date'], '%Y-%m-%d'),
        end_date=datetime.strptime(data['end_date'], '%Y-%m-%d')
    )
    db.session.add(new_sla)
    db.session.commit()
    return jsonify({'message': 'SLA added successfully'})

@app.route('/delete_sla/<int:id>', methods=['DELETE'])
def delete_sla(id):
    sla = SLA.query.get_or_404(id)
    db.session.delete(sla)
    db.session.commit()
    return jsonify({'message': 'SLA deleted successfully'})

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
