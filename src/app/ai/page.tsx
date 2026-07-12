'use client';

import Header from '@/components/layout/Header';
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/context';
import { generateResponse } from '@/lib/ai/chatbot';
import type { ChatMessage } from '@/lib/types';
import { aiPredictions } from '@/data/mockData';

const exampleQueries = [
  'Show all assets under maintenance',
  'Which department has the most assets?',
  'Show critical health assets',
  'Who has the projector?',
  'Show my allocated assets',
  'What is the health score of AF-000001?',
];

function FormattedMessage({ content }: { content: string }) {
  // Split by Asset ID pattern AF-XXXXXX
  const parts = content.split(/(AF-\d{6})/g);
  return (
    <p className="text-sm text-slate-200 whitespace-pre-wrap leading-relaxed">
      {parts.map((part, i) => {
        if (/^AF-\d{6}$/.test(part)) {
          return (
            <Link key={i} href={`/assets/${part}`} className="text-blue-400 hover:text-blue-300 font-mono underline underline-offset-2">
              {part}
            </Link>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </p>
  );
}

export default function AIHubPage() {
  const { assets, employees, currentUser } = useApp();
  const [activeTab, setActiveTab] = useState<'chatbot' | 'health' | 'predictions'>('chatbot');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'assistant', content: '👋 Hello! I\'m your AssetFlow AI assistant. I can help you find assets, check health scores, view maintenance status, and more. Try asking me something!', timestamp: new Date().toISOString() },
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTab === 'chatbot') {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, activeTab]);

  const handleSend = (queryOverride?: string) => {
    const query = queryOverride ?? input;
    if (!query.trim()) return;
    
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: query, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    if (!queryOverride) setInput('');

    // Ensure we have a currentUser (fallback for typing strictness, AuthGate handles actual guarantee)
    const ctxUser = currentUser || employees[0];

    const response = generateResponse(query, { assets, employees, currentUser: ctxUser as any });
    const assistantMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: response, timestamp: new Date().toISOString() };

    setTimeout(() => {
      setMessages(prev => [...prev, assistantMsg]);
    }, 500);
  };

  // Health distribution for Health tab
  const healthDist = [
    { grade: 'Excellent', count: assets.filter(a => a.healthScore >= 90).length, color: 'bg-emerald-500', textColor: 'text-emerald-400' },
    { grade: 'Good', count: assets.filter(a => a.healthScore >= 70 && a.healthScore < 90).length, color: 'bg-green-400', textColor: 'text-green-400' },
    { grade: 'Fair', count: assets.filter(a => a.healthScore >= 50 && a.healthScore < 70).length, color: 'bg-yellow-400', textColor: 'text-yellow-400' },
    { grade: 'Poor', count: assets.filter(a => a.healthScore >= 30 && a.healthScore < 50).length, color: 'bg-orange-500', textColor: 'text-orange-400' },
    { grade: 'Critical', count: assets.filter(a => a.healthScore < 30).length, color: 'bg-red-500', textColor: 'text-red-400' },
  ];

  return (
    <>
      <Header title="AI Hub" />
      <div className="p-6 space-y-6">
        <div className="opacity-0 animate-fadeInUp">
          <h2 className="text-2xl font-bold text-white">🤖 AI Hub</h2>
          <p className="text-sm text-slate-500">Intelligent insights, predictions, and conversational AI</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 opacity-0 animate-fadeInUp delay-100">
          {[
            { key: 'chatbot', label: '💬 Chatbot', count: null },
            { key: 'health', label: '💚 Health Scores', count: assets.length },
            { key: 'predictions', label: '🔮 Predictions', count: aiPredictions.length },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? 'bg-blue-500/20 text-blue-400 shadow-lg shadow-blue-500/10'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {tab.label} {tab.count !== null && <span className="ml-1.5 opacity-50 text-xs">({tab.count})</span>}
            </button>
          ))}
        </div>

        {/* Chatbot Tab */}
        {activeTab === 'chatbot' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 opacity-0 animate-fadeInUp delay-200">
            <div className="lg:col-span-3 glass-card flex flex-col" style={{ height: '600px' }}>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'chat-user' : 'chat-assistant'}`}>
                      {msg.role === 'assistant' ? <FormattedMessage content={msg.content} /> : <p className="text-sm text-slate-200 whitespace-pre-wrap">{msg.content}</p>}
                      <p className="text-[10px] text-slate-600 mt-1 text-right">{new Date(msg.timestamp).toLocaleTimeString()}</p>
                    </div>
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-white/5">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask me anything about your assets..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSend()}
                    className="glass-input flex-1 px-4 py-3 text-sm"
                  />
                  <button onClick={() => handleSend()} className="px-5 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-medium rounded-xl hover:shadow-lg transition-all">
                    Send
                  </button>
                </div>
              </div>
            </div>

            {/* Example Queries */}
            <div className="glass-card p-4 h-fit">
              <h4 className="text-sm font-semibold text-white mb-3">Try asking...</h4>
              <div className="space-y-2">
                {exampleQueries.map(q => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="w-full text-left px-3 py-2 rounded-lg bg-white/3 hover:bg-white/8 text-xs text-slate-400 hover:text-white transition-colors border border-white/5"
                  >
                    &quot;{q}&quot;
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Health Scores Tab */}
        {activeTab === 'health' && (
          <div className="space-y-6 opacity-0 animate-fadeInUp delay-200">
            {/* Distribution */}
            <div className="glass-card p-6">
              <h3 className="text-base font-semibold text-white mb-4">Fleet Health Overview</h3>
              <div className="grid grid-cols-5 gap-3 mb-6">
                {healthDist.map(h => (
                  <div key={h.grade} className="text-center bg-white/3 rounded-xl p-4">
                    <p className={`text-2xl font-bold ${h.textColor}`}>{h.count}</p>
                    <p className="text-xs text-slate-400 mt-1">{h.grade}</p>
                  </div>
                ))}
              </div>
              <div className="h-4 bg-white/5 rounded-full overflow-hidden flex">
                {healthDist.map(h => (
                  <div key={h.grade} className={`h-full ${h.color} transition-all duration-1000`} style={{ width: `${assets.length > 0 ? (h.count / assets.length) * 100 : 0}%` }} title={`${h.grade}: ${h.count}`} />
                ))}
              </div>
            </div>

            {/* Lowest Health Assets Table */}
            <div className="glass-card overflow-hidden">
              <div className="p-4 border-b border-white/5 flex justify-between items-center">
                <h3 className="text-base font-semibold text-white">Assets Requiring Attention</h3>
                <span className="text-xs px-2 py-1 bg-red-500/10 text-red-400 rounded-lg font-medium">Critical & Poor</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-xs text-slate-500 border-b border-white/5 bg-white/[0.02]">
                      <th className="px-4 py-3 font-medium">Asset</th>
                      <th className="px-4 py-3 font-medium">ID</th>
                      <th className="px-4 py-3 font-medium">Health Score</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assets.filter(a => a.healthScore < 50).sort((a, b) => a.healthScore - b.healthScore).map(asset => (
                      <tr key={asset.id} className="border-b border-white/3 table-row-hover">
                        <td className="px-4 py-3 text-sm text-white"><Link href={`/assets/${asset.id}`} className="hover:text-blue-400 transition-colors">{asset.name}</Link></td>
                        <td className="px-4 py-3 text-sm font-mono text-blue-400"><Link href={`/assets/${asset.id}`} className="hover:text-blue-300 transition-colors">{asset.assetId}</Link></td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className={`text-sm font-medium ${asset.healthScore < 30 ? 'text-red-400' : 'text-orange-400'}`}>{asset.healthScore}%</span>
                            <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div className={`h-full rounded-full ${asset.healthScore < 30 ? 'bg-red-500' : 'bg-orange-500'}`} style={{ width: `${asset.healthScore}%` }} />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-400">{asset.status}</td>
                      </tr>
                    ))}
                    {assets.filter(a => a.healthScore < 50).length === 0 && (
                      <tr>
                        <td colSpan={4} className="px-4 py-8 text-center text-sm text-emerald-400">
                          🎉 Great news! No assets are in poor or critical condition.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Predictions Tab */}
        {activeTab === 'predictions' && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 opacity-0 animate-fadeInUp delay-200">
            {aiPredictions.map(pred => (
              <div key={pred.id} className="glass-card-hover p-5 border border-red-500/10 relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-16 h-16 blur-3xl opacity-20 ${
                  pred.riskTier === 'Critical' ? 'bg-red-500' : pred.riskTier === 'High' ? 'bg-orange-500' : 'bg-yellow-500'
                }`} />
                
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div>
                    <h3 className="text-sm font-bold text-white"><Link href={`/assets/${pred.assetId}`} className="hover:text-blue-400">{pred.assetName}</Link></h3>
                    <p className="text-[10px] text-blue-400 font-mono mt-0.5"><Link href={`/assets/${pred.assetId}`} className="hover:text-blue-300">{pred.assetAssetId}</Link></p>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded-lg ${
                    pred.riskTier === 'Critical' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 
                    pred.riskTier === 'High' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 
                    'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  }`}>{pred.riskTier} Risk</span>
                </div>

                <div className="bg-black/20 rounded-xl p-3 mb-4 relative z-10 border border-white/5">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-slate-400">Predicted Failure</span>
                    <span className="text-red-400 font-bold">In {pred.predictedFailureDays} days</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Likely Component</span>
                    <span className="text-white">{pred.likelyComponent}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4 relative z-10">
                  <p className="text-[10px] text-slate-500 uppercase font-semibold">Component Risk Breakdown</p>
                  {pred.components.map(comp => (
                    <div key={comp.name} className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 w-16 truncate">{comp.name}</span>
                      <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${comp.risk > 70 ? 'bg-red-500' : comp.risk > 40 ? 'bg-orange-500' : 'bg-emerald-500'}`} style={{ width: `${comp.risk}%` }} />
                      </div>
                      <span className="text-[10px] text-slate-500 w-6 text-right">{comp.risk}%</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/5 relative z-10">
                  <p className="text-xs text-slate-300 flex gap-2">
                    <span className="text-blue-400">💡</span>
                    <span className="leading-relaxed">{pred.recommendation}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
