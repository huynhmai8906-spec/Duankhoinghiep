import React, { useState } from 'react';
import { 
  Calculator, 
  TrendingDown, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Sparkles, 
  ArrowRight,
  FileSpreadsheet,
  BadgePercent,
  Check,
  Stethoscope
} from 'lucide-react';
import { 
  MARKET_SURVEY_REPORT, 
  COMPARISON_MODELS, 
  STANDARD_PRICING_TABLE 
} from '../data/mockData';
import { ShiftType } from '../types';

interface PricingCalculatorProps {
  onNavigateToNurses: () => void;
}

export const PricingCalculator: React.FC<PricingCalculatorProps> = ({
  onNavigateToNurses
}) => {
  // Cost estimator states
  const [selectedShift, setSelectedShift] = useState<ShiftType>('Ca 8h hành chính');
  const [days, setDays] = useState<number>(7);
  const [includeSterileKit, setIncludeSterileKit] = useState<boolean>(true);

  // Price calculations
  const getShiftDailyRate = (shift: ShiftType) => {
    switch (shift) {
      case 'Ca 4h': return 400000;
      case 'Ca 8h hành chính': return 720000;
      case 'Ca đêm 12h': return 920000;
      case 'Ca 24/24': return 1450000;
      case 'Thủ thuật lẻ': return 220000;
      default: return 720000;
    }
  };

  const dailyRate = getShiftDailyRate(selectedShift);
  const rawSubtotal = dailyRate * days;

  let discountRate = 0;
  if (days >= 30) discountRate = 15;
  else if (days >= 14) discountRate = 10;
  else if (days >= 7) discountRate = 5;

  const discountVal = Math.round((rawSubtotal * discountRate) / 100);
  const kitTotal = includeSterileKit ? 180000 * Math.ceil(days / 5) : 0; // 1 kit per 5 days
  const finalEstimate = rawSubtotal - discountVal + kitTotal;

  // Comparison with black market (which averages 1.45x plus unexpected hidden night fees)
  const unregulatedMarketPrice = Math.round((dailyRate * 1.55) * days);
  const privateHospitalPrice = Math.round((dailyRate * 2.8) * days);
  const savingsVsUnregulated = unregulatedMarketPrice - finalEstimate;

  return (
    <div className="space-y-12 pb-12">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-emerald-950 text-white p-6 sm:p-8 rounded-3xl shadow-md border border-teal-800">
        <div className="max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs px-3 py-1 rounded-full border border-emerald-400/30 font-bold uppercase tracking-wider">
            <Calculator className="w-4 h-4 text-emerald-300" />
            Minh Bạch 100% — Xóa Bỏ Vấn Nạn Loạn Giá Chợ Đen
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-heading">
            Bảng Giá Chuẩn Hóa & Báo Cáo Khảo Sát Thị Trường
          </h1>
          <p className="text-teal-100 text-sm sm:text-base leading-relaxed">
            Nghiên cứu độc lập từ hơn 120 gia đình người bệnh và 15 cơ sở y tế tại Hà Nội và TP.HCM. Phân tích chi phí thực tế, quyền lợi bảo hiểm và công cụ dự toán chi phí tự động giúp gia đình tiết kiệm tới 35% ngân sách chăm sóc.
          </p>
        </div>
      </div>

      {/* Section 1: Market Survey Findings (Báo Cáo Nghiên Cứu Giá Thị Trường) */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-amber-800 bg-amber-50 border border-amber-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            Dữ Liệu Khảo Sát Thực Tế
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
            Báo Cáo Nghiên Cứu Giá & Rủi Ro Thị Trường Tự Do
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-3xl">
            Khảo sát thực hiện trên <strong>{MARKET_SURVEY_REPORT.sampleSize}</strong> tại {MARKET_SURVEY_REPORT.locations}:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {MARKET_SURVEY_REPORT.keyFindings.map((finding, idx) => (
            <div 
              key={idx} 
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="text-3xl sm:text-4xl font-black text-rose-600 font-heading">
                  {finding.metric}
                </div>
                <h3 className="text-sm font-bold text-slate-900 font-heading mt-1">
                  {finding.title}
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                {finding.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Survey Analysis note */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 text-xs sm:text-sm flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Kết luận điều tra:</strong> Biên độ biến động giá trên thị trường tự do dao động từ <strong>40% đến 62%</strong>. Gia đình thường bị ép giá tăng đột ngột vào ban đêm hoặc những ngày lễ tết, đồng thời phải trả các khoản phụ phí vô lý như "tiền bồi dưỡng riêng", "tiền ăn uống người nuôi bệnh", trong khi người chăm sóc hoàn toàn không có Chứng chỉ hành nghề và không có bất kỳ khoản bảo hiểm y khoa nào bảo vệ bệnh nhân.
          </p>
        </div>
      </section>

      {/* Section 2: 4-Model Comparison Matrix (Bảng so sánh 4 mô hình) */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-teal-700 bg-teal-50 border border-teal-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            Đối Chiếu Minh Bạch
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
            Bảng So Sánh 4 Mô Hình Chăm Sóc Tại Việt Nam
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Phân tích sự khác biệt về an toàn y khoa, năng lực lâm sàng và quyền lợi pháp lý giữa MediCare Connect và các kênh truyền thống:
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-xs">
          <table className="w-full text-left text-xs sm:text-sm border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-100/80 text-slate-700 border-b border-slate-200 font-heading">
                <th className="p-4 font-bold text-xs uppercase tracking-wider w-1/4">Tiêu Chí Đánh Giá</th>
                <th className="p-4 font-bold text-xs uppercase tracking-wider text-rose-800">Cò Mồi Chợ Đen Cổng Viện</th>
                <th className="p-4 font-bold text-xs uppercase tracking-wider text-slate-700">Trung Tâm Giúp Việc</th>
                <th className="p-4 font-bold text-xs uppercase tracking-wider text-slate-700">Bệnh Viện Tư Nhân</th>
                <th className="p-4 font-black text-xs uppercase tracking-wider bg-teal-50 text-teal-900 border-l border-r border-teal-200">
                  MediCare Connect
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="p-4 font-bold text-slate-900 bg-slate-50/50">Chứng Chỉ Hành Nghề (CCHN)</td>
                <td className="p-4 text-rose-700 font-medium">Không có (lao động phổ thông mạo danh)</td>
                <td className="p-4 text-slate-600">Không có CCHN Bộ Y Tế, chỉ đào tạo sơ bộ 3 ngày</td>
                <td className="p-4 text-emerald-700 font-medium">Có CCHN chính thức</td>
                <td className="p-4 font-extrabold bg-teal-50/50 text-teal-900 border-l border-r border-teal-200">
                  <span className="flex items-center gap-1.5 text-teal-800">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    100% CCHN Thẩm định trực tiếp Bộ Y Tế
                  </span>
                </td>
              </tr>

              <tr>
                <td className="p-4 font-bold text-slate-900 bg-slate-50/50">Thẩm Định Lâm Sàng 4 Bước</td>
                <td className="p-4 text-rose-700 font-medium">Không có, truyền tay qua số điện thoại</td>
                <td className="p-4 text-slate-600">Chỉ kiểm tra CCCD, không kỹ năng y khoa</td>
                <td className="p-4 text-slate-700">Thẩm định nội bộ viện</td>
                <td className="p-4 font-extrabold bg-teal-50/50 text-teal-900 border-l border-r border-teal-200">
                  <span className="flex items-center gap-1.5 text-teal-800">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    eKYC + Sát hạch ICU + Lý lịch tư pháp số 2
                  </span>
                </td>
              </tr>

              <tr>
                <td className="p-4 font-bold text-slate-900 bg-slate-50/50">Bảo Hiểm Trách Nhiệm Nghề Nghiệp</td>
                <td className="p-4 text-rose-700 font-bold">0 VNĐ (Phủi trách nhiệm khi có tai biến)</td>
                <td className="p-4 text-rose-700">Không có bảo hiểm y khoa</td>
                <td className="p-4 text-slate-700">Có bảo hiểm viện (chỉ nội trú)</td>
                <td className="p-4 font-extrabold bg-teal-50/50 text-teal-900 border-l border-r border-teal-200">
                  <span className="flex items-center gap-1.5 text-teal-800">
                    <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                    Tích hợp Bảo hiểm 1 TỶ VNĐ / Ca
                  </span>
                </td>
              </tr>

              <tr>
                <td className="p-4 font-bold text-slate-900 bg-slate-50/50">Bảng Giá & Chi Phí</td>
                <td className="p-4 text-rose-700">Loạn giá, ép giá ban đêm (500k - 1.8tr)</td>
                <td className="p-4 text-slate-600">Phí môi giới 1.5 - 2 triệu + lương tháng</td>
                <td className="p-4 text-slate-700">Rất đắt đỏ (2.5tr - 4.5tr/ngày)</td>
                <td className="p-4 font-extrabold bg-teal-50/50 text-teal-900 border-l border-r border-teal-200">
                  <span className="flex items-center gap-1.5 text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    Niêm yết cố định từ 400.000 đ/ca (Không phát sinh)
                  </span>
                </td>
              </tr>

              <tr>
                <td className="p-4 font-bold text-slate-900 bg-slate-50/50">Báo Cáo Sinh Tồn & Cảnh Báo Đỏ</td>
                <td className="p-4 text-rose-700">Không biết đo SpO2 chuẩn, nguy cơ sặc sonde</td>
                <td className="p-4 text-slate-600">Chỉ làm việc nhà, không thể xử lý biến chứng</td>
                <td className="p-4 text-slate-700">Ghi chép hồ sơ bệnh án nội bộ</td>
                <td className="p-4 font-extrabold bg-teal-50/50 text-teal-900 border-l border-r border-teal-200">
                  <span className="flex items-center gap-1.5 text-teal-800">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                    Cổng điều dưỡng số, báo động SpO2, SMS cho thân nhân
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Section 3: Standardized Price Table (Bảng Giá Niêm Yết Công Khai) */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Minh Bạch 100%
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
            Bảng Giá Niêm Yết Công Khai (Không Phí Ẩn)
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Giá niêm yết đã bao gồm trách nhiệm lâm sàng, dụng cụ đo sinh tồn chuẩn y khoa và bảo hiểm trách nhiệm nghề nghiệp:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STANDARD_PRICING_TABLE.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-6 bg-white border transition flex flex-col justify-between ${
                item.recommended
                  ? 'border-teal-500 shadow-md ring-2 ring-teal-500/20 relative'
                  : 'border-slate-200 shadow-xs hover:border-slate-300'
              }`}
            >
              {item.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-700 text-white text-[11px] font-black px-3 py-0.5 rounded-full uppercase tracking-wider shadow-xs">
                  Gói Được Chọn Nhiều Nhất
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <span className="text-xs font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-200">
                    {item.tag}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 font-heading mt-2.5">
                    {item.type}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    {item.desc}
                  </p>
                </div>

                <div className="flex items-baseline gap-1 pt-2 border-t border-slate-100">
                  <span className="text-3xl font-black text-slate-900 font-heading">
                    {item.price.toLocaleString('vi-VN')}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">VNĐ / {item.unit}</span>
                </div>

                <div className="space-y-2 pt-2">
                  <div className="text-xs font-bold text-slate-700">Quyền lợi y khoa đi kèm:</div>
                  {item.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-600">
                      <Check className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={onNavigateToNurses}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 cursor-pointer ${
                    item.recommended
                      ? 'bg-teal-600 hover:bg-teal-700 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  <Stethoscope className="w-4 h-4" />
                  <span>Chọn Điều Dưỡng Gói Này</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Cost Estimator (Công Cụ Dự Toán Chi Phí Tự Động) */}
      <section className="bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-teal-800/60 shadow-xl space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 text-xs px-3.5 py-1 rounded-full font-bold uppercase tracking-wider border border-amber-300/30">
            <Calculator className="w-4 h-4 text-amber-300" />
            Công Cụ Dự Toán Chi Phí Tự Động (Cost Estimator)
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
            Tùy Chỉnh Gói Ca Trực & Đối Chiếu Số Tiền Tiết Kiệm
          </h2>
          <p className="text-teal-200 text-xs sm:text-sm max-w-2xl">
            Kéo thanh trượt từ 1 đến 30 ngày để kích hoạt chiết khấu tự động (5% - 15%) và so sánh với chi phí phát sinh chợ đen:
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Shift picker */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-teal-200">
                1. Chọn Loại Ca Trực:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['Ca 4h', 'Ca 8h hành chính', 'Ca đêm 12h', 'Ca 24/24'] as ShiftType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setSelectedShift(type)}
                    className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                      selectedShift === type
                        ? 'bg-teal-600 text-white border-teal-400 shadow-md font-bold'
                        : 'bg-white/10 text-slate-200 border-white/10 hover:bg-white/20'
                    }`}
                  >
                    <div className="text-xs">{type}</div>
                    <div className="text-xs font-black text-amber-300 mt-1">
                      {getShiftDailyRate(type).toLocaleString('vi-VN')} đ
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-2 bg-white/5 p-4 rounded-2xl border border-white/10">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-200">
                  2. Thời Gian Đặt Ca: <span className="text-amber-300 text-base font-black">{days} Ngày</span>
                </span>
                {discountRate > 0 && (
                  <span className="text-xs font-extrabold text-emerald-300 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                    Chiết khấu ưu đãi: -{discountRate}%
                  </span>
                )}
              </div>

              <input
                type="range"
                min="1"
                max="30"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full h-3 bg-white/20 rounded-lg appearance-none cursor-pointer accent-teal-400"
              />

              <div className="flex justify-between text-[11px] text-teal-300/80">
                <span>1 ngày (chuẩn)</span>
                <span>7 ngày (-5%)</span>
                <span>14 ngày (-10%)</span>
                <span>30 ngày (-15%)</span>
              </div>
            </div>

            {/* Kit toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="estimatorKit"
                  checked={includeSterileKit}
                  onChange={(e) => setIncludeSterileKit(e.target.checked)}
                  className="w-4 h-4 text-teal-500 rounded border-white/20 focus:ring-teal-400"
                />
                <label htmlFor="estimatorKit" className="text-xs text-slate-200 cursor-pointer">
                  Kèm <strong>Kit vật tư vô khuẩn</strong> (180.000đ / bộ, định mức 5 ngày/bộ)
                </label>
              </div>
              <span className="text-xs font-bold text-amber-300">
                +{kitTotal.toLocaleString('vi-VN')} đ
              </span>
            </div>
          </div>

          {/* Result Card (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-b from-teal-900 to-slate-900 p-6 rounded-2xl border border-teal-500/50 shadow-2xl space-y-4">
            <div className="text-xs font-bold uppercase tracking-wider text-teal-300 border-b border-white/10 pb-2">
              Dự Toán Chi Phí MediCare Connect
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Giá gốc niêm yết ({days} ngày):</span>
                <span>{rawSubtotal.toLocaleString('vi-VN')} đ</span>
              </div>
              {discountRate > 0 && (
                <div className="flex justify-between text-emerald-300 font-semibold">
                  <span>Chiết khấu tự động ({discountRate}%):</span>
                  <span>- {discountVal.toLocaleString('vi-VN')} đ</span>
                </div>
              )}
              {includeSterileKit && (
                <div className="flex justify-between text-slate-300">
                  <span>Kit vật tư vô trùng:</span>
                  <span>+ {kitTotal.toLocaleString('vi-VN')} đ</span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-white/10 space-y-1">
              <div className="text-xs text-slate-300">Tổng chi phí dự kiến:</div>
              <div className="text-3xl sm:text-4xl font-black text-amber-300 font-heading">
                {finalEstimate.toLocaleString('vi-VN')} đ
              </div>
            </div>

            {/* Savings Comparison */}
            <div className="p-3.5 bg-emerald-950/80 rounded-xl border border-emerald-500/40 space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-300 font-bold">
                <TrendingDown className="w-4 h-4" />
                <span>Tiết Kiệm So Với Thuê Chợ Đen Tự Do:</span>
              </div>
              <div className="text-lg font-black text-emerald-200">
                ~ {savingsVsUnregulated.toLocaleString('vi-VN')} đ
              </div>
              <p className="text-[11px] text-emerald-300/80 leading-relaxed">
                Được bảo đảm bởi Điều dưỡng CCHN chính quy và Bảo hiểm 1 Tỷ VNĐ / Ca trực.
              </p>
            </div>

            <button
              onClick={onNavigateToNurses}
              className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-black text-sm rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Tiến Hành Đặt Lịch Ca Trực</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
