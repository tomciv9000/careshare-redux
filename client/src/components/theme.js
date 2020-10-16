import styled from 'styled-components';
import {Form, Button} from 'react-bootstrap';
// Forms, inputs, buttons

export const TestForm = styled(Form)`
  @media all and (max-width: 479px) {
    padding: 60px 0;
    margin: 0 auto;
    max-width: 300px;  
  };
  @media all and (min-width: 480px) {
    padding: 60px 0;
    margin: 0 auto;
    max-width: 320px;  
  }
`;
// export const myForm = styled(Form)`
//   width: 300px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `;

export const myInput = styled.input`
  width: 300px;
  height: 35px;
  border: 1px solid #ccc;
  background-color: #fff;
`;

export const myButton = styled(Button)`
  width: 300px;
  height: 35px;
  background-color: #5995ef;
  color: #fff;
  border-radius: 3px;
`;

// Text

export const Title = styled.h1`
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  color: #4d4d4d;
  text-align: center;
  font-size: 2.2em;
`;

export const Title2 = styled.h2`
  font-family: 'Raleway', sans-serif;
  font-weight: 300;
  color: #4d4d4d;
  font-size: 1.8em;
`;

export const Text = styled.p`
  font-family: 'Raleway', sans-serif;
  color: ${props => props.color || '#4d4d4d'}
`;