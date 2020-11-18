import React from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Formik } from "formik"
import * as Yup from "yup"
import { Form, Button, Container } from "react-bootstrap"
import { childActions } from "../_actions/child.actions"
const today = new Date();

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .max(30, 'Must be 70 characters or less')
    .required("Required"),
  birthdate: Yup.date()
    .max(today, 'Cannot be a future date')
    .required('Required'),
});

export const NewChildForm = () => {
    
    const dispatch = useDispatch()
    const register = childActions.register
    
    return (
        <Container className="auth-form">
            <Formik
                initialValues={{ 
                    name:"", 
                    birthdate:""}}
                validationSchema={validationSchema}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    setSubmitting(true);
                    console.log(values)
                    dispatch(register(values))
                    resetForm()
                    setSubmitting(false)
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
                    <Form noValidate onSubmit={handleSubmit}>
                        <h3>Register Your Child</h3>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                isInvalid={touched.name && !!errors.name} />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Birthdate</Form.Label>
                            <Form.Control
                                type="date"
                                name="birthdate"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.birthdate}
                                isInvalid={touched.birthdate && !!errors.birthdate} />
                            <Form.Control.Feedback type="invalid">
                                {errors.birthdate}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Button  
                            type="submit" 
                            disabled={ 
                                isSubmitting || 
                                !isValid 
                            }>
                        Submit
                        </Button>
                        <Form.Text className="text-muted">
                        <Link to="/login">Cancel</Link>
                        </Form.Text>
                    </Form>
                )}
            </Formik>
        </Container>
    )
}