import React, { useState } from 'react';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [registerMode, setRegisterMode] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await fetch('https://mvp-backend-te87.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Welcome " + data.name);
        setUser(data);
      }
      else 
      alert(data.message || 'Login failed');
    } catch (err) {
      console.error(err);
      alert('Server error. Is the backend running?');
    }
  };

  const handleRegister = async () => {
    try {
      const res = await fetch('https://mvp-backend-te87.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        alert('Registration successful! Please login.');
        setRegisterMode(false);
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (err) {
      console.error(err);
      alert('Server error. Is the backend running?');
    }
  };

  return ( 
    <div className="flex items-center justify-center min-h-screen  bg-gradient-to-r from-blue-400 to-purple-400">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {registerMode ? 'Register' : 'Login'}
        </h2>
        {registerMode && (
          <input
            type="text"
            placeholder="Name"
            className="w-full mb-4 p-2 border rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          onClick={registerMode ? handleRegister : handleLogin}
        >
          {registerMode ? 'Register' : 'Login'}
        </button>
        <p className="mt-4 text-sm text-center">
          {registerMode ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            onClick={() => setRegisterMode(!registerMode)}
            className="text-blue-600 hover:underline"
          >
            {registerMode ? 'Login' : 'Register'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
