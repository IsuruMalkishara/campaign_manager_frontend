import React, { useState,useEffect } from 'react';
import { Button, FormControl, InputGroup,Table,Card,Alert } from 'react-bootstrap';
import PhoneIcon from '@mui/icons-material/Phone';
import EditIcon from '@mui/icons-material/Edit';
import ContactService from '../services/ContactService';
import TagService from '../services/TagService';
import NavbarComponent from '../components/NavbarComponent';
import AddContactPopup from '../components/AddContactPopup';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, IconButton, Paper } from '@mui/material';
import '../styles/ContactsPage.css';

const ContactsPage = () => {
  const [isTagShow,setTagShow]=useState(false);
  const [contactList,setContactList]=useState([]);
  const [tagList,setTagList]=useState([]);
  const [isAllCheckboxChecked, setAllCheckboxChecked] = useState(false);

  const [isAddContactPopupOpen,setAddContactPopupOpen]=useState(false);

  const [error,setError]=useState('');

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    let isMounted = true; // Flag to check if the component is mounted

    const fetchData = async () => {
      try {
        const [contactsData, tagsData] = await Promise.all([
          getAllContacts(),
          getAllTags()
        ]);

        // Check if the component is still mounted before updating the state
        if (isMounted) {
          setContactList(contactsData.data.data.contactList);
          setTagList(tagsData.data.data.tagList);
          console.warn(contactsData.data);
          console.warn(tagsData.data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();

    // Cleanup function to cancel any ongoing requests or subscriptions
    return () => {
      isMounted = false; // Set the flag to false when the component is unmounted
    };
  }, []);

  const getAllContacts = () => {
    return ContactService.getAllContacts();
  }

  const getAllTags = () => {
    return TagService.getAllTags();
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
  setError('');
  console.warn("add popup open");
  setAddContactPopupOpen(true);
}

// Close add  popup
const closeAddContactPopup = () => {
  setAddContactPopupOpen(false);
};

//add contact
const addContact=(name,phoneNumber,email,tags)=>{
  setError('');
  setAddContactPopupOpen(false);
  const userId=1;
    const token=sessionStorage.getItem('token');
    const jwtToken='Bearer '+token;

    const data={
      "name":name,
      "phoneNumber":phoneNumber,
      "email":email,
      "tags":tags,
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
//search function
const handleSearch = () => {
  console.warn(searchTerm);
};

const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    handleSearch();
  }
};
  return (
    <div className='contact' style={{ display: 'flex',
      background: 'rgb(255, 255, 255)',font: 'rgb(0,0,0)',
      fontFamily:'"Ubuntu", sans-serif;',width: '100%' }}>
        <div className='row'>
          <div className='col-2' style={{ textAlign:'center' }}>
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
              <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
      <InputBase
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={handleKeyPress}
        sx={{ ml: 1, flex: 1 }}
      />
      <IconButton type="button" onClick={handleSearch} sx={{ p: '10px' }}>
        <SearchIcon/> {/* Use the imported search icon */}
      </IconButton>
    </Paper>
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

<div className='col-12' style={{ textAlign:'center',maxHeight: '530px', overflowY: 'auto', maxWidth: '100%' }}>
{contactList.length > 0 ? (
<Table striped bordered hover responsive style={{ margin:'10px'}} className='contact-table'>
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

        {isTagShow &&<div className='row' >
        <div className='col-3'>
<Card className='tag-card' style={{ maxHeight: '530px', overflowY: 'auto', maxWidth: '100%' }}>
  <Card.Body style={{ textAlign:'center' }}>
    {tagList.length>0 &&<div className='row'>
      <div className='col' style={{ textAlign:'center' }}>
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
      </div>
    </div>}
  </Card.Body>
</Card>
        </div>
<div className='col-9' style={{ maxHeight: '530px', overflowY: 'auto' }}>
{contactList.length > 0 ? (
<Table striped bordered hover responsive style={{ maxHeight: '530px', overflowY: 'auto', maxWidth: '100%' }} className='contact-table'>
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
          closeAddContactPopup={closeAddContactPopup}
          
        />
      )}
    </div>
  );
};

export default ContactsPage;
