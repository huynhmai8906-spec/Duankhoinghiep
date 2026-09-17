import { NurseProfile, NurseReview, AssignedPatient, VitalsLog, FoundingMember } from '../types';

export const FOUNDING_TEAM: FoundingMember[] = [
  {
    name: 'BS. ThS. Nguyễn Hoàng Long',
    role: 'Chief Executive Officer (CEO)',
    title: 'Thạc sĩ Y khoa - Bác sĩ Tim mạch lâm sàng',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400',
    bio: '11 năm kinh nghiệm công tác tại bệnh viện đa khoa hạng đặc biệt, Thạc sĩ Y học lâm sàng ĐH Y Hà Nội, cựu Quản lý vận hành dự án Đổi mới sáng tạo Y tế Số.',
    highlights: ['Thạc sĩ ĐH Y Hà Nội', '11 năm kinh nghiệm quản trị lâm sàng', 'Huy chương ĐMST Y tế Trẻ 2024']
  },
  {
    name: 'ĐD CKI. Trần Mai Chi',
    role: 'Chief Nursing Officer (CNO)',
    title: 'Chuyên khoa I Điều dưỡng - 14 năm Hồi sức Cấp cứu',
    avatar: 'https://images.unsplash.com/photo-1594824813583-0570b5c1fb98?auto=format&fit=crop&q=80&w=400',
    bio: '14 năm kinh nghiệm công tác liên tục tại Khoa Hồi sức Cấp cứu (ICU) Bệnh viện Chợ Rẫy. Giảng viên thỉnh giảng kỹ năng lâm sàng nâng cao và chuyên gia kiểm soát nhiễm khuẩn.',
    highlights: ['14 năm ICU BV Chợ Rẫy', 'Chuyên khoa I ĐH Y Dược TP.HCM', 'Chứng chỉ Chăm sóc Hậu phẫu Quốc tế']
  },
  {
    name: 'Kỹ sư Lê Quang Minh',
    role: 'Chief Technology Officer (CTO)',
    title: 'Kỹ sư Trưởng Nền tảng Y Tế & HealthTech IoT',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    bio: 'Cựu Kỹ sư Giải pháp cấp cao tại các tập đoàn công nghệ y tế, 9 năm chuyên sâu kiến trúc phân tán, tích hợp chuẩn dữ liệu HL7/FHIR và bảo mật y tế điện tử eKYC.',
    highlights: ['Kỹ sư ĐH Bách Khoa TP.HCM', '9 năm Tech Lead HealthTech', 'Chuyên gia bảo mật chuẩn HIPAA/eKYC']
  },
  {
    name: 'PGS. TS. BS. Phạm Đức Dũng',
    role: 'Cố vấn Trưởng Chiến lược Y khoa',
    title: 'Phó Giáo sư, Tiến sĩ Y học - Nguyên Trưởng khoa HSTC',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400',
    bio: 'Hơn 32 năm giảng dạy và công tác lâm sàng, nguyên Trưởng khoa Hồi sức tích cực, thành viên Hội đồng Thẩm định Quy chuẩn Kỹ thuật Chăm sóc Bệnh nhân nặng Bộ Y Tế.',
    highlights: ['32 năm cống hiến ngành Y', 'Ủy viên Hội đồng Chuyên môn Y Dược', 'Tác giả 4 đầu sách Hồi sức lâm sàng']
  }
];

export const INITIAL_NURSES: NurseProfile[] = [
  {
    id: 'nurse-01',
    name: 'ĐD. Nguyễn Phương Thảo',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400',
    title: 'Cử nhân Điều dưỡng ĐH Y Dược TP.HCM',
    cchnNumber: '034821/BYT-CCHN',
    licensingAuthority: 'Cục Quản Lý Khám Chữa Bệnh - Bộ Y Tế',
    licenseDate: '15/03/2016',
    education: 'Cử nhân Điều Dưỡng hệ Chính quy - Đại học Y Dược TP.HCM',
    experienceYears: 9,
    priorHospitals: ['Bệnh viện Chợ Rẫy', 'Bệnh viện Đại học Y Dược TP.HCM'],
    specialties: ['Hậu phẫu ổ bụng', 'Đặt sonde dạ dày & tiểu vô khuẩn', 'Hút đờm sâu', 'Loét tỳ đè độ II-III'],
    location: 'TP.HCM',
    district: 'Quận 5, Quận 10, Quận 1, Tân Bình',
    hourlyRate4h: 400000,
    hourlyRate8h: 720000,
    hourlyRate12h: 920000,
    hourlyRate24h: 1450000,
    rating: 4.95,
    reviewsCount: 38,
    status: 'Sẵn sàng nhận ca',
    bio: 'Kinh nghiệm 9 năm chăm sóc chuyên sâu bệnh nhân sau phẫu thuật ngoại khoa và ICU. Tận tụy, nhẹ nhàng, thao tác vô trùng tuyệt đối, tuân thủ nghiêm ngặt y lệnh bác sĩ điều trị.',
    insuranceCoverage: 'Bảo hiểm trách nhiệm nghề nghiệp 1.000.000.000 VNĐ (Bảo Việt Healthcare)',
    verifiedBadges: ['eKYC Bộ Y Tế', 'Lý lịch tư pháp số 2 sạch', 'Kỹ năng ICU Chợ Rẫy', 'Chuẩn giao tiếp 5 sao']
  },
  {
    id: 'nurse-02',
    name: 'ĐD. Lê Vũ Anh Quân',
    avatar: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&q=80&w=400',
    title: 'Cử nhân Điều dưỡng ĐH Y Hà Nội',
    cchnNumber: '018972/SYT-HN-CCHN',
    licensingAuthority: 'Sở Y Tế Thành phố Hà Nội',
    licenseDate: '22/08/2017',
    education: 'Cử nhân Điều Dưỡng - Trường Đại học Y Hà Nội',
    experienceYears: 8,
    priorHospitals: ['Bệnh viện Bạch Mai (Khoa Thần kinh & Cấp cứu)', 'Bệnh viện Hữu nghị Việt Đức'],
    specialties: ['Tai biến đột quỵ', 'Tập phục hồi chức năng sớm', 'Chăm sóc thở máy tại nhà', 'Đặt sonde dạ dày'],
    location: 'Hà Nội',
    district: 'Đống Đa, Cầu Giấy, Hoàn Kiếm, Hai Bà Trưng',
    hourlyRate4h: 400000,
    hourlyRate8h: 720000,
    hourlyRate12h: 920000,
    hourlyRate24h: 1450000,
    rating: 4.92,
    reviewsCount: 42,
    status: 'Sẵn sàng nhận ca',
    bio: 'Chuyên gia chăm sóc và phục hồi chức năng vận động cho bệnh nhân tai biến mạch máu não, chấn thương sọ não và sa sút trí tuệ người cao tuổi. Thể lực tốt, xử trí nhanh các cơn tăng huyết áp đột ngột.',
    insuranceCoverage: 'Bảo hiểm trách nhiệm nghề nghiệp 1.000.000.000 VNĐ (Bảo Việt Healthcare)',
    verifiedBadges: ['eKYC Bộ Y Tế', 'Chứng chỉ PHCN Bạch Mai', 'Lý lịch tư pháp số 2 sạch', 'Xử trí cấp cứu nâng cao']
  },
  {
    id: 'nurse-03',
    name: 'ĐD. Trần Thị Hoài Thương',
    avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=400',
    title: 'Cử nhân Hộ sinh - Điều dưỡng BV Từ Dũ',
    cchnNumber: '025619/SYT-HCM-CCHN',
    licensingAuthority: 'Sở Y Tế TP. Hồ Chí Minh',
    licenseDate: '10/11/2018',
    education: 'Cử nhân Hộ sinh & Điều dưỡng - ĐH Y Dược TP.HCM',
    experienceYears: 7,
    priorHospitals: ['Bệnh viện Từ Dũ', 'Bệnh viện Hùng Vương'],
    specialties: ['Mẹ và bé sau sinh', 'Vết mổ bắt con N1-N7', 'Thông tắc tia sữa không đau', 'Chăm sóc bé sơ sinh non tháng'],
    location: 'TP.HCM',
    district: 'Quận 1, Quận 3, Quận 7, Bình Thạnh, TP. Thủ Đức',
    hourlyRate4h: 400000,
    hourlyRate8h: 720000,
    hourlyRate12h: 920000,
    hourlyRate24h: 1450000,
    rating: 4.98,
    reviewsCount: 56,
    status: 'Sẵn sàng nhận ca',
    bio: '7 năm đồng hành cùng hàng ngàn mẹ sau sinh và bé sơ sinh tại BV Từ Dũ. Khéo léo trong thông tắc tuyến sữa, xử trí rốn sơ sinh vô khuẩn, nhận diện sớm vàng da bệnh lý và phục hồi tầng sinh môn.',
    insuranceCoverage: 'Bảo hiểm trách nhiệm nghề nghiệp 1.000.000.000 VNĐ (Bảo Việt Healthcare)',
    verifiedBadges: ['eKYC Bộ Y Tế', 'Chứng chỉ Sơ sinh Quốc tế', 'Lý lịch tư pháp số 2 sạch', 'Đánh giá 5 sao tuyệt đối']
  },
  {
    id: 'nurse-04',
    name: 'ĐD. Phạm Văn Khang',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    title: 'Cử nhân Điều dưỡng ĐH Kỹ thuật Y Dược Đà Nẵng',
    cchnNumber: '041283/SYT-DN-CCHN',
    licensingAuthority: 'Sở Y Tế Thành phố Đà Nẵng',
    licenseDate: '04/05/2019',
    education: 'Cử nhân Điều Dưỡng Ngoại Nhi - ĐH Kỹ thuật Y Dược Đà Nẵng',
    experienceYears: 6,
    priorHospitals: ['Bệnh viện Đà Nẵng (Khoa Ngoại Tiêu hóa)', 'Bệnh viện C Đà Nẵng'],
    specialties: ['Hậu phẫu ổ bụng', 'Thay băng vết thương nhiễm trùng', 'Đặt sonde tiểu vô khuẩn', 'Truyền dịch theo y lệnh'],
    location: 'Đà Nẵng',
    district: 'Hải Châu, Thanh Khê, Sơn Trà, Ngũ Hành Sơn',
    hourlyRate4h: 400000,
    hourlyRate8h: 720000,
    hourlyRate12h: 920000,
    hourlyRate24h: 1450000,
    rating: 4.89,
    reviewsCount: 29,
    status: 'Sẵn sàng nhận ca',
    bio: 'Điều dưỡng chính quy tận tâm, kỹ thuật vô khuẩn thành thục, giàu kinh nghiệm chăm sóc vết thương hở sâu, vết mổ rỉ dịch phức tạp và rửa bàng quang liên tục.',
    insuranceCoverage: 'Bảo hiểm trách nhiệm nghề nghiệp 1.000.000.000 VNĐ (Bảo Việt Healthcare)',
    verifiedBadges: ['eKYC Bộ Y Tế', 'Chứng chỉ Chăm sóc Vết thương', 'Lý lịch tư pháp số 2 sạch', 'Tác phong chuẩn mực']
  },
  {
    id: 'nurse-05',
    name: 'ĐD. Hoàng Bích Ngọc',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    title: 'Cử nhân Điều dưỡng Cao cấp - ĐH Y Hà Nội',
    cchnNumber: '015433/BYT-CCHN',
    licensingAuthority: 'Cục Quản Lý Khám Chữa Bệnh - Bộ Y Tế',
    licenseDate: '19/09/2015',
    education: 'Cử nhân Điều dưỡng chuyên ngành Lão khoa - ĐH Y Hà Nội',
    experienceYears: 10,
    priorHospitals: ['Bệnh viện Lão Khoa Trung Ương', 'Bệnh viện Bạch Mai'],
    specialties: ['Loét tỳ đè độ II-III', 'Chăm sóc giảm nhẹ K giai đoạn cuối', 'Đặt sonde dạ dày', 'Theo dõi đường huyết & tim mạch'],
    location: 'Hà Nội',
    district: 'Thanh Xuân, Ba Đình, Nam Từ Liêm, Tây Hồ',
    hourlyRate4h: 400000,
    hourlyRate8h: 720000,
    hourlyRate12h: 920000,
    hourlyRate24h: 1450000,
    rating: 4.96,
    reviewsCount: 47,
    status: 'Sẵn sàng nhận ca',
    bio: '10 năm chuyên sâu chăm sóc người cao tuổi mắc bệnh mãn tính phức tạp, loét tỳ đè hoại tử mô mỡ và hỗ trợ tâm lý người bệnh giai đoạn cuối.',
    insuranceCoverage: 'Bảo hiểm trách nhiệm nghề nghiệp 1.000.000.000 VNĐ (Bảo Việt Healthcare)',
    verifiedBadges: ['eKYC Bộ Y Tế', 'Chuyên khoa Lão khoa TW', 'Lý lịch tư pháp số 2 sạch', 'Đạt giải Điều dưỡng Giỏi Thủ đô']
  },
  {
    id: 'nurse-06',
    name: 'ĐD. Đặng Quốc Huy',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    title: 'Cử nhân Điều Dưỡng Hồi Sức Tích Cực',
    cchnNumber: '037210/SYT-HCM-CCHN',
    licensingAuthority: 'Sở Y Tế TP. Hồ Chí Minh',
    licenseDate: '12/06/2018',
    education: 'Cử nhân Điều Dưỡng - Đại học Y Khoa Phạm Ngọc Thạch',
    experienceYears: 7,
    priorHospitals: ['Bệnh viện Nhân Dân Gia Định', 'Bệnh viện Nhân Dân 115'],
    specialties: ['Hút đờm sâu', 'Hậu phẫu ổ bụng', 'Tai biến đột quỵ', 'Theo dõi SpO2 và máy tạo oxy'],
    location: 'TP.HCM',
    district: 'Bình Thạnh, Phú Nhuận, Gò Vấp, Quận 3',
    hourlyRate4h: 400000,
    hourlyRate8h: 720000,
    hourlyRate12h: 920000,
    hourlyRate24h: 1450000,
    rating: 4.88,
    reviewsCount: 31,
    status: 'Sẵn sàng nhận ca',
    bio: 'Thao tác kỹ thuật nhanh chuẩn, đặc biệt nhạy bén với các dấu hiệu suy hô hấp, sặc súc dịch tiêu hóa. Luôn cập nhật đầy đủ báo cáo chỉ số sinh tồn sau mỗi 2 giờ cho bác sĩ và gia đình.',
    insuranceCoverage: 'Bảo hiểm trách nhiệm nghề nghiệp 1.000.000.000 VNĐ (Bảo Việt Healthcare)',
    verifiedBadges: ['eKYC Bộ Y Tế', 'Chứng chỉ Hồi sức 115', 'Lý lịch tư pháp số 2 sạch', 'Kỹ năng giao tiếp xuất sắc']
  }
];

export const INITIAL_REVIEWS: NurseReview[] = [
  {
    id: 'rev-01',
    nurseId: 'nurse-01',
    reviewerName: 'Bác sĩ Vũ Trọng Nhân (Con trai bệnh nhân)',
    relationToPatient: 'Thân nhân bệnh nhân',
    shiftType: 'Ca 24/24',
    ratingOverall: 5,
    ratingClinicalSkill: 5,
    ratingDedication: 5,
    ratingPunctuality: 5,
    comment: 'Tôi là bác sĩ ngoại khoa nhưng bận lịch mổ không thể túc trực cạnh bố sau phẫu thuật cắt đại tràng. Điều dưỡng Thảo chăm sóc vết mổ vô cùng chuẩn chỉ, bơm thức ăn sonde dạ dày đúng tư thế Fowler tránh hoàn toàn nguy cơ hít sặc. Rất an tâm!',
    date: '14/09/2026',
    verifiedBooking: true
  },
  {
    id: 'rev-02',
    nurseId: 'nurse-01',
    reviewerName: 'Chị Đỗ Ngọc Linh',
    relationToPatient: 'Thân nhân bệnh nhân',
    shiftType: 'Ca đêm 12h',
    ratingOverall: 5,
    ratingClinicalSkill: 5,
    ratingDedication: 5,
    ratingPunctuality: 5,
    comment: 'Ca trực đêm 12h của bạn Thảo rất chu đáo. Mẹ mình 82 tuổi lú lẫn hay giật sonde tiểu, may nhờ bạn theo dõi sát sao, đo huyết áp và xoay trở chống loét đúng cữ 2 tiếng/lần. Giá niêm yết rõ ràng không vòi vĩnh.',
    date: '10/09/2026',
    verifiedBooking: true
  },
  {
    id: 'rev-03',
    nurseId: 'nurse-02',
    reviewerName: 'Anh Hoàng Minh Trí',
    relationToPatient: 'Thân nhân bệnh nhân',
    shiftType: 'Ca 8h hành chính',
    ratingOverall: 5,
    ratingClinicalSkill: 5,
    ratingDedication: 5,
    ratingPunctuality: 5,
    comment: 'Bố tôi sau đột quỵ bị liệt nửa người bên trái. Nhờ ĐD Quân kiên trì hướng dẫn bài tập thụ động phục hồi chức năng và xoa bóp ngừa huyết khối tĩnh mạch sâu, nay cụ đã cử động được các ngón tay. Tác phong cực kỳ đúng giờ.',
    date: '12/09/2026',
    verifiedBooking: true
  },
  {
    id: 'rev-04',
    nurseId: 'nurse-03',
    reviewerName: 'Chị Phan Thu Hương',
    relationToPatient: 'Bệnh nhân',
    shiftType: 'Ca 8h hành chính',
    ratingOverall: 5,
    ratingClinicalSkill: 5,
    ratingDedication: 5,
    ratingPunctuality: 5,
    comment: 'Em bé nhà mình sinh non 35 tuần, bú yếu. Cô Thương hướng dẫn vỗ ợ hơi, thông tắc tia sữa êm ru không hề đau đớn như ngoài tiệm spa làm. Đúng là điều dưỡng Từ Dũ có chứng chỉ hành nghề đẳng cấp khác biệt!',
    date: '15/09/2026',
    verifiedBooking: true
  }
];

export const INITIAL_ASSIGNED_PATIENTS: AssignedPatient[] = [
  {
    id: 'pt-01',
    name: 'Cụ Trần Văn Đức',
    age: 79,
    gender: 'Nam',
    diagnosis: 'Hậu phẫu nối mật ruột N7, Đái tháo đường Tuýp 2, THA Giai đoạn 2',
    roomOrBed: 'Phòng 402 - Căn hộ Vinhomes Central Park, Bình Thạnh',
    address: 'Tòa Landmark 3, Phường 22, Bình Thạnh, TP.HCM',
    emergencyContactName: 'Anh Trần Hùng (Con trai cả)',
    emergencyContactPhone: '0912.456.789',
    doctorInCharge: 'TS.BS. Nguyễn Văn Hậu (BV ĐH Y Dược)',
    allergies: 'Dị ứng Penicillin, chống chỉ định NSAID',
    shiftDetails: 'Ca trực 8h hành chính (08:00 - 16:00)',
    notes: 'Bệnh nhân có dẫn lưu Kehr rỉ dịch vàng trong, nuôi ăn qua sonde dạ dày sữa Ensur 200ml/cữ x 5 cữ/ngày. Lưu ý kiểm tra SpO2 và đường huyết trước ăn.'
  },
  {
    id: 'pt-02',
    name: 'Bác Nguyễn Thị Lan',
    age: 68,
    gender: 'Nữ',
    diagnosis: 'Di chứng nhồi máu não bán cầu phải N45, Loét tỳ đè vùng cùng cụt Độ II',
    roomOrBed: 'Nhà riêng Tầng 2, 45 Phố Chùa Bộc, Đống Đa, Hà Nội',
    address: 'Số 45 Ngõ 12 Chùa Bộc, Đống Đa, Hà Nội',
    emergencyContactName: 'Chị Nguyễn Mai Anh (Con gái)',
    emergencyContactPhone: '0983.112.233',
    doctorInCharge: 'BSCKII. Lê Đình Tuấn (BV Bạch Mai)',
    allergies: 'Không ghi nhận tiền sử dị ứng',
    shiftDetails: 'Ca đêm 12h (19:00 - 07:00)',
    notes: 'Liệt nửa người trái hoàn toàn, xoay trở tư thế mỗi 2 giờ, thay băng hydrocolloid vết loét cùng cụt vô khuẩn. Báo động ngay nếu Huyết áp tâm thu > 170 mmHg hoặc SpO2 < 95%.'
  },
  {
    id: 'pt-03',
    name: 'Sản phụ Lê Thị Bích Trâm & Bé Sơ Sinh',
    age: 31,
    gender: 'Nữ',
    diagnosis: 'Hậu phẫu mổ lấy thai N4 do vỡ ối sớm, Bé trai 3.1kg bú mẹ',
    roomOrBed: 'Khu biệt thự Thảo Điền, TP. Thủ Đức',
    address: '18 Đường số 4 Thảo Điền, TP. Thủ Đức, TP.HCM',
    emergencyContactName: 'Anh Hoàng Tuấn (Chồng)',
    emergencyContactPhone: '0905.778.899',
    doctorInCharge: 'ThS.BS. Phan Thanh Mai (BV Từ Dũ)',
    allergies: 'Không dị ứng thuốc',
    shiftDetails: 'Ca 8h hành chính (08:30 - 16:30)',
    notes: 'Theo dõi vết mổ Pfannenstiel khô ráo, tử cung co hồi tốt ngang rốn, hỗ trợ massage kích sữa và tắm rốn vô trùng cho bé.'
  }
];

export const INITIAL_VITALS_LOGS: VitalsLog[] = [
  {
    id: 'vit-01',
    patientId: 'pt-01',
    patientName: 'Cụ Trần Văn Đức',
    nurseEmail: 'huynhmai8906@gmail.com',
    nurseName: 'Điều dưỡng Ca trực (huynhmai8906)',
    timestamp: '17/09/2026 09:30',
    bpSystolic: 128,
    bpDiastolic: 78,
    heartRate: 76,
    spo2: 97,
    temperature: 36.8,
    bloodGlucose: 124,
    bloodGlucoseState: 'Khi đói',
    respRate: 18,
    fluidBalanceIn: 650,
    fluidBalanceOut: 500,
    woundStatus: 'Vết mổ khô ráo, chân dẫn lưu Kehr không tấy đỏ, dịch mật vàng trong 80ml',
    medicationsGiven: 'Amlodipine 5mg (1 viên uống), Metformin 500mg (1 viên sau ăn), Nexium 40mg',
    clinicalNotes: 'Bệnh nhân tỉnh táo tiếp xúc tốt, niêm mạc hồng, bụng mềm không chướng, sonde dạ dày lưu thông thông suốt.',
    alertLevel: 'normal',
    alertMessages: []
  },
  {
    id: 'vit-02',
    patientId: 'pt-02',
    patientName: 'Bác Nguyễn Thị Lan',
    nurseEmail: 'huynhmai8906@gmail.com',
    nurseName: 'Điều dưỡng Ca trực (huynhmai8906)',
    timestamp: '16/09/2026 21:00',
    bpSystolic: 145,
    bpDiastolic: 90,
    heartRate: 84,
    spo2: 96,
    temperature: 37.1,
    bloodGlucose: 140,
    bloodGlucoseState: 'Sau ăn 2h',
    respRate: 20,
    fluidBalanceIn: 400,
    fluidBalanceOut: 350,
    woundStatus: 'Vết loét tỳ đè vùng cùng cụt kích thước 3x2cm độ II, đáy có mô hạt đỏ tươi, mép không phù nề, đã rửa muối sinh lý và dán UrgoTul',
    medicationsGiven: 'Atorvastatin 20mg (1 viên tối), Clopidogrel 75mg (1 viên), Ginkgo Biloba',
    clinicalNotes: 'Đã tập co duỗi thụ động tay chân trái 30 phút, xoay nghiêng trái kê gối chống tỳ đè.',
    alertLevel: 'normal',
    alertMessages: []
  }
];

export const MARKET_SURVEY_REPORT = {
  sampleSize: '128 gia đình người bệnh & 15 cơ sở y tế (Khoa HSTC & Hậu phẫu Chợ Rẫy, Bạch Mai, ĐH Y Dược)',
  locations: 'Hà Nội & TP. Hồ Chí Minh',
  timeframe: 'Khảo sát Quý 1 - Quý 3/2026',
  priceVolatility: 'Biến động 40% - 62% giữa các ngày trong tuần và ban đêm',
  keyFindings: [
    {
      metric: '84.6%',
      title: 'Người chăm sóc tự do không có CCHN',
      desc: 'Được giới thiệu qua "cò mồi" cổng viện hoặc trung tâm giúp việc gia đình nhưng tự nhận là y tá điều dưỡng.'
    },
    {
      metric: '62.4%',
      title: 'Bị phát sinh chi phí đêm & lễ tết bất hợp lý',
      desc: 'Giá ban đầu báo 500k nhưng đêm phát sinh thêm 300k - 500k phụ phí vô lý không cam kết trước.'
    },
    {
      metric: '31.2%',
      title: 'Từng gặp biến chứng chăm sóc nghiêm trọng',
      desc: 'Bao gồm sặc dịch nuôi ăn qua sonde dạ dày, tụt huyết áp không phát hiện, nhiễm trùng vết mổ và loét hoại tử tỳ đè.'
    },
    {
      metric: '0 VNĐ',
      title: 'Mức bảo hiểm trách nhiệm thị trường tự do',
      desc: 'Khi xảy ra sự cố y khoa, 100% người giúp việc/cò mồi phủi trách nhiệm và người bệnh gánh chịu toàn bộ chi phí.'
    }
  ]
};

export const COMPARISON_MODELS = [
  {
    model: 'Cò Mồi Chợ Đen Cổng Viện',
    cchnProof: 'Không có (thường là lao động phổ thông mạo danh)',
    medicalScreening: 'Không thẩm định, truyền tay qua số điện thoại',
    pricing: 'Loạn giá (500k - 1.8tr/ca), ép giá ban đêm',
    liabilityInsurance: '0 đồng (Hoàn toàn phủi trách nhiệm khi có biến chứng)',
    clinicalMonitoring: 'Không biết đo huyết áp chuẩn, không theo dõi SpO2',
    socialRating: 'Không có cơ chế đánh giá công khai',
    isPlatform: false
  },
  {
    model: 'Trung Tâm Giúp Việc Gia Đình',
    cchnProof: 'Không có CCHN của Bộ Y Tế, chỉ đào tạo sơ bộ 3-5 ngày',
    medicalScreening: 'Chỉ kiểm tra CMND/CCCD, không kỹ năng y khoa',
    pricing: 'Thu phí môi giới 1 - 2 triệu + lương theo tháng',
    liabilityInsurance: 'Không có bảo hiểm y khoa',
    clinicalMonitoring: 'Chỉ làm việc nhà, không thể xử trí biến chứng',
    socialRating: 'Nội bộ công ty, không minh bạch',
    isPlatform: false
  },
  {
    model: 'Dịch Vụ Bệnh Viện Tư Nhân',
    cchnProof: 'Có CCHN chính thức',
    medicalScreening: 'Thẩm định nội bộ của bệnh viện',
    pricing: 'Rất đắt đỏ (2.500.000đ - 4.500.000đ/ngày đêm)',
    liabilityInsurance: 'Có bảo hiểm bệnh viện',
    clinicalMonitoring: 'Tốt nhưng lịch điều dưỡng thụ động, thủ tục rườm rà',
    socialRating: 'Không được chủ động chọn đích danh điều dưỡng',
    isPlatform: false
  },
  {
    model: 'MediCare Connect (Nền Tảng)',
    cchnProof: '100% CCHN xác thực trực tiếp qua Cổng Bộ Y Tế / Sở Y Tế',
    medicalScreening: 'Quy trình 4 bước: eKYC, test lâm sàng, lý lịch tư pháp, 5 sao',
    pricing: 'Niêm yết chuẩn hóa 100%: 4h (400k), 8h (720k), 12h đêm (920k), 24/24 (1.45tr)',
    liabilityInsurance: 'Tích hợp Bảo hiểm Trách nhiệm Nghề nghiệp 1 TỶ VNĐ',
    clinicalMonitoring: 'Báo cáo chỉ số sinh tồn chuẩn, cảnh báo đỏ tự động, gửi SMS người nhà',
    socialRating: 'Minh bạch 100% với 3 tiêu chí: Chuyên môn, Tận tâm, Đúng giờ',
    isPlatform: true
  }
];

export const STANDARD_PRICING_TABLE = [
  {
    type: 'Ca 4 Giờ',
    price: 400000,
    unit: 'ca',
    tag: 'Tiết kiệm & Thủ thuật',
    desc: 'Phù hợp người bệnh cần hỗ trợ vệ sinh, thay băng vô khuẩn, đặt sonde, tập vận động buổi sáng hoặc chiều.',
    features: [
      'Điều dưỡng CCHN có mặt đúng giờ',
      'Đo bộ 5 chỉ số sinh tồn (Huyết áp, Nhịp tim, SpO2, Nhiệt độ, Đường huyết)',
      'Thực hiện thủ thuật điều dưỡng theo y lệnh',
      'Gửi báo cáo ca trực cho người nhà'
    ]
  },
  {
    type: 'Ca 8 Giờ Hành Chính',
    price: 720000,
    unit: 'ca',
    tag: 'Phổ biến nhất (8h - 16h30)',
    desc: 'Giải pháp hoàn hảo cho gia đình đi làm giờ hành chính cần người có chuyên môn cao túc trực liên tục.',
    features: [
      'Túc trực liên tục 8 tiếng chăm sóc toàn diện',
      'Bơm ăn sonde dạ dày, vệ sinh sonde tiểu vô khuẩn',
      'Xoay trở ngừa loét tỳ đè mỗi 2 giờ',
      'Tập vật lý trị liệu & phục hồi chức năng cơ bản',
      'Cập nhật chỉ số sinh tồn 2 lần/ca'
    ],
    recommended: true
  },
  {
    type: 'Ca Đêm 12 Giờ',
    price: 920000,
    unit: 'ca',
    tag: 'Chuyên sâu đêm (19h - 07h)',
    desc: 'Túc trực ban đêm bảo vệ bệnh nhân nguy cơ cao tụt SpO2, sặc đờm, tăng huyết áp kịch phát hoặc rối loạn tri giác.',
    features: [
      'Canh chừng thông khí thở máy, máy tạo oxy',
      'Hút đờm dãi sâu khi bệnh nhân khó thở',
      'Cảnh báo đỏ và sơ cứu khẩn cấp',
      'Cho người nhà an giấc phục hồi sức khỏe',
      'Bảo hiểm 1 Tỷ VNĐ kích hoạt tức thì'
    ]
  },
  {
    type: 'Ca Toàn Diện 24/24',
    price: 1450000,
    unit: 'ngày đêm',
    tag: 'Chăm sóc cao cấp ICU',
    desc: 'Chăm sóc chuyên sâu tại nhà hoặc bệnh phòng cho bệnh nhân sau mổ lớn, tai biến nặng, hôn mê nhẹ.',
    features: [
      'Túc trực 24/24 (kèm giờ nghỉ luân phiên khoa học)',
      'Chăm sóc dinh dưỡng tĩnh mạch & sonde',
      'Băng bó vết thương hở sâu vô trùng tuyệt đối',
      'Báo cáo sinh tồn trực tiếp cho Bác sĩ điều trị',
      'Hỗ trợ xuất phiếu theo dõi lâm sàng Bộ Y Tế'
    ]
  },
  {
    type: 'Thủ Thuật Đơn Lẻ Tại Nhà',
    price: 220000,
    unit: 'lần',
    tag: 'Nhanh chóng trong 60 phút',
    desc: 'Thay băng cắt chỉ vết mổ, đặt sonde dạ dày, sonde tiểu Foley, rửa vết loét tỳ đè chuyên sâu.',
    features: [
      'Kỹ thuật vô khuẩn bệnh viện',
      'Kèm kiểm tra chỉ số sinh tồn miễn phí',
      'Tư vấn chế độ dinh dưỡng liền sẹo'
    ]
  }
];

export const PITCH_DECK_DATA = {
  title: 'Bảng Thuyết Trình Khởi Nghiệp Đổi Mới Sáng Tạo Y Tế 2026',
  project: 'MediCare Connect — HealthTech Nursing Marketplace & Clinical Assurance',
  tam: {
    value: '2.4 Tỷ USD',
    label: 'TAM (Total Addressable Market)',
    desc: 'Tổng quy mô thị trường dịch vụ chăm sóc điều dưỡng & y tế tại nhà tại Việt Nam và các đô thị Đông Nam Á với tốc độ già hóa dân số hàng đầu khu vực (CAGR 14.8%).'
  },
  sam: {
    value: '680 Triệu USD',
    label: 'SAM (Serviceable Addressable Market)',
    desc: 'Phân khúc chăm sóc bệnh nhân sau phẫu thuật, tai biến đột quỵ và người cao tuổi có chỉ định y tế tại 5 đô thị lớn (TP.HCM, Hà Nội, Đà Nẵng, Hải Phòng, Cần Thơ).'
  },
  som: {
    value: '72 Triệu USD',
    label: 'SOM (Serviceable Obtainable Market)',
    desc: 'Mục tiêu chiếm lĩnh 10.5% thị phần trong 3 năm đầu thông qua mạng lưới liên kết xuất viện từ 25 bệnh viện công/tư đầu ngành.'
  },
  takeRate: '12% — 15%',
  takeRateDesc: 'Phí dịch vụ nền tảng (Take-rate) trên mỗi ca trực hoàn thành minh bạch, kết hợp bán gói Kit vật tư vô khuẩn độc quyền và dịch vụ B2B cho bệnh viện.',
  socialImpact: [
    'Xóa bỏ triệt để nạn "cò mồi" và dịch vụ chui tại các cổng bệnh viện tuyến cuối.',
    'Bảo vệ an toàn tính mạng cho hơn 10.000+ bệnh nhân nặng trước nguy cơ sặc sonde, nhiễm trùng vết mổ.',
    'Nâng cao thu nhập chính đáng cho lực lượng điều dưỡng viên Việt Nam tăng thêm 35% - 50% so với lương cơ sở.',
    'Tất cả các ca trực đều được bảo hiểm y khoa trách nhiệm nghề nghiệp 1 TỶ VNĐ từ tập đoàn bảo hiểm uy tín.'
  ],
  roadMap: [
    { phase: 'Giai đoạn 1 (Q1-Q2/2026)', target: 'Vận hành tại TP.HCM & Hà Nội, kết nạp 500 điều dưỡng CCHN, hoàn thành 15.000 ca trực' },
    { phase: 'Giai đoạn 2 (Q3-Q4/2026)', target: 'Mở rộng Đà Nẵng & Đông Nam Bộ, tích hợp cảm biến IoT theo dõi sinh tồn thời gian thực' },
    { phase: 'Giai đoạn 3 (2027)', target: 'Đạt 3.000 điều dưỡng viên, hợp tác bảo hiểm y tế tư nhân chi trả trực tiếp' }
  ]
};
