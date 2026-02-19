import React, { useState } from 'react';
import { ProfileScreen } from './components/ProfileScreen';
import { AuthFlow } from './components/Auth/AuthFlow';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleAuthComplete = (isNew: boolean, email: string) => {
    setUserEmail(email);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
  };

  return (
    <div className="min-h-screen bg-[#FDF6E3] text-black font-sans selection:bg-neo-accent1 selection:text-white">
      <div className="max-w-md mx-auto min-h-screen bg-white relative shadow-2xl flex flex-col border-x-4 border-black">
        
        <main className="flex-1 overflow-y-auto no-scrollbar relative">
            {!isAuthenticated ? (
              <AuthFlow onAuthComplete={handleAuthComplete} />
            ) : (
              <ProfileScreen onLogout={handleLogout} email={userEmail} />
            )}
        </main>
      </div>
    </div>
  );
};

export default App;