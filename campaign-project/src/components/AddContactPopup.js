import React, { useState } from 'react';
import { Button, Alert, Form, Modal } from 'react-bootstrap';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';
import { WithContext as ReactTags } from 'react-tag-input';
import '../styles/AddContactPopup.css';

const KeyCodes = {
  comma: 188,
  enter: 13
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const AddContactPopup = ({ addContact, closeAddContactPopup }) => {
 
  const [name,setName]=useState('');
  const [phoneNumber,setPhoneNumber]=useState(94);
  const [email,setEmail]=useState('');
  const [error,setError]=useState('');

  const [tags, setTags] = useState([]);

  const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = tag => {
  
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    setTags(newTags);
  };

  const handleTagClick = index => {
    console.log('The tag at index ' + index + ' was clicked');
  };

  
  const handleAdd = () => {
    setError('');
    if(!name){
setError('Name is required');
return
    }else if(!email){
        setError('Email is required');
        return 
    }else if (!validateEmail(email)) {
        setError('Invalid Email Address.');
          return;
      }else if(!phoneNumber){
        setError('Contact Number is required');
        return 
    }else if (!validatePhoneNumber(phoneNumber)) {
        setError('Invalid Contact Number.');
          return;
      }else{

const tagArr = tags.map(item => item.text);
addContact(name,phoneNumber,email,tagArr);
    }
  };

   // Email validation using regex
const validateEmail = (email) => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  }; 
  
  //contact number validation
  const validatePhoneNumber = (phone) => {
    const phoneNumberRegex = /^94\d{9}$/; // Regex pattern: Starts with 94 and followed by 9 digits
  
    return phoneNumberRegex.test(phone);
  };

  

  return (
    <Modal show={true} onHide={closeAddContactPopup} size="l">
      <Modal.Body>
        <div style={{ height:'300px',width:'100%' ,overflow: "auto" }}>
      <div className='row'>
                    <div className='col' style={{ textAlign:'right' }}>
                    <IconButton onClick={closeAddContactPopup}>
                      <CancelIcon />
                    </IconButton>
                    </div>
                </div>
        <div className="row">
          <div className="col" style={{ textAlign: 'center' }}>
            <h3>Add Contact</h3>
          </div>
        </div>
        <div className='row'>
        <Form.Group controlId="name" style={{ margin:'5px' }}>
            <div className='row'>
                <div className='col-5'>
                <Form.Label style={{ marginTop:'5px' }}>Name: </Form.Label>
                </div>
                <div className='col-7'>
                <Form.Control
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        {error && error.includes('Name') && (
                      <Alert variant='danger' style={{  textAlign: 'center',marginTop:'5px'}}>
                        {error}
                      </Alert>
                    )}
                </div>
            </div>
       
        
      </Form.Group>
      <Form.Group controlId="name" style={{ margin:'5px' }}>
            <div className='row'>
                <div className='col-5'>
                <Form.Label style={{ marginTop:'5px' }}>Email Address: </Form.Label>
                </div>
                <div className='col-7'>
                <Form.Control
          type="text"
          placeholder="Enter email address"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />{error && error.includes('Email') && (
            <Alert variant='danger' style={{  textAlign: 'center',marginTop:'5px' }}>
              {error}
            </Alert>
          )}
                </div>
            </div>
       
        
      </Form.Group>

      <Form.Group controlId="name" style={{ margin:'5px' }}>
            <div className='row'>
                <div className='col-5'>
                <Form.Label style={{ marginTop:'5px' }}>Contact Number: </Form.Label>
                </div>
                <div className='col-7'>
                <Form.Control
          type="text"
          placeholder="Enter contact number"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event.target.value)}
        />{error && error.includes('Contact') && (
            <Alert variant='danger' style={{  textAlign: 'center',marginTop:'5px' }}>
              {error}
            </Alert>
          )}
                </div>
            </div>
       
        
      </Form.Group>
      <Form.Group controlId="name" style={{ margin: '5px' }}>
  <div className='row' >
    <div className='col-5'>
      <Form.Label style={{ marginTop: '5px' }}>Tags: </Form.Label>
    </div>
    <div className='col-7'>
    <div>
    <ReactTags
          tags={tags}
          delimiters={delimiters}
          handleDelete={handleDelete}
          handleAddition={handleAddition}
          handleDrag={handleDrag}
          handleTagClick={handleTagClick}
          inputFieldPosition="bottom"
          autocomplete
          tagInputProps={{
            className: 'ReactTags__tagInputField' 
          }}
        />
      
      
    </div>
    </div>
  </div>
</Form.Group>

        </div>
        </div>
        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleAdd} style={{ width:'150px',background: 'rgb(29,161,242)' }}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddContactPopup;