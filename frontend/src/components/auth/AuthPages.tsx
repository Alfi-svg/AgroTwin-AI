import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import type { AuthView } from '../../types';
import { AuthShell } from './AuthShell';

export function AuthPages() {
  const [view, setView] = useState<AuthView>('login');
  if (view === 'signup') return <Signup onChange={setView} />;
  if (view === 'forgot') return <Forgot onChange={setView} />;
  return <Login onChange={setView} />;
}

function Login({ onChange }: { onChange: (view: AuthView) => void }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('demo@agrotwin.ai');
  const [password, setPassword] = useState('agrotwin123');
  return (
    <AuthShell mode="Login">
      <h2>Welcome back</h2>
      <p>Use the demo credentials or any email/password to enter the prototype.</p>
      <form onSubmit={(event) => { event.preventDefault(); login(email, password); }}>
        <label>Email<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required /></label>
        <label>Password<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required /></label>
        <button className="primary-btn" type="submit">Enter AgroTwin AI</button>
      </form>
      <div className="auth-links"><button onClick={() => onChange('forgot')}>Forgot password?</button><button onClick={() => onChange('signup')}>Create account</button></div>
    </AuthShell>
  );
}

function Signup({ onChange }: { onChange: (view: AuthView) => void }) {
  const { signup } = useAuth();
  const [name, setName] = useState('AgroTwin Operator');
  const [email, setEmail] = useState('founder@agrotwin.ai');
  const [password, setPassword] = useState('agrotwin123');
  return (
    <AuthShell mode="Signup">
      <h2>Create demo workspace</h2>
      <p>Prototype authentication stores your session locally for offline demos.</p>
      <form onSubmit={(event) => { event.preventDefault(); signup(name, email, password); }}>
        <label>Name<input value={name} onChange={(e) => setName(e.target.value)} required /></label>
        <label>Email<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required /></label>
        <label>Password<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" required /></label>
        <button className="primary-btn" type="submit">Launch workspace</button>
      </form>
      <div className="auth-links"><button onClick={() => onChange('login')}>Back to login</button></div>
    </AuthShell>
  );
}

function Forgot({ onChange }: { onChange: (view: AuthView) => void }) {
  return (
    <AuthShell mode="Forgot password">
      <h2>Reset access</h2>
      <p>This is a demo reset flow. Enter any email and return to login.</p>
      <form onSubmit={(event) => { event.preventDefault(); onChange('login'); }}>
        <label>Email<input defaultValue="demo@agrotwin.ai" type="email" required /></label>
        <button className="primary-btn" type="submit">Send demo reset link</button>
      </form>
      <div className="auth-links"><button onClick={() => onChange('login')}>Back to login</button></div>
    </AuthShell>
  );
}
