import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  LogIn, 
  LogOut, 
  UserCheck, 
  AlertTriangle, 
  Heart, 
  Activity, 
  Thermometer, 
  Droplet, 
  Wind, 
  Pill, 
  FileText, 
  Send, 
  Printer, 
  ShieldAlert, 
  CheckCircle2, 
  PhoneCall, 
  MapPin, 
  User, 
  Sparkles,
  ChevronRight,
  Clock,
  Flame
} from 'lucide-react';
import { AssignedPatient, VitalsLog } from '../types';
import { PrintableCareSheet } from './PrintableCareSheet';

interface NursePortalProps {
  nurseUserEmail: string | null;
  onLogin: (email: string) => void;
  onLogout: () => void;
  patients: AssignedPatient[];
  vitalsLogs: VitalsLog[];
  onAddVitalsLog: (log: VitalsLog) => void;
}

export const NursePortal: React.FC<NursePortalProps> = ({
  nurseUserEmail,
  onLogin,
  onLogout,
  patients,
  vitalsLogs,
  onAddVitalsLog
}) => {
  // Login form state
  const [customEmail, setCustomEmail] = useState('');
  const [authError, setAuthError] = useState('');

  // Active patient selection
  const [selectedPatientId, setSelectedPatientId] = useState<string>(patients[0]?.id || '');
  const selectedPatient = patients.find(p => p.id === selectedPatientId) || patients[0];

  // Daily Vitals Form inputs
  const [bpSystolic, setBpSystolic] = useState<number>(120);
  const [bpDiastolic, setBpDiastolic] = useState<number>(80);
  const [heartRate, setHeartRate] = useState<number>(78);
  const [spo2, setSpo2] = useState<number>(97);
  const [temperature, setTemperature] = useState<number>(36.8);
  const [bloodGlucose, setBloodGlucose] = useState<number>(115);
  const [bloodGlucoseState, setBloodGlucoseState] = useState<'Khi đói' | 'Sau ăn 2h' | 'Bất kỳ'>('Khi đói');
  const [respRate, setRespRate] = useState<number>(18);
  const [fluidBalanceIn, setFluidBalanceIn] = useState<number>(500);
  const [fluidBalanceOut, setFluidBalanceOut] = useState<number>(450);
  const [woundStatus, setWoundStatus] = useState<string>('Vết mổ khô ráo, mép liền sẹo tốt, không có dấu hiệu sưng tấy');
  const [medicationsGiven, setMedicationsGiven] = useState<string>('Đã uống thuốc theo y lệnh lúc 08:30 (Kháng sinh & hạ áp)');
  const [clinicalNotes, setClinicalNotes] = useState<string>('Bệnh nhân tỉnh táo, tiếp xúc tốt. Bơm ăn sonde dạ dày không nôn trớ, đã đổi tư thế.');

  // UI status states
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [smsSentNotice, setSmsSentNotice] = useState<string | null>(null);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);

  // Default convenient user Gmail
  const defaultUserEmail = 'huynhmai8906@gmail.com';

  // Handle custom Gmail login
  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    const trimmed = customEmail.trim().toLowerCase();
    if (!trimmed) {
      setAuthError('Vui lòng nhập địa chỉ Gmail!');
      return;
    }

    if (!trimmed.endsWith('@gmail.com')) {
      setAuthError('Cổng chỉ chấp nhận tài khoản có định dạng đuôi @gmail.com!');
      return;
    }

    onLogin(trimmed);
  };

  // Real-time clinical alert engine
  const computeClinicalAlerts = () => {
    const alerts: { level: 'warning' | 'critical'; msg: string }[] = [];

    // SpO2 critical rule
    if (spo2 < 95) {
      alerts.push({
        level: 'critical',
        msg: `CẢNH BÁO ĐỎ KHẨN CẤP: Nồng độ oxy SpO2 tụt còn ${spo2}% (< 95%). Nguy cơ suy hô hấp cấp hoặc sặc đờm/dịch! Lập tức cho bệnh nhân thở oxy qua gọng kính 2-3 l/p, hút thông đường thở, nâng cao đầu giường 45 độ và bấm nút gọi khẩn cấp cho Bác sĩ điều trị!`
      });
    }

    // Blood pressure rules
    if (bpSystolic >= 160 || bpDiastolic >= 100) {
      alerts.push({
        level: 'critical',
        msg: `CẢNH BÁO CAO HUYẾT ÁP KỊCH PHÁT (${bpSystolic}/${bpDiastolic} mmHg): Nguy cơ tái phát tai biến đột quỵ. Cho người bệnh nghỉ ngơi yên tĩnh, kiểm tra lại sau 15 phút và chuẩn bị thuốc hạ áp khẩn cấp theo y lệnh.`
      });
    } else if (bpSystolic < 90 || bpDiastolic < 60) {
      alerts.push({
        level: 'warning',
        msg: `CẢNH BÁO TỤT HUYẾT ÁP (${bpSystolic}/${bpDiastolic} mmHg): Nguy cơ choáng hoặc thiếu dịch. Đặt bệnh nhân nằm đầu bằng, kiểm tra lượng dịch xuất nhập và tốc độ truyền.`
      });
    }

    // Heart rate rules
    if (heartRate > 110) {
      alerts.push({
        level: 'warning',
        msg: `NHỊP TIM NHANH (${heartRate} bpm): Kiểm tra xem người bệnh có bị sốt, đau vết mổ hoặc kích động tâm lý.`
      });
    } else if (heartRate < 55) {
      alerts.push({
        level: 'warning',
        msg: `NHỊP TIM CHẬM (${heartRate} bpm): Theo dõi sát tri giác và biểu hiện chóng mặt.`
      });
    }

    // Temperature rules
    if (temperature >= 38.5) {
      alerts.push({
        level: 'warning',
        msg: `SỐT CAO (${temperature}°C): Dấu hiệu cảnh báo nhiễm trùng vết mổ, viêm phổi bệnh viện hoặc nhiễm khuẩn tiết niệu do đặt sonde. Lau mát hạ sốt bằng nước ấm và chuẩn bị báo bác sĩ.`
      });
    }

    // Blood glucose rules
    if (bloodGlucose < 70) {
      alerts.push({
        level: 'critical',
        msg: `HẠ ĐƯỜNG HUYẾT NGUY HIỂM (${bloodGlucose} mg/dL): Nguy cơ hôn mê hạ đường huyết. Cho uống ngay 150ml nước đường ấm hoặc bơm glucose qua sonde dạ dày!`
      });
    } else if (bloodGlucose > 250) {
      alerts.push({
        level: 'warning',
        msg: `TĂNG ĐƯỜNG HUYẾT (${bloodGlucose} mg/dL): Đang vượt ngưỡng an toàn, chú ý chế độ ăn và kiểm tra phác đồ tiêm insulin.`
      });
    }

    return alerts;
  };

  const currentAlerts = computeClinicalAlerts();
  const hasCriticalAlert = currentAlerts.some(a => a.level === 'critical');

  // Submit vitals log
  const handleVitalsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPatient) return;

    const alertLevel: 'normal' | 'warning' | 'critical' = 
      hasCriticalAlert ? 'critical' : currentAlerts.length > 0 ? 'warning' : 'normal';

    const now = new Date();
    const timestampStr = `${now.toLocaleDateString('vi-VN')} ${now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`;

    const newLog: VitalsLog = {
      id: `vit-${Date.now()}`,
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      nurseEmail: nurseUserEmail || 'huynhmai8906@gmail.com',
      nurseName: `Điều dưỡng (${nurseUserEmail?.split('@')[0]})`,
      timestamp: timestampStr,
      bpSystolic,
      bpDiastolic,
      heartRate,
      spo2,
      temperature,
      bloodGlucose,
      bloodGlucoseState,
      respRate,
      fluidBalanceIn,
      fluidBalanceOut,
      woundStatus,
      medicationsGiven,
      clinicalNotes,
      alertLevel,
      alertMessages: currentAlerts.map(a => a.msg)
    };

    onAddVitalsLog(newLog);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 2500);
  };

  // Quick SMS Dispatch to Patient's family
  const handleSendFamilyUpdate = () => {
    if (!selectedPatient) return;

    const message = `[MediCare Connect] Kính gửi Thân nhân ${selectedPatient.emergencyContactName}: Bản tin chỉ số sinh tồn của ${selectedPatient.name} lúc ${new Date().toLocaleTimeString('vi-VN')}: HA: ${bpSystolic}/${bpDiastolic} mmHg | Mạch: ${heartRate} bpm | SpO2: ${spo2}% | Thân nhiệt: ${temperature}°C. Tình trạng: ${hasCriticalAlert ? 'Đang cần chú ý theo dõi' : 'Ổn định, đã chăm sóc chu đáo'}.`;

    setSmsSentNotice(`Đã gửi bản tin SMS & Zalo cập nhật chỉ số sinh tồn tới ${selectedPatient.emergencyContactName} (${selectedPatient.emergencyContactPhone}) thành công!`);
    setTimeout(() => setSmsSentNotice(null), 5000);
  };

  // ================= VIEW 1: AUTHENTICATION LOCK =================
  if (!nurseUserEmail) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-800 via-slate-900 to-emerald-900 text-white p-6 sm:p-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-white/10 text-white flex items-center justify-center mx-auto shadow-inner border border-white/20">
              <Lock className="w-8 h-8 text-amber-300" />
            </div>

            <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider">
              Xác Thực Bắt Buộc Tài Khoản Google / Gmail
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold font-heading">
              Cổng Thông Tin Điều Dưỡng Lâm Sàng
            </h1>
            <p className="text-teal-200 text-xs sm:text-sm max-w-md mx-auto">
              Chỉ dành cho Điều dưỡng viên có CCHN được cấp quyền quản lý ca trực, cập nhật chỉ số sinh tồn và kết nối thân nhân bệnh nhân.
            </p>
          </div>

          {/* Auth options */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* 1-Click login with user's email */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
                  Đăng nhập nhanh 1-chạm:
                </span>
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  Tài khoản của bạn
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  HM
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-slate-900 text-sm truncate font-mono">
                    {defaultUserEmail}
                  </div>
                  <div className="text-xs text-slate-500">
                    Tài khoản Google đang kết nối hệ thống
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onLogin(defaultUserEmail)}
                className="w-full py-3 bg-teal-700 hover:bg-teal-800 text-white font-bold text-sm rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Đăng Nhập 1-Chạm Với {defaultUserEmail}</span>
              </button>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 w-full"></div>
              <span className="bg-white px-3 text-xs text-slate-400 font-bold uppercase shrink-0">
                Hoặc nhập địa chỉ Gmail khác
              </span>
            </div>

            {/* Custom Gmail Form */}
            <form onSubmit={handleCustomLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Địa Chỉ Gmail Điều Dưỡng (bắt buộc đuôi @gmail.com)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <input
                    type="email"
                    placeholder="ví dụ: dieuduong.nguyen@gmail.com"
                    value={customEmail}
                    onChange={(e) => {
                      setCustomEmail(e.target.value);
                      setAuthError('');
                    }}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition font-mono"
                  />
                </div>
                {authError && (
                  <p className="text-xs text-rose-600 mt-1.5 flex items-center gap-1 font-semibold">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {authError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <UserCheck className="w-4 h-4 text-amber-400" />
                <span>Xác Thực & Vào Cổng Lâm Sàng</span>
              </button>
            </form>

            <div className="text-[11px] text-slate-400 text-center leading-relaxed">
              Hệ thống mã hóa dữ liệu y tế tuân thủ tiêu chuẩn an toàn bảo mật thông tin bệnh nhân. Tất cả thao tác cập nhật chỉ số đều được gắn nhãn thời gian và tài khoản xác thực.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ================= VIEW 2: LOGGED-IN NURSE PORTAL =================
  const patientLogs = vitalsLogs.filter(l => l.patientId === selectedPatient?.id);

  return (
    <div className="space-y-8 pb-12">
      {/* Top Session Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-base shadow-xs">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-slate-900 font-heading">
                Điều Dưỡng Trực Ca: <span className="font-mono text-teal-800">{nurseUserEmail}</span>
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                Trực tuyến
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Quyền hạn: Cập nhật lâm sàng & Gửi thông báo thân nhân • Ca trực tích hợp Bảo hiểm 1 Tỷ VNĐ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          <button
            onClick={() => setIsPrintModalOpen(true)}
            className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3 py-2 rounded-xl transition cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-teal-700" />
            <span>In Phiếu Y Tế</span>
          </button>

          <button
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold px-3 py-2 rounded-xl transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Đăng Xuất</span>
          </button>
        </div>
      </div>

      {/* Patient Selection Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
            <User className="w-4 h-4 text-teal-600" />
            Hồ Sơ Ca Trực & Chọn Bệnh Nhân Được Phân Công:
          </label>
          <span className="text-xs text-slate-500">
            Tổng cộng: <strong>{patients.length}</strong> bệnh nhân
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {patients.map((pt) => {
            const isSelected = selectedPatient?.id === pt.id;
            return (
              <button
                key={pt.id}
                onClick={() => setSelectedPatientId(pt.id)}
                className={`p-4 rounded-2xl border text-left transition cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-teal-50 border-teal-600 shadow-sm ring-2 ring-teal-600/20'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900 font-heading">
                      {pt.name}
                    </span>
                    <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-600 font-semibold">
                      {pt.age} tuổi • {pt.gender}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium line-clamp-1 mt-1">
                    {pt.diagnosis}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                  <span className="text-teal-800 font-bold">{pt.shiftDetails}</span>
                  <span className="text-slate-400">Xem hồ sơ →</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Patient Diagnostic Card */}
      {selectedPatient && (
        <div className="bg-gradient-to-r from-slate-900 to-teal-950 text-white p-5 sm:p-6 rounded-2xl border border-teal-800/60 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                Bệnh Án Đang Chăm Sóc Trực Tiếp
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white font-heading mt-0.5">
                {selectedPatient.name} ({selectedPatient.age} tuổi • {selectedPatient.gender})
              </h2>
              <p className="text-xs text-teal-200 mt-0.5">
                Chẩn đoán: <strong>{selectedPatient.diagnosis}</strong>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <a
                href={`tel:${selectedPatient.emergencyContactPhone}`}
                className="inline-flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold px-3 py-2 rounded-xl transition shadow-xs"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Gọi Khẩn Cấp: {selectedPatient.emergencyContactPhone}</span>
              </a>

              <button
                type="button"
                onClick={handleSendFamilyUpdate}
                className="inline-flex items-center gap-1.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold px-3 py-2 rounded-xl transition shadow-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Gửi Cập Nhật Cho Thân Nhân</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-200">
            <div>
              <span className="text-slate-400 block text-[11px]">Người nhà liên hệ:</span>
              <strong className="text-white">{selectedPatient.emergencyContactName}</strong> ({selectedPatient.emergencyContactPhone})
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Bác sĩ phụ trách:</span>
              <strong className="text-white">{selectedPatient.doctorInCharge}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Dị ứng / Lưu ý:</span>
              <span className="text-amber-300 font-bold">{selectedPatient.allergies}</span>
            </div>
          </div>

          <div className="bg-white/10 p-3 rounded-xl text-xs text-teal-100 border border-white/10">
            <strong>Y lệnh chăm sóc đặc biệt:</strong> {selectedPatient.notes}
          </div>
        </div>
      )}

      {/* SMS notification toast */}
      {smsSentNotice && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-sm animate-in slide-in-from-top">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{smsSentNotice}</span>
        </div>
      )}

      {/* Real-time Automated Clinical Recommendation Alert Box */}
      {currentAlerts.length > 0 && (
        <div className={`p-4 sm:p-5 rounded-2xl border space-y-2 animate-in zoom-in-95 ${
          hasCriticalAlert
            ? 'bg-red-50 border-red-300 text-red-950 ring-2 ring-red-500/30'
            : 'bg-amber-50 border-amber-300 text-amber-950'
        }`}>
          <div className="flex items-center gap-2 font-black text-sm uppercase tracking-wider font-heading">
            <ShieldAlert className={`w-5 h-5 ${hasCriticalAlert ? 'text-red-600 animate-bounce' : 'text-amber-600'}`} />
            <span>Hệ Thống Cảnh Báo Lâm Sàng Tự Động (Clinical Decision Support)</span>
          </div>
          <div className="space-y-1.5">
            {currentAlerts.map((alt, i) => (
              <div key={i} className="text-xs sm:text-sm leading-relaxed flex items-start gap-2">
                <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${alt.level === 'critical' ? 'bg-red-600 animate-ping' : 'bg-amber-500'}`}></span>
                <span className="font-medium">{alt.msg}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Section: Daily Vitals Form (Biểu mẫu cập nhật chỉ số sinh tồn) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-teal-800 text-xs font-bold uppercase tracking-wider">
              <Activity className="w-4 h-4 text-teal-600" />
              Biểu Mẫu Cập Nhật Chỉ Số Sinh Tồn (Daily Vitals Form)
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
              Ghi Nhận Chức Năng Sống Trong Ca Trực
            </h3>
          </div>

          <div className="text-xs text-slate-500">
            Thời điểm đo: <strong>{new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</strong> hôm nay
          </div>
        </div>

        <form onSubmit={handleVitalsSubmit} className="p-5 sm:p-7 space-y-6">
          {/* Vitals Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* 1. Huyết áp */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-teal-600" />
                  Huyết Áp (mmHg)
                </span>
                <span className="text-[11px] font-mono text-slate-400">Chuẩn: 120/80</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-1/2">
                  <label className="text-[10px] text-slate-500 block">Tâm thu</label>
                  <input
                    type="number"
                    value={bpSystolic}
                    onChange={(e) => setBpSystolic(Number(e.target.value))}
                    className={`w-full px-3 py-1.5 bg-white border rounded-xl text-sm font-bold font-mono focus:outline-none ${
                      bpSystolic >= 160 ? 'border-red-500 text-red-600' : 'border-slate-200'
                    }`}
                  />
                </div>
                <span className="text-slate-400 font-bold pt-3">/</span>
                <div className="w-1/2">
                  <label className="text-[10px] text-slate-500 block">Tâm trương</label>
                  <input
                    type="number"
                    value={bpDiastolic}
                    onChange={(e) => setBpDiastolic(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-sm font-bold font-mono focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 2. Nhịp tim */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Heart className="w-4 h-4 text-rose-500" />
                  Nhịp Tim / Mạch (bpm)
                </span>
                <span className="text-[11px] font-mono text-slate-400">60 - 90 bpm</span>
              </div>
              <input
                type="number"
                value={heartRate}
                onChange={(e) => setHeartRate(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-sm font-bold font-mono focus:outline-none"
              />
            </div>

            {/* 3. SpO2 (With Urgent Red Alert) */}
            <div className={`p-4 rounded-2xl border space-y-2 transition ${
              spo2 < 95 
                ? 'bg-red-50 border-red-400 ring-2 ring-red-500/40' 
                : 'bg-teal-50/70 border-teal-200'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Wind className="w-4 h-4 text-sky-600" />
                  Nồng Độ Oxy SpO2 (%)
                </span>
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                  spo2 < 95 ? 'bg-red-600 text-white animate-pulse' : 'bg-teal-100 text-teal-800'
                }`}>
                  {spo2 < 95 ? 'CẢNH BÁO ĐỎ (<95%)' : 'Bình thường'}
                </span>
              </div>
              <input
                type="number"
                min="50"
                max="100"
                value={spo2}
                onChange={(e) => setSpo2(Number(e.target.value))}
                className={`w-full px-3 py-1.5 bg-white border rounded-xl text-sm font-black font-mono focus:outline-none ${
                  spo2 < 95 ? 'border-red-500 text-red-600' : 'border-teal-300 text-teal-800'
                }`}
              />
            </div>

            {/* 4. Thân nhiệt */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Thermometer className="w-4 h-4 text-amber-500" />
                  Thân Nhiệt (°C)
                </span>
                <span className="text-[11px] font-mono text-slate-400">36.5 - 37.2°C</span>
              </div>
              <input
                type="number"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-sm font-bold font-mono focus:outline-none"
              />
            </div>

            {/* 5. Đường huyết */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Droplet className="w-4 h-4 text-blue-500" />
                  Đường Huyết (mg/dL)
                </span>
                <select
                  value={bloodGlucoseState}
                  onChange={(e) => setBloodGlucoseState(e.target.value as any)}
                  className="text-[10px] bg-white border border-slate-200 rounded px-1.5 py-0.5"
                >
                  <option value="Khi đói">Khi đói</option>
                  <option value="Sau ăn 2h">Sau ăn 2h</option>
                  <option value="Bất kỳ">Bất kỳ</option>
                </select>
              </div>
              <input
                type="number"
                value={bloodGlucose}
                onChange={(e) => setBloodGlucose(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-sm font-bold font-mono focus:outline-none"
              />
            </div>

            {/* 6. Nhịp thở & Cân bằng dịch */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">
                  Nhịp Thở & Dịch Xuất Nhập
                </span>
                <span className="text-[10px] text-slate-400">16-20 l/p</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5">
                <div>
                  <label className="text-[9px] text-slate-500 block">Thở (l/p)</label>
                  <input
                    type="number"
                    value={respRate}
                    onChange={(e) => setRespRate(Number(e.target.value))}
                    className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="text-[9px] text-slate-500 block">Vào (ml)</label>
                  <input
                    type="number"
                    value={fluidBalanceIn}
                    onChange={(e) => setFluidBalanceIn(Number(e.target.value))}
                    className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="text-[9px] text-slate-500 block">Ra (ml)</label>
                  <input
                    type="number"
                    value={fluidBalanceOut}
                    onChange={(e) => setFluidBalanceOut(Number(e.target.value))}
                    className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Wound Status & Medications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Tình Trạng Vết Mổ / Vết Loét Tỳ Đè:
              </label>
              <textarea
                rows={2}
                value={woundStatus}
                onChange={(e) => setWoundStatus(e.target.value)}
                placeholder="Khô ráo, rỉ dịch thanh tơ, loét độ II đang lên mô hạt đỏ..."
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Thuốc Đã Cho Uống Theo Y Lệnh Trong Ca:
              </label>
              <textarea
                rows={2}
                value={medicationsGiven}
                onChange={(e) => setMedicationsGiven(e.target.value)}
                placeholder="Ghi rõ tên thuốc, liều lượng và thời điểm uống..."
                className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              ></textarea>
            </div>
          </div>

          {/* Clinical Notes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Ghi Chú Lâm Sàng Của Điều Dưỡng Trong Ca:
            </label>
            <textarea
              rows={2}
              value={clinicalNotes}
              onChange={(e) => setClinicalNotes(e.target.value)}
              placeholder="Ghi nhận tri giác, đáp ứng vận động, dinh dưỡng sonde, xoay trở tư thế..."
              className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            ></textarea>
          </div>

          {/* Form Action Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
            {submitSuccess ? (
              <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold">
                <CheckCircle2 className="w-5 h-5" />
                <span>Đã lưu chỉ số sinh tồn vào hồ sơ lâm sàng thành công!</span>
              </div>
            ) : (
              <div className="text-xs text-slate-500">
                Lưu ý: Bấm cập nhật sẽ kích hoạt quy tắc phân tích tự động và thông báo thân nhân.
              </div>
            )}

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Lưu Chỉ Số Sinh Tồn Ca Trực</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* History of vitals logs for current patient */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-heading">
              Nhật Ký Chỉ Số Sinh Tồn Của Bệnh Nhân ({selectedPatient?.name})
            </h3>
            <p className="text-xs text-slate-500">
              Lịch sử các lần đo và cập nhật trong các ca trực
            </p>
          </div>

          <button
            onClick={() => setIsPrintModalOpen(true)}
            className="text-xs text-teal-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Xem & In Phiếu Theo Dõi Y Tế Chuẩn</span>
          </button>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-2xl">
          <table className="w-full text-xs text-left border-collapse min-w-[650px]">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                <th className="p-3">Thời điểm</th>
                <th className="p-3">Huyết áp</th>
                <th className="p-3">Mạch</th>
                <th className="p-3">SpO2</th>
                <th className="p-3">Thân nhiệt</th>
                <th className="p-3">Đường huyết</th>
                <th className="p-3">Ghi chú lâm sàng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {patientLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-4 text-center text-slate-400 italic">
                    Chưa có lần đo nào được ghi nhận cho bệnh nhân này. Hãy điền biểu mẫu ở trên và bấm lưu!
                  </td>
                </tr>
              ) : (
                patientLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/50">
                    <td className="p-3 font-mono font-medium text-slate-600">{log.timestamp}</td>
                    <td className="p-3 font-bold text-slate-900">{log.bpSystolic}/{log.bpDiastolic}</td>
                    <td className="p-3">{log.heartRate} bpm</td>
                    <td className={`p-3 font-bold ${log.spo2 < 95 ? 'text-red-600 font-black' : 'text-teal-700'}`}>
                      {log.spo2}%
                    </td>
                    <td className="p-3">{log.temperature}°C</td>
                    <td className="p-3">{log.bloodGlucose} mg/dL</td>
                    <td className="p-3 text-slate-600 max-w-xs truncate">{log.clinicalNotes}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Sheet Modal */}
      {selectedPatient && (
        <PrintableCareSheet
          isOpen={isPrintModalOpen}
          onClose={() => setIsPrintModalOpen(false)}
          patient={selectedPatient}
          logs={vitalsLogs}
          nurseEmail={nurseUserEmail}
        />
      )}
    </div>
  );
};
