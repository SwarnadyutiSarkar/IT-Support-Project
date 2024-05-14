from flask import Flask, render_template, request, redirect, url_for
from flask_mysqldb import MySQL

app = Flask(__name__)
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'username'
app.config['MYSQL_PASSWORD'] = 'password'
app.config['MYSQL_DB'] = 'ticket_system'

mysql = MySQL(app)

@app.route('/')
def index():
    cur = mysql.connection.cursor()
    cur.execute("SELECT * FROM tickets")
    tickets = cur.fetchall()
    cur.close()
    return render_template('index.html', tickets=tickets)

@app.route('/create_ticket', methods=['GET', 'POST'])
def create_ticket():
    if request.method == 'POST':
        details = request.form['details']
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO tickets (details) VALUES (%s)", (details,))
        mysql.connection.commit()
        cur.close()
        return redirect(url_for('index'))
    return render_template('create_ticket.html')

if __name__ == '__main__':
    app.run(debug=True)
