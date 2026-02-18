import React, { useState } from 'react';
import { useDataStore } from '../../store/useDataStore';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Calendar, MapPin, Search } from 'lucide-react';

export const BrowseEvents = () => {
  const { events, createRequest } = useDataStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...Array.from(new Set(events.map(e => e.category)))];

  const handleApply = (eventId: string, packageId: string) => {
    // In a real app, this would open a modal to customize the message
    createRequest({
      eventId,
      sponsorId: '2', // Dummy sponsor ID
      packageId,
      message: 'We would love to sponsor this event!'
    });
    alert('Sponsorship request sent!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900">Browse Events</h1>
        <div className="flex w-full sm:w-auto space-x-2">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="flex flex-col">
            <div className="h-48 w-full bg-gray-200 rounded-t-lg overflow-hidden">
              <img
                src={event.imageUrl || `https://source.unsplash.com/random/800x600/?event,${event.category}`}
                alt={event.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80';
                }}
              />
            </div>
            <CardHeader>
              <div className="flex justify-between items-start">
                <Badge variant="secondary">{event.category}</Badge>
                <span className="text-sm text-muted-foreground">{event.date}</span>
              </div>
              <CardTitle className="mt-2">{event.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-600 line-clamp-3">{event.description}</p>
              <div className="mt-4 flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                {event.location}
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium">Packages:</p>
                <div className="flex flex-wrap gap-2">
                  {event.sponsorshipPackages.map(pkg => (
                    <Badge key={pkg.id} variant="outline" className="cursor-pointer hover:bg-gray-100">
                      {pkg.name}: ${pkg.amount}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleApply(event.id, event.sponsorshipPackages[0].id)}>
                Apply for Sponsorship
              </Button>
            </CardFooter>
          </Card>
        ))}
        {filteredEvents.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-500">
            No events found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};
