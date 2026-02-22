import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
    ArrowLeft, Calendar, MapPin, Users, Clock, Globe, 
    Mail, Phone, CheckCircle, Star, Building2
} from 'lucide-react';
import { createPageUrl } from '@/utils';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import { dummyEvents } from '@/components/data/dummyData';

export default function EventDetails() {
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    const eventId = parseInt(urlParams.get('id')) || 1;
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [selectedPackage, setSelectedPackage] = useState(null);

    React.useEffect(() => {
        const auth = localStorage.getItem('sponza_auth');
        if (auth) {
            const parsed = JSON.parse(auth);
            setIsAuthenticated(true);
            setUserRole(parsed.role);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('sponza_auth');
        setIsAuthenticated(false);
        setUserRole(null);
    };

    const event = dummyEvents.find(e => e.id === eventId) || dummyEvents[0];

    const categoryColors = {
        'Tech': 'bg-blue-100 text-blue-700',
        'Cultural': 'bg-purple-100 text-purple-700',
        'Sports': 'bg-green-100 text-green-700',
        'Workshop': 'bg-orange-100 text-orange-700',
        'Conference': 'bg-indigo-100 text-indigo-700',
    };

    const handleApply = () => {
        if (!isAuthenticated) {
            navigate(createPageUrl('SignIn'));
            return;
        }
        if (userRole === 'sponsor') {
            navigate(createPageUrl('SponsorApply') + `?eventId=${event.id}&package=${selectedPackage || 'Gold'}`);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} userRole={userRole} />
            
            {/* Hero */}
            <section className="relative h-[400px] overflow-hidden">
                <img 
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="max-w-7xl mx-auto">
                        <Link to={createPageUrl('BrowseEvents')} className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Events
                        </Link>
                        <div className="flex flex-wrap items-center gap-3 mb-4">
                            <Badge className={categoryColors[event.category]}>{event.category}</Badge>
                            {event.featured && <Badge className="bg-[#F97316] text-white">Featured</Badge>}
                            <Badge variant="outline" className="border-white/50 text-white">Open for Sponsorship</Badge>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">{event.title}</h1>
                        <div className="flex flex-wrap gap-6 text-white/80">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5" />
                                <span>{event.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5" />
                                <span>{event.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5" />
                                <span>{event.expectedAttendees.toLocaleString()} Expected Attendees</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2">
                            <Tabs defaultValue="overview">
                                <TabsList className="mb-8">
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    <TabsTrigger value="packages">Sponsorship Packages</TabsTrigger>
                                    <TabsTrigger value="organizer">Organizer</TabsTrigger>
                                </TabsList>

                                <TabsContent value="overview">
                                    <Card className="p-8">
                                        <h2 className="text-2xl font-bold text-[#1F2937] mb-4">About This Event</h2>
                                        <p className="text-slate-600 leading-relaxed mb-8">{event.description}</p>
                                        
                                        <h3 className="text-xl font-semibold text-[#1F2937] mb-4">Event Highlights</h3>
                                        <div className="grid md:grid-cols-2 gap-4 mb-8">
                                            {[
                                                { icon: Users, label: 'Expected Attendees', value: event.expectedAttendees.toLocaleString() },
                                                { icon: Calendar, label: 'Event Date', value: event.date },
                                                { icon: MapPin, label: 'Venue', value: event.location },
                                                { icon: Clock, label: 'Duration', value: '3 Days' },
                                            ].map((item, i) => (
                                                <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                                                    <div className="w-12 h-12 bg-[#1E3A8A]/10 rounded-xl flex items-center justify-center">
                                                        <item.icon className="w-6 h-6 text-[#1E3A8A]" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-slate-500">{item.label}</p>
                                                        <p className="font-semibold text-[#1F2937]">{item.value}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <h3 className="text-xl font-semibold text-[#1F2937] mb-4">Why Sponsor This Event?</h3>
                                        <ul className="space-y-3">
                                            {[
                                                'Access to thousands of engaged students and young professionals',
                                                'Premium brand visibility across all event materials',
                                                'Direct networking opportunities with attendees',
                                                'Post-event analytics and lead generation reports',
                                            ].map((benefit, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <CheckCircle className="w-5 h-5 text-[#22C55E] mt-0.5" />
                                                    <span className="text-slate-600">{benefit}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </Card>
                                </TabsContent>

                                <TabsContent value="packages">
                                    <div className="space-y-4">
                                        {event.packages?.map((pkg, index) => (
                                            <Card 
                                                key={index}
                                                className={`p-6 cursor-pointer transition-all ${
                                                    selectedPackage === pkg.name 
                                                        ? 'ring-2 ring-[#1E3A8A] shadow-lg' 
                                                        : 'hover:shadow-md'
                                                }`}
                                                onClick={() => setSelectedPackage(pkg.name)}
                                            >
                                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                    <div>
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <h3 className="text-xl font-bold text-[#1F2937]">{pkg.name}</h3>
                                                            {index === 0 && (
                                                                <Badge className="bg-[#F97316] text-white">Most Popular</Badge>
                                                            )}
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {pkg.benefits?.map((benefit, i) => (
                                                                <Badge key={i} variant="outline" className="text-slate-600">
                                                                    {benefit}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-3xl font-bold text-[#22C55E]">
                                                            ${pkg.price?.toLocaleString()}
                                                        </p>
                                                        {selectedPackage === pkg.name && (
                                                            <CheckCircle className="w-6 h-6 text-[#22C55E] mt-2 ml-auto" />
                                                        )}
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="organizer">
                                    <Card className="p-8">
                                        <div className="flex items-start gap-6">
                                            <div className="w-20 h-20 bg-[#1E3A8A]/10 rounded-2xl flex items-center justify-center">
                                                <Building2 className="w-10 h-10 text-[#1E3A8A]" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-[#1F2937] mb-2">{event.college}</h3>
                                                <div className="flex items-center gap-2 text-slate-600 mb-4">
                                                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                    <span>4.9 Rating • 25 Events Hosted</span>
                                                </div>
                                                <p className="text-slate-600 mb-6">
                                                    A leading institution known for organizing high-quality events that attract 
                                                    students and professionals from across the region.
                                                </p>
                                                <div className="flex flex-wrap gap-4">
                                                    <div className="flex items-center gap-2 text-slate-600">
                                                        <Globe className="w-4 h-4" />
                                                        <span>www.techuniversity.edu</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-slate-600">
                                                        <Mail className="w-4 h-4" />
                                                        <span>events@techuniversity.edu</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <Card className="p-6 sticky top-24">
                                <h3 className="text-xl font-bold text-[#1F2937] mb-4">Sponsorship Summary</h3>
                                
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Starting from</span>
                                        <span className="text-2xl font-bold text-[#22C55E]">
                                            ${event.minSponsorship?.toLocaleString()}
                                        </span>
                                    </div>
                                    {selectedPackage && (
                                        <div className="p-4 bg-[#1E3A8A]/5 rounded-xl">
                                            <p className="text-sm text-slate-600 mb-1">Selected Package</p>
                                            <p className="font-semibold text-[#1E3A8A]">{selectedPackage}</p>
                                        </div>
                                    )}
                                </div>

                                <Button 
                                    onClick={handleApply}
                                    className="w-full h-12 bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-lg mb-4"
                                >
                                    {isAuthenticated && userRole === 'sponsor' ? 'Apply for Sponsorship' : 'Login to Apply'}
                                </Button>
                                
                                <Button variant="outline" className="w-full h-12">
                                    Contact Organizer
                                </Button>

                                <div className="mt-6 pt-6 border-t">
                                    <p className="text-sm text-slate-500 text-center">
                                        🔒 Secure payment processing powered by Sponza
                                    </p>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}