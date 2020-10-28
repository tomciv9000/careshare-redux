import React from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Formik } from "formik"
import * as Yup from "yup"
import { Form, Button, Container } from "react-bootstrap"
import { userActions } from "../_actions/user.actions"

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Please enter a valid email address.")
        .required("Required"),
    password: Yup.string()
        .required("Required")
        .min(8, "Password is too short - should be 8 chars minimum."),
    passwordConfirm: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("password"), null], "Passwords must match.")
});

export const RegisterPage = () => {
    
    const dispatch = useDispatch()
    const register = userActions.register
    
    return (
        <Container className="Login">
            <Formik
                initialValues={{ 
                    email:"", 
                    password:"", 
                    passwordConfirm:""}}
                validationSchema={validationSchema}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    setSubmitting(true);
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
                        <h3>Register</h3>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                isInvalid={touched.email && !!errors.email} />
                            <Form.Control.Feedback type="invalid">
                                {errors.email}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                isInvalid={touched.password && !!errors.password} />
                            <Form.Control.Feedback type="invalid">
                                {errors.password}
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formPasswordConfirm">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="passwordConfirm"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.passwordConfirm}
                                isInvalid={touched.passwordConfirm && !!errors.passwordConfirm} />
                            <Form.Control.Feedback type="invalid">
                                {errors.passwordConfirm}
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
                        Already have an account? <Link to="/register">Sign In</Link>
                        </Form.Text>
                    </Form>
                )}
            </Formik>
        </Container>
    )
}