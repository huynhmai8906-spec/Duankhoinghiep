import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  FileText, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  Sparkles, 
  Phone, 
  User, 
  DollarSign,
  Package
} from 'lucide-react';
import { NurseProfile, ShiftType, Booking } from '../types';

interface BookingModalProps {
  nurse: NurseProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onBookingSuccess: (booking: Booking) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  nurse,
  isOpen,
  onClose,
  onBookingSuccess
}) => {
  if (!isOpen || !nurse) return null;

  const [shiftType, setShiftType] = useState<ShiftType>('Ca 8h hành chính');
  const [durationDays, setDurationDays] = useState<number>(3);
  const [startDate, setStartDate] = useState<string>('2026-09-18');
  const [patientName, setPatientName] = useState<string>('');
  const [patientAge, setPatientAge] = useState<number>(75);
  const [patientGender, setPatientGender] = useState<'Nam' | 'Nữ'>('Nam');
  const [diagnosis, setDiagnosis] = useState<string>('Hậu phẫu ổ bụng / Đột quỵ phục hồi');
  const [contactName, setContactName] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<'TP.HCM' | 'Hà Nội' | 'Đà Nẵng'>(nurse.location);
  const [doctorOrders, setDoctorOrders] = useState<string>('Thay băng vết mổ vô khuẩn mỗi sáng, bơm ăn qua sonde dạ dày sữa 250ml x 4 cữ, xoay trở chống loét tỳ đè mỗi 2 giờ.');
  const [sterileKitRequired, setSterileKitRequired] = useState<boolean>(true);
  const [submittedBooking, setSubmittedBooking] = useState<Booking | null>(null);

  // Calculate pricing based on shift type
  const getBaseRatePerDay = (type: ShiftType) => {
    switch (type) {
      case 'Ca 4h': return 400000;
      case 'Ca 8h hành chính': return 720000;
      case 'Ca đêm 12h': return 920000;
      case 'Ca 24/24': return 1450000;
      case 'Thủ thuật lẻ': return 220000;
      default: return 720000;
    }
  };

  const baseRate = getBaseRatePerDay(shiftType);
  const rawTotal = baseRate * durationDays;
  
  // Discount policy: >= 7 days: 5%, >= 14 days: 10%, >= 30 days: 15%
  let discountPercent = 0;
  if (durationDays >= 30) discountPercent = 15;
  else if (durationDays >= 14) discountPercent = 10;
  else if (durationDays >= 7) discountPercent = 5;

  const discountAmount = Math.round((rawTotal * discountPercent) / 100);
  const kitCost = sterileKitRequired ? 180000 : 0;
  const finalTotal = rawTotal - discountAmount + kitCost;

  // Market comparison: black-market average rate is ~1.8M/24h or ~1.1M/8h with hidden costs
  const marketBaselineRate = baseRate * 1.45;
  const estimatedSavings = Math.round((marketBaselineRate * durationDays) - finalTotal);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !contactPhone.trim() || !address.trim()) {
      alert('Vui lòng điền đầy đủ Tên bệnh nhân, Số điện thoại và Địa chỉ chăm sóc!');
      return;
    }

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      bookingCode: `MCC-2026-${randomSuffix}`,
      nurseId: nurse.id,
      nurseName: nurse.name,
      patientName,
      patientAge,
      patientGender,
      diagnosis,
      contactName: contactName || patientName,
      contactPhone,
      address,
      city,
      shiftType,
      durationDays,
      startDate,
      doctorOrders,
      sterileKitRequired,
      estimatedCost: finalTotal,
      savingsVsMarket: estimatedSavings > 0 ? estimatedSavings : 350000,
      status: 'Đã xác nhận',
      createdAt: new Date().toLocaleDateString('vi-VN')
    };

    setSubmittedBooking(newBooking);
    onBookingSuccess(newBooking);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-teal-800 to-slate-900 text-white p-5 sm:p-6 relative flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-400/20 text-emerald-300 text-xs px-2.5 py-0.5 rounded-full font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              Bảo hiểm trách nhiệm 1 Tỷ VNĐ kích hoạt tự động
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading">
              Đặt Lịch Ca Trực Điều Dưỡng
            </h2>
            <p className="text-xs sm:text-sm text-teal-100 mt-0.5">
              Chỉ định: <strong>{nurse.name}</strong> • Số CCHN: <span className="font-mono text-amber-300">{nurse.cchnNumber}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            aria-label="Đóng biểu mẫu đặt lịch"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body or Success Confirmation */}
        <div className="overflow-y-auto p-5 sm:p-7">
          {submittedBooking ? (
            <div className="py-6 text-center space-y-6 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Đặt Lịch Thành Công
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 font-heading">
                  Mã Lịch Hẹn: <span className="text-teal-700 font-mono">{submittedBooking.bookingCode}</span>
                </h3>
                <p className="text-sm text-slate-600 max-w-lg mx-auto">
                  Hệ thống đã gửi điều phối trực tiếp tới <strong>{nurse.name}</strong>. Điều phối viên lâm sàng của MediCare Connect sẽ gọi điện thoại xác nhận sau 5 phút.
                </p>
              </div>

              {/* Summary card */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 max-w-md mx-auto text-left space-y-2.5 text-xs sm:text-sm">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Người bệnh:</span>
                  <span className="font-bold text-slate-800">{submittedBooking.patientName} ({submittedBooking.patientAge} tuổi)</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Loại ca trực:</span>
                  <span className="font-semibold text-teal-800">{submittedBooking.shiftType} ({submittedBooking.durationDays} ngày)</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Ngày bắt đầu:</span>
                  <span className="font-medium text-slate-800">{submittedBooking.startDate}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Địa chỉ chăm sóc:</span>
                  <span className="font-medium text-slate-800 text-right">{submittedBooking.address}, {submittedBooking.city}</span>
                </div>
                <div className="flex justify-between pt-1 text-base">
                  <span className="font-bold text-slate-800">Tổng tạm tính:</span>
                  <span className="font-black text-teal-700">{submittedBooking.estimatedCost.toLocaleString('vi-VN')} đ</span>
                </div>
              </div>

              <div className="p-3 bg-amber-50 text-amber-900 text-xs rounded-xl border border-amber-200 max-w-md mx-auto">
                ⭐ Thân nhân bệnh nhân có thể truy cập lại hồ sơ điều dưỡng để thực hiện <strong>"Đánh giá sau ca"</strong> sau khi kết thúc ca trực.
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl transition cursor-pointer"
                >
                  Hoàn Tất & Đóng
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shift selection */}
              <div className="space-y-3">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  1. Chọn Loại Ca Trực Chuẩn Hóa
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {(['Ca 4h', 'Ca 8h hành chính', 'Ca đêm 12h', 'Ca 24/24'] as ShiftType[]).map((type) => {
                    const isSelected = shiftType === type;
                    const price = getBaseRatePerDay(type);
                    return (
                      <button
                        type="button"
                        key={type}
                        onClick={() => setShiftType(type)}
                        className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                          isSelected
                            ? 'bg-teal-50 border-teal-600 text-teal-900 ring-2 ring-teal-600/20'
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className="text-xs font-bold">{type}</div>
                        <div className="text-sm font-black text-teal-700 mt-1 font-heading">
                          {price.toLocaleString('vi-VN')} đ
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Duration and Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600">
                      2. Số Ngày Chăm Sóc: <span className="text-teal-700 text-sm font-black">{durationDays} Ngày</span>
                    </label>
                    {discountPercent > 0 && (
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        Chiết khấu {discountPercent}%
                      </span>
                    )}
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={durationDays}
                    onChange={(e) => setDurationDays(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>1 ngày</span>
                    <span>7 ngày (-5%)</span>
                    <span>14 ngày (-10%)</span>
                    <span>30 ngày (-15%)</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                    Ngày Bắt Đầu Ca Đầu Tiên
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
              </div>

              {/* Patient details */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  3. Thông Tin Người Bệnh
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      placeholder="Họ và tên người bệnh *"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Tuổi"
                      value={patientAge}
                      onChange={(e) => setPatientAge(Number(e.target.value))}
                      className="w-1/2 px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                      min="0"
                      max="120"
                    />
                    <select
                      value={patientGender}
                      onChange={(e) => setPatientGender(e.target.value as 'Nam' | 'Nữ')}
                      className="w-1/2 px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                    >
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Chẩn đoán xuất viện / Tình trạng sức khỏe hiện tại *"
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
              </div>

              {/* Contact and address */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  4. Người Liên Hệ & Địa Chỉ Chăm Sóc
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Họ tên người liên hệ / thân nhân"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <input
                    type="tel"
                    placeholder="Số điện thoại liên hệ khẩn cấp *"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <input
                      type="text"
                      placeholder="Số nhà, tên đường, phường/xã *"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                      required
                    />
                  </div>
                  <div>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value as any)}
                      className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                    >
                      <option value="TP.HCM">TP. Hồ Chí Minh</option>
                      <option value="Hà Nội">Hà Nội</option>
                      <option value="Đà Nẵng">Đà Nẵng</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Doctor orders and Sterile Kit */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                  5. Y Lệnh Bác Sĩ & Vật Tư Đi Kèm
                </label>
                <textarea
                  rows={2}
                  value={doctorOrders}
                  onChange={(e) => setDoctorOrders(e.target.value)}
                  placeholder="Y lệnh thuốc, loại sonde, chế độ ăn, dặn dò của bác sĩ điều trị..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                ></textarea>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      id="kitToggle"
                      checked={sterileKitRequired}
                      onChange={(e) => setSterileKitRequired(e.target.checked)}
                      className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
                    />
                    <label htmlFor="kitToggle" className="text-xs text-slate-700 cursor-pointer">
                      <strong>Kèm Bộ Kit Vật Tư Vô Khuẩn Chuyên Sâu</strong> (Găng tay tiệt trùng, gạc Urgo, povidine iod, ống hút đờm vô trùng)
                    </label>
                  </div>
                  <span className="text-xs font-bold text-teal-800 shrink-0">+180.000 đ</span>
                </div>
              </div>

              {/* Price Calculation Box */}
              <div className="bg-gradient-to-r from-teal-50 via-emerald-50 to-teal-50 p-4 rounded-2xl border border-teal-200 space-y-2">
                <div className="flex justify-between text-xs text-slate-600">
                  <span>Giá gốc ({durationDays} ngày x {baseRate.toLocaleString('vi-VN')} đ):</span>
                  <span>{rawTotal.toLocaleString('vi-VN')} đ</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-xs text-emerald-800 font-semibold">
                    <span>Ưu đãi gói {durationDays} ngày ({discountPercent}%):</span>
                    <span>- {discountAmount.toLocaleString('vi-VN')} đ</span>
                  </div>
                )}
                {sterileKitRequired && (
                  <div className="flex justify-between text-xs text-slate-600">
                    <span>Kit vật tư y tế vô khuẩn:</span>
                    <span>+ 180.000 đ</span>
                  </div>
                )}
                <div className="flex justify-between items-baseline pt-2 border-t border-teal-200/60">
                  <div>
                    <div className="text-xs text-slate-500">Tổng chi phí thanh toán tạm tính:</div>
                    <div className="text-xs text-emerald-700 font-semibold">
                      Tiết kiệm ~{estimatedSavings.toLocaleString('vi-VN')} đ so với thị trường tự do
                    </div>
                  </div>
                  <div className="text-2xl font-black text-teal-900 font-heading">
                    {finalTotal.toLocaleString('vi-VN')} đ
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition cursor-pointer"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-sm rounded-xl shadow-sm transition flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Xác Nhận Đặt Lịch Ca Trực</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
