const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

//create access to db
const db = mysql.createPool({
    host: 'localhost',
    user: "root", //default user
    password: '12345',
    database: "contacts",
})

//middleware
app.use(cors())
app.use(express.json()) //allows you to grab the data in json format
app.use(bodyParser.urlencoded({ extended: true }))


//req = request an action (frontedn to backend)
//res = respond to a request (send info to the frontend)
app.get('/api/get', (req, res) => {
    const selectQuery = "SELECT * FROM contactinfo"
    db.query(selectQuery, (err, results) => {
        if (err) {
            console.error("Couldn't retrieve contact data", err)
            res.status(500).json({ error: 'An error occurred while getting the contact' });
        } else {
            console.log("Contact data retrieved")
            //send the data to the frontend
            // res.send(results);
            res.status(200).json({ message: " Data delivered", data: results })
        }
    })
})

app.post("/api/contacts", (req, res) => {
    //getting the contact data from the frontend
    //destructuring the 
    const { name, address, email, phoneNumber, city } = req.body;

    // Insert the contact data into the database
    const insertQuery = "INSERT INTO contactinfo (name, address, email, phoneNumber, city) VALUES (?, ?, ?, ?, ?)"
    db.query(insertQuery, [name, address, email, phoneNumber, city], (err, result) => {
        if (err) {
            console.error("Couldn't insert contact data", err)
            res.status(500).json({ error: 'An error occurred while adding the contact' });
        } else {
            console.log('Contact added successfully');
            res.status(200).json({ message: 'Contact added successfully' });
        }
    })
});

app.delete('/api/delete/:id', (req, res) => {
    const contactID = req.params.id;
    const deleteQuery = "DELETE FROM contactinfo WHERE id = ?"

    db.query(deleteQuery, contactID, (err, results) => {
        if (err) {
            console.error("Couldn't delete contact data", err)
            res.status(500).json({ error: 'An error occurred while deleting the contact' });
        } else {
            console.log('Contact deleted successfully');
            res.status(200).json({ message: 'Contact deleted successfully', data: results });
        }
    })
})

app.put('/api/update/:id', (req, res) => {
    const contactID = req.params.id;
    const { name, address, email, phoneNumber, city } = req.body;
    const updateQuery = "UPDATE contactinfo SET name = ?, address = ?, email = ?, phoneNumber = ?, city = ? WHERE id = ?";

    db.query(updateQuery, [name, address, email, phoneNumber, city, contactID], (err, results) => {
        if (err) {
            console.error("Couldn't update contact data", err);
            res.status(500).json({ error: 'An error occurred while updating the contact' });
        } else {
            console.log('Contact updated successfully');
            res.status(200).json({ message: 'Contact updated successfully', data: results });
        }
    });
});

app.listen(5000, () => console.log('listening on port 5000'))