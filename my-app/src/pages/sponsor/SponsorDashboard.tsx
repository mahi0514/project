import React from 'react';
import { useDataStore } from '../../store/useDataStore';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Calendar, DollarSign, Search, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';

export const SponsorDashboard = () => {
  const { requests, events } = useDataStore();
  
  // Dummy stats
  const activeSponsorships = requests.filter(r => r.status === 'approved').length;
  const pendingRequests = requests.filter(r => r.status === 'pending').length;
  const totalSpent = requests
    .filter(r => r.status === 'approved')
    .reduce((acc, r) => {
      const event = events.find(e => e.id === r.eventId);
      const pkg = event?.sponsorshipPackages.find(p => p.id === r.packageId);
      return acc + (pkg?.amount || 0);
    }, 0);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Sponsor Dashboard</h1>
        <Link to="/sponsor/browse">
          <Button>
            <Search className="h-4 w-4 mr-2" />
            Browse Events
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sponsorships</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSponsorships}</div>
            <p className="text-xs text-muted-foreground">Events currently sponsored</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRequests}</div>
            <p className="text-xs text-muted-foreground">Awaiting organizer approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSpent.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Year to date</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {requests.slice(0, 5).map((req) => {
                const event = events.find(e => e.id === req.eventId);
                return (
                  <div key={req.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <div>
                      <p className="font-medium">{event?.title}</p>
                      <p className="text-sm text-muted-foreground">Status: {req.status}</p>
                    </div>
                    <div className="text-sm text-gray-500">{req.createdAt}</div>
                  </div>
                );
              })}
              {requests.length === 0 && <p className="text-muted-foreground">No recent applications.</p>}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
