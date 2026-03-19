'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';
import { Button, Input, Card } from '@/components/ui';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState(1); // 1: Form, 2: Verification

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    // Simulate API call
    setTimeout(() => {
      try {
        login(formData.email, formData.password, formData.role);
        router.push(`/${formData.role}/dashboard`);
      } catch (err) {
        setErrors({ submit: 'Registration failed. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-6">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-info/5 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-md">
        {/* Logo & Branding */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">HB</span>
            </div>
            <span className="font-bold text-2xl text-text">HealthBook</span>
          </Link>
          <h1 className="text-3xl font-bold text-text mb-2">Create Account</h1>
          <p className="text-text-secondary">
            Join thousands managing their health digitally
          </p>
        </div>

        {/* Register Card */}
        <Card variant="elevated" className="shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Alert */}
            {errors.submit && (
              <div className="p-4 bg-error/10 border border-error/30 rounded-lg flex items-start gap-3">
                <AlertCircle size={20} className="text-error flex-shrink-0 mt-0.5" />
                <p className="text-sm text-error font-medium">{errors.submit}</p>
              </div>
            )}

            {/* Full Name */}
            <Input
              label="Full Name"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="John Doe"
              icon={<User size={18} />}
              error={!!errors.fullName}
              helperText={errors.fullName}
              required
            />

            {/* Email */}
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              icon={<Mail size={18} />}
              error={!!errors.email}
              helperText={errors.email}
              required
            />

            {/* Password */}
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                icon={<Lock size={18} />}
                error={!!errors.password}
                helperText={errors.password || 'At least 8 characters'}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-10 text-text-secondary hover:text-text transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Input
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                icon={<Lock size={18} />}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-10 text-text-secondary hover:text-text transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-text mb-2">
                I am a
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-border rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white text-text capitalize font-medium transition-colors"
              >
                <option value="patient">👤 Patient</option>
                <option value="doctor">⚕️ Doctor</option>
                <option value="hospital">🏥 Hospital Administrator</option>
              </select>
            </div>

            {/* Terms & Conditions */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className="w-5 h-5 rounded border-border accent-primary cursor-pointer mt-0.5"
              />
              <span className="text-sm text-text-secondary">
                I agree to the{' '}
                <a href="#" className="text-primary font-semibold hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary font-semibold hover:underline">
                  Privacy Policy
                </a>
              </span>
            </label>
            {errors.acceptTerms && (
              <p className="text-sm text-error flex items-center gap-2">
                <AlertCircle size={16} />
                {errors.acceptTerms}
              </p>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="w-full py-3 flex items-center justify-center gap-2 text-base font-semibold"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  <CheckCircle2 size={18} />
                  Create Account
                </>
              )}
            </Button>
          </form>

          {/* Sign In Link */}
          <div className="mt-8 text-center">
            <p className="text-text-secondary">
              Already have an account?{' '}
              <Link
                href="/auth/login"
                className="text-primary font-semibold hover:text-primary-dark transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-text-light mt-6">
          Your data is encrypted and secure. We never share your information.
        </p>
      </div>
    </div>
  );
}
