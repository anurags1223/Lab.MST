import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

function App() {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [postDeleted, setPostDeleted] = useState(false);

  function login(selectedRole) {
    const name = username.trim();

    if (!name) {
      setError('Please enter a username first.');
      return;
    }

    setUsername(name);
    setRole(selectedRole);
    setError('');
  }

  function logout() {
    setUsername('');
    setRole('');
    setPostDeleted(false);
    setError('');
  }

  return (
    <main className="page-shell">
      <section className="panel">
        <div className="topline">
          <div className="brand">
            <span className="brand-icon">R</span>
            <span>Role Access</span>
          </div>
          <span className="project-tag">Q2 · React Demo</span>
        </div>

        {!role ? (
          <>
            <div className="heading">
              <p className="eyebrow">WELCOME BACK</p>
              <h1>Choose how to sign in.</h1>
              <p className="subtext">Enter your name, then select a role to continue.</p>
            </div>

            <form onSubmit={(event) => { event.preventDefault(); login('Admin'); }}>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                maxLength="40"
                placeholder="e.g. Alex"
                value={username}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? 'username-error' : undefined}
                onChange={(event) => {
                  setUsername(event.target.value);
                  setError('');
                }}
              />
              {error && <p className="error" id="username-error">{error}</p>}

              <p className="choice-label">SELECT YOUR ROLE</p>
              <div className="role-buttons">
                <button className="role-button admin-button" type="button" onClick={() => login('Admin')}>
                  <span className="role-symbol" aria-hidden="true">◆</span>
                  <span className="role-copy"><strong>Login as Admin</strong><small>Manage posts</small></span>
                  <span className="arrow" aria-hidden="true">→</span>
                </button>
                <button className="role-button viewer-button" type="button" onClick={() => login('Viewer')}>
                  <span className="role-symbol" aria-hidden="true">◉</span>
                  <span className="role-copy"><strong>Login as Viewer</strong><small>Read content</small></span>
                  <span className="arrow" aria-hidden="true">→</span>
                </button>
              </div>
            </form>
          </>
        ) : (
          <>
            <div className="heading logged-in-heading">
              <p className="eyebrow">YOU ARE SIGNED IN</p>
              <h1>Welcome, {username} <span className="role-in-heading">({role})</span></h1>
              <p className="subtext">Your access is based on the role you selected.</p>
            </div>

            {role === 'Admin' ? (
              <div className="access-card admin-card" aria-live="polite">
                <div className="card-header">
                  <span className="badge admin-badge">ADMIN ACCESS</span>
                  <span className="card-icon" aria-hidden="true">◆</span>
                </div>
                {postDeleted ? (
                  <p className="success-message">Post deleted successfully.</p>
                ) : (
                  <>
                    <h2>Sample post</h2>
                    <p>This is a demo post you can delete.</p>
                    <button className="delete-button" onClick={() => setPostDeleted(true)}>Delete Post</button>
                  </>
                )}
              </div>
            ) : (
              <div className="access-card viewer-card">
                <div className="card-header">
                  <span className="badge viewer-badge">VIEWER ACCESS</span>
                  <span className="card-icon" aria-hidden="true">◉</span>
                </div>
                <h2>Read-only access</h2>
                <p>You can view content, but cannot delete posts.</p>
              </div>
            )}

            <button className="logout-button" onClick={logout}>Logout <span aria-hidden="true">→</span></button>
          </>
        )}
      </section>
      <p className="footer-note">Simple role-based login with React</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);


