import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Award, 
  ShieldCheck, 
  CalendarClock, 
  MessageSquare, 
  Stethoscope, 
  Building2, 
  BadgeCheck, 
  Check, 
  ChevronDown, 
  ArrowUpDown, 
  Info,
  Clock,
  Sparkles
} from 'lucide-react';
import { NurseProfile, NurseReview } from '../types';

interface NurseDirectoryProps {
  nurses: NurseProfile[];
  reviews: NurseReview[];
  onOpenBooking: (nurse: NurseProfile) => void;
  onOpenReview: (nurse: NurseProfile) => void;
}

export const NurseDirectory: React.FC<NurseDirectoryProps> = ({
  nurses,
  reviews,
  onOpenBooking,
  onOpenReview
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<'Tất cả' | 'TP.HCM' | 'Hà Nội' | 'Đà Nẵng'>('Tất cả');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('Tất cả');
  const [sortBy, setSortBy] = useState<'rating_desc' | 'exp_desc' | 'price_asc'>('rating_desc');
  const [expandedReviewsNurseId, setExpandedReviewsNurseId] = useState<string | null>(null);

  // All available specialties for filtering
  const allSpecialties = [
    'Tất cả',
    'Hậu phẫu ổ bụng',
    'Tai biến đột quỵ',
    'Loét tỳ đè độ II-III',
    'Mẹ và bé sau sinh',
    'Đặt sonde dạ dày & tiểu vô khuẩn',
    'Hút đờm sâu',
    'Tập phục hồi chức năng sớm'
  ];

  // Multi-dimensional filtering and sorting
  const filteredNurses = useMemo(() => {
    return nurses
      .filter((nurse) => {
        // Search term matching name, specialties, hospitals, CCHN
        const matchesSearch = 
          searchTerm.trim() === '' ||
          nurse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          nurse.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
          nurse.priorHospitals.some(h => h.toLowerCase().includes(searchTerm.toLowerCase())) ||
          nurse.cchnNumber.toLowerCase().includes(searchTerm.toLowerCase());

        // Location match
        const matchesLocation = 
          selectedLocation === 'Tất cả' || nurse.location === selectedLocation;

        // Specialty match
        const matchesSpecialty = 
          selectedSpecialty === 'Tất cả' || 
          nurse.specialties.some(s => s.toLowerCase().includes(selectedSpecialty.toLowerCase()));

        return matchesSearch && matchesLocation && matchesSpecialty;
      })
      .sort((a, b) => {
        if (sortBy === 'rating_desc') {
          // Sort by average rating descending, then reviewsCount
          if (b.rating !== a.rating) return b.rating - a.rating;
          return b.reviewsCount - a.reviewsCount;
        }
        if (sortBy === 'exp_desc') {
          return b.experienceYears - a.experienceYears;
        }
        if (sortBy === 'price_asc') {
          return a.hourlyRate8h - b.hourlyRate8h;
        }
        return 0;
      });
  }, [nurses, searchTerm, selectedLocation, selectedSpecialty, sortBy]);

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-md border border-teal-800">
        <div className="max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs px-3 py-1 rounded-full border border-emerald-400/30 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-emerald-300" />
            100% Thẩm Định Chứng Chỉ Hành Nghề (CCHN) Bộ Y Tế & Bảo Hiểm 1 Tỷ
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading">
            Danh Sách Điều Dưỡng Có Chứng Chỉ Để Bệnh Nhân Chọn
          </h1>
          <p className="text-teal-100 text-sm sm:text-base leading-relaxed">
            Tra cứu công khai số hiệu CCHN, cơ sở cấp phép, trình độ cử nhân ĐH Y Dược và bệnh viện tuyến đầu từng công tác (Chợ Rẫy, Bạch Mai, Từ Dũ, BV Đà Nẵng). Đặt lịch ca trực chuẩn hóa hoặc gửi đánh giá minh bạch sau ca.
          </p>
        </div>
      </div>

      {/* Multi-dimensional Filter Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Keyword Search */}
          <div className="relative sm:col-span-2">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm theo tên điều dưỡng, số CCHN, BV Chợ Rẫy, sonde, loét..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-3 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                Xóa
              </button>
            )}
          </div>

          {/* Location Filter */}
          <div>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3.5 top-3.5 text-teal-600" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value as any)}
                className="w-full pl-10 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition appearance-none cursor-pointer"
              >
                <option value="Tất cả">Khu vực: Tất cả địa bàn</option>
                <option value="TP.HCM">TP. Hồ Chí Minh</option>
                <option value="Hà Nội">Hà Nội</option>
                <option value="Đà Nẵng">Đà Nẵng</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* Sort By */}
          <div>
            <div className="relative">
              <ArrowUpDown className="w-4 h-4 absolute left-3.5 top-3.5 text-amber-600" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full pl-10 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition appearance-none cursor-pointer font-medium"
              >
                <option value="rating_desc">⭐ Đánh giá sao cao nhất</option>
                <option value="exp_desc">🎖️ Kinh nghiệm nhiều nhất</option>
                <option value="price_asc">💵 Mức giá tối ưu nhất</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-3 top-3.5 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Specialty Filter Chips */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="font-bold text-slate-500 shrink-0 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-slate-400" /> Chuyên môn:
          </span>
          {allSpecialties.map((spec) => (
            <button
              key={spec}
              onClick={() => setSelectedSpecialty(spec)}
              className={`px-3 py-1.5 rounded-full shrink-0 font-medium transition cursor-pointer ${
                selectedSpecialty === spec
                  ? 'bg-teal-700 text-white font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header count */}
      <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500 px-1">
        <div>
          Tìm thấy <strong className="text-teal-800 font-bold">{filteredNurses.length}</strong> điều dưỡng có CCHN phù hợp tiêu chí
        </div>
        <div className="flex items-center gap-1.5 text-emerald-700 font-semibold text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Tất cả đã qua thẩm định 4 bước độc lập</span>
        </div>
      </div>

      {/* Nurse Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredNurses.map((nurse) => {
          const nurseReviewsList = reviews.filter(r => r.nurseId === nurse.id);
          const isReviewsExpanded = expandedReviewsNurseId === nurse.id;

          return (
            <div
              key={nurse.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition overflow-hidden flex flex-col justify-between"
            >
              <div className="p-5 sm:p-6 space-y-4">
                {/* Top Row: Avatar & Primary Credentials */}
                <div className="flex items-start gap-4">
                  <div className="relative shrink-0">
                    <img
                      src={nurse.avatar}
                      alt={nurse.name}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-teal-500 shadow-sm"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute -bottom-1.5 -right-1.5 bg-emerald-500 text-white p-1 rounded-full border-2 border-white shadow-xs">
                      <BadgeCheck className="w-4 h-4" />
                    </span>
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-heading">
                        {nurse.name}
                      </h3>
                      <div className="flex items-center gap-1 bg-amber-50 text-amber-900 px-2 py-0.5 rounded-lg border border-amber-200 font-bold text-xs shrink-0">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{nurse.rating.toFixed(2)}</span>
                        <span className="text-slate-400 font-normal">({nurse.reviewsCount})</span>
                      </div>
                    </div>

                    <p className="text-xs font-semibold text-teal-700">
                      {nurse.title}
                    </p>

                    {/* Official CCHN Badge */}
                    <div className="p-2 rounded-xl bg-teal-50/70 border border-teal-200 text-[11px] text-teal-950 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                          Số CCHN:
                        </span>
                        <span className="font-mono font-extrabold text-teal-900 bg-white px-2 py-0.5 rounded border border-teal-200">
                          {nurse.cchnNumber}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-600">
                        Cơ quan cấp: <strong>{nurse.licensingAuthority}</strong> ({nurse.licenseDate})
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hospitals & Experience */}
                <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Từng công tác tại: <strong className="text-slate-900">{nurse.priorHospitals.join(', ')}</strong></span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-700">
                    <Award className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Học vấn: <span className="text-slate-900 font-medium">{nurse.education}</span> • <strong>{nurse.experienceYears} năm lâm sàng</strong></span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-700">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Khu vực hỗ trợ: <strong className="text-slate-900">{nurse.location}</strong> ({nurse.district})</span>
                  </div>
                </div>

                {/* Specialties Chips */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    Kỹ Thuật Thành Thạo:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {nurse.specialties.map((item, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-100 text-slate-700 text-[11px] font-medium px-2 py-0.5 rounded-md border border-slate-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Standardized Pricing Row */}
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs grid grid-cols-4 gap-2 text-center">
                  <div>
                    <span className="text-[10px] text-slate-500 block">Ca 4h</span>
                    <span className="font-extrabold text-slate-900 font-heading">{(nurse.hourlyRate4h / 1000).toFixed(0)}k</span>
                  </div>
                  <div className="bg-white p-1 rounded-lg border border-teal-200 shadow-xs">
                    <span className="text-[10px] text-teal-700 font-bold block">Ca 8h (Chuẩn)</span>
                    <span className="font-black text-teal-800 font-heading">{(nurse.hourlyRate8h / 1000).toFixed(0)}k</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Ca đêm 12h</span>
                    <span className="font-extrabold text-slate-900 font-heading">{(nurse.hourlyRate12h / 1000).toFixed(0)}k</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">Ca 24/24</span>
                    <span className="font-extrabold text-slate-900 font-heading">{(nurse.hourlyRate24h / 1000).toFixed(0)}k</span>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-xs text-slate-600 italic leading-relaxed">
                  "{nurse.bio}"
                </p>

                {/* Reviews Toggle Section */}
                <div className="pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setExpandedReviewsNurseId(isReviewsExpanded ? null : nurse.id)}
                    className="text-xs text-teal-700 hover:text-teal-900 font-bold flex items-center gap-1.5 transition cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Xem {nurseReviewsList.length} bình luận & đánh giá lâm sàng từ người bệnh</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition transform ${isReviewsExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  {isReviewsExpanded && (
                    <div className="mt-3 space-y-2.5 max-h-60 overflow-y-auto pr-1">
                      {nurseReviewsList.length === 0 ? (
                        <div className="text-xs text-slate-400 italic py-2">
                          Chưa có bình luận nào cho điều dưỡng này. Hãy là người đầu tiên đánh giá sau ca trực!
                        </div>
                      ) : (
                        nurseReviewsList.map((rev) => (
                          <div key={rev.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-800">{rev.reviewerName}</span>
                              <span className="text-[10px] text-slate-400">{rev.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex text-amber-400">
                                {[...Array(rev.ratingOverall)].map((_, i) => (
                                  <Star key={i} className="w-3 h-3 fill-amber-400" />
                                ))}
                              </div>
                              <span className="text-[10px] font-semibold text-teal-800 bg-teal-50 px-1.5 py-0.2 rounded border border-teal-200">
                                {rev.shiftType}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 grid grid-cols-3 gap-1 pt-1 border-t border-slate-200/60">
                              <span>Tay nghề: <strong>{rev.ratingClinicalSkill}★</strong></span>
                              <span>Tận tâm: <strong>{rev.ratingDedication}★</strong></span>
                              <span>Đúng giờ: <strong>{rev.ratingPunctuality}★</strong></span>
                            </div>
                            <p className="text-slate-700 italic">"{rev.comment}"</p>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onOpenReview(nurse)}
                  className="w-1/2 py-2.5 px-3 rounded-xl border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                  <span>Đánh Giá Sau Ca</span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenBooking(nurse)}
                  className="w-1/2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white text-xs font-bold transition shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <CalendarClock className="w-3.5 h-3.5" />
                  <span>Đặt Lịch Ca Trực</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
