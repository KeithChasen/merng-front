import React, { useContext, useState } from 'react';
import { Form, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from '@apollo/react-hooks';

import { useForm } from "../utils/hooks";
import { AuthContext } from "../context/auth";

function Register(props) {
  const [errors, setErrors] = useState({});
  const context = useContext(AuthContext);

  const initialState = {
    username: '',
    password: '',
    email: '',
    confirmPassword: '',
  };

  const {
    onChange,
    onSubmit,
    values
  } = useForm(registerUser, initialState);

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      context.login(result.data.register);
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors)
    },
    variables: values
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>
        <Form.Input
        label='Username'
        placeholder='Username'
        name='username'
        type='text'
        value={values.username}
        error={!!errors.username}
        onChange={onChange}
        />
        <Form.Input
          label='Email'
          placeholder='Email'
          name='email'
          type='email'
          value={values.email}
          error={!!errors.email}
          onChange={onChange}
        />
        <Form.Input
          label='Password'
          placeholder='Password'
          name='password'
          type='password'
          value={values.password}
          error={!!errors.password}
          onChange={onChange}
        />
        <Form.Input
          label='Confirm Password'
          placeholder='Confirm Password'
          name='confirmPassword'
          type='password'
          value={values.confirmPassword}
          error={!!errors.confirmPassword}
          onChange={onChange}
        />
        <Button type='submit' primary>
          Register
        </Button>
      </Form>
      {
        Object.keys(errors).length > 0 &&
        <div className="ui error message">
          <ul className="list">
            { Object.values(errors).map(val => (
              <li key={val}>{val}</li>
            )) }
          </ul>
        </div>
      }
    </div>
  )
}

const REGISTER_USER = gql`  
  mutation register(
      $username: String!
      $email: String!
      $password: String!
      $confirmPassword: String!
  ) {
      register(
          registerInput: {
            username: $username
            email: $email
            password: $password
            confirmPassword: $confirmPassword
          }
      ) {
          id email username createdAt token
      }
  }
`;

export default Register;
