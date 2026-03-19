'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button, Input, Card } from '@/components/ui';
import { Mail, ArrowLeft, CheckCircle2, Clock } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // 1: Email, 2: Code, 3: Reset, 4: Success
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRequestReset = async (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email');
      return;
    }
    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
    }, 1000);
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!code || code.length !== 6) {
      setError('Please enter a valid 6-digit code');
      return;
    }
    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep(3);
    }, 1000);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep(4);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-6">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-info/5 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-md">
        {/* Header */}
        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-medium mb-8 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Login
        </Link>

        {/* Logo & Branding */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-dark rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">HB</span>
            </div>
            <span className="font-bold text-2xl text-text">HealthBook</span>
          </Link>
          <h1 className="text-3xl font-bold text-text mb-2">Reset Password</h1>
          <p className="text-text-secondary">
            {step === 1 && 'Enter your email to receive a reset code'}
            {step === 2 && 'Check your email and enter the verification code'}
            {step === 3 && 'Create your new password'}
            {step === 4 && 'Your password has been reset'}
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full transition-colors ${
                step >= s ? 'bg-primary' : 'bg-border'
              }`}
            />
          ))}
        </div>

        {/* Content Card */}
        <Card variant="elevated" className="shadow-xl">
          {/* Step 1: Email */}
          {step === 1 && (
            <form onSubmit={handleRequestReset} className="space-y-5">
              {error && (
                <div className="p-4 bg-error/10 border border-error/30 rounded-lg text-sm text-error font-medium">
                  {error}
                </div>
              )}
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                placeholder="you@example.com"
                icon={<Mail size={18} />}
                required
              />
              <Button
                type="submit"
                variant="primary"
                disabled={isLoading}
                className="w-full py-3"
              >
                {isLoading ? 'Sending...' : 'Send Reset Code'}
              </Button>
            </form>
          )}

          {/* Step 2: Verification Code */}
          {step === 2 && (
            <form onSubmit={handleVerifyCode} className="space-y-5">
              {error && (
                <div className="p-4 bg-error/10 border border-error/30 rounded-lg text-sm text-error font-medium">
                  {error}
                </div>
              )}
              <div>
                <p className="text-sm text-text-secondary mb-4">
                  We've sent a 6-digit code to <span className="font-semibold text-text">{email}</span>
                </p>
                <Input
                  label="Verification Code"
                  type="text"
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.replace(/\D/g, '').slice(0, 6));
                    setError('');
                  }}
                  placeholder="000000"
                  maxLength="6"
                  required
                />
              </div>
              <Button
                type="submit"
                variant="primary"
                disabled={isLoading}
                className="w-full py-3"
              >
                {isLoading ? 'Verifying...' : 'Verify Code'}
              </Button>
              <button
                type="button"
                onClick={handleRequestReset}
                className="w-full text-sm text-primary hover:text-primary-dark font-medium transition-colors"
              >
                Resend Code
              </button>
            </form>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-5">
              {error && (
                <div className="p-4 bg-error/10 border border-error/30 rounded-lg text-sm text-error font-medium">
                  {error}
                </div>
              )}
              <Input
                label="New Password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="••••••••"
                helperText="At least 8 characters"
                required
              />
              <Input
                label="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError('');
                }}
                placeholder="••••••••"
                required
              />
              <Button
                type="submit"
                variant="primary"
                disabled={isLoading}
                className="w-full py-3"
              >
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </Button>
            </form>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-success" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-text mb-2">
                  Password Reset Successful
                </h3>
                <p className="text-text-secondary">
                  Your password has been changed. You can now sign in with your new
                  password.
                </p>
              </div>
              <Link href="/auth/login">
                <Button variant="primary" className="w-full py-3">
                  Back to Login
                </Button>
              </Link>
            </div>
          )}
        </Card>

        {/* Footer Info */}
        {step !== 4 && (
          <div className="mt-6 p-4 bg-info/10 border border-info/30 rounded-lg flex items-start gap-3">
            <Clock className="w-5 h-5 text-info flex-shrink-0 mt-0.5" />
            <p className="text-sm text-info-secondary">
              Reset link valid for 24 hours. For security, we recommend changing your
              password regularly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
