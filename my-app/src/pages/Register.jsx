import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { 
    Sparkles, Mail, Lock, Eye, EyeOff, User, Building2, 
    GraduationCap, Phone, Globe, MapPin, ArrowRight, ArrowLeft 
} from 'lucide-react';
import { createPageUrl } from '@/utils';
import { dummyUsers } from '@/components/data/dummyData';

export default function Register() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [role, setRole] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        phone: '',
        // College specific
        collegeName: '',
        collegeType: '',
        location: '',
        website: '',
        // Sponsor specific
        companyName: '',
        industry: '',
        companySize: '',
        sponsorshipBudget: '',
        description: '',
    });

    const [errors, setErrors] = useState({});

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateStep1 = () => {
        const newErrors = {};
        if (!role) newErrors.role = 'Please select a role';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const validateStep2 = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.phone) newErrors.phone = 'Phone is required';
        
        if (role === 'college') {
            if (!formData.collegeName) newErrors.collegeName = 'College name is required';
            if (!formData.collegeType) newErrors.collegeType = 'College type is required';
            if (!formData.location) newErrors.location = 'Location is required';
        } else {
            if (!formData.companyName) newErrors.companyName = 'Company name is required';
            if (!formData.industry) newErrors.industry = 'Industry is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (step === 1 && validateStep1()) {
            setStep(2);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateStep2()) return;

        setLoading(true);
        setTimeout(() => {
            localStorage.setItem('sponza_auth', JSON.stringify({
                id: Date.now(),
                email: formData.email,
                name: formData.name,
                role,
                ...formData
            }));

            if (role === 'college') {
                navigate(createPageUrl('CollegeDashboard'));
            } else {
                navigate(createPageUrl('SponsorDashboard'));
            }
        }, 1500);
    };

    const industries = ['Technology', 'Finance', 'Healthcare', 'Education', 'Retail', 'Manufacturing', 'Media', 'Other'];
    const companySizes = ['1-10', '11-50', '51-200', '201-500', '500+'];
    const collegeTypes = ['University', 'College', 'Institute', 'Academy', 'School'];
    const budgetRanges = ['$1,000 - $5,000', '$5,000 - $10,000', '$10,000 - $25,000', '$25,000 - $50,000', '$50,000+'];

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#E2E8F0] flex items-center justify-center p-4 py-12">
            <div className="w-full max-w-lg">
                {/* Logo */}
                <Link to={createPageUrl('Home')} className="flex items-center justify-center gap-2 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1E3A8A] to-[#22C55E] rounded-2xl flex items-center justify-center">
                        <Sparkles className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-3xl font-bold text-[#1E3A8A]">Sponza</span>
                </Link>

                <Card className="p-8 shadow-xl border-0">
                    {/* Progress */}
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                            step >= 1 ? 'bg-[#1E3A8A] text-white' : 'bg-slate-200 text-slate-500'
                        }`}>1</div>
                        <div className={`w-24 h-1 rounded ${step >= 2 ? 'bg-[#1E3A8A]' : 'bg-slate-200'}`} />
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                            step >= 2 ? 'bg-[#1E3A8A] text-white' : 'bg-slate-200 text-slate-500'
                        }`}>2</div>
                    </div>

                    {step === 1 && (
                        <div>
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-bold text-[#1F2937] mb-2">Create Account</h1>
                                <p className="text-slate-600">Choose your role and set up credentials</p>
                            </div>

                            {/* Role Selection */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <button
                                    type="button"
                                    onClick={() => setRole('college')}
                                    className={`p-6 rounded-xl border-2 transition-all ${
                                        role === 'college' 
                                            ? 'border-[#1E3A8A] bg-[#1E3A8A]/5' 
                                            : 'border-slate-200 hover:border-slate-300'
                                    }`}
                                >
                                    <GraduationCap className={`w-10 h-10 mx-auto mb-3 ${
                                        role === 'college' ? 'text-[#1E3A8A]' : 'text-slate-400'
                                    }`} />
                                    <p className={`font-semibold ${role === 'college' ? 'text-[#1E3A8A]' : 'text-slate-600'}`}>
                                        College
                                    </p>
                                    <p className="text-sm text-slate-500 mt-1">Event Organizer</p>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('sponsor')}
                                    className={`p-6 rounded-xl border-2 transition-all ${
                                        role === 'sponsor' 
                                            ? 'border-[#1E3A8A] bg-[#1E3A8A]/5' 
                                            : 'border-slate-200 hover:border-slate-300'
                                    }`}
                                >
                                    <Building2 className={`w-10 h-10 mx-auto mb-3 ${
                                        role === 'sponsor' ? 'text-[#1E3A8A]' : 'text-slate-400'
                                    }`} />
                                    <p className={`font-semibold ${role === 'sponsor' ? 'text-[#1E3A8A]' : 'text-slate-600'}`}>
                                        Sponsor
                                    </p>
                                    <p className="text-sm text-slate-500 mt-1">Company</p>
                                </button>
                            </div>
                            {errors.role && <p className="text-red-500 text-sm mb-4">{errors.role}</p>}

                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative mt-1">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            className="pl-11 h-12"
                                        />
                                    </div>
                                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative mt-1">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <Input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Create a password"
                                            value={formData.password}
                                            onChange={(e) => handleInputChange('password', e.target.value)}
                                            className="pl-11 pr-11 h-12"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <div className="relative mt-1">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="Confirm your password"
                                            value={formData.confirmPassword}
                                            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                                            className="pl-11 h-12"
                                        />
                                    </div>
                                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                                </div>
                            </div>

                            <Button 
                                onClick={handleNext}
                                className="w-full h-12 mt-6 bg-[#1E3A8A] hover:bg-[#1E3A8A]/90"
                            >
                                Continue
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    )}

                    {step === 2 && (
                        <form onSubmit={handleSubmit}>
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-bold text-[#1F2937] mb-2">
                                    {role === 'college' ? 'College Details' : 'Company Details'}
                                </h1>
                                <p className="text-slate-600">Tell us more about your organization</p>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label>Contact Name</Label>
                                        <Input
                                            placeholder="Your name"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            className="h-11 mt-1"
                                        />
                                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <Label>Phone</Label>
                                        <Input
                                            placeholder="Phone number"
                                            value={formData.phone}
                                            onChange={(e) => handleInputChange('phone', e.target.value)}
                                            className="h-11 mt-1"
                                        />
                                        {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                    </div>
                                </div>

                                {role === 'college' ? (
                                    <>
                                        <div>
                                            <Label>College Name</Label>
                                            <Input
                                                placeholder="Enter college name"
                                                value={formData.collegeName}
                                                onChange={(e) => handleInputChange('collegeName', e.target.value)}
                                                className="h-11 mt-1"
                                            />
                                            {errors.collegeName && <p className="text-red-500 text-sm mt-1">{errors.collegeName}</p>}
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label>College Type</Label>
                                                <Select value={formData.collegeType} onValueChange={(v) => handleInputChange('collegeType', v)}>
                                                    <SelectTrigger className="h-11 mt-1">
                                                        <SelectValue placeholder="Select type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {collegeTypes.map(t => (
                                                            <SelectItem key={t} value={t}>{t}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label>Location</Label>
                                                <Input
                                                    placeholder="City, State"
                                                    value={formData.location}
                                                    onChange={(e) => handleInputChange('location', e.target.value)}
                                                    className="h-11 mt-1"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <Label>Website (Optional)</Label>
                                            <Input
                                                placeholder="https://..."
                                                value={formData.website}
                                                onChange={(e) => handleInputChange('website', e.target.value)}
                                                className="h-11 mt-1"
                                            />
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div>
                                            <Label>Company Name</Label>
                                            <Input
                                                placeholder="Enter company name"
                                                value={formData.companyName}
                                                onChange={(e) => handleInputChange('companyName', e.target.value)}
                                                className="h-11 mt-1"
                                            />
                                            {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <Label>Industry</Label>
                                                <Select value={formData.industry} onValueChange={(v) => handleInputChange('industry', v)}>
                                                    <SelectTrigger className="h-11 mt-1">
                                                        <SelectValue placeholder="Select industry" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {industries.map(i => (
                                                            <SelectItem key={i} value={i}>{i}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div>
                                                <Label>Company Size</Label>
                                                <Select value={formData.companySize} onValueChange={(v) => handleInputChange('companySize', v)}>
                                                    <SelectTrigger className="h-11 mt-1">
                                                        <SelectValue placeholder="Employees" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {companySizes.map(s => (
                                                            <SelectItem key={s} value={s}>{s}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                        <div>
                                            <Label>Typical Sponsorship Budget</Label>
                                            <Select value={formData.sponsorshipBudget} onValueChange={(v) => handleInputChange('sponsorshipBudget', v)}>
                                                <SelectTrigger className="h-11 mt-1">
                                                    <SelectValue placeholder="Select range" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {budgetRanges.map(b => (
                                                        <SelectItem key={b} value={b}>{b}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="flex gap-3 mt-6">
                                <Button 
                                    type="button"
                                    variant="outline" 
                                    onClick={() => setStep(1)}
                                    className="flex-1 h-12"
                                >
                                    <ArrowLeft className="mr-2 w-5 h-5" />
                                    Back
                                </Button>
                                <Button 
                                    type="submit"
                                    className="flex-1 h-12 bg-[#22C55E] hover:bg-[#22C55E]/90"
                                    disabled={loading}
                                >
                                    {loading ? 'Creating Account...' : 'Create Account'}
                                </Button>
                            </div>
                        </form>
                    )}

                    <div className="mt-8 text-center">
                        <p className="text-slate-600">
                            Already have an account?{' '}
                            <Link to={createPageUrl('SignIn')} className="text-[#1E3A8A] font-medium hover:underline">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
}