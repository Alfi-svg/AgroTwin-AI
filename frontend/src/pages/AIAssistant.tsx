import { useState } from 'react';
import { Bot, Send, Sparkles } from 'lucide-react';
import { PageHeader } from '../components/shared/PageHeader';
import { api } from '../services/api';
import type { ChatMessage } from '../types';

const suggestions = ['Explain current spoilage risk', 'Recommend action for humidity spike', 'Summarize 24-hour forecast', 'What should I inspect first?'];

export function AIAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'm1', role: 'assistant', content: 'Hello, I am AgroTwin AI. I can explain risks, recommend storage actions, summarize forecasts and prioritize alerts.', time: 'Now' }
  ]);
  const [input, setInput] = useState('Explain current spoilage risk');
  const [loading, setLoading] = useState(false);
  const send = async (text = input) => {
    if (!text.trim()) return;
    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: 'user', content: text, time: 'Now' };
    setMessages((current) => [...current, userMessage]);
    setInput(''); setLoading(true);
    const response = await api.assistant(text);
    setMessages((current) => [...current, { id: crypto.randomUUID(), role: 'assistant', content: `${response.reply}\n\nSuggested actions: ${response.recommendedActions.join(', ')}.`, time: 'Now' }]);
    setLoading(false);
  };
  return (
    <div className="page-stack">
      <PageHeader eyebrow="AI Assistant" title="Agentic Storage Copilot" description="Chatbot UI for risk explanation, recommendations, storage questions, forecast summary and suggested actions." action={<button className="primary-btn"><Sparkles size={16} /> Demo Agent</button>} />
      <section className="assistant-grid"><article className="glass-card chat-panel"><div className="chat-log">{messages.map((message) => <div key={message.id} className={`chat-bubble ${message.role}`}><strong>{message.role === 'assistant' ? 'AgroTwin AI' : 'You'}</strong><p>{message.content}</p><small>{message.time}</small></div>)}{loading && <div className="chat-bubble assistant skeleton-text"><strong>AgroTwin AI</strong><p>Thinking through sensor state, risk forecast and recommended actions...</p></div>}</div><form className="chat-input" onSubmit={(event) => { event.preventDefault(); send(); }}><input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about risk, storage, forecast, alerts..." /><button className="primary-btn" type="submit"><Send size={16} /></button></form></article><aside className="glass-card"><div className="card-head"><div><h2>Suggested Actions</h2><p>One-click demo prompts.</p></div><Bot size={20} /></div><div className="quick-grid">{suggestions.map((item) => <button key={item} onClick={() => send(item)}>{item}</button>)}</div></aside></section>
    </div>
  );
}
