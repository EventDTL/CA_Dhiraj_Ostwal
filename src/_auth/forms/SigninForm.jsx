import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/AuthContext';
import { useSignInAccount } from '../../lib/react-query/queries';
import './SigninForm.css';
import Loader2 from '../../component/shared/Loader2';

const SigninForm = () => {
  const navigate = useNavigate();
  const { checkAuthUser, isLoading: isUserLoading } = useUserContext();
  const { mutateAsync: signInAccount, isLoading, isError } = useSignInAccount();
  const [error, setError] = useState('');

  const handleSignin = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const formData = Object.fromEntries(data.entries());

    try {
      const session = await signInAccount(formData);

      if (!session) {
        setError('Incorrect email or password. Please try again.');
        return;
      }

      const isLoggedIn = await checkAuthUser();
      if (isLoggedIn) {
        event.target.reset();
        navigate('/');
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Sign-in error:', error);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className='containerform py-10'>
      <h3>Admin Login</h3>
      <form onSubmit={handleSignin} className='w-100'>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            className='form-control'
            placeholder='Enter email'
            required
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input
            type='password'
            id='password'
            name='password'
            className='form-control'
            placeholder='Password'
            required
          />
        </div>

{error && (
  <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-2" role="alert">
  <span class="block sm:inline">Wrong credentials</span>
</div>
)}

        <button className='signin-btn btn btn-primary' style={{ position: 'relative' }} disabled={isLoading}>
          {isLoading ? (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Loader2 />
              <span style={{ marginLeft: '50px', position: 'absolute', top: '50%', transform: 'translateY(-50%)' }}>Loading...</span>
            </div>
          ) : (
            'Log in'
          )}
        </button>
      </form>
    </div>
  );
};

export default SigninForm;
