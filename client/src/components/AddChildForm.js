import React from "react";
import { useFormik } from 'formik';
//import { useSelector } from 'react-redux'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
//import Alert from 'react-bootstrap/Alert'
//import {signInRequest} from '../../actions/userActions';
//import { useDispatch } from 'react-redux';

import "../app.css";

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length > 15) {
    errors.name = 'Must be 15 characters or less';
  }

  if (!values.sex) {
    errors.sex = 'Required';
  } 

  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  return errors;
};

const AddChildForm = () => {
  const formik = useFormik({
    initialValues: { 
      name: "",
      sex: "",
      birthdate: "",
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2))
    }
  });
  return (
    <div className="childform">
      <h3 id="add-child">Add Child</h3>
      <Form onSubmit={formik.handleSubmit}>

        <Form.Group controlId="formName">
          <Form.Label>Child's Name</Form.Label>
          <Form.Control 
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
        </Form.Group>

        <Form.Group controlId="formSex">
          <Form.Label>Sex</Form.Label>
          <Form.Control 
            as="select" 
            name="sex"
            onChange={formik.handleChange}
            value={formik.values.sex}
          >
            <option disabled value="">Please Select</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="childBirthdate">
          <Form.Label>Select Birthdate</Form.Label>
          <Form.Control 
            type="date"
            name="birthdate"
            onChange={formik.handleChange}
            value={formik.values.birthdate}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default AddChildForm