export type ShiftType = 'Ca 4h' | 'Ca 8h hành chính' | 'Ca đêm 12h' | 'Ca 24/24' | 'Thủ thuật lẻ';

export interface NurseReview {
  id: string;
  nurseId: string;
  reviewerName: string;
  relationToPatient: string; // 'Thân nhân bệnh nhân' | 'Bệnh nhân' | 'Người giám hộ'
  shiftType: ShiftType;
  ratingOverall: number; // 1-5
  ratingClinicalSkill: number; // 1-5 Chuyên môn tay nghề
  ratingDedication: number; // 1-5 Thái độ tận tâm
  ratingPunctuality: number; // 1-5 Tác phong đúng giờ
  comment: string;
  date: string;
  verifiedBooking: boolean;
}

export interface NurseProfile {
  id: string;
  name: string;
  avatar: string;
  title: string;
  cchnNumber: string; // Số hiệu CCHN
  licensingAuthority: string; // Cơ sở cấp (Bộ Y Tế / Sở Y Tế)
  licenseDate: string;
  education: string;
  experienceYears: number;
  priorHospitals: string[]; // Bệnh viện tuyến đầu đã công tác
  specialties: string[]; // Kỹ thuật thành thạo
  location: 'TP.HCM' | 'Hà Nội' | 'Đà Nẵng';
  district: string;
  hourlyRate4h: number;
  hourlyRate8h: number;
  hourlyRate12h: number;
  hourlyRate24h: number;
  rating: number; // Điểm trung bình (1-5)
  reviewsCount: number;
  status: 'Sẵn sàng nhận ca' | 'Đang trong ca trực';
  bio: string;
  insuranceCoverage: string; // Bảo hiểm 1 Tỷ VNĐ
  verifiedBadges: string[];
}

export interface Booking {
  id: string;
  bookingCode: string;
  nurseId: string;
  nurseName: string;
  patientName: string;
  patientAge: number;
  patientGender: 'Nam' | 'Nữ';
  diagnosis: string;
  contactName: string;
  contactPhone: string;
  address: string;
  city: string;
  shiftType: ShiftType;
  durationDays: number;
  startDate: string;
  doctorOrders: string;
  sterileKitRequired: boolean;
  estimatedCost: number;
  savingsVsMarket: number;
  status: 'Chờ điều phối' | 'Đã xác nhận' | 'Đang diễn ra' | 'Đã hoàn thành';
  createdAt: string;
}

export interface AssignedPatient {
  id: string;
  name: string;
  age: number;
  gender: 'Nam' | 'Nữ';
  diagnosis: string;
  roomOrBed: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  doctorInCharge: string;
  allergies: string;
  shiftDetails: string;
  notes: string;
}

export interface VitalsLog {
  id: string;
  patientId: string;
  patientName: string;
  nurseEmail: string;
  nurseName: string;
  timestamp: string;
  bpSystolic: number; // mmHg
  bpDiastolic: number; // mmHg
  heartRate: number; // bpm
  spo2: number; // %
  temperature: number; // °C
  bloodGlucose: number; // mg/dL
  bloodGlucoseState: 'Khi đói' | 'Sau ăn 2h' | 'Bất kỳ';
  respRate: number; // nhịp/phút
  fluidBalanceIn: number; // ml
  fluidBalanceOut: number; // ml
  woundStatus: string;
  medicationsGiven: string;
  clinicalNotes: string;
  alertLevel: 'normal' | 'warning' | 'critical';
  alertMessages: string[];
}

export interface FoundingMember {
  name: string;
  role: string;
  title: string;
  avatar: string;
  bio: string;
  highlights: string[];
}
