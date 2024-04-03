from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_uploads import UploadSet, configure_uploads, DATA
import pandas as pd
from flask_migrate import Migrate

UPLOADS = 'uploads'

app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://docker:docker@database/passengers'

app.config['UPLOADED_FILES_DEST'] = UPLOADS
files = UploadSet('files', DATA)
configure_uploads(app, files)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Model for Passenger table
class Passenger(db.Model):
    PassengerId = db.Column(db.Integer, primary_key=True)
    Survived = db.Column(db.Integer)
    Pclass = db.Column(db.Integer)
    Name = db.Column(db.String(150))
    Sex = db.Column(db.String(6))
    Age = db.Column(db.String(10))
    SibSp = db.Column(db.Integer)
    Parch = db.Column(db.Integer)
    Ticket = db.Column(db.String(30))
    Fare = db.Column(db.Float)
    Cabin = db.Column(db.String(20))
    Embarked = db.Column(db.String(5))

    def __repr__(self):
        return f"User('{self.Name}', '{self.Survived}', '{self.Age}')"

# Upload the file and put the data inside a database
@app.route('/upload', methods=['POST'])
def upload_csv():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and files.file_allowed(file, file.filename):
        filename = files.save(file)
    try:
        print(UPLOADS+filename)
        df = pd.read_csv(UPLOADS+ '/' + filename)
        if df.empty:
            return jsonify({'error': 'Uploaded file is empty'}), 400

        for index, row in df.iterrows():
            passenger = Passenger(
                PassengerId=row['PassengerId'],
                Survived=row['Survived'],
                Pclass=row['Pclass'],
                Name=row['Name'],
                Sex=row['Sex'],
                Age=row['Age'],
                SibSp=row['SibSp'],
                Parch=row['Parch'],
                Ticket=row['Ticket'],
                Fare=row['Fare'],
                Cabin=row['Cabin'],
                Embarked=row['Embarked']
            )
            db.session.add(passenger)
        db.session.commit()
        return jsonify({'message': 'File uploaded successfully and data imported'}), 200
    except Exception as e:
        print(UPLOADS+filename)
        return jsonify({'error': str(e)}), 500

# Get the information of the passenger table inside the created db
@app.route('/passengers', methods=['GET'])
def get_passengers():
    passengers = Passenger.query.all()
    passenger_list = []
    for passenger in passengers:
        passenger_data = {
            'PassengerId': passenger.PassengerId,
            'Survived': passenger.Survived,
            'Pclass': passenger.Pclass,
            'Name': passenger.Name,
            'Sex': passenger.Sex,
            'Age': passenger.Age,
            'SibSp': passenger.SibSp,
            'Parch': passenger.Parch,
            'Ticket': passenger.Ticket,
            'Fare': passenger.Fare,
            'Cabin': passenger.Cabin,
            'Embarked': passenger.Embarked
        }
        passenger_list.append(passenger_data)
    return jsonify(passenger_list), 200

if __name__ == '__main__':
    app.run(debug=True)