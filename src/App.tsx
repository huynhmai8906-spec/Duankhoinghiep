import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { StartupOverview } from './components/StartupOverview';
import { NurseDirectory } from './components/NurseDirectory';
import { PricingCalculator } from './components/PricingCalculator';
import { NursePortal } from './components/NursePortal';
import { PitchDeckModal } from './components/PitchDeckModal';
import { BookingModal } from './components/BookingModal';
import { ReviewModal } from './components/ReviewModal';
import { 
  INITIAL_NURSES, 
  INITIAL_REVIEWS, 
  INITIAL_ASSIGNED_PATIENTS, 
  INITIAL_VITALS_LOGS 
} from './data/mockData';
import { NurseProfile, NurseReview, Booking, AssignedPatient, VitalsLog } from './types';

export default function App() {
  // Navigation active tab: 'overview' | 'nurses' | 'pricing' | 'portal'
  const [activeTab, setActiveTab] = useState<'overview' | 'nurses' | 'pricing' | 'portal'>('overview');

  // Persistent States in localStorage
  const [nurses, setNurses] = useState<NurseProfile[]>(() => {
    try {
      const saved = localStorage.getItem('mcc_nurses_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading nurses from localStorage', e);
    }
    return INITIAL_NURSES;
  });

  const [reviews, setReviews] = useState<NurseReview[]>(() => {
    try {
      const saved = localStorage.getItem('mcc_reviews_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading reviews from localStorage', e);
    }
    return INITIAL_REVIEWS;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('mcc_bookings_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading bookings from localStorage', e);
    }
    return [];
  });

  const [patients] = useState<AssignedPatient[]>(INITIAL_ASSIGNED_PATIENTS);

  const [vitalsLogs, setVitalsLogs] = useState<VitalsLog[]>(() => {
    try {
      const saved = localStorage.getItem('mcc_vitals_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading vitals from localStorage', e);
    }
    return INITIAL_VITALS_LOGS;
  });

  const [nurseUserEmail, setNurseUserEmail] = useState<string | null>(() => {
    try {
      return localStorage.getItem('mcc_nurse_email_v1') || null;
    } catch {
      return null;
    }
  });

  // Modals state
  const [isPitchDeckOpen, setIsPitchDeckOpen] = useState(false);
  const [selectedNurseForBooking, setSelectedNurseForBooking] = useState<NurseProfile | null>(null);
  const [selectedNurseForReview, setSelectedNurseForReview] = useState<NurseProfile | null>(null);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mcc_nurses_v1', JSON.stringify(nurses));
    } catch (e) {
      console.error('Failed to save nurses to localStorage', e);
    }
  }, [nurses]);

  useEffect(() => {
    try {
      localStorage.setItem('mcc_reviews_v1', JSON.stringify(reviews));
    } catch (e) {
      console.error('Failed to save reviews to localStorage', e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem('mcc_bookings_v1', JSON.stringify(bookings));
    } catch (e) {
      console.error('Failed to save bookings to localStorage', e);
    }
  }, [bookings]);

  useEffect(() => {
    try {
      localStorage.setItem('mcc_vitals_v1', JSON.stringify(vitalsLogs));
    } catch (e) {
      console.error('Failed to save vitals to localStorage', e);
    }
  }, [vitalsLogs]);

  useEffect(() => {
    try {
      if (nurseUserEmail) {
        localStorage.setItem('mcc_nurse_email_v1', nurseUserEmail);
      } else {
        localStorage.removeItem('mcc_nurse_email_v1');
      }
    } catch (e) {
      console.error('Failed to save email to localStorage', e);
    }
  }, [nurseUserEmail]);

  // Handle Review submission with dynamic average rating recalculation
  const handleReviewSubmit = (newReview: NurseReview) => {
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);

    // Recalculate average rating & reviewsCount for that nurse
    setNurses((prevNurses) =>
      prevNurses.map((nurse) => {
        if (nurse.id === newReview.nurseId) {
          const nurseAllReviews = updatedReviews.filter((r) => r.nurseId === nurse.id);
          const totalRating = nurseAllReviews.reduce((sum, r) => sum + r.ratingOverall, 0);
          const avg = Number((totalRating / nurseAllReviews.length).toFixed(2));
          return {
            ...nurse,
            rating: avg,
            reviewsCount: nurseAllReviews.length
          };
        }
        return nurse;
      })
    );
  };

  // Handle Booking submission
  const handleBookingSuccess = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  // Handle Vitals submission
  const handleAddVitalsLog = (newLog: VitalsLog) => {
    setVitalsLogs((prev) => [newLog, ...prev]);
  };

  // Auth handlers
  const handleLogin = (email: string) => {
    setNurseUserEmail(email);
  };

  const handleLogout = () => {
    setNurseUserEmail(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Top Header & Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPitchDeck={() => setIsPitchDeckOpen(true)}
        nurseUserEmail={nurseUserEmail}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'overview' && (
          <StartupOverview
            onOpenPitchDeck={() => setIsPitchDeckOpen(true)}
            onNavigateToNurses={() => setActiveTab('nurses')}
            onNavigateToPricing={() => setActiveTab('pricing')}
          />
        )}

        {activeTab === 'nurses' && (
          <NurseDirectory
            nurses={nurses}
            reviews={reviews}
            onOpenBooking={(nurse) => setSelectedNurseForBooking(nurse)}
            onOpenReview={(nurse) => setSelectedNurseForReview(nurse)}
          />
        )}

        {activeTab === 'pricing' && (
          <PricingCalculator
            onNavigateToNurses={() => setActiveTab('nurses')}
          />
        )}

        {activeTab === 'portal' && (
          <NursePortal
            nurseUserEmail={nurseUserEmail}
            onLogin={handleLogin}
            onLogout={handleLogout}
            patients={patients}
            vitalsLogs={vitalsLogs}
            onAddVitalsLog={handleAddVitalsLog}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onOpenPitchDeck={() => setIsPitchDeckOpen(true)}
        setActiveTab={setActiveTab}
      />

      {/* Pitch Deck Modal */}
      <PitchDeckModal
        isOpen={isPitchDeckOpen}
        onClose={() => setIsPitchDeckOpen(false)}
        onNavigateToNurses={() => {
          setIsPitchDeckOpen(false);
          setActiveTab('nurses');
        }}
      />

      {/* Booking Modal */}
      <BookingModal
        nurse={selectedNurseForBooking}
        isOpen={!!selectedNurseForBooking}
        onClose={() => setSelectedNurseForBooking(null)}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* Review Modal */}
      <ReviewModal
        nurse={selectedNurseForReview}
        isOpen={!!selectedNurseForReview}
        onClose={() => setSelectedNurseForReview(null)}
        onSubmitReview={handleReviewSubmit}
      />
    </div>
  );
}
