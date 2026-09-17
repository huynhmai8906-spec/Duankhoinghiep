import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Stethoscope, 
  PhoneCall, 
  Mail, 
  MapPin, 
  HeartHandshake, 
  FileCheck2,
  FileText
} from 'lucide-react';

interface FooterProps {
  onOpenPitchDeck: () => void;
  setActiveTab: (tab: 'overview' | 'nurses' | 'pricing' | 'portal') => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPitchDeck,
  setActiveTab
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8 mt-16 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand info (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center text-white shadow-xs">
                <Stethoscope className="w-6 h-6" />
              </div>
              <span className="text-xl font-black text-white font-heading tracking-tight">
                MediCare<span className="text-teal-400">Connect</span>
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Nền tảng bên thứ ba độc lập kết nối người bệnh với điều dưỡng có Chứng Chỉ Hành Nghề (CCHN) do Bộ Y Tế / Sở Y Tế cấp phép. Tiên phong tích hợp bảo hiểm trách nhiệm nghề nghiệp 1 Tỷ VNĐ và giám sát lâm sàng thông minh.
            </p>

            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 space-y-1 text-xs">
              <div className="flex items-center gap-2 text-amber-300 font-bold">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Đề Án Khởi Nghiệp Đổi Mới Sáng Tạo Y Tế 2026</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Ủng hộ chuyển đổi số y tế, chuẩn hóa dịch vụ điều dưỡng tại nhà và bảo vệ an toàn tính mạng người bệnh.
              </p>
            </div>
          </div>

          {/* Quick links 4 pages */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-heading">
              4 Trang Cốt Lõi
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => setActiveTab('overview')}
                  className="hover:text-teal-300 transition text-left cursor-pointer"
                >
                  1. Giới thiệu nhóm & Đề án
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('nurses')}
                  className="hover:text-teal-300 transition text-left cursor-pointer"
                >
                  2. Danh sách điều dưỡng CCHN
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('pricing')}
                  className="hover:text-teal-300 transition text-left cursor-pointer"
                >
                  3. Bảng giá & Khảo sát 120 gia đình
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('portal')}
                  className="hover:text-teal-300 transition text-left cursor-pointer"
                >
                  4. Cổng điều dưỡng (Khóa Gmail)
                </button>
              </li>
            </ul>
          </div>

          {/* Clinical Assurance */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-heading">
              Bảo Chứng Y Khoa
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>100% CCHN Thẩm định Bộ Y Tế</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Bảo hiểm trách nhiệm 1 Tỷ VNĐ</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Sát hạch kỹ năng lâm sàng ICU</span>
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>Lý lịch tư pháp số 2 không án tích</span>
              </li>
              <li className="pt-1">
                <button
                  onClick={onOpenPitchDeck}
                  className="text-amber-300 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Xem Pitch Deck (TAM 2.4 Tỷ $)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-heading">
              Liên Hệ & Hỗ Trợ 24/7
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <PhoneCall className="w-3.5 h-3.5 text-teal-400" />
                <span className="text-white font-bold">1900-MEDICARE</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-teal-400" />
                <span>lienhe@medicareconnect.vn</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0 mt-0.5" />
                <span>Trung tâm Ươm tạo ĐMST Y Tế, Quận 5, TP. Hồ Chí Minh</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>
            © 2026 MediCare Connect. Dự án khởi nghiệp tham gia Cuộc thi Đổi mới Sáng tạo Y tế Quốc Gia.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Tuân thủ Luật Khám bệnh, chữa bệnh 2023</span>
            <span>•</span>
            <span>Bảo vệ quyền lợi bệnh nhân</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
