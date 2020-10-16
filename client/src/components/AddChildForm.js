import React from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';

//import { useSelector } from 'react-redux'
import { Form, Button, Container } from 'react-bootstrap';

//import Alert from 'react-bootstrap/Alert'
//import {signInRequest} from '../../actions/userActions';
//import { useDispatch } from 'react-redux';
const today = new Date();
//CREATE AN ADD CHILD ACTION TO DISPATCH

const validationSchema = Yup.object().shape({
  name: Yup.string()
        .max(15, 'Must be 70 characters or less')
        .required('Required'),
      sex: Yup.string()
        .matches(/[mfMF]/)
        .required('Required'),
      birthdate: Yup.date()
        .max(today, 'Cannot be a future date')
        .required('Required'),
});



const AddChildForm = () => {
  return (
    <Container className="childform">
      
    <Formik
      initialValues={{ name:"", sex:"", birthdate:""}}
      validationSchema={validationSchema}
      onSubmit={(values, {setSubmitting, resetForm}) => {
        setSubmitting(true);
        
        console.log(JSON.stringify(values));
          resetForm();
          setSubmitting(false);
        
      }}
    >
    
    {( {values,
          errors,
          touched,
          isValid,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting }) => (
        <Form noValidate onSubmit={handleSubmit} >
          <h3 id="add-child">Register Child</h3>
          
          <Form.Group controlId="formName">
            <Form.Label>Name :</Form.Label>
          <Form.Control 
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            isInvalid={touched.name && !!errors.name}
          />
          <Form.Control.Feedback type="invalid">
                  {errors.name}
          </Form.Control.Feedback>
          
        </Form.Group>
        
        <Form.Group controlId="formSex">
          <Form.Label>Sex</Form.Label>
          <Form.Control 
            as="select" 
            name="sex"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.sex}
            isInvalid={touched.sex && !!errors.sex}
          >
            <option disabled value="">Please Select</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.sex}
          </Form.Control.Feedback>
        </Form.Group>
        
        <Form.Group controlId="childBirthdate">
          <Form.Label>Select Birthdate</Form.Label>
          <Form.Control 
            type="date"
            name="birthdate"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.birthdate}
            isInvalid={touched.birthdate && !!errors.birthdate}
          />
          <Form.Control.Feedback type="invalid">
            {errors.birthdate}
          </Form.Control.Feedback>
        </Form.Group>
        
        <Button block size="large" type="submit" disabled={isSubmitting}>
            Submit
        </Button>
      </Form>
  )}
  </Formik>
  </Container>
  )
}

export default AddChildForm