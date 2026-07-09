import { BookOpen, Users, DollarSign, Star, TrendingUp, ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import InstructorLayout from '@/layouts/role/InstructorLayout';
import { useAuth } from '@/contexts/AuthContext';
import { MOCK_COURSES, MOCK_WORKSHOPS } from '@/services/mockData';
import { ROUTES } from '@/constants';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const EARNINGS_DATA = [
  { month: 'Feb', amount: 1200 }, { month: 'Mar', amount: 1800 }, { month: 'Apr', amount: 2400 },
  { month: 'May', amount: 2100 }, { month: 'Jun', amount: 3200 }, { month: 'Jul', amount: 3800 },
];

export default function InstructorOverview() {
  const { user } = useAuth();
  return (
    <InstructorLayout>
      <div className="mb-8">
        <h1 className="font-display font-bold text-2xl sm:text-3xl">Welcome, {user?.name?.split(' ')[0]}! 👩‍🏫</h1>
        <p className="text-muted-foreground text-sm mt-1">Your teaching impact this month</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Students', value: '4,430', change: '+12%', icon: Users, color: 'text-green-600 bg-green-50' },
          { label: 'Courses Published', value: '3', change: '+1', icon: BookOpen, color: 'text-blue-600 bg-blue-50' },
          { label: 'Monthly Earnings', value: '$3,800', change: '+18%', icon: DollarSign, color: 'text-primary bg-primary/10' },
          { label: 'Avg Rating', value: '4.9★', change: '+0.1', icon: Star, color: 'text-yellow-600 bg-yellow-50' },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-2xl border border-border p-5">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}>
              <s.icon className="w-5 h-5" />
            </div>
            <div className="font-display font-bold text-2xl">{s.value}</div>
            <div className="flex items-center justify-between mt-1">
              <div className="text-xs text-muted-foreground">{s.label}</div>
              <div className="text-xs text-secondary font-medium">{s.change}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border p-6">
          <h3 className="font-semibold mb-5">Earnings Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={EARNINGS_DATA}>
              <defs>
                <linearGradient id="ig" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(125,45%,33%)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="hsl(125,45%,33%)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`} />
              <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, 'Earnings']} contentStyle={{ borderRadius: '12px', fontSize: '12px' }} />
              <Area type="monotone" dataKey="amount" stroke="hsl(125,45%,33%)" strokeWidth={2} fill="url(#ig)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          <div className="bg-card rounded-2xl border border-border p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-sm">Upcoming Workshops</h3>
              <Link to={ROUTES.INSTRUCTOR_WORKSHOPS} className="text-xs text-primary hover:underline">View all</Link>
            </div>
            {MOCK_WORKSHOPS.slice(0, 2).map(w => (
              <div key={w.id} className="py-2.5 border-b border-border last:border-0">
                <p className="text-xs font-medium line-clamp-1">{w.title}</p>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                  <Calendar className="w-3 h-3" />{new Date(w.date).toLocaleDateString()} · {w.enrolledCount} enrolled
                </div>
              </div>
            ))}
          </div>
          <div className="bg-card rounded-2xl border border-border p-5">
            <h3 className="font-semibold text-sm mb-3">Top Courses</h3>
            {MOCK_COURSES.slice(0, 2).map(c => (
              <div key={c.id} className="py-2.5 border-b border-border last:border-0">
                <p className="text-xs font-medium line-clamp-1">{c.title}</p>
                <div className="flex items-center gap-2 mt-1 text-[10px] text-muted-foreground">
                  <Users className="w-3 h-3" />{c.studentsCount.toLocaleString()} students
                  <Star className="w-3 h-3 text-accent fill-current" />{c.rating}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </InstructorLayout>
  );
}
