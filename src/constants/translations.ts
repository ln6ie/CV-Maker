export interface TranslationSet {
  app: {
    title: string;
    subtitle: string;
  };
  splash: {
    logo: string;
    subtitle: string;
  };
  steps: {
    personal: string;
    experience: string;
    education: string;
    skills: string;
    language: string;
  };
  labels: {
    fullName: string;
    address: string;
    phone: string;
    email: string;
    summary: string;
    degree: string;
    institution: string;
    graduationYear: string;
    honors: string;
    skills: string;
    courses: string;
    arabicLevel: string;
    englishLevel: string;
  };
  buttons: {
    back: string;
    next: string;
    export: string;
    generating: string;
    completed: string;
    close: string;
  };
  actionSheet: {
    cancel: string;
    toggleTheme: string;
    pdfEnglish: string;
    pdfArabic: string;
  };
  preferences: {
    title: string;
    toggleTheme: string;
    pdfLang: string;
    pdfLangAr: string;
  };
  status: {
    generating: string;
    validationError: string;
    noData: string;
  };
  validation: {
    required: string;
    invalidEmail: string;
    summaryLength: string;
    workExperienceRequired: string;
    educationRequired: string;
  };
}

export type Language = 'en' | 'ar';

export const translations: Record<Language, TranslationSet> = {
  en: {
    app: {
      title: 'CV BUILDER',
      subtitle: 'A4 PDF Creator',
    },
    splash: {
      logo: 'CV',
      subtitle: 'A4 PROFESSIONAL BUILDER',
    },
    steps: {
      personal: 'Personal Details',
      experience: 'Work Experience',
      education: 'Education',
      skills: 'Skills & Training',
      language: 'Language Details',
    },
    labels: {
      fullName: 'Full Name',
      address: 'Official Address',
      phone: 'Phone Number',
      email: 'Email Address',
      summary: 'Summary Description',
      degree: 'Degree Title',
      institution: 'Institution',
      graduationYear: 'Graduation Year',
      honors: 'Academic Honors Notes',
      skills: 'Technical Skills (Comma Separated)',
      courses: 'Courses (Comma Separated)',
      arabicLevel: 'Arabic Level',
      englishLevel: 'English Level',
    },
    buttons: {
      back: 'BACK',
      next: 'NEXT',
      export: 'COMPILE & EXPORT PDF',
      generating: 'GENERATING...',
      completed: 'Completed',
      close: 'CLOSE',
    },
    actionSheet: {
      cancel: 'Cancel',
      toggleTheme: 'Toggle Light/Dark Theme',
      pdfEnglish: 'Render PDF: English (LTR)',
      pdfArabic: 'Render PDF: Arabic (RTL)',
    },
    preferences: {
      title: 'PREFERENCES',
      toggleTheme: 'TOGGLE LIGHT/DARK MODE',
      pdfLang: 'PDF LANGUAGE: EN',
      pdfLangAr: 'PDF LANGUAGE: AR',
    },
    status: {
      generating: 'Generating PDF...',
      validationError: 'Validation Error',
      noData: 'No Data Found',
    },
    validation: {
      required: 'This field is required',
      invalidEmail: 'Invalid email format',
      summaryLength: 'Please write a brief summary (at least 20 characters)',
      workExperienceRequired: 'Please add at least one valid Work Experience entry',
      educationRequired: 'Please add at least one valid Education entry',
    },
  },
  ar: {
    app: {
      title: 'منشئ السيرة الذاتية',
      subtitle: 'منشئ PDF بصيغة A4',
    },
    splash: {
      logo: 'السيرة',
      subtitle: 'منشئ احترافي بصيغة A4',
    },
    steps: {
      personal: 'البيانات الشخصية',
      experience: 'الخبرات المهنية',
      education: 'التعليم',
      skills: 'المهارات والتدريب',
      language: 'تفاصيل اللغة',
    },
    labels: {
      fullName: 'الاسم الكامل',
      address: 'العنوان الرسمي',
      phone: 'رقم الهاتف',
      email: 'البريد الإلكتروني',
      summary: 'الملخص المهني',
      degree: 'المؤهل العلمي',
      institution: 'الجامعة / المؤسسة',
      graduationYear: 'سنة التخرج',
      honors: 'ملاحظات الشرف الأكاديمي',
      skills: 'المهارات التقنية (مفصولة بفواصل)',
      courses: 'الدورات (مفصولة بفواصل)',
      arabicLevel: 'مستوى اللغة العربية',
      englishLevel: 'مستوى اللغة الإنجليزية',
    },
    buttons: {
      back: 'السابق',
      next: 'التالي',
      export: 'تصدير بصيغة PDF',
      generating: 'جارٍ التصدير...',
      completed: 'تم',
      close: 'إغلاق',
    },
    actionSheet: {
      cancel: 'إلغاء',
      toggleTheme: 'تبديل الوضع الفاتح/الداكن',
      pdfEnglish: 'تصدير PDF: إنجليزي (LTR)',
      pdfArabic: 'تصدير PDF: عربي (RTL)',
    },
    preferences: {
      title: 'التفضيلات',
      toggleTheme: 'تبديل الوضع الفاتح/الداكن',
      pdfLang: 'لغة PDF: EN',
      pdfLangAr: 'لغة PDF: AR',
    },
    status: {
      generating: 'جارٍ إنشاء PDF...',
      validationError: 'خطأ في التحقق',
      noData: 'لا توجد بيانات',
    },
    validation: {
      required: 'هذا الحقل مطلوب',
      invalidEmail: 'تنسيق البريد الإلكتروني غير صحيح',
      summaryLength: 'يرجى كتابة ملخص لا يقل عن 20 حرفًا',
      workExperienceRequired: 'يرجى إضافة خبرة مهنية واحدة على الأقل',
      educationRequired: 'يرجى إضافة مؤهل تعليمي واحد على الأقل',
    },
  },
};
