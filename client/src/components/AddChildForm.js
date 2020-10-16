import React from "react";
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
//import { useSelector } from 'react-redux'
import { Form, Button, Container } from 'react-bootstrap';

//import Alert from 'react-bootstrap/Alert'
//import {signInRequest} from '../../actions/userActions';
//import { useDispatch } from 'react-redux';

import { TestForm, Title } from "./theme.js";


const today = new Date();


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
    <Container>
      
    <Formik
      initialValues={{ name:"", sex:"", birthdate:""}}
      validationSchema={validationSchema}
      onSubmit={(values, {setSubmitting, resetForm}) => {
        setSubmitting(true);
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          resetForm();
          setSubmitting(false);
        }, 500);
      }}
    >
    
    {( {values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting }) => (
        <TestForm onSubmit={handleSubmit} >
          <Title>Register Child</Title>
          {console.log(values)}
          <Form.Group controlId="formName">
            <Form.Label>Name :</Form.Label>
          <Form.Control 
            type="text"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            className={touched.name && errors.name ? "error" : null}
          />
          {touched.name && errors.name ? (
                <div className="error-message">{errors.name}</div>
              ): null}
        </Form.Group>
        
        <Form.Group controlId="formSex">
          <Form.Label>Sex</Form.Label>
          <Form.Control 
            as="select" 
            name="sex"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.sex}
            className={touched.sex && errors.sex ? "error" : null}
          >
            <option disabled value="">Please Select</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </Form.Control>
          {touched.sex && errors.sex ? (
                <div className="error-message">{errors.sex}</div>
              ): null}
        </Form.Group>
        
        <Form.Group controlId="childBirthdate">
          <Form.Label>Select Birthdate</Form.Label>
          <Form.Control 
            type="date"
            name="birthdate"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.birthdate}
            className={touched.birthdate && errors.birthdate ? "error" : null}
          />
          {touched.birthdate && errors.birthdate ? (
                <div className="error-message">{errors.birthdate}</div>
              ): null}
        </Form.Group>
        
        <Button type="submit" disabled={isSubmitting}>
            Submit
        </Button>
      </TestForm>
  )}
  </Formik>
  </Container>
  )
}

export default AddChildForm