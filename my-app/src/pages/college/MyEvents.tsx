import React from 'react';
import { useDataStore } from '../../store/useDataStore';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Edit, Trash } from 'lucide-react';

export const MyEvents = () => {
  const { events, deleteEvent } = useDataStore();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">My Events</h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>{event.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{event.date} • {event.location}</p>
              </div>
              <Badge variant={event.status === 'upcoming' ? 'default' : 'secondary'}>
                {event.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  {event.sponsorshipPackages.map((pkg) => (
                    <Badge key={pkg.id} variant="outline">
                      {pkg.name}: ${pkg.amount}
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => deleteEvent(event.id)}>
                    <Trash className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {events.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No events found. Create your first event to get started.
          </div>
        )}
      </div>
    </div>
  );
};
