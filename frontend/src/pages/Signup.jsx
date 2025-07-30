import React, { useState } from 'react';
import InputForm from '../components/InputForm';
import { saveAuth } from '../utils/authUtils';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        name, email, password, role
      });
      saveAuth(res.data.token, res.data.role);
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="container signup-page d-flex align-items-center justify-content-center">
      <div className="card shadow-lg p-4 col-md-6">
        <h2 className="text-center mb-4">Create Account</h2>
        <form onSubmit={handleSubmit}>
          <InputForm label="Name" type="text" value={name} onChange={setName} />
          <InputForm label="Email" type="email" value={email} onChange={setEmail} />
          <InputForm label="Password" type="password" value={password} onChange={setPassword} />

          <div className="mb-3">
            <label className="form-label">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-select"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
