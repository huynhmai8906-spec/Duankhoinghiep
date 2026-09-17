import React from 'react';
import { X, Printer, ShieldCheck, Stethoscope, AlertTriangle, FileText } from 'lucide-react';
import { AssignedPatient, VitalsLog } from '../types';

interface PrintableCareSheetProps {
  isOpen: boolean;
  onClose: () => void;
  patient: AssignedPatient;
  logs: VitalsLog[];
  nurseEmail: string;
}

export const PrintableCareSheet: React.FC<PrintableCareSheetProps> = ({
  isOpen,
  onClose,
  patient,
  logs,
  nurseEmail
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const patientLogs = logs.filter(l => l.patientId === patient.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-300 overflow-hidden flex flex-col max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Toolbar (hidden in physical paper print) */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-400" />
            <h3 className="font-bold text-sm sm:text-base font-heading">
              Phiếu Theo Dõi Chức Năng Sống & Chăm Sóc Điều Dưỡng (Chuẩn Bộ Y Tế)
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 bg-teal-600 hover:bg-teal-500 text-white text-xs sm:text-sm font-bold px-3 py-1.5 rounded-lg transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>In Phiếu Y Tế</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div className="overflow-y-auto p-6 sm:p-10 text-slate-900 space-y-6 bg-white font-sans text-xs sm:text-sm">
          {/* Header standard */}
          <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <div className="text-xs uppercase font-bold text-slate-600 tracking-wider">
                NỀN TẢNG Y TẾ SỐ MEDICARE CONNECT
              </div>
              <div className="text-[11px] text-slate-500">
                Thẩm định CCHN & Bảo hiểm Trách nhiệm Nghề nghiệp 1 Tỷ VNĐ
              </div>
              <div className="text-[11px] text-slate-500">
                Hotline cấp cứu: 1900-MEDICARE
              </div>
            </div>

            <div className="text-center sm:text-right">
              <div className="text-xs font-bold uppercase text-slate-600">
                MẪU SỐ: 08/BV-ĐD
              </div>
              <div className="text-[11px] text-slate-500">
                Ban hành theo quy chuẩn quản lý lâm sàng ngoại viện
              </div>
              <div className="text-[11px] font-mono text-teal-800 font-bold">
                MÃ HỒ SƠ: {patient.id.toUpperCase()}-2026
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center space-y-1">
            <h1 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-900 font-heading">
              PHIẾU THEO DÕI CHỨC NĂNG SỐNG & CHĂM SÓC ĐIỀU DƯỠNG
            </h1>
            <p className="text-xs text-slate-500 italic">
              (Lưu trữ cùng hồ sơ bệnh án ngoại trú hoặc cung cấp cho bác sĩ điều trị)
            </p>
          </div>

          {/* Patient Info Box */}
          <div className="border border-slate-300 rounded-xl p-4 bg-slate-50/50 space-y-2 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div>Họ tên người bệnh: <strong className="text-slate-900">{patient.name}</strong></div>
              <div>Tuổi: <strong>{patient.age}</strong> • Giới tính: <strong>{patient.gender}</strong></div>
              <div>Bác sĩ phụ trách: <strong>{patient.doctorInCharge}</strong></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-slate-200/80 pt-2">
              <div>Chẩn đoán: <strong className="text-teal-900">{patient.diagnosis}</strong></div>
              <div>Dị ứng thuốc: <span className="text-rose-700 font-bold">{patient.allergies}</span></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border-t border-slate-200/80 pt-2">
              <div>Địa chỉ: <span>{patient.address}</span></div>
              <div>Liên hệ người nhà: <strong>{patient.emergencyContactName} ({patient.emergencyContactPhone})</strong></div>
            </div>
          </div>

          {/* Vitals Table */}
          <div className="space-y-2">
            <div className="font-bold text-slate-800 uppercase tracking-wider text-xs flex items-center justify-between">
              <span>BẢNG THEO DÕI CÁC CHỈ SỐ SINH TỒN TRONG CA TRỰC</span>
              <span className="text-[11px] font-normal text-slate-500">Số lần cập nhật: {patientLogs.length}</span>
            </div>

            <div className="overflow-x-auto border border-slate-300 rounded-xl">
              <table className="w-full text-center text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-300 text-slate-800 font-bold">
                    <th className="p-2 border-r border-slate-300">Thời gian</th>
                    <th className="p-2 border-r border-slate-300">Huyết áp (mmHg)</th>
                    <th className="p-2 border-r border-slate-300">Mạch (l/p)</th>
                    <th className="p-2 border-r border-slate-300">SpO2 (%)</th>
                    <th className="p-2 border-r border-slate-300">Nhiệt độ (°C)</th>
                    <th className="p-2 border-r border-slate-300">Đường huyết (mg/dL)</th>
                    <th className="p-2 border-r border-slate-300">Thở (l/p)</th>
                    <th className="p-2 border-r border-slate-300">Dịch vào/ra (ml)</th>
                    <th className="p-2">Điều dưỡng ghi nhận</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {patientLogs.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="p-4 text-slate-400 italic">
                        Chưa có dữ liệu chỉ số sinh tồn được cập nhật cho bệnh nhân này trong ca.
                      </td>
                    </tr>
                  ) : (
                    patientLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50">
                        <td className="p-2 font-mono font-medium border-r border-slate-200 whitespace-nowrap">{log.timestamp}</td>
                        <td className="p-2 font-bold border-r border-slate-200">
                          {log.bpSystolic}/{log.bpDiastolic}
                        </td>
                        <td className="p-2 border-r border-slate-200">{log.heartRate}</td>
                        <td className={`p-2 font-bold border-r border-slate-200 ${log.spo2 < 95 ? 'text-red-600 font-black' : 'text-teal-700'}`}>
                          {log.spo2}%
                        </td>
                        <td className="p-2 border-r border-slate-200">{log.temperature}°C</td>
                        <td className="p-2 border-r border-slate-200">
                          {log.bloodGlucose} <span className="text-[10px] text-slate-400">({log.bloodGlucoseState})</span>
                        </td>
                        <td className="p-2 border-r border-slate-200">{log.respRate}</td>
                        <td className="p-2 border-r border-slate-200 font-mono text-[11px]">
                          +{log.fluidBalanceIn} / -{log.fluidBalanceOut}
                        </td>
                        <td className="p-2 text-[11px] font-medium text-slate-600">
                          {log.nurseName}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Clinical observations & Wound Details */}
          <div className="space-y-3 border border-slate-200 rounded-xl p-4 bg-slate-50/30">
            <div className="font-bold text-slate-800 uppercase tracking-wider text-xs">
              Ghi Chú Diễn Biến Lâm Sàng & Vết Thương Mới Nhất:
            </div>
            {patientLogs[0] ? (
              <div className="space-y-2 text-xs">
                <div>
                  <strong>Tình trạng vết mổ / vết loét tỳ đè:</strong> {patientLogs[0].woundStatus}
                </div>
                <div>
                  <strong>Thuốc đã cho uống / thực hiện y lệnh:</strong> {patientLogs[0].medicationsGiven}
                </div>
                <div>
                  <strong>Nhận xét & dặn dò của Điều dưỡng ca trực:</strong> {patientLogs[0].clinicalNotes}
                </div>
              </div>
            ) : (
              <div className="text-xs text-slate-400 italic">
                Chưa có ghi chú lâm sàng bổ sung.
              </div>
            )}
          </div>

          {/* Signatures */}
          <div className="pt-8 grid grid-cols-2 text-center text-xs">
            <div className="space-y-16">
              <div className="font-bold text-slate-800 uppercase">
                THÂN NHÂN NGƯỜI BỆNH KÝ XÁC NHẬN
              </div>
              <div className="italic text-slate-400">
                (Ký và ghi rõ họ tên)
              </div>
            </div>

            <div className="space-y-16">
              <div>
                <div className="font-bold text-slate-800 uppercase">
                  ĐIỀU DƯỠNG VIÊN PHỤ TRÁCH CA
                </div>
                <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                  Tài khoản xác thực: {nurseEmail}
                </div>
              </div>
              <div className="italic text-slate-400">
                (Ký tên & Số hiệu CCHN)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
