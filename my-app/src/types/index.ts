export type UserRole = 'guest' | 'college' | 'sponsor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Event {
  id: string;
  organizerId: string;
  title: string;
  date: string;
  description: string;
  location: string;
  category: string;
  sponsorshipPackages: SponsorshipPackage[];
  imageUrl?: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export interface SponsorshipPackage {
  id: string;
  name: string;
  amount: number;
  benefits: string[];
}

export interface SponsorshipRequest {
  id: string;
  eventId: string;
  sponsorId: string;
  packageId: string;
  status: 'pending' | 'approved' | 'rejected';
  message?: string;
  createdAt: string;
}

export interface PaymentRecord {
  id: string;
  requestId: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}
