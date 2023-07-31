import React, { useState, useEffect } from 'react';
import { Button, Alert, Form, Modal } from 'react-bootstrap';
import CancelIcon from '@mui/icons-material/Cancel';
import IconButton from '@mui/material/IconButton';

const AddContactPopup = ({ addContact, tagList, closeAddContactPopup }) => {
  const [tags,setTags]=useState(tagList);
  const [name,setName]=useState('');
  const [phoneNumber,setPhoneNumber]=useState(94);
  const [email,setEmail]=useState('');
  const [selectedTags, setSelectedTags]=useState([]);
  const [otherTag, setOtherTag] = useState('');
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [isOtherSelect,setOtherSelect]=useState(false);
  const [error,setError]=useState('');

  useEffect(() => {
   
  }, []);

  
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
console.warn(selectedTags);
addContact(name,phoneNumber,email,selectedTags);
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

  const handleTagSelection = (tag) => {
    if (tag === 'other') {
      setShowOtherInput(true);
    } else {
      // Toggle the selection status of the clicked tag
      setSelectedTags((prevSelectedTags) =>
        prevSelectedTags.includes(tag)
          ? prevSelectedTags.filter((t) => t !== tag)
          : [...prevSelectedTags, tag]
      );
  
      // Hide the "Other" input field if it was previously shown
      setShowOtherInput(false);
    }
  };

  const handleOtherTagSelection=()=>{
    setOtherSelect(true);
    setShowOtherInput(true);
  }
  
  const handleOtherTagInputChange = (event) => {
    setOtherTag(event.target.value);
  };
  
  const handleAddOtherTag = () => {
    if (otherTag.trim() !== '') {
      // Add the value from the input field to the selectedTags array
      setSelectedTags((prevSelectedTags) =>
        prevSelectedTags.includes(otherTag)
          ? prevSelectedTags.filter((t) => t !== otherTag)
          : [...prevSelectedTags, otherTag]
      );
  
      // Clear the input field and hide it
      setOtherTag('');
      setShowOtherInput(false);
    }
  };
  
//other checkbox select

  return (
    <Modal show={true} onHide={closeAddContactPopup} size="m">
      <Modal.Body>
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
  <div className='row'>
    <div className='col-5'>
      <Form.Label style={{ marginTop: '5px' }}>Tags: </Form.Label>
    </div>
    <div className='col-7'>
      {tags.map((tag) => (
        <Form.Check
          key={tag}
          type="checkbox"
          id={`tag-${tag.name}`}
          label={tag.name}
          checked={selectedTags.includes(tag.name)}
          onChange={() => handleTagSelection(tag.name)}
        />
      ))}
      <Form.Check
        type="checkbox"
        id="tag-other"
        label="Other"
        checked={isOtherSelect}
        onChange={()=>handleOtherTagSelection()}
      />
      {showOtherInput && (
        <div>
          <Form.Control
            type="text"
            placeholder="Enter other tag"
            value={otherTag}
            onChange={handleOtherTagInputChange}
          />
          <Button onClick={handleAddOtherTag} style={{ marginTop:'5px' }}>Save</Button>
        </div>
      )}
    </div>
  </div>
</Form.Group>

        </div>
        
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleAdd} style={{ width:'150px' }}>Submit</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddContactPopup;