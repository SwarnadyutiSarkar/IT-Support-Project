from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mdm.db'
db = SQLAlchemy(app)

class Device(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    device_name = db.Column(db.String(100), nullable=False)
    owner = db.Column(db.String(100), nullable=False)
    last_checkin = db.Column(db.DateTime, default=datetime.utcnow)

@app.route('/devices', methods=['GET'])
def get_devices():
    devices = Device.query.all()
    return jsonify([{'id': device.id, 'device_name': device.device_name, 'owner': device.owner, 'last_checkin': device.last_checkin} for device in devices])

@app.route('/devices', methods=['POST'])
def add_device():
    data = request.get_json()
    new_device = Device(device_name=data['device_name'], owner=data['owner'])
    db.session.add(new_device)
    db.session.commit()
    return jsonify({'message': 'Device added successfully'}), 201

@app.route('/devices/<int:id>', methods=['DELETE'])
def delete_device(id):
    device = Device.query.get_or_404(id)
    db.session.delete(device)
    db.session.commit()
    return jsonify({'message': 'Device deleted successfully'})

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)
