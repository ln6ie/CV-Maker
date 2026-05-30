import { CVData } from '../types/cv';

/**
 * A complete, realistic sample CV that demonstrates all app features.
 * Used for App Store review, onboarding, and testing purposes.
 */
export const SAMPLE_CV_EN: CVData = {
  fullName: 'Abdullah Kareem Hussein',
  address: 'Basra, Iraq',
  phone: '07712345678',
  email: 'abdullah.kareem@gmail.com',
  summary:
    'Dedicated Electromechanical Engineer with 6+ years of experience in industrial maintenance, automation systems, and project management. Proven track record of improving operational efficiency by 30% through preventive maintenance programs and system upgrades. Adept at leading cross-functional teams and delivering results under tight deadlines.',
  skills: [
    'PLC Programming (Siemens S7)',
    'AutoCAD Electrical',
    'Hydraulic & Pneumatic Systems',
    'Predictive Maintenance',
    'Project Management',
    'MS Office Suite',
  ],
  workExperience: [
    {
      jobTitle: 'Senior Maintenance Engineer',
      companyLocation: 'South Oil Company — Basra, Iraq',
      dateRange: '2020 - Present',
      mainTasks: [
        'Supervised a team of 12 engineers and technicians in daily operations of oil extraction facilities covering 4 production units.',
        'Implemented a preventive maintenance program that reduced unplanned downtime by 35% within the first year of deployment.',
        'Led a $2.4M pipeline integrity project, delivering on time and 8% under budget.',
      ],
    },
    {
      jobTitle: 'Electromechanical Technician',
      companyLocation: 'Basra Electricity Distribution Directorate — Basra, Iraq',
      dateRange: '2017 - 2020',
      mainTasks: [
        'Maintained and repaired high-voltage distribution transformers (11kV/33kV), ensuring 99.2% grid uptime across the southern district.',
        'Diagnosed and resolved complex electrical faults using thermal imaging and vibration analysis tools.',
      ],
    },
  ],
  education: [
    {
      degree: 'Bachelor of Electromechanical Engineering',
      institution: 'Southern Technical University',
      year: '2017',
      notes: 'Graduated with Distinction — Top 5% of class',
    },
  ],
  courses: [
    'PLC & SCADA Systems Certification — Siemens Iraq (2021)',
    'Project Management Professional (PMP) Preparation — 2022',
    'Safety Leadership in Oil & Gas — OPITO Certified (2023)',
  ],
  languages: [
    { name: 'Arabic', level: 'Native' },
    { name: 'English', level: 'Professional Working Proficiency' },
  ],
  template: 'classic',
};

export const SAMPLE_CV_AR: CVData = {
  fullName: 'عبدالله كريم حسين',
  address: 'البصرة، العراق',
  phone: '07712345678',
  email: 'abdullah.kareem@gmail.com',
  summary:
    'مهندس ميكاترونيكس متمرس بخبرة تزيد على 6 سنوات في مجال الصيانة الصناعية وأنظمة الأتمتة وإدارة المشاريع. أثبتت كفاءتي في رفع الكفاءة التشغيلية بنسبة 30% من خلال برامج الصيانة الوقائية والترقيات التقنية. لديّ قدرة عالية على قيادة الفرق متعددة التخصصات وتحقيق النتائج ضمن الجداول الزمنية المحددة.',
  skills: [
    'برمجة PLC (سيمنز S7)',
    'AutoCAD الكهربائي',
    'أنظمة الهيدروليك والهوائيات',
    'الصيانة التنبؤية',
    'إدارة المشاريع',
    'حزمة مايكروسوفت أوفيس',
  ],
  workExperience: [
    {
      jobTitle: 'مهندس صيانة أول',
      companyLocation: 'شركة نفط الجنوب — البصرة، العراق',
      dateRange: '2020 - حتى الآن',
      mainTasks: [
        'أشرفت على فريق مؤلف من 12 مهندساً وفنياً في العمليات اليومية لمنشآت استخراج النفط الشامل لـ 4 وحدات إنتاجية.',
        'نفّذت برنامجاً للصيانة الوقائية أدى إلى خفض حالات التوقف غير المخطط بنسبة 35% خلال السنة الأولى.',
        'قدت مشروع سلامة خطوط الأنابيب بقيمة 2.4 مليون دولار، مع التسليم في الموعد وبتوفير 8% من الميزانية.',
      ],
    },
    {
      jobTitle: 'فني كهروميكانيك',
      companyLocation: 'مديرية كهرباء البصرة التوزيعية — البصرة، العراق',
      dateRange: '2017 - 2020',
      mainTasks: [
        'صيانة وإصلاح محولات التوزيع عالية الجهد (11كيلو فولت / 33 كيلو فولت) لضمان توافر الشبكة بنسبة 99.2%.',
        'تشخيص وحل الأعطال الكهربائية المعقدة باستخدام أجهزة التصوير الحراري وتحليل الاهتزازات.',
      ],
    },
  ],
  education: [
    {
      degree: 'بكالوريوس هندسة الميكاترونيكس',
      institution: 'الجامعة التقنية الجنوبية',
      year: '2017',
      notes: 'تخرج بامتياز — ضمن أفضل 5% من الدفعة',
    },
  ],
  courses: [
    'شهادة أنظمة PLC و SCADA — سيمنز العراق (2021)',
    'إعداد محترف إدارة المشاريع (PMP) — 2022',
    'القيادة الأمنية في صناعة النفط والغاز — شهادة OPITO (2023)',
  ],
  languages: [
    { name: 'Arabic', level: 'اللغة الأم' },
    { name: 'English', level: 'مستوى العمل الاحترافي' },
  ],
  template: 'classic',
};
