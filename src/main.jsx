import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

function Icon({ name, size = 20 }) {
  const shapes = {
    user: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></>,
    shield: <><path d="M12 2.5 20 6v5.5c0 5-3.3 8.2-8 10-4.7-1.8-8-5-8-10V6l8-3.5Z" /><path d="m9 12 2 2 4-4" /></>,
    eye: <><path d="M2.5 12S6 6.5 12 6.5 21.5 12 21.5 12 18 17.5 12 17.5 2.5 12 2.5 12Z" /><circle cx="12" cy="12" r="2.5" /></>,
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    trash: <><path d="M4.5 7h15" /><path d="M9 7V4.5h6V7" /><path d="m6.5 7 .8 13h9.4l.8-13" /><path d="M10 10.5v6" /><path d="M14 10.5v6" /></>,
    logout: <><path d="M10 4H5v16h5" /><path d="M14 7l5 5-5 5" /><path d="M8 12h11" /></>,
    check: <path d="m5 12 4 4L19 6" />,
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {shapes[name]}
    </svg>
  );
}

function App() {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [postDeleted, setPostDeleted] = useState(false);

  function login(selectedRole) {
    const name = username.trim();

    if (!name) {
      setError('Please enter your username.');
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
      <div className="app-frame">
        <aside className="intro-panel">
          <div className="intro-content">
            <span className="intro-kicker"><span className="kicker-dot" /> A SPACE FOR EVERY ROLE</span>
            <h2>Choose your access. Make it yours.</h2>
            <p>Sign in with your name and explore what each role can do.</p>
          </div>
          <div className="role-preview" aria-hidden="true">
            <div className="preview-glow" />
            <div className="preview-card preview-admin"><span className="preview-icon"><Icon name="shield" size={19} /></span><span><strong>Admin</strong><small>Manage content</small></span><span className="preview-check"><Icon name="check" size={13} /></span></div>
            <div className="preview-card preview-viewer"><span className="preview-icon"><Icon name="eye" size={19} /></span><span><strong>Viewer</strong><small>Read content</small></span><span className="preview-check"><Icon name="check" size={13} /></span></div>
          </div>
          <p className="intro-footnote">Your experience changes with your role.</p>
        </aside>

        <section className="content-panel">
          {!role ? (
            <div className="content-inner">
              <span className="eyebrow">SIGN IN</span>
              <h1>Welcome back<span className="accent-dot">.</span></h1>
              <p className="lead">Enter your username, then choose how you want to continue.</p>

              <form onSubmit={(event) => { event.preventDefault(); login('Admin'); }}>
                <label htmlFor="username">Username</label>
                <div className={`input-wrap ${error ? 'has-error' : ''}`}>
                  <Icon name="user" size={20} />
                  <input
                    id="username"
                    type="text"
                    autoComplete="username"
                    maxLength={40}
                    placeholder="Enter your username"
                    value={username}
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? 'username-error' : undefined}
                    onChange={(event) => {
                      setUsername(event.target.value);
                      setError('');
                    }}
                  />
                </div>
                {error && <p className="error" id="username-error" role="alert">{error}</p>}

                <div className="role-heading"><span>CONTINUE AS</span><span className="role-heading-line" /></div>
                <div className="role-options">
                  <button className="role-option" type="button" onClick={() => login('Admin')}>
                    <span className="option-icon admin-icon"><Icon name="shield" size={22} /></span>
                    <strong>Login as Admin</strong>
                    <small>Manage and delete posts</small>
                    <span className="option-arrow"><Icon name="arrow" size={18} /></span>
                  </button>
                  <button className="role-option" type="button" onClick={() => login('Viewer')}>
                    <span className="option-icon viewer-icon"><Icon name="eye" size={22} /></span>
                    <strong>Login as Viewer</strong>
                    <small>Browse with read-only access</small>
                    <span className="option-arrow"><Icon name="arrow" size={18} /></span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="content-inner signed-in">
              <div className="avatar" aria-hidden="true">{username.charAt(0).toUpperCase()}</div>
              <span className="eyebrow">SIGNED IN SUCCESSFULLY</span>
              <h1>Welcome, {username} <span className="role-text">({role})</span></h1>
              <p className="lead">Here is what you can do with your access.</p>

              {role === 'Admin' ? (
                <div className="permission-card" aria-live="polite">
                  <div className="permission-top"><span className="permission-icon admin-icon"><Icon name="shield" size={21} /></span><span className="permission-label">ADMIN ACCESS</span></div>
                  {postDeleted ? (
                    <div className="deleted-state"><span className="success-icon"><Icon name="check" size={20} /></span><div><h2>Post deleted</h2><p>The sample post has been removed.</p></div></div>
                  ) : (
                    <>
                      <h2>Sample post</h2>
                      <p>This is a sample post for the role-based demo.</p>
                      <button className="delete-button" onClick={() => setPostDeleted(true)}><Icon name="trash" size={18} /> Delete Post</button>
                    </>
                  )}
                </div>
              ) : (
                <div className="permission-card viewer-card">
                  <div className="permission-top"><span className="permission-icon viewer-icon"><Icon name="eye" size={21} /></span><span className="permission-label">VIEWER ACCESS</span></div>
                  <h2>Read-only access</h2>
                  <p>You can view content, but cannot delete posts.</p>
                </div>
              )}

              <button className="logout-button" onClick={logout}><Icon name="logout" size={18} /> Logout</button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
