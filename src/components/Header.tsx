import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Stethoscope, 
  CalendarClock, 
  Calculator, 
  UserCheck, 
  FileText, 
  PhoneCall,
  Lock,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

interface HeaderProps {
  activeTab: 'overview' | 'nurses' | 'pricing' | 'portal';
  setActiveTab: (tab: 'overview' | 'nurses' | 'pricing' | 'portal') => void;
  onOpenPitchDeck: () => void;
  nurseUserEmail: string | null;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenPitchDeck,
  nurseUserEmail
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  interface NavItem {
    id: 'overview' | 'nurses' | 'pricing' | 'portal';
    label: string;
    subtitle: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }

  const navItems: NavItem[] = [
    { id: 'overview', label: '1. Giới Thiệu & Dự Án', subtitle: 'Khởi nghiệp Y tế', icon: Award },
    { id: 'nurses', label: '2. Danh Sách Điều Dưỡng', subtitle: '100% CCHN Thẩm định', icon: Stethoscope },
    { id: 'pricing', label: '3. Bảng Giá & Khảo Sát', subtitle: 'Chuẩn hóa chi phí', icon: Calculator },
    { 
      id: 'portal', 
      label: '4. Cổng Điều Dưỡng', 
      subtitle: nurseUserEmail ? 'Đã đăng nhập Gmail' : 'Yêu cầu Gmail', 
      icon: UserCheck,
      badge: nurseUserEmail ? 'Online' : 'Khóa Gmail'
    },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Banner - Innovation Competition & 1 Billion VND Insurance */}
      <div className="bg-gradient-to-r from-teal-700 via-emerald-800 to-teal-900 text-white text-xs sm:text-sm py-2 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <span className="inline-flex items-center gap-1 bg-amber-400/20 text-amber-200 text-[11px] px-2 py-0.5 rounded-full border border-amber-300/30 font-semibold tracking-wide uppercase">
              <Award className="w-3.5 h-3.5 text-amber-300" />
              Khởi Nghiệp ĐMST Y Tế 2026
            </span>
            <span className="text-slate-100 hidden md:inline">|</span>
            <span className="flex items-center gap-1.5 text-emerald-100">
              <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>Độc quyền bảo hiểm trách nhiệm y tế <strong>1 TỶ VNĐ / Ca trực</strong> — Thẩm định CCHN 100% Bộ Y Tế</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenPitchDeck}
              className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-3 py-1 rounded-md transition shadow-xs cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Xem Pitch Deck (TAM 2.4 Tỷ $)</span>
            </button>
            <div className="hidden lg:flex items-center gap-1 text-slate-200 text-xs">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-300" />
              <span>Hotline 24/7: <strong>1900-MEDICARE</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Brand Identity */}
          <div 
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-600 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-teal-700/20 group-hover:scale-105 transition duration-200">
              <div className="relative">
                <Stethoscope className="w-7 h-7 text-white" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 border-2 border-white rounded-full"></span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-slate-900 font-heading">
                  MediCare<span className="text-teal-600">Connect</span>
                </span>
                <span className="bg-teal-50 text-teal-700 border border-teal-200 text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wider uppercase">
                  Startup
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">Nền Tảng Điều Dưỡng Có CCHN Độc Lập</p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/80">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm transition cursor-pointer ${
                    isActive
                      ? 'bg-white text-teal-800 shadow-sm border border-slate-200/70 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                  <div className="text-left">
                    <div className="leading-tight flex items-center gap-1.5">
                      {item.label}
                      {item.badge && (
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                          nurseUserEmail ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </nav>

          {/* Desktop CTA actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setActiveTab('nurses')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm hover:shadow transition cursor-pointer"
            >
              <CalendarClock className="w-4 h-4" />
              <span>Đặt Lịch Ca Trực</span>
            </button>
          </div>

          {/* Mobile hamburger menu */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left font-medium transition ${
                  isActive
                    ? 'bg-teal-50 text-teal-800 font-bold border border-teal-200'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{item.label}</div>
                    <div className="text-xs text-slate-500">{item.subtitle}</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenPitchDeck();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-amber-50 text-amber-900 border border-amber-200 text-sm font-bold py-2.5 rounded-xl"
            >
              <FileText className="w-4 h-4 text-amber-600" />
              <span>Xem Bảng Thuyết Trình Pitch Deck</span>
            </button>
            <button
              onClick={() => {
                setActiveTab('nurses');
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 bg-teal-600 text-white text-sm font-bold py-2.5 rounded-xl"
            >
              <CalendarClock className="w-4 h-4" />
              <span>Đặt Lịch Điều Dưỡng Ngay</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
