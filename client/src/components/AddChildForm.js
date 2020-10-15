import React from "react";
import { Formik, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
//import { useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap';

//import Alert from 'react-bootstrap/Alert'
//import {signInRequest} from '../../actions/userActions';
//import { useDispatch } from 'react-redux';

//import "../app.css";
// Styled-components styles

const today = new Date();
const CONTAINER = styled.div`
  background: #F7F9FA;
  height: auto;
  width: 90%;
  margin: 5em auto;
  color: snow;
  -webkit-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);

  @media(min-width: 786px) {
    width: 60%;
  }

  label {
    color: #24B9B6;
    font-size: 1.2em;
    font-weight: 400;
  }

  h1 {
    color: #24B9B6;
    padding-top: .5em;
  }

  .form-group {
    margin-bottom: 2.5em;
  }

  .error {
    border: 2px solid #FF6565;
  }

  .error-message {
    color: #FF6565;
    padding: .5em .2em;
    height: 1em;
    position: absolute;
    font-size: .8em;
  }
`;

const MYFORM = styled(Form)`
  width: 90%;
  text-align: left;
  padding-top: 2em;
  padding-bottom: 2em;

  @media(min-width: 786px) {
    width: 50%;
  }
`;

const BUTTON = styled(Button)`
  background: #1863AB;
  border: none;
  font-size: 1.2em;
  font-weight: 400;

  &:hover {
    background: #1D3461;
  }
`;

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
    <CONTAINER>
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
        <MYFORM onSubmit={handleSubmit} className="mx-auto">
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
        
        <BUTTON variant="primary" type="submit" disabled={isSubmitting}>
            Submit
        </BUTTON>
      </MYFORM>
  )}
  </Formik>
  </CONTAINER>
  )
}

export default AddChildForm