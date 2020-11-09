import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../_actions/user.actions';
import Button from 'react-bootstrap/Button'
//BOOKMARK - CONVET THIS TO A FUNCTIONAL COMPONENT AND ADD LOGOUT

export const HomePage = () => {
    const dispatch = useDispatch()
    const logout = userActions.logout

    const activeUser = useSelector(state => state.authentication.user)

    const handleClick = (event) => {
        console.log("Homepage Logout clicked")
        event.preventDefault()
        dispatch(logout())
      }

    
    return (
        <div>
            <h1>C a r e S h a r e</h1>
            <h3>User Profile Page (Private)</h3>
            <p>Hello, {activeUser.uid}!</p>
            <p>
            <Button onClick={handleClick}variant="outline-primary" size="sm">Log Out</Button>
            </p>
        </div>
    )
}



/* class HomePage extends React.Component {
    
    render() {
        const { user, users } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi guy</h1>
                <p>You're logged in with React!!</p>
                
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage }; */