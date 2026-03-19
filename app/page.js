'use client';

import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import {
  ArrowRight,
  Shield,
  BarChart3,
  Lock,
  Users,
  Zap,
  TrendingUp,
  CheckCircle2,
} from 'lucide-react';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push(`/${user.role}/dashboard`);
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur border-b border-border z-10">
        <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">HB</span>
            </div>
            <span className="font-bold text-lg text-text">HealthBook</span>
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="px-6 py-2 text-primary font-medium hover:bg-primary/10 rounded-lg transition-colors"
            >
              Login
            </Link>
            <Link
              href="/auth/register"
              className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-text mb-6">
            Your Medical Records,{' '}
            <span className="text-primary">Digitized</span>
          </h1>
          <p className="text-xl text-text-secondary mb-12 leading-relaxed">
            HealthBook is a comprehensive digital medical record system designed
            for patients, doctors, hospitals, and administrators. Manage your
            health information securely in one place.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/auth/register"
              className="px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors flex items-center gap-2 group"
            >
              Get Started
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
            <Link
              href="/auth/login"
              className="px-8 py-4 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-text mb-16">
            Features for Everyone
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 bg-background rounded-2xl border border-border hover:border-primary transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Shield className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold text-text mb-3">
                Secure & Private
              </h3>
              <p className="text-text-secondary">
                Your medical data is encrypted and protected with enterprise-grade
                security.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-background rounded-2xl border border-border hover:border-primary transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold text-text mb-3">
                Easy Analytics
              </h3>
              <p className="text-text-secondary">
                View your health trends and medical history in one comprehensive
                dashboard.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-background rounded-2xl border border-border hover:border-primary transition-colors">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Lock className="text-primary" size={24} />
              </div>
              <h3 className="text-xl font-bold text-text mb-3">
                Always Accessible
              </h3>
              <p className="text-text-secondary">
                Access your records anytime, anywhere. Mobile-friendly interface
                included.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-white/90 mb-8">
            Join thousands of users managing their health digitally.
          </p>
          <Link
            href="/auth/register"
            className="inline-block px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-opacity-90 transition-all"
          >
            Create Your Account Today
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center text-text-secondary">
          <p>&copy; 2026 HealthBook. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
