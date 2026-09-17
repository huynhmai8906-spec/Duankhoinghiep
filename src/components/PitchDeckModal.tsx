import React from 'react';
import { 
  X, 
  TrendingUp, 
  DollarSign, 
  ShieldAlert, 
  CheckCircle2, 
  Award, 
  Users, 
  ArrowUpRight, 
  HeartHandshake, 
  Target,
  Sparkles
} from 'lucide-react';
import { PITCH_DECK_DATA } from '../data/mockData';

interface PitchDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateToNurses: () => void;
}

export const PitchDeckModal: React.FC<PitchDeckModalProps> = ({
  isOpen,
  onClose,
  onNavigateToNurses
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pitch Deck Header Banner */}
        <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-emerald-950 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            aria-label="Đóng bảng thuyết trình"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 text-xs px-3 py-1 rounded-full border border-amber-300/30 font-bold mb-3 uppercase tracking-wider">
            <Award className="w-4 h-4 text-amber-300" />
            Bảng Thuyết Trình Vòng Chung Kết ĐMST Y Tế 2026
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white font-heading">
            MediCare Connect Pitch Deck
          </h2>
          <p className="text-teal-200 text-sm mt-1 max-w-2xl">
            Nền tảng bên thứ ba độc lập thẩm định 100% CCHN y khoa, chuẩn hóa giá & tích hợp bảo hiểm trách nhiệm y tế 1 tỷ VNĐ.
          </p>
        </div>

        {/* Scrollable Pitch Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 text-slate-800">
          {/* Section 1: Market Opportunity (TAM - SAM - SOM) */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-teal-800 font-bold text-lg font-heading">
              <Target className="w-5 h-5 text-teal-600" />
              <h3>1. Cơ Hội Thị Trường & Quy Mô Tăng Trưởng (TAM - SAM - SOM)</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* TAM */}
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50/50 p-5 rounded-xl border border-teal-200 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">Total Addressable Market</span>
                  <div className="text-3xl font-black text-teal-900 mt-1 mb-2 font-heading">
                    {PITCH_DECK_DATA.tam.value}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {PITCH_DECK_DATA.tam.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-teal-200/60 flex items-center justify-between text-[11px] font-semibold text-teal-800">
                  <span>Toàn bộ thị trường Y tế tại nhà</span>
                  <span className="text-emerald-700">CAGR 14.8%</span>
                </div>
              </div>

              {/* SAM */}
              <div className="bg-gradient-to-br from-blue-50 to-sky-50/50 p-5 rounded-xl border border-blue-200 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Serviceable Addressable Market</span>
                  <div className="text-3xl font-black text-blue-900 mt-1 mb-2 font-heading">
                    {PITCH_DECK_DATA.sam.value}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {PITCH_DECK_DATA.sam.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-blue-200/60 flex items-center justify-between text-[11px] font-semibold text-blue-800">
                  <span>Đô thị Tier-1 Việt Nam</span>
                  <span className="text-blue-700">5 Đô thị lớn</span>
                </div>
              </div>

              {/* SOM */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 p-5 rounded-xl border border-amber-200 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Serviceable Obtainable Market</span>
                  <div className="text-3xl font-black text-amber-900 mt-1 mb-2 font-heading">
                    {PITCH_DECK_DATA.som.value}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {PITCH_DECK_DATA.som.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-between text-[11px] font-semibold text-amber-900">
                  <span>Mục tiêu 3 năm đầu</span>
                  <span className="text-amber-700">10.5% Thị phần</span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Business Model & Take-Rate */}
          <section className="space-y-4 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2 text-teal-800 font-bold text-lg font-heading">
              <DollarSign className="w-5 h-5 text-teal-600" />
              <h3>2. Mô Hình Doanh Thu & Take-Rate (12% - 15%)</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <div className="text-xs font-bold text-slate-500 uppercase">Mô hình cốt lõi</div>
                <div className="text-xl font-extrabold text-teal-700 mt-1">Take-rate: {PITCH_DECK_DATA.takeRate}</div>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Thu phí nền tảng kết nối và bảo chứng chất lượng lâm sàng trên mỗi ca trực hoàn thành thành công.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <div className="text-xs font-bold text-slate-500 uppercase">B2B Hospital Partnership</div>
                <div className="text-xl font-extrabold text-emerald-700 mt-1">Gói Xuất Viện Ngoại Trú</div>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Liên kết với các Bệnh viện đa khoa giải phóng giường bệnh sớm, chuyển tiếp điều dưỡng chăm sóc tại nhà.
                </p>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                <div className="text-xs font-bold text-slate-500 uppercase">Gia tăng giá trị</div>
                <div className="text-xl font-extrabold text-blue-700 mt-1">Kit Vật Tư & Thiết Bị IoT</div>
                <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                  Cung cấp bộ kit vô khuẩn chuẩn y khoa và thiết bị theo dõi sinh tồn liên tục gửi dữ liệu về cổng điều dưỡng.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Social Impact */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-teal-800 font-bold text-lg font-heading">
              <HeartHandshake className="w-5 h-5 text-teal-600" />
              <h3>3. Tác Động An Sinh Xã Hội & Giải Quyết Vấn Nạn Cò Mồi</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {PITCH_DECK_DATA.socialImpact.map((impact, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                    {impact}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: Roadmap */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-teal-800 font-bold text-lg font-heading">
              <TrendingUp className="w-5 h-5 text-teal-600" />
              <h3>4. Lộ Trình Phát Triển (Strategic Roadmap)</h3>
            </div>

            <div className="space-y-3">
              {PITCH_DECK_DATA.roadMap.map((step, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 gap-2">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-teal-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-sm font-bold text-slate-900 font-heading">
                      {step.phase}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm text-slate-600 pl-10 sm:pl-0">
                    {step.target}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Pitch Deck Footer */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            Dự án bảo vệ bản quyền ý tưởng sáng tạo theo thể lệ Cuộc thi Khởi nghiệp Đổi mới Sáng tạo Y tế Quốc gia 2026.
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 transition cursor-pointer"
            >
              Đóng
            </button>
            <button
              onClick={() => {
                onClose();
                onNavigateToNurses();
              }}
              className="w-1/2 sm:w-auto px-5 py-2 text-sm font-bold text-white bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 rounded-xl shadow-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Xem Đội Ngũ Điều Dưỡng</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
