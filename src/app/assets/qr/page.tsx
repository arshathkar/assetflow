'use client';

import Header from '@/components/layout/Header';
import { useApp } from '@/lib/context';

export default function QRManagerPage() {
  const { assets } = useApp();

  const handleAction = (msg: string) => {
    alert(msg);
  };

  return (
    <>
      <Header title="QR Code Manager" />
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 opacity-0 animate-fadeInUp">
          <div>
            <h2 className="text-2xl font-bold text-white">QR Code Manager</h2>
            <p className="text-sm text-slate-500">{assets.length} QR codes generated</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => handleAction('Camera scanner launched (mock)')} className="px-4 py-2 glass-card-hover text-sm text-slate-300">📷 Scan QR</button>
            <button onClick={() => handleAction(`Preparing batch print for ${assets.length} labels...`)} className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-blue-500/20 transition-all">🖨️ Batch Print</button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 opacity-0 animate-fadeInUp delay-200">
          {assets.map((asset) => (
            <div key={asset.id} className="glass-card-hover p-4 text-center group">
              <div className="w-full aspect-square bg-white rounded-xl flex items-center justify-center mb-3 p-3 relative overflow-hidden">
                <div className="w-full h-full bg-slate-900 rounded-lg flex flex-col items-center justify-center gap-1 group-hover:scale-105 transition-transform duration-500">
                  <span className="text-2xl">{asset.categoryIcon}</span>
                  <span className="text-[8px] text-white font-mono">{asset.assetId}</span>
                </div>
              </div>
              <p className="text-xs font-medium text-white truncate">{asset.name}</p>
              <p className="text-[10px] text-blue-400 font-mono">{asset.assetId}</p>
              <div className="flex gap-1 mt-2 justify-center">
                <button onClick={() => handleAction(`Downloaded ${asset.assetId}.png`)} className="text-[10px] px-2 py-0.5 bg-white/5 rounded text-slate-400 hover:bg-blue-500/20 hover:text-blue-400 transition-colors">PNG</button>
                <button onClick={() => handleAction(`Downloaded ${asset.assetId}.svg`)} className="text-[10px] px-2 py-0.5 bg-white/5 rounded text-slate-400 hover:bg-blue-500/20 hover:text-blue-400 transition-colors">SVG</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
