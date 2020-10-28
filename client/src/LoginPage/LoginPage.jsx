import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, Container } from "react-bootstrap";
import { userActions } from "../_actions/user.actions";

const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Please enter a valid email address.")
        .required("Required"),
    password: Yup.string()
        .required("Required")

});
export const LoginPage = () => {

    const dispatch = useDispatch()
    const login = userActions.login
    const logout = userActions.logout

    useEffect(() => {
        console.log("logout exec...")
        logout()
    })
    return (
        <Container>
            <Formik
                initialValues={{ 
                    email:"", 
                    password:""}}
                validationSchema={validationSchema}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    setSubmitting(true);
                    dispatch(login(values))
                    console.log(values)
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
                        <h3>Login</h3>
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
                        <Button  
                            type="submit" 
                            disabled={ 
                                isSubmitting || 
                                !isValid 
                            }>
                        Submit
                        </Button>
                    </Form>
                )}    
            </Formik>
        </Container>
    )
}