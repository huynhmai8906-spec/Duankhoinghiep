import React from 'react';
import { 
  AlertTriangle, 
  ShieldCheck, 
  Users, 
  CheckCircle2, 
  FileSpreadsheet, 
  Search, 
  Award, 
  Activity, 
  HeartPulse, 
  Flame, 
  FileText, 
  ArrowRight,
  Stethoscope,
  BadgeCheck,
  Building2,
  Clock,
  ChevronRight
} from 'lucide-react';
import { FOUNDING_TEAM } from '../data/mockData';

interface StartupOverviewProps {
  onOpenPitchDeck: () => void;
  onNavigateToNurses: () => void;
  onNavigateToPricing: () => void;
}

export const StartupOverview: React.FC<StartupOverviewProps> = ({
  onOpenPitchDeck,
  onNavigateToNurses,
  onNavigateToPricing
}) => {
  return (
    <div className="space-y-16 pb-12">
      {/* Hero Showcase */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white p-6 sm:p-10 lg:p-14 shadow-xl border border-teal-800/40">
        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 bg-teal-500/20 text-teal-300 text-xs sm:text-sm px-4 py-1.5 rounded-full border border-teal-400/30 font-semibold tracking-wide">
            <Award className="w-4 h-4 text-amber-300" />
            Đề Án Khởi Nghiệp Đổi Mới Sáng Tạo Y Tế 2026 — Mô Hình Nền Tảng Bên Thứ Ba
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] font-heading">
            Bảo Chứng Chất Lượng Y Khoa Cho Dịch Vụ <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-400">Điều Dưỡng Tại Nhà</span>
          </h1>

          <p className="text-slate-200 text-base sm:text-lg leading-relaxed max-w-3xl">
            Giải quyết triệt để vấn nạn <strong className="text-amber-300 font-semibold">"cò mồi y tế"</strong> và người giúp việc không bằng cấp tự nhận chăm sóc bệnh nhân nặng. MediCare Connect đóng vai trò thẩm định độc lập 100% CCHN Bộ Y Tế, tích hợp bảo hiểm trách nhiệm 1 Tỷ VNĐ và giám sát lâm sàng thời gian thực.
          </p>

          {/* Core Trust Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/10">
              <div className="text-teal-300 font-black text-2xl font-heading">100%</div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">Xác thực số CCHN Bộ Y Tế</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/10">
              <div className="text-emerald-300 font-black text-2xl font-heading">1 TỶ VNĐ</div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">Bảo hiểm trách nhiệm / ca</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/10">
              <div className="text-amber-300 font-black text-2xl font-heading">4 Bước</div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">Sát hạch kỹ năng lâm sàng</div>
            </div>
            <div className="bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/10">
              <div className="text-sky-300 font-black text-2xl font-heading">24/7</div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">Cảnh báo đỏ SpO2 & sinh tồn</div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <button
              onClick={onNavigateToNurses}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold px-6 py-3.5 rounded-xl shadow-lg transition duration-200 cursor-pointer"
            >
              <Stethoscope className="w-5 h-5" />
              <span>Tìm Điều Dưỡng Có Chứng Chỉ</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={onOpenPitchDeck}
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white font-semibold px-5 py-3.5 rounded-xl border border-white/20 transition cursor-pointer"
            >
              <FileText className="w-5 h-5 text-amber-300" />
              <span>Xem Pitch Deck Cuộc Thi (TAM 2.4 Tỷ $)</span>
            </button>

            <button
              onClick={onNavigateToPricing}
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white text-sm font-medium px-4 py-2 transition"
            >
              <span>Xem báo cáo 120 gia đình</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
      </section>

      {/* Section 1: The Pain Points (Vấn Đề Thị Trường) */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-rose-700 bg-rose-50 border border-rose-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5" />
            Thực Trạng Nhức Nhối Tại Các Cổng Viện
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
            Vấn Đề Thị Trường (The Pain Points)
          </h2>
          <p className="text-slate-600 max-w-3xl text-sm sm:text-base">
            Gia đình người bệnh sau xuất viện hoặc có người thân mắc bệnh hiểm nghèo đang đối diện với những rủi ro sinh tử do thị trường chăm sóc tự do thiếu kiểm soát:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1 */}
          <div className="p-5 rounded-2xl bg-white border border-rose-200/80 shadow-xs hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading mb-1.5">
              Nạn "Cò Mồi" Cổng Bệnh Viện
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mạng lưới môi giới chui hoạt động công khai trước cổng BV Chợ Rẫy, Bạch Mai, ăn chia hoa hồng 30-50% và đưa người chăm sóc không rõ nguồn gốc.
            </p>
          </div>

          {/* Card 2 */}
          <div className="p-5 rounded-2xl bg-white border border-rose-200/80 shadow-xs hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
              <BadgeCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading mb-1.5">
              Không Bằng Cấp Tự Nhận Y Tá
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Người giúp việc gia đình học mót vài kỹ thuật đã tự nhận đặt sonde dạ dày, hút đờm, truyền dịch tại nhà gây nguy hiểm tính mạng.
            </p>
          </div>

          {/* Card 3 */}
          <div className="p-5 rounded-2xl bg-white border border-rose-200/80 shadow-xs hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-red-100 text-red-700 flex items-center justify-center mb-4">
              <HeartPulse className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading mb-1.5">
              Biến Chứng Tử Vong Tại Nhà
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Rủi ro sặc sonde dạ dày vào phổi gây viêm phổi hít tử vong, tụt huyết áp không phát hiện, và loét tỳ đè hoại tử đến tận xương do chăm sai cách.
            </p>
          </div>

          {/* Card 4 */}
          <div className="p-5 rounded-2xl bg-white border border-rose-200/80 shadow-xs hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading mb-1.5">
              Loạn Giá & Vòi Vĩnh Ban Đêm
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Không có hợp đồng pháp lý, tùy tiện tăng giá 40-60% vào ban đêm, ngày lễ hoặc bỏ rơi bệnh nhân lúc nửa đêm khi gặp ca chuyển nặng.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: MediCare Connect Solution */}
      <section className="bg-gradient-to-br from-teal-900 via-teal-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-lg border border-teal-800 space-y-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-emerald-300 bg-emerald-950 border border-emerald-700/60 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            Giải Pháp Đột Phá Khởi Nghiệp
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
            Giải Pháp MediCare Connect: Bên Thứ Ba Thẩm Định Độc Lập
          </h2>
          <p className="text-teal-100 max-w-3xl text-sm sm:text-base leading-relaxed">
            Chúng tôi xây dựng lớp bảo chứng công nghệ và y khoa khép kín giữa bệnh nhân và điều dưỡng viên có chứng chỉ hành nghề:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center font-black text-xl border border-teal-400/30">
              01
            </div>
            <h3 className="text-lg font-bold text-white font-heading">
              Thẩm Định 100% CCHN Y Khoa
            </h3>
            <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
              Tất cả điều dưỡng trên nền tảng bắt buộc có CCHN chính quy do Cục Quản lý Khám chữa bệnh - Bộ Y Tế hoặc Sở Y Tế cấp phép. Tra cứu công khai số hiệu và cơ sở cấp.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-black text-xl border border-emerald-400/30">
              02
            </div>
            <h3 className="text-lg font-bold text-white font-heading">
              Bảo Hiểm Trách Nhiệm 1 TỶ VNĐ
            </h3>
            <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
              Mỗi ca trực được bảo hiểm y khoa chuyên trách bảo trợ tới 1.000.000.000 VNĐ trước các rủi ro sự cố lâm sàng ngoài ý muốn, bảo vệ quyền lợi tối đa cho gia đình.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/10 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center font-black text-xl border border-amber-400/30">
              03
            </div>
            <h3 className="text-lg font-bold text-white font-heading">
              Giám Sát Sinh Tồn Chuẩn Bộ Y Tế
            </h3>
            <p className="text-xs sm:text-sm text-teal-100 leading-relaxed">
              Số hóa biểu mẫu theo dõi chức năng sống: Huyết áp, nhịp tim, SpO2, đường huyết, dịch vào ra; kích hoạt cảnh báo đỏ tự động và gửi tin nhắn tức thời cho thân nhân.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: 4-Step Verification Workflow */}
      <section className="space-y-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-teal-700 bg-teal-50 border border-teal-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            <Search className="w-3.5 h-3.5" />
            Tiêu Chuẩn Tuyển Chọn Khắt Khe
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
            Quy Trình Thẩm Định 4 Bước Nghiêm Ngặt
          </h2>
          <p className="text-slate-600 max-w-3xl text-sm sm:text-base">
            Chỉ 18% hồ sơ điều dưỡng ứng tuyển vượt qua toàn bộ 4 vòng sàng lọc để chính thức nhận ca trực trên MediCare Connect:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs relative">
            <span className="text-4xl font-black text-slate-200 absolute top-4 right-4">01</span>
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-3">
              <BadgeCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading mb-2">
              1. eKYC Tra Cứu Bộ Y Tế
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Đối chiếu căn cước công dân gắn chip với Cổng Thông Tin Dữ Liệu CCHN Người Hành Nghề Y Quốc Gia, ngăn chặn 100% bằng cấp giả mạo.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs relative">
            <span className="text-4xl font-black text-slate-200 absolute top-4 right-4">02</span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading mb-2">
              2. Sát Hạch Lâm Sàng Thực Tế
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Kiểm tra trực tiếp trên mô hình Simulation y khoa: Đặt sonde dạ dày/tiểu, hút đờm sâu, ép tim hồi sinh tim phổi (CPR) và xử lý sặc súc cấp cứu.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs relative">
            <span className="text-4xl font-black text-slate-200 absolute top-4 right-4">03</span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading mb-2">
              3. Thẩm Tra Lý Lịch Tư Pháp
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Bắt buộc Phiếu Lý Lịch Tư Pháp Số 2 do Sở Tư Pháp cấp, đảm bảo không có tiền án tiền sự, bảo vệ sự an toàn và tài sản gia đình người bệnh.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs relative">
            <span className="text-4xl font-black text-slate-200 absolute top-4 right-4">04</span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 font-heading mb-2">
              4. Đào Tạo Giao Tiếp 5 Sao
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Huấn luyện văn hóa ứng xử y đức, đồng cảm với bệnh nhân giai đoạn cuối, kỹ năng trấn an thân nhân và cam kết bảo mật bệnh án nghiêm ngặt.
            </p>
          </div>
        </div>
      </section>

      {/* Section 4: Founding Team */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-teal-700 bg-teal-50 border border-teal-200 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              <Users className="w-3.5 h-3.5" />
              Đội Ngũ Lãnh Đạo Dự Án
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
              Đội Ngũ Sáng Lập (Founding Team)
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Sự kết hợp giữa chuyên môn lâm sàng tuyến đầu, quản trị công nghệ HealthTech và cố vấn y khoa uy tín:
            </p>
          </div>

          <button
            onClick={onOpenPitchDeck}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition cursor-pointer self-start sm:self-auto shrink-0"
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Xem Pitch Deck Dự Án</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FOUNDING_TEAM.map((member, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="h-48 w-full overflow-hidden bg-slate-100 relative">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover object-top hover:scale-105 transition duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-bold px-2 py-0.5 rounded-md">
                    {member.role.split(' ')[0]}
                  </div>
                </div>

                <div className="p-5 space-y-2.5">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 font-heading">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-teal-700">
                      {member.role}
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                      {member.title}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2">
                    {member.bio}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-1.5">
                {member.highlights.map((item, hIdx) => (
                  <div key={hIdx} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Box */}
      <section className="bg-gradient-to-r from-teal-50 via-emerald-50 to-teal-50 border border-teal-200 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1.5 text-center md:text-left">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
            Sẵn Sàng Chọn Điều Dưỡng Thẩm Định Cho Người Thân?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
            100% điều dưỡng đều có chứng chỉ hành nghề, kinh nghiệm từ Chợ Rẫy, Bạch Mai, Từ Dũ. Đặt lịch ca trực minh bạch và an tâm tuyệt đối.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onNavigateToNurses}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-sm transition flex items-center gap-2 cursor-pointer"
          >
            <Stethoscope className="w-4 h-4" />
            <span>Xem Danh Sách Điều Dưỡng</span>
          </button>
        </div>
      </section>
    </div>
  );
};
