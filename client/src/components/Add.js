import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { Typography, TextField, Button, Grid } from '@mui/material';
import axios from 'axios';

export default function Add() {
    //to allow navigation back to the homepage when task is completed
    //useNavigation
    const navigate = useNavigate();

    //creating a object to hold contact data
    const [contact, setContact] = useState({
        name: '',
        address: '',
        email: '',
        phoneNumber: '',
        city: ''
    })


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setContact((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        //send the form data to the server
        //also need the contact object, check line 12 to 18
        axios.post('http://localhost:5000/api/contacts', contact)
            .then((response) => {
                alert('Contact added')

                //reset the form
                setContact({
                    name: '',
                    address: '',
                    email: '',
                    phoneNumber: '',
                    city: ''
                })

                //go back to home page
                navigate('/');
            })
            .catch((error) => {
                alert('Error: ' + error.message)
            })
    };

    return (
        <div>
            <Typography variant="h4" component="h1" gutterBottom>
                Add a new contact
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
                            Submit
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
    )
}


