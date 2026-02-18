import { create } from 'zustand';
import { Event, SponsorshipRequest, User } from '../types';

interface DataState {
  events: Event[];
  requests: SponsorshipRequest[];
  users: User[];
  addEvent: (event: Omit<Event, 'id'>) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;
  createRequest: (request: Omit<SponsorshipRequest, 'id' | 'createdAt' | 'status'>) => void;
  updateRequestStatus: (id: string, status: 'approved' | 'rejected') => void;
}

const DUMMY_EVENTS: Event[] = [
  {
    id: '1',
    organizerId: '1',
    title: 'Tech Summit 2024',
    date: '2024-11-15',
    description: 'Annual technology summit bringing together students and industry leaders.',
    location: 'Main Auditorium',
    category: 'Technology',
    status: 'upcoming',
    sponsorshipPackages: [
      { id: 'p1', name: 'Gold', amount: 5000, benefits: ['Logo on banner', 'Booth space'] },
      { id: 'p2', name: 'Silver', amount: 2500, benefits: ['Logo on website'] }
    ]
  },
  {
    id: '2',
    organizerId: '1',
    title: 'Cultural Fest',
    date: '2024-12-01',
    description: 'A celebration of diverse cultures with music, dance, and food.',
    location: 'Campus Grounds',
    category: 'Cultural',
    status: 'upcoming',
    sponsorshipPackages: [
      { id: 'p3', name: 'Title Sponsor', amount: 10000, benefits: ['Exclusive branding', 'Main stage access'] }
    ]
  }
];

const DUMMY_REQUESTS: SponsorshipRequest[] = [
  {
    id: 'r1',
    eventId: '1',
    sponsorId: '2',
    packageId: 'p1',
    status: 'pending',
    createdAt: '2024-10-01',
    message: 'We are interested in sponsoring your event.'
  }
];

export const useDataStore = create<DataState>((set) => ({
  events: DUMMY_EVENTS,
  requests: DUMMY_REQUESTS,
  users: [],
  addEvent: (event) => set((state) => ({
    events: [...state.events, { ...event, id: Math.random().toString(36).substr(2, 9) }]
  })),
  updateEvent: (id, updatedEvent) => set((state) => ({
    events: state.events.map((e) => (e.id === id ? { ...e, ...updatedEvent } : e))
  })),
  deleteEvent: (id) => set((state) => ({
    events: state.events.filter((e) => e.id !== id)
  })),
  createRequest: (request) => set((state) => ({
    requests: [...state.requests, {
      ...request,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0]
    }]
  })),
  updateRequestStatus: (id, status) => set((state) => ({
    requests: state.requests.map((r) => (r.id === id ? { ...r, status } : r))
  }))
}));
