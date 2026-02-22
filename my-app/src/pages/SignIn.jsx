import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "C:/Users/USER/sponza/project/my-app/src/components/ui/button";
import { Input } from "C:/Users/USER/sponza/project/my-app/src/components/ui/input";
import { Label } from "C:/Users/USER/sponza/project/my-app/src/components/ui/label";
import { Card } from "C:/Users/USER/sponza/project/my-app/src/components/ui/card";
import { Sparkles, Mail, Lock, Eye, EyeOff, GraduationCap, Building2, Shield, ArrowRight } from 'lucide-react';
import { createPageUrl } from 'C:/Users/USER/sponza/project/my-app/src/utils';
import { dummyUsers } from 'C:/Users/USER/sponza/project/my-app/src/components/data/dummyData';

export default function SignIn() {
    const navigate = useNavigate();
    const [role, setRole] = useState('college');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const roles = [
        { id: 'college', label: 'College', icon: GraduationCap, desc: 'Event Organizer' },
        { id: 'sponsor', label: 'Sponsor', icon: Building2, desc: 'Company' },
        { id: 'admin', label: 'Admin', icon: Shield, desc: 'Platform Admin' },
    ];

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        setTimeout(() => {
            // Simulate login
            const user = dummyUsers[role];
            if (user) {
                localStorage.setItem('sponza_auth', JSON.stringify({ ...user, role }));
                
                // Redirect based on role
                if (role === 'college') {
                    navigate(createPageUrl('CollegeDashboard'));
                } else if (role === 'sponsor') {
                    navigate(createPageUrl('SponsorDashboard'));
                } else {
                    navigate(createPageUrl('AdminPanel'));
                }
            }
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F8FAFC] to-[#E2E8F0] flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <Link to={createPageUrl('Home')} className="flex items-center justify-center gap-2 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#1E3A8A] to-[#22C55E] rounded-2xl flex items-center justify-center">
                        <Sparkles className="w-7 h-7 text-white" />
                    </div>
                    <span className="text-3xl font-bold text-[#1E3A8A]">Sponza</span>
                </Link>

                <Card className="p-8 shadow-xl border-0">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-[#1F2937] mb-2">Welcome Back</h1>
                        <p className="text-slate-600">Sign in to your account</p>
                    </div>

                    {/* Role Selection */}
                    <div className="grid grid-cols-3 gap-3 mb-8">
                        {roles.map((r) => (
                            <button
                                key={r.id}
                                type="button"
                                onClick={() => setRole(r.id)}
                                className={`p-4 rounded-xl border-2 transition-all ${
                                    role === r.id 
                                        ? 'border-[#1E3A8A] bg-[#1E3A8A]/5' 
                                        : 'border-slate-200 hover:border-slate-300'
                                }`}
                            >
                                <r.icon className={`w-6 h-6 mx-auto mb-2 ${
                                    role === r.id ? 'text-[#1E3A8A]' : 'text-slate-400'
                                }`} />
                                <p className={`text-sm font-medium ${
                                    role === r.id ? 'text-[#1E3A8A]' : 'text-slate-600'
                                }`}>{r.label}</p>
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <Label htmlFor="email" className="text-slate-700">Email</Label>
                            <div className="relative mt-1">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-11 h-12"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="password" className="text-slate-700">Password</Label>
                            <div className="relative mt-1">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-11 pr-11 h-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="rounded border-slate-300" />
                                <span className="text-sm text-slate-600">Remember me</span>
                            </label>
                            <a href="#" className="text-sm text-[#1E3A8A] hover:underline">
                                Forgot password?
                            </a>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-50 border border-red-100 rounded-lg text-red-600 text-sm">
                                {error}
                            </div>
                        )}

                        <Button 
                            type="submit" 
                            className="w-full h-12 bg-[#1E3A8A] hover:bg-[#1E3A8A]/90 text-lg"
                            disabled={loading}
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                            {!loading && <ArrowRight className="ml-2 w-5 h-5" />}
                        </Button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-slate-600">
                            Don't have an account?{' '}
                            <Link to={createPageUrl('Register')} className="text-[#1E3A8A] font-medium hover:underline">
                                Sign up
                            </Link>
                        </p>
                    </div>

                    {/* Demo Credentials */}
                    <div className="mt-6 p-4 bg-slate-50 rounded-xl">
                        <p className="text-xs text-slate-500 text-center mb-2">Demo Mode</p>
                        <p className="text-xs text-slate-600 text-center">
                            Click "Sign In" with any credentials to access the dashboard for the selected role.
                        </p>
                    </div>
                </Card>

                <p className="text-center text-sm text-slate-500 mt-6">
                    By signing in, you agree to our{' '}
                    <a href="#" className="text-[#1E3A8A] hover:underline">Terms</a> and{' '}
                    <a href="#" className="text-[#1E3A8A] hover:underline">Privacy Policy</a>
                </p>
            </div>
        </div>
    );
}