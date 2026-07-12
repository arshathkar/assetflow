'use client';

import Header from '@/components/layout/Header';
import { aiPredictions, notifications } from '@/data/mockData';

const tierConfig: Record<string, { color: string; bg: string; border: string; icon: string }> = {
  'Critical': { color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/30', icon: '🔴' },
  'High': { color: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/30', icon: '🟠' },
  'Medium': { color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', icon: '🟡' },
  'Low': { color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', icon: '🟢' },
};

export default function PredictionsPage() {
  const sorted = [...aiPredictions].sort((a, b) => b.overallRisk - a.overallRisk);

  return (
    <>
      <Header title="Predictive Alerts" />
      <div className="p-6 space-y-6">
        <div className="opacity-0 animate-fadeInUp">
          <h2 className="text-2xl font-bold text-white">🔮 AI Predictive Maintenance</h2>
          <p className="text-sm text-slate-500">AI-powered failure predictions based on asset history and condition</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 opacity-0 animate-fadeInUp delay-100">
          {['Critical', 'High', 'Medium', 'Low'].map(tier => {
            const count = aiPredictions.filter(p => p.riskTier === tier).length;
            const cfg = tierConfig[tier];
            return (
              <div key={tier} className={`glass-card p-4 border ${cfg.border} text-center`}>
                <span className="text-2xl">{cfg.icon}</span>
                <p className={`text-2xl font-bold ${cfg.color} mt-1`}>{count}</p>
                <p className="text-xs text-slate-500">{tier} Risk</p>
              </div>
            );
          })}
        </div>

        {/* Prediction Cards */}
        <div className="space-y-4 opacity-0 animate-fadeInUp delay-200">
          {sorted.map(pred => {
            const cfg = tierConfig[pred.riskTier];
            return (
              <div key={pred.id} className={`glass-card p-6 border ${cfg.border}`}>
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Left: Asset Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{cfg.icon}</span>
                      <div>
                        <h4 className="text-base font-semibold text-white">{pred.assetName}</h4>
                        <p className="text-xs font-mono text-blue-400">{pred.assetAssetId}</p>
                      </div>
                      <span className={`badge border ${cfg.bg} ${cfg.color} ${cfg.border} ml-auto`}>
                        {pred.riskTier} Risk — {pred.overallRisk}%
                      </span>
                    </div>

                    {/* Component Breakdown */}
                    <div className="space-y-2 mt-4">
                      <p className="text-xs text-slate-500 font-medium">Component Risk Breakdown</p>
                      {pred.components.map(comp => (
                        <div key={comp.name} className="flex items-center gap-3">
                          <span className="text-xs text-slate-400 w-20">{comp.name}</span>
                          <div className="flex-1 h-4 bg-white/5 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                comp.risk >= 80 ? 'bg-red-500' : comp.risk >= 60 ? 'bg-orange-500' : comp.risk >= 30 ? 'bg-yellow-500' : 'bg-emerald-500'
                              }`}
                              style={{ width: `${comp.risk}%` }}
                            />
                          </div>
                          <span className={`text-xs w-10 text-right font-medium ${
                            comp.risk >= 80 ? 'text-red-400' : comp.risk >= 60 ? 'text-orange-400' : comp.risk >= 30 ? 'text-yellow-400' : 'text-emerald-400'
                          }`}>{comp.risk}%</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Prediction Details */}
                  <div className="lg:w-64 space-y-3 bg-white/3 rounded-xl p-4">
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase">Predicted Failure</p>
                      <p className="text-sm text-white font-medium">Within {pred.predictedFailureDays} days</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase">Likely Component</p>
                      <p className="text-sm text-white font-medium">{pred.likelyComponent}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase">Recommendation</p>
                      <p className="text-sm text-slate-300">{pred.recommendation}</p>
                    </div>
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-medium rounded-lg hover:shadow-lg transition-all mt-2">
                      Schedule Maintenance
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
