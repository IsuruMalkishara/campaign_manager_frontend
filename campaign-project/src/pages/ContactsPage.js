import React, { useState,useEffect } from 'react';
import { Button, FormControl, InputGroup,Table,Card,Alert } from 'react-bootstrap';
import PhoneIcon from '@mui/icons-material/Phone';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ContactService from '../services/ContactService';
import TagService from '../services/TagService';
import NavbarComponent from '../components/NavbarComponent';
import AddContactPopup from '../components/AddContactPopup';
import '../styles/ContactsPage.css';

const ContactsPage = () => {
  const [isTagShow,setTagShow]=useState(false);
  const [contactList,setContactList]=useState([]);
  const [tagList,setTagList]=useState([]);
  const [isAllCheckboxChecked, setAllCheckboxChecked] = useState(false);

  const [isAddContactPopupOpen,setAddContactPopupOpen]=useState(false);

  const [error,setError]=useState('');

  useEffect(() => {
    const userId=1;
    const token=sessionStorage.getItem('token');
    const jwtToken='Bearer '+token;
    getAllContacts(userId,jwtToken);
    getAllTags(userId,jwtToken);
  }, []);

  //get all contacts
  const getAllContacts=(userId,jwtToken)=>{
    
    ContactService.getAllContacts(userId,jwtToken)
    .then(response => {
      console.warn(response.data);
      setContactList(response.data.data.contactList);
      console.warn("contact list");
      console.warn(contactList);
    })
    .catch(error => {
      console.error('Error:', error);
      
    });
  }

  //get all tags
  const getAllTags=(userId,jwtToken)=>{
    TagService.getAllTags(userId,jwtToken)
    .then(response => {
      console.warn(response.data);
      setTagList(response.data.data.tagList);
      console.warn("tag List:");
      console.warn(tagList);
    })
    .catch(error => {
      console.error('Error:', error);
      
    });
  }

  // Function to handle all checkbox change
  const handleAllCheckboxChange = (event) => {
    setAllCheckboxChecked(event.target.checked);

    // Update the checked status of all other checkboxes
    const updatedContactList = contactList.map((contact) => ({
      ...contact,
      isChecked: event.target.checked,
    }));
    setContactList(updatedContactList);
  };

  // Function to handle individual checkbox change
  const handleCheckboxChange = (event, contactId) => {
    const updatedContactList = contactList.map((contact) =>
      contact.id === contactId ? { ...contact, isChecked: event.target.checked } : contact
    );
    setContactList(updatedContactList);
  };

  //show hide tags
  const handleShowHideTags=()=>{
    setTagShow(!isTagShow);
  }


  //add contact popup open
const handleAddContact=()=>{
  console.warn("add popup open");
  setAddContactPopupOpen(true);
}

// Close add  popup
const closeAddContactPopup = () => {
  setAddContactPopupOpen(false);
};

//add contact
const addContact=(name,phoneNumber,email,selectedTags)=>{
  setAddContactPopupOpen(false);
  const userId=1;
    const token=sessionStorage.getItem('token');
    const jwtToken='Bearer '+token;

    const data={
      "name":name,
      "phoneNumber":phoneNumber,
      "email":email,
      "tags":selectedTags,
      "userId":userId
    }
console.warn(data);
console.warn(jwtToken);
    ContactService.addContact(userId,jwtToken,data).then(response => {
      console.warn(response.data);
     
      if (response.data.status === 'SUCCESS') {
        setError('');
        window.location.reload(false);
      } else {
        setError('Email address already used');
      }
    }).catch(error => {
     
      setError('Email address already used');
      console.error('Error', error);
    })
    .catch(error => {
      console.error('Error:', error);
      setError('Email address already used');
    });
}
  return (
    <div className='contact' style={{ display: 'flex',
      background: 'rgb(255, 255, 255)',font: 'rgb(0,0,0)',
      fontFamily:'"Ubuntu", sans-serif;',width: '100%' }}>
        <div className='row'>
          <div className='col-2'>
       <div className='navbar-container'>
        <NavbarComponent />
      </div>
      </div>
      <div  className='col-10'>
      <div className='contact-content' style={{ width:'100%' }}>
        <div className='row'>
          <div className='col' style={{ textAlign: 'center' }}>
            <h1>Contacts</h1>
          </div>
        </div>
        <div className='row'>
          <div className='col' style={{ textAlign: 'center' }}>
            <div className="d-flex justify-content-center align-items-center"> {/* Use d-flex class */}
            <div >{!isTagShow &&<Button className="button" onClick={handleShowHideTags} style={{  background: 'rgb(29,161,242)',
    color: 'rgb(255,255,255)',width:'150px' }}>Show Tags</Button>} </div>
            <div>{isTagShow &&<Button className="button" onClick={handleShowHideTags} style={{  background: 'rgb(29,161,242)',
    color: 'rgb(255,255,255)',width:'150px' }}>Hide Tags</Button>}</div>
              {/* search box */}
              <InputGroup style={{ width:'500px' }}>
                <InputGroup.Text className="bg-white" >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" style={{ marginTop:'5px',marginLeft:'5px' }} class="bi bi-search" viewBox="0 0 24 24"> <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/> </svg>
                </InputGroup.Text>
                <FormControl type="search" className="me-2" placeholder="Search" />
              </InputGroup>
              <Button className="button" style={{  background: 'rgb(29,161,242)',
    color: 'rgb(255,255,255)',width:'200px' }} onClick={handleAddContact}>+ New Contact</Button>
              <Button className="button" style={{  background: 'rgb(29,161,242)',
    color: 'rgb(255,255,255)',width:'150px' }}>Import</Button>
              <Button className="button" style={{  background: 'rgb(29,161,242)',
    color: 'rgb(255,255,255)',width:'150px' }}>Download</Button>
            </div>
          </div>
        </div>
        {error  && (
                      <Alert variant='danger' style={{  textAlign: 'center'}}>
                        {error}
                      </Alert>
                    )}
        {!isTagShow &&<div className='row' style={{ textAlign:'center' }}>

<div className='col-12' style={{ textAlign:'center' }}>
{contactList.length > 0 ? (
<Table striped bordered hover responsive style={{ margin:'10px',maxHeight:'300px' }}>
      <thead>
        <tr>
        <th>
                        {/* all checkbox in the header */}
                        <input
                          type='checkbox'
                          checked={isAllCheckboxChecked}
                          onChange={handleAllCheckboxChange}
                        />
                      </th>
          <th>Name</th>
          <th>Contacts</th>
          <th>Tags</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {contactList.map((contact) => (
          <tr key={contact.id}>
            <td>
                          {/* Individual checkbox for each row */}
                          <input
                            type='checkbox'
                            checked={contact.isChecked || false}
                            onChange={(event) => handleCheckboxChange(event, contact.id)}
                          />
            </td>              
            <td>{contact.name}</td>
            <td>
              <div>
                <strong>Email:</strong> {contact.email}
              </div>
              <div>
                <strong>Phone:</strong> {contact.phoneNumber}
              </div>
            </td>
            <td>
                          {contact.tags.map((tag) => (
                            <span key={tag.tagId}>{tag.name}, </span>
                          ))}
            </td>
            <td>
            <IconButton >
                      <EditIcon />
            </IconButton>
           </td>
            <td>
            <IconButton >
                      <PhoneIcon />
            </IconButton>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
) : (
  <p>No contacts found.</p>
)}
</div>

        </div>}

        {isTagShow &&<div className='row'>
        <div className='col-3'>
<Card className='tag-card'>
  <Card.Body style={{ textAlign:'center' }}>
    {tagList.length>0 &&<div className='row'>
    <Button   className='tag-btn' style={{  background: 'rgb(29,161,242)',
    color: 'rgb(255,255,255)',width:'150px' }}>
                              All
      </Button>
    {tagList.map((tag) => (
                            <Button key={tag.tagId}  className='tag-btn' style={{  background: 'rgb(29,161,242)',
                            color: 'rgb(255,255,255)',width:'150px' }}>
                              {tag.name}
                            </Button>
      ))}
    </div>}
  </Card.Body>
</Card>
        </div>
<div className='col-9'>
{contactList.length > 0 ? (
<Table striped bordered hover responsive style={{ margin:'10px' }}>
      <thead>
        <tr>
        <th>
                        {/* all checkbox in the header */}
                        <input
                          type='checkbox'
                          checked={isAllCheckboxChecked}
                          onChange={handleAllCheckboxChange}
                        />
                      </th>
          <th>Name</th>
          <th>Contacts</th>
          <th>Tags</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {contactList.map((contact) => (
          <tr key={contact.id}>
            <td>
                          {/* Individual checkbox for each row */}
                          <input
                            type='checkbox'
                            checked={contact.isChecked || false}
                            onChange={(event) => handleCheckboxChange(event, contact.id)}
                          />
            </td>              
            <td>{contact.name}</td>
            <td>
              <div>
                <strong>Email:</strong> {contact.email}
              </div>
              <div>
                <strong>Phone:</strong> {contact.phoneNumber}
              </div>
            </td>
            <td>
                          {contact.tags.map((tag) => (
                            <span key={tag.tagId}>{tag.name}, </span>
                          ))}
            </td>
            <td>
            <IconButton >
                      <EditIcon />
            </IconButton>
           </td>
            <td>
            <IconButton >
                      <PhoneIcon />
            </IconButton>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
) : (
  <p>No contacts found.</p>
)}
</div>
        </div>}
      </div>
      </div>
      </div>
      {isAddContactPopupOpen  && (
        <AddContactPopup
          addContact={addContact}
          tagList={tagList}
          closeAddContactPopup={closeAddContactPopup}
          
        />
      )}
    </div>
  );
};

export default ContactsPage;
