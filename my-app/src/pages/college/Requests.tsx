import React from 'react';
import { useDataStore } from '../../store/useDataStore';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Check, X } from 'lucide-react';

export const Requests = () => {
  const { requests, events, updateRequestStatus } = useDataStore();

  const getEventTitle = (eventId: string) => {
    return events.find(e => e.id === eventId)?.title || 'Unknown Event';
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Sponsorship Requests</h1>

      <div className="grid grid-cols-1 gap-6">
        {requests.map((req) => (
          <Card key={req.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{getEventTitle(req.eventId)}</CardTitle>
                <p className="text-sm text-muted-foreground">From: Sponsor ID {req.sponsorId}</p>
              </div>
              <Badge variant={
                req.status === 'approved' ? 'success' : 
                req.status === 'rejected' ? 'destructive' : 'warning'
              }>
                {req.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{req.message}</p>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">Received: {req.createdAt}</p>
                {req.status === 'pending' && (
                  <div className="flex space-x-2">
                    <Button variant="default" size="sm" onClick={() => updateRequestStatus(req.id, 'approved')}>
                      <Check className="h-4 w-4 mr-2" />
                      Approve
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => updateRequestStatus(req.id, 'rejected')}>
                      <X className="h-4 w-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
        {requests.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No sponsorship requests found.
          </div>
        )}
      </div>
    </div>
  );
};
