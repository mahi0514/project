import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDataStore } from '../../store/useDataStore';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { SponsorshipPackage } from '../../types';
import { Plus, Trash2 } from 'lucide-react';

export const CreateEvent = () => {
  const navigate = useNavigate();
  const { addEvent } = useDataStore();
  
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [packages, setPackages] = useState<SponsorshipPackage[]>([
    { id: '1', name: '', amount: 0, benefits: [''] }
  ]);

  const handleAddPackage = () => {
    setPackages([...packages, { id: Math.random().toString(), name: '', amount: 0, benefits: [''] }]);
  };

  const handleRemovePackage = (index: number) => {
    setPackages(packages.filter((_, i) => i !== index));
  };

  const handlePackageChange = (index: number, field: keyof SponsorshipPackage, value: any) => {
    const newPackages = [...packages];
    newPackages[index] = { ...newPackages[index], [field]: value };
    setPackages(newPackages);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEvent({
      organizerId: '1', // Dummy ID
      title,
      date,
      location,
      category,
      description,
      sponsorshipPackages: packages,
      status: 'upcoming'
    });
    navigate('/college/events');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Create New Event</h1>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Event Title</label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input value={location} onChange={(e) => setLocation(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Input value={category} onChange={(e) => setCategory(e.target.value)} required placeholder="e.g. Tech, Cultural, Sports" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Sponsorship Packages</CardTitle>
            <Button type="button" onClick={handleAddPackage} variant="outline" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Package
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {packages.map((pkg, index) => (
              <div key={pkg.id} className="p-4 border rounded-lg space-y-4 bg-gray-50">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium">Package {index + 1}</h4>
                  {packages.length > 1 && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => handleRemovePackage(index)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Name</label>
                    <Input
                      value={pkg.name}
                      onChange={(e) => handlePackageChange(index, 'name', e.target.value)}
                      placeholder="e.g. Gold Sponsor"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Amount ($)</label>
                    <Input
                      type="number"
                      value={pkg.amount}
                      onChange={(e) => handlePackageChange(index, 'amount', Number(e.target.value))}
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => navigate('/college/events')}>
            Cancel
          </Button>
          <Button type="submit">Create Event</Button>
        </div>
      </form>
    </div>
  );
};
