import React from "react";
import { useFormik } from 'formik';
//import { useSelector } from 'react-redux'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
//import Alert from 'react-bootstrap/Alert'
//import {signInRequest} from '../../actions/userActions';
//import { useDispatch } from 'react-redux';

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
          multiple
          name="sex"
          onChange={formik.handleChange}
          value={formik.values.sex}
        >
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
  )
}