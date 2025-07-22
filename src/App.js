import React, { useState } from 'react';
import WelcomeScreen from './Components/WelcomeScreen';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';


function App() {
  const [user, setUser] = useState(null);
  const [started, setStarted] = useState(false);

  return (
    <div className="min-h-screen">
      {!user && <Login setUser={setUser}  />}
      {user && !started && <WelcomeScreen user={user} onStart={() => setStarted(true)} />}
      {user && started && <Dashboard user={user} setUser={setUser} />}

     
    </div>
  );
}

export default App;
