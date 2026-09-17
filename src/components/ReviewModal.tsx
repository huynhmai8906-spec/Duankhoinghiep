import React, { useState } from 'react';
import { 
  X, 
  Star, 
  MessageSquare, 
  UserCheck, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles,
  Award,
  Heart,
  Clock
} from 'lucide-react';
import { NurseProfile, NurseReview, ShiftType } from '../types';

interface ReviewModalProps {
  nurse: NurseProfile | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (review: NurseReview) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  nurse,
  isOpen,
  onClose,
  onSubmitReview
}) => {
  if (!isOpen || !nurse) return null;

  const [ratingOverall, setRatingOverall] = useState<number>(5);
  const [ratingClinicalSkill, setRatingClinicalSkill] = useState<number>(5);
  const [ratingDedication, setRatingDedication] = useState<number>(5);
  const [ratingPunctuality, setRatingPunctuality] = useState<number>(5);
  const [shiftType, setShiftType] = useState<ShiftType>('Ca 8h hành chính');
  const [reviewerName, setReviewerName] = useState<string>('');
  const [relationToPatient, setRelationToPatient] = useState<string>('Thân nhân bệnh nhân');
  const [comment, setComment] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert('Vui lòng chia sẻ đôi lời cảm nhận về ca trực của điều dưỡng!');
      return;
    }

    const newReview: NurseReview = {
      id: `rev-${Date.now()}`,
      nurseId: nurse.id,
      reviewerName: reviewerName.trim() || 'Thân nhân người bệnh',
      relationToPatient,
      shiftType,
      ratingOverall,
      ratingClinicalSkill,
      ratingDedication,
      ratingPunctuality,
      comment: comment.trim(),
      date: new Date().toLocaleDateString('vi-VN'),
      verifiedBooking: true
    };

    onSubmitReview(newReview);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  // Helper star rating selector
  const renderStarInput = (
    label: string, 
    value: number, 
    onChange: (val: number) => void, 
    icon: React.ReactNode,
    description: string
  ) => {
    return (
      <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {icon}
            <div>
              <div className="text-xs font-bold text-slate-800">{label}</div>
              <div className="text-[11px] text-slate-500">{description}</div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                type="button"
                key={star}
                onClick={() => onChange(star)}
                className="p-1 text-slate-300 hover:text-amber-400 focus:outline-none transition cursor-pointer"
              >
                <Star
                  className={`w-5 h-5 ${
                    star <= value
                      ? 'text-amber-400 fill-amber-400 drop-shadow-xs'
                      : 'text-slate-300'
                  }`}
                />
              </button>
            ))}
            <span className="text-xs font-extrabold text-amber-800 ml-1.5 w-6 text-right">
              {value}.0
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-600 via-teal-700 to-emerald-800 text-white p-5 sm:p-6 relative flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-200 text-xs px-2.5 py-0.5 rounded-full font-bold mb-2">
              <Award className="w-3.5 h-3.5" />
              Đánh Giá Minh Bạch 100% Sau Ca Trực
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading">
              Đánh Giá Ca Trực: {nurse.name}
            </h2>
            <p className="text-xs text-amber-100 mt-0.5">
              Số CCHN: <span className="font-mono">{nurse.cchnNumber}</span> • {nurse.education}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            aria-label="Đóng form đánh giá"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="overflow-y-auto p-5 sm:p-7">
          {isSuccess ? (
            <div className="py-10 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">
                Cảm Ơn Đánh Giá Quý Báu Của Bạn!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                Điểm số trung bình và nhận xét đã được cập nhật trực tiếp vào hồ sơ điều dưỡng <strong>{nurse.name}</strong> và lưu trữ bền vững.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Overall Star Rating */}
              <div className="text-center p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                  Chấm Điểm Sao Tổng Thể Ca Trực
                </span>
                <div className="flex items-center justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRatingOverall(star)}
                      className="p-1 text-slate-300 hover:text-amber-400 focus:outline-none transition cursor-pointer"
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= ratingOverall
                            ? 'text-amber-400 fill-amber-400 scale-110 drop-shadow-sm'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                <div className="text-sm font-black text-amber-900 font-heading">
                  {ratingOverall === 5 && 'Tuyệt vời — Chuyên môn & Y đức chuẩn 5 sao'}
                  {ratingOverall === 4 && 'Rất tốt — Hài lòng với chất lượng ca trực'}
                  {ratingOverall === 3 && 'Bình thường — Đáp ứng yêu cầu cơ bản'}
                  {ratingOverall === 2 && 'Chưa hài lòng — Cần cải thiện kỹ năng'}
                  {ratingOverall === 1 && 'Kém — Không đạt yêu cầu chuyên môn'}
                </div>
              </div>

              {/* 3 Sub-criteria Required by prompt */}
              <div className="space-y-2.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  3 Tiêu Chí Đánh Giá Chi Tiết
                </label>
                
                {renderStarInput(
                  '1. Chuyên Môn Tay Nghề',
                  ratingClinicalSkill,
                  setRatingClinicalSkill,
                  <Award className="w-4 h-4 text-teal-600" />,
                  'Thao tác vô trùng, đặt sonde, xử lý vết loét, cấp cứu nhẹ nhàng'
                )}

                {renderStarInput(
                  '2. Thái Độ Tận Tâm',
                  ratingDedication,
                  setRatingDedication,
                  <Heart className="w-4 h-4 text-rose-500" />,
                  'Ân cần với người bệnh, kiên nhẫn, động viên tinh thần gia đình'
                )}

                {renderStarInput(
                  '3. Tác Phong Đúng Giờ',
                  ratingPunctuality,
                  setRatingPunctuality,
                  <Clock className="w-4 h-4 text-blue-600" />,
                  'Đến đúng giờ hẹn, túc trực tập trung, không dùng điện thoại làm việc riêng'
                )}
              </div>

              {/* Shift and Reviewer details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Loại Ca Vừa Kết Thúc *
                  </label>
                  <select
                    value={shiftType}
                    onChange={(e) => setShiftType(e.target.value as ShiftType)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                  >
                    <option value="Ca 4h">Ca 4 Giờ</option>
                    <option value="Ca 8h hành chính">Ca 8 Giờ hành chính</option>
                    <option value="Ca đêm 12h">Ca đêm 12 Giờ</option>
                    <option value="Ca 24/24">Ca Toàn diện 24/24</option>
                    <option value="Thủ thuật lẻ">Thủ thuật lẻ</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mối Quan Hệ Với Người Bệnh
                  </label>
                  <select
                    value={relationToPatient}
                    onChange={(e) => setRelationToPatient(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white"
                  >
                    <option value="Thân nhân bệnh nhân">Thân nhân bệnh nhân (Con/Vợ/Chồng)</option>
                    <option value="Người bệnh trực tiếp">Bệnh nhân trực tiếp</option>
                    <option value="Người giám hộ hợp pháp">Người giám hộ hợp pháp</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Họ Tên Của Bạn (hoặc để trống để hiển thị ẩn danh)
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Bác sĩ Trần Hùng, Chị Mai Anh..."
                  value={reviewerName}
                  onChange={(e) => setReviewerName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Written comment */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nhận Xét Chi Tiết Của Bạn Về Ca Trực *
                </label>
                <textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Mô tả kỹ năng chăm sóc, thao tác vết mổ, tác phong điều dưỡng để cộng đồng người bệnh tham khảo..."
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                ></textarea>
              </div>

              {/* Footer buttons */}
              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 rounded-xl transition cursor-pointer"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-600 to-teal-700 hover:from-amber-700 hover:to-teal-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition flex items-center gap-2 cursor-pointer"
                >
                  <Star className="w-4 h-4 fill-white" />
                  <span>Gửi Đánh Giá Sau Ca</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
