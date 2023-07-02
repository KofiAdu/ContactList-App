import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import { Table, TableHead, TableRow, TableCell, TableBody, Button } from '@mui/material';


const StyledTableCell = styled(TableCell)`
  font-weight: bold;
`;

const centerTextStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const headingStyles = {
    fontSize: '2rem',
    textAlign: 'center',
};

export default function Home() {
    const [contacts, setContacts] = useState([])

    //display the data when the page is loaded
    useEffect(() => {
        axios.get('http://localhost:5000/api/get').then((response) => {
            setContacts(response.data.data); // Update to access the 'data' property in the response
        }).catch((error) => {
            console.error("Error retrieving contact data", error);
        });
    }, []);

    const deleteContact = (contactID) => {
        axios.delete(`http://localhost:5000/api/delete/${contactID}`)
            .then((response) => {
                console.log(response.data.message); // Optional: Display success message
                // Perform any additional actions after deleting the contact
                // Remove the deleted contact from the contacts array
                const updatedContacts = contacts.filter((contact) => contact.ID !== contactID);
                setContacts(updatedContacts); // Update the contacts state
            })
            .catch((error) => {
                console.error("Error deleting contact", error);
                // Handle error scenario if deletion fails
            });
    };

    const contactData = () => {
        if (contacts.length === 0) {
            return (
                <TableRow>
                    <TableCell colSpan={6}>Loading...</TableCell>
                </TableRow>
            );
        }

        return contacts.map((contact) => (
            <TableRow key={contact.ID}>
                <TableCell>{contact.Name}</TableCell>
                <TableCell>{contact.Address}</TableCell>
                <TableCell>{contact.Email}</TableCell>
                <TableCell>{contact.PhoneNumber}</TableCell>
                <TableCell>{contact.City}</TableCell>
                <TableCell>
                    <Link to={`/edit/${contact.ID}`}>
                        <Button variant="contained" color="primary">
                            Edit
                        </Button>
                    </Link>
                    <Button
                        variant="contained"
                        color="error"
                        style={{ marginLeft: '1%' }}
                        onClick={() => deleteContact(contact.ID)}
                    >
                        Delete
                    </Button>
                </TableCell>
            </TableRow>
        ));
    };



    return (
        <div>
            <div style={centerTextStyles}>
                <h1 style={headingStyles}>Contact List</h1>
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Name</StyledTableCell>
                        <StyledTableCell>Address</StyledTableCell>
                        <StyledTableCell>Email</StyledTableCell>
                        <StyledTableCell>Phone Number</StyledTableCell>
                        <StyledTableCell>City</StyledTableCell>
                        <StyledTableCell>Actions</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>{contactData()}</TableBody>
            </Table>
            <Link to="/add">
                <Button variant="contained" color="primary" style={{ marginTop: "3%" }}>
                    Add
                </Button>
            </Link>
        </div>
    )
}
