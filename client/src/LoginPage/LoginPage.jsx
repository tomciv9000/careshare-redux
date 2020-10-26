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

// class LoginPage extends React.Component {
//     constructor(props) {
//         super(props);

//         // reset login status
//         this.props.logout();

//         this.state = {
//             email: '',
//             password: '',
//             submitted: false
//         };

//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     handleChange(e) {
//         const { name, value } = e.target;
//         this.setState({ [name]: value });
//     }

//     handleSubmit(e) {
//         e.preventDefault();

//         this.setState({ submitted: true });
//         const { email, password } = this.state;
//         if (email && password) {
//             this.props.login(email, password);
//         }
//     }

//     render() {
//         const { loggingIn } = this.props;
//         const { email, password, submitted } = this.state;
//         return (
//             <div className="col-md-6 col-md-offset-3">
//                 <h2>Login</h2>
//                 <form name="form" onSubmit={this.handleSubmit}>
//                     <div className={'form-group' + (submitted && !email ? ' has-error' : '')}>
//                         <label htmlFor="username">Email</label>
//                         <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
//                         {submitted && !email &&
//                             <div className="help-block">Email is required</div>
//                         }
//                     </div>
//                     <div className={'form-group' + (submitted && !password ? ' has-error' : '')}>
//                         <label htmlFor="password">Password</label>
//                         <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
//                         {submitted && !password &&
//                             <div className="help-block">Password is required</div>
//                         }
//                     </div>
//                     <div className="form-group">
//                         <button className="btn btn-primary">Login</button>
//                         {loggingIn &&
//                             <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
//                         }
//                         <Link to="/register" className="btn btn-link">Register</Link>
//                     </div>
//                 </form>
//             </div>
//         );
//     }
// }

// function mapState(state) {
//     const { loggingIn } = state.authentication;
//     return { loggingIn };
// }

// const actionCreators = {
//     login: userActions.login,
//     logout: userActions.logout
// };

// const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
// export { connectedLoginPage as LoginPage };