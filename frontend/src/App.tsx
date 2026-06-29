import { useState } from 'react';
import axios from 'axios';
import { Send, Bot, User, Copy } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: '👋 Hello! I am K8sAI Agent.\n\nAsk me anything about your Minikube cluster.\n\nTry: `get pods`, `top pods`, `analyse cluster`'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input;
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:8000/chat', { message: currentInput });
      setMessages(prev => [...prev, { role: 'assistant', content: res.data.reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ Cannot connect to backend. Is it running?' }]);
    }
    setLoading(false);
  };

  const copyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="max-w-3xl mx-auto p-4">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 py-8">
          <div className="text-4xl">🛡️</div>
          <h1 className="text-3xl font-semibold">K8sAI Agent</h1>
        </div>

        {/* Chat Area */}
        <div className="bg-zinc-900 rounded-3xl h-[75vh] flex flex-col border border-zinc-800 overflow-hidden">
          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] ${msg.role === 'user' ? 'bg-blue-600' : 'bg-zinc-800'} rounded-2xl p-5`}>
                  <pre className="whitespace-pre-wrap text-[15.5px] leading-relaxed font-light">
                    {msg.content}
                  </pre>
                  {msg.role === 'assistant' && (
                    <button 
                      onClick={() => copyMessage(msg.content)}
                      className="mt-4 text-xs flex items-center gap-1.5 text-zinc-400 hover:text-white"
                    >
                      <Copy size={15} /> Copy
                    </button>
                  )}
                </div>
              </div>
            ))}
            {loading && <div className="text-zinc-500 pl-4">Thinking...</div>}
          </div>

          {/* Input */}
          <div className="p-5 border-t border-zinc-800 bg-zinc-900">
            <div className="flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your question... (e.g. get pods)"
                className="flex-1 bg-zinc-800 border border-zinc-700 rounded-2xl px-6 py-4 focus:outline-none focus:border-emerald-500 placeholder-zinc-500"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 px-7 rounded-2xl transition"
              >
                <Send size={22} />
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-zinc-500 mt-4">
          Made for cluster analysis • Local AI + Minikube
        </p>
      </div>
    </div>
  );
}

export default App;