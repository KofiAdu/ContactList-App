import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Grid } from '@mui/material';
import axios from 'axios';

export default function Edit() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the contact ID from the URL parameter

  const [contact, setContact] = useState({
    name: '',
    address: '',
    email: '',
    phoneNumber: '',
    city: ''
  });

  useEffect(() => {
    // Fetch the contact data from the server based on the contact ID
    axios.get(`http://localhost:5000/api/contacts/${id}`)
      .then((response) => {
        const contactData = response.data;
        setContact(contactData);
      })
      .catch((error) => {
        console.error('Error retrieving contact data:', error);
      });
  }, [id]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setContact((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send the updated contact data to the server
    axios.put(`http://localhost:5000/api/update/${id}`, contact)
      .then((response) => {
        alert('Contact updated');

        // Go back to the home page
        navigate('/');
      })
      .catch((error) => {
        alert('Error: ' + error.message);
      });
  };

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Contact
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              name="name"
              label="Name"
              value={contact.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              name="address"
              label="Address"
              value={contact.address}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="email"
              name="email"
              label="Email"
              value={contact.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              name="phoneNumber"
              label="Phone Number"
              value={contact.phoneNumber}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="text"
              name="city"
              label="City"
              value={contact.city}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
            <Link to="/">
              <Button variant="outlined" color="primary">
                Back to List
              </Button>
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}
