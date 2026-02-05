import React, { useState, useEffect } from 'react';

interface RealTimeMetrics {
  activeUsers: number;
  todayOrders: number;
  todayRevenue: number;
  conversionRate: string;
}

export default function RealTimeWidget() {
  const [metrics, setMetrics] = useState<RealTimeMetrics | null>(null);

  useEffect(() => {
    fetchRealTimeMetrics();
    const interval = setInterval(fetchRealTimeMetrics, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchRealTimeMetrics = async () => {
    try {
      const response = await fetch('/api/admin/analytics/realtime', {
        headers: { Authorization: `Bearer ${localStorage.getItem('admin_token')}` }
      });
      const data = await response.json();
      setMetrics(data);
    } catch (error) {
      console.error('Failed to fetch real-time metrics:', error);
    }
  };

  if (!metrics) return <div>Loading...</div>;

  return (
    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Real-Time Metrics</h3>
        <div className="flex items-center">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></div>
          <span className="text-sm">Live</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold">{metrics.activeUsers}</div>
          <div className="text-sm opacity-90">Active Users</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{metrics.todayOrders}</div>
          <div className="text-sm opacity-90">Today's Orders</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">${metrics.todayRevenue}</div>
          <div className="text-sm opacity-90">Today's Revenue</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold">{metrics.conversionRate}%</div>
          <div className="text-sm opacity-90">Conversion Rate</div>
        </div>
      </div>
    </div>
  );
}