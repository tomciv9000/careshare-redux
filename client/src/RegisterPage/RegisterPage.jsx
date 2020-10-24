
import { Link } from 'react-router-dom';
// import { connect } from 'react-redux';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Button, Container } from 'react-bootstrap';
import { userActions } from '../_actions/user.actions';


const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email()
        .required("Required"),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password is too short - should be 8 chars minimum.'),
    passwordConfirmation: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
});

export const RegisterPage = () => {
    const registering = useSelector(state => state.registration)
    const dispatch = useDispatch()
    const register = dispatch(userActions.register)

    return (
        <Container>
            <Formik
                initialValues={{ 
                    email:"", 
                    password:"", 
                    passwordConfirmation:""}}
                validationSchema={validationSchema}
                onSubmit={(values, {setSubmitting, resetForm}) => {
                    setSubmitting(true);

                    console.log(JSON.stringify(values))
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
            <Form noValidate onSubmit={handleSubmit} >
                <h3>Register</h3>
                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        isInvalid={touched.email && !!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.name}
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
                        isInvalid={touched.password && !!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.password}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formPasswordConfirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="passwordConfirmation"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.passwordConfirmation}
                        isInvalid={touched.passwordConfirmation && !!errors.passwordConfirmation}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.passwordConfirmation}
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

// class RegisterPage extends React.Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             user: {
//                 firstName: '',
//                 lastName: '',
//                 email: '',
//                 password: ''
//             },
//             submitted: false
//         };

//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleChange(event) {
//         const { name, value } = event.target;
//         const { user } = this.state;
//         this.setState({
//             user: {
//                 ...user,
//                 [name]: value
//             }
//         });
//     }

//     handleSubmit(event) {
//         event.preventDefault();

//         this.setState({ submitted: true });
//         const { user } = this.state;
//         if (user.firstName && user.lastName && user.email && user.password) {
//             this.props.register(user);
//         }
//     }

//     render() {
//         const { registering  } = this.props;
//         const { user, submitted } = this.state;
//         return (
//             <div className="col-md-6 col-md-offset-3">
//                 <h2>Register</h2>
//                 <form name="form" onSubmit={this.handleSubmit}>
//                     <div className={'form-group' + (submitted && !user.firstName ? ' has-error' : '')}>
//                         <label htmlFor="firstName">First Name</label>
//                         <input type="text" className="form-control" name="firstName" value={user.firstName} onChange={this.handleChange} />
//                         {submitted && !user.firstName &&
//                             <div className="help-block">First Name is required</div>
//                         }
//                     </div>
//                     <div className={'form-group' + (submitted && !user.lastName ? ' has-error' : '')}>
//                         <label htmlFor="lastName">Last Name</label>
//                         <input type="text" className="form-control" name="lastName" value={user.lastName} onChange={this.handleChange} />
//                         {submitted && !user.lastName &&
//                             <div className="help-block">Last Name is required</div>
//                         }
//                     </div>
//                     <div className={'form-group' + (submitted && !user.username ? ' has-error' : '')}>
//                         <label htmlFor="email">Email</label>
//                         <input type="text" className="form-control" name="username" value={user.username} onChange={this.handleChange} />
//                         {submitted && !user.username &&
//                             <div className="help-block">Username is required</div>
//                         }
//                     </div>
//                     <div className={'form-group' + (submitted && !user.password ? ' has-error' : '')}>
//                         <label htmlFor="password">Password</label>
//                         <input type="password" className="form-control" name="password" value={user.password} onChange={this.handleChange} />
//                         {submitted && !user.password &&
//                             <div className="help-block">Password is required</div>
//                         }
//                     </div>
//                     <div className="form-group">
//                         <button className="btn btn-primary">Register</button>
//                         {registering && 
//                             <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
//                         }
//                         <Link to="/login" className="btn btn-link">Cancel</Link>
//                     </div>
//                 </form>
//             </div>
//         );
//     }
// }

// function mapState(state) {
//     const { registering } = state.registration;
//     return { registering };
// }

// const actionCreators = {
//     register: userActions.register
// }

// const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
// export { connectedRegisterPage as RegisterPage };

