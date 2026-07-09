import InstructorLayout from '@/layouts/role/InstructorLayout';
import { MOCK_ANALYTICS } from '@/services/mockData';
import { AreaChart, Area, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { TrendingUp, Users, BookOpen, Star } from 'lucide-react';

export default function InstructorAnalytics() {
  return (
    <InstructorLayout>
      <div className="mb-6">
        <h1 className="font-display font-bold text-2xl sm:text-3xl">Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">Teaching performance insights</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Student Growth', value: '+24%', icon: TrendingUp, color: 'text-green-600 bg-green-50' },
          { label: 'Active Students', value: '1,240', icon: Users, color: 'text-blue-600 bg-blue-50' },
          { label: 'Course Views', value: '18.4K', icon: BookOpen, color: 'text-primary bg-primary/10' },
          { label: 'Avg Review', value: '4.9★', icon: Star, color: 'text-yellow-600 bg-yellow-50' },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}><s.icon className="w-5 h-5" /></div>
            <div className="font-display font-bold text-2xl">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-5">Revenue Trend</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={MOCK_ANALYTICS.revenueByMonth}>
              <defs>
                <linearGradient id="iang" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(125,45%,33%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(125,45%,33%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`} />
              <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(125,45%,33%)" strokeWidth={2} fill="url(#iang)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-5">Top Products by Revenue</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={MOCK_ANALYTICS.topProducts} layout="vertical">
              <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} width={100} />
              <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, 'Revenue']} contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
              <Bar dataKey="revenue" fill="hsl(125,45%,33%)" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </InstructorLayout>
  );
}
