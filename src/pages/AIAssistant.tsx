import { useState } from 'react';
import { PageHeader } from '../components/PageHeader';
import { assistantSuggestions, recommendations } from '../data/demoData';

const initialMessages = [
  { role: 'assistant', text: 'Welcome to AgroTwin AI. I can explain spoilage risk, recommend corrective actions, and summarize warehouse health.' },
  { role: 'assistant', text: 'Current priority: CO₂ is rising in Warehouse A Zone B. Run ventilation for 35 minutes and monitor humidity.' },
];

export function AIAssistant() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  function sendMessage(text = input) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMessages((items) => [
      ...items,
      { role: 'user', text: trimmed },
      { role: 'assistant', text: buildDemoReply(trimmed) },
    ]);
    setInput('');
  }

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="AI Assistant"
        title="Ask your storage intelligence agent"
        description="Demo assistant for summarizing alerts, interpreting risk, and generating operational recommendations."
      />

      <section className="assistant-layout">
        <div className="assistant-chat glass">
          <div className="chat-stream">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`chat-bubble ${message.role}`}>
                <span>{message.role === 'assistant' ? 'AI' : 'You'}</span>
                <p>{message.text}</p>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder="Ask about spoilage risk, alerts, or warehouse actions..." onKeyDown={(event) => event.key === 'Enter' && sendMessage()} />
            <button className="primary-button" onClick={() => sendMessage()}>Send</button>
          </div>
        </div>

        <aside className="glass panel-card assistant-side">
          <div className="section-head">
            <div>
              <span className="eyebrow">Suggested prompts</span>
              <h3>Operator shortcuts</h3>
            </div>
          </div>
          <div className="suggestion-list">
            {assistantSuggestions.map((suggestion) => (
              <button key={suggestion} onClick={() => sendMessage(suggestion)}>{suggestion}</button>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}

function buildDemoReply(prompt: string) {
  const lower = prompt.toLowerCase();
  if (lower.includes('alert') || lower.includes('summarize')) {
    return 'Today there is 1 critical alert, 2 warning alerts, and 2 info notifications. The main issue is CO₂ rise in Zone B with humidity drift in the cold room.';
  }
  if (lower.includes('zone b') || lower.includes('action')) {
    return recommendations.slice(0, 2).join(' ');
  }
  if (lower.includes('warehouse')) {
    return 'Eastern Smart Storage needs priority inspection because it has 73% health and 42% spoilage risk. North Agro Hub should run ventilation next.';
  }
  return 'The risk pattern is mainly caused by humidity, CO₂ concentration, and ethylene-sensitive crop batches. Recommended action: ventilate, dehumidify, then recheck sensor stability.';
}
