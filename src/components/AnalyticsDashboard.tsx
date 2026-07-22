import React from 'react';
import { MOCK_ANALYTICS_METRICS, MOCK_TOP_CONTENT } from '../data/mockData';
import { 
  BarChart2, 
  Eye, 
  Clock, 
  Users, 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  ArrowUpRight 
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  CartesianGrid 
} from 'recharts';

export const AnalyticsDashboard: React.FC = () => {
  return (
    <div id="analytics-dashboard-view" className="space-y-8 max-w-6xl mx-auto">
      
      {/* Header Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-zinc-900 via-zinc-900 to-indigo-950/40 border border-zinc-800 rounded-3xl">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <TrendingUp className="w-4 h-4" />
            WhoMedia Analytics Hub
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-zinc-100">Channel Performance & Insights</h1>
          <p className="text-xs text-zinc-400 mt-1">Real-time audience retention, view velocity, and monetization revenue estimates.</p>
        </div>

        <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-xl text-xs font-mono text-zinc-300">
          <span>Last 7 Days (Jul 15 - Jul 21)</span>
        </div>
      </div>

      {/* Top Key Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 bg-zinc-900/80 border border-zinc-800 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-zinc-400 uppercase">Total Views</p>
            <h3 className="text-2xl font-black text-zinc-100 mt-1">278.8K</h3>
            <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-0.5 mt-1">
              <ArrowUpRight className="w-3 h-3" />
              +24.2% vs last week
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 bg-zinc-900/80 border border-zinc-800 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-zinc-400 uppercase">Watch Time (Hours)</p>
            <h3 className="text-2xl font-black text-zinc-100 mt-1">20,980</h3>
            <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-0.5 mt-1">
              <ArrowUpRight className="w-3 h-3" />
              +18.6% vs last week
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 bg-zinc-900/80 border border-zinc-800 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-zinc-400 uppercase">New Subscribers</p>
            <h3 className="text-2xl font-black text-zinc-100 mt-1">+4,870</h3>
            <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-0.5 mt-1">
              <ArrowUpRight className="w-3 h-3" />
              +31.4% vs last week
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-pink-500/10 text-pink-400 border border-pink-500/20 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="p-5 bg-zinc-900/80 border border-zinc-800 rounded-2xl flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-zinc-400 uppercase">Estimated Revenue</p>
            <h3 className="text-2xl font-black text-zinc-100 mt-1">$3,840</h3>
            <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-0.5 mt-1">
              <ArrowUpRight className="w-3 h-3" />
              +15.1% vs last week
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Daily Views Area Chart */}
        <div className="p-5 bg-zinc-900/80 border border-zinc-800 rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-indigo-400" />
              Daily View Velocity
            </h3>
            <span className="text-[10px] text-zinc-400">Total Views / Day</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_ANALYTICS_METRICS}>
                <defs>
                  <linearGradient id="viewGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="date" stroke="#71717a" fontSize={11} />
                <YAxis stroke="#71717a" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px', fontSize: '11px' }} 
                />
                <Area type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={3} fillOpacity={1} fill="url(#viewGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subscribers & Revenue Bar Chart */}
        <div className="p-5 bg-zinc-900/80 border border-zinc-800 rounded-2xl space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              Subscriber Growth Curves
            </h3>
            <span className="text-[10px] text-zinc-400">New Subs / Day</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_ANALYTICS_METRICS}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="date" stroke="#71717a" fontSize={11} />
                <YAxis stroke="#71717a" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', borderRadius: '12px', fontSize: '11px' }} 
                />
                <Bar dataKey="subscribersGained" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Top Performing Media Table */}
      <div className="p-6 bg-zinc-900/80 border border-zinc-800 rounded-2xl space-y-4">
        <h3 className="text-xs font-bold text-zinc-200 uppercase tracking-wider">
          Top Performing Media Content
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-zinc-300">
            <thead className="bg-zinc-950 text-zinc-400 uppercase text-[10px] border-b border-zinc-800">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Format</th>
                <th className="p-3">Total Views</th>
                <th className="p-3">Likes</th>
                <th className="p-3">Avg Engagement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {MOCK_TOP_CONTENT.map(item => (
                <tr key={item.id} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="p-3 font-semibold text-zinc-100">{item.title}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 capitalize text-[10px]">
                      {item.type}
                    </span>
                  </td>
                  <td className="p-3 font-mono">{item.views.toLocaleString()}</td>
                  <td className="p-3 font-mono text-rose-400">{item.likes.toLocaleString()}</td>
                  <td className="p-3 font-mono text-emerald-400">{item.engagement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
