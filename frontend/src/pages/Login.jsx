import React, { useState } from 'react';
import { Shield, Key, User, ArrowRight, HelpCircle, ExternalLink, Loader2, AlertCircle } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [pat, setPat] = useState('');
  
  const [showHelp, setShowHelp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanUsername = username.trim();
    const cleanPat = pat.trim();
    
    if (cleanUsername.length === 0 || cleanPat.length === 0) return;
    
    setIsLoading(true);
    setError(null);

    try {
      // --> REPLACE THIS URL WITH KASHI'S ACTUAL ENDPOINT <--
      const response = await fetch('YOUR_BACKEND_URL_HERE/api/verify-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${cleanPat}` 
        },
        // We are now sending BOTH the username and the token to Kashi
        body: JSON.stringify({ 
          username: cleanUsername, 
          token: cleanPat 
        }) 
      });

      if (!response.ok) {
        throw new Error('Invalid credentials or backend connection failed.');
      }

      // Save BOTH to the browser so the rest of your app can use them
      localStorage.setItem('github_username', cleanUsername);
      localStorage.setItem('github_pat', cleanPat);
      
      // Tell App.jsx we are successfully logged in
      onLogin(cleanPat);
      
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.message || 'Failed to connect to the server.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-[#1E293B] border border-slate-700/50 rounded-2xl shadow-2xl p-8 animate-in fade-in zoom-in duration-500">
        
        {/* Brand Logo */}
        <div className="flex justify-center mb-6">
          <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700 shadow-inner">
            <Shield className="w-10 h-10 text-emerald-400" />
          </div>
        </div>
        
        {/* Header Text */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">Welcome to CodeGuard AI</h2>
          <p className="text-slate-400 text-sm">Connect your GitHub account to begin monitoring.</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* NEW: Username Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              GitHub Username
            </label>
            <div className="relative flex items-center">
              <User className="w-5 h-5 text-slate-500 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="octocat"
                disabled={isLoading}
                className="w-full bg-slate-800/50 border border-slate-700 text-slate-200 rounded-lg pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                required
              />
            </div>
          </div>

          {/* PAT Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              Personal Access Token
            </label>
            <div className="relative flex items-center">
              <Key className="w-5 h-5 text-slate-500 absolute left-3.5 pointer-events-none" />
              <input
                type="password"
                value={pat}
                onChange={(e) => setPat(e.target.value)}
                placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                disabled={isLoading}
                className="w-full bg-slate-800/50 border border-slate-700 text-slate-200 rounded-lg pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed"
                required
              />
            </div>
          </div>

          {/* Dynamic Error Message */}
          {error && (
            <div className="flex items-center gap-2 text-rose-400 text-sm bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <button 
            type="submit"
            disabled={isLoading || pat.trim().length === 0 || username.trim().length === 0}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Verifying...
              </>
            ) : (
              <>
                Connect Workspace <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Interactive Help Section */}
        <div className="mt-6 border-t border-slate-800 pt-6">
          <button 
            onClick={() => setShowHelp(!showHelp)}
            type="button"
            className="w-full flex items-center justify-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            How do I get a GitHub PAT?
          </button>

          {showHelp && (
            <div className="mt-4 bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-sm animate-in slide-in-from-top-2">
              <ol className="list-decimal list-inside space-y-2 text-slate-300 mb-4">
                <li>Go to your GitHub <strong className="text-slate-200">Settings</strong>.</li>
                <li>Scroll down to <strong className="text-slate-200">Developer settings</strong>.</li>
                <li>Click <strong className="text-slate-200">Personal access tokens &rarr; Tokens (classic)</strong>.</li>
                <li>Click <strong className="text-slate-200">Generate new token</strong>.</li>
                <li>Check the <strong className="text-emerald-400">repo</strong> and <strong className="text-emerald-400">admin:repo_hook</strong> scopes.</li>
                <li>Generate and copy the token here!</li>
              </ol>
              
              <a 
                href="https://github.com/settings/tokens/new" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 w-full bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg transition-colors"
              >
                Open GitHub Settings <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Login;