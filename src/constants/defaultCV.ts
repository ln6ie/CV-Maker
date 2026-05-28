import { CVData } from '../types/cv';

/**
 * Default CV data matching the image.png exactly.
 * Prefilled so the app works instantly out-of-the-box.
 * Conforms to no-emoji requirements.
 */
export const DEFAULT_CV: CVData = {
  fullName: 'Abdullah Karim Hussein',
  address: 'Al - Aitifa street - Tanuma - Basra - Iraq',
  phone: '07729375972',
  email: 'barkiq.2002@gmail.com',
  summary: 'A Electromechanical Engineer and I have a lot of experience in repairing mechanical and electrical equipment and one of the top students in the department and interested in learning, quick to learn and gain work experience.',
  skills: [
    'Supervisor',
    'Excellent computer skills',
    'Teamwork',
    'Time Management',
    'Digital Design',
    'MATLAB',
    'AutoCAD',
    'Problem solving',
    'Knowledge of Pump',
    'Knowledge of HVAC',
    'Knowledge of Transmission lines',
    'Knowledge of Classic control and plc',
    'Knowledge of Repair engine',
    'Knowledge of Electrical device and mechanical device',
    'Knowledge of Diesel engine',
    'Knowledge of Turbine',
    'Knowledge of Compressor',
    'Knowledge of AC and DC motor and generator',
    'Excellent Microsoft office',
    'Python , JavaScript , HTML , CSS and C++ programming',
    'Logical Thinking',
    'Knowledge of read piping diagram',
    'Bicycle mechanic',
    'Bike and E-bike mechanic',
  ],
  workExperience: [
    {
      jobTitle: 'Mechanic, Blacksmith, and Carpenter',
      companyLocation: 'Private Workshop - Basra, Iraq',
      dateRange: '2014 - 2021',
      mainTasks: [
        'Repaired motorcycles, bicycles, and e-bikes (engine, brakes, electrical).',
        'Welded metal parts for frames, gates, and custom jobs.',
        'Built and fixed wood items like shelves and furniture.',
        'Operated various mechanical and carpentry tools.',
        'Handled customer requests and technical tasks.',
        'Delivered safe and durable results.',
      ],
    },
    {
      jobTitle: 'Health, Safety and Environment (HSE) Supervisor',
      companyLocation: 'Aljidar Alsaanid - Emirati Company',
      dateRange: 'Basra, Iraq - June 2023',
      mainTasks: [
        'Supervised daily HSE compliance on-site to ensure a safe working environment.',
        'Conducted safety inspections and risk assessments for all site activities.',
        'Delivered safety briefings and toolbox talks to workers.',
        'Monitored use of Personal Protective Equipment (PPE) and ensured proper distribution.',
        'Reported incidents and near-misses, and followed up on corrective actions.',
        'Ensured emergency procedures and evacuation plans were clearly communicated.',
      ],
    },
    {
      jobTitle: 'Diesel Generator Mechanic',
      companyLocation: 'Private Work - Basra, Iraq',
      dateRange: '2019 - 2022',
      mainTasks: [
        'Diagnosed and repaired diesel generators of various capacities.',
        'Performed regular maintenance: oil changes, fuel system checks, and filter replacements.',
        'Inspected electrical connections and ensured proper voltage output.',
        'Responded to emergency breakdowns and restored generator operation.',
        'Rebuilt and cleaned engines and replaced damaged components.',
        'Ensured all work followed safety and operational standards.',
      ],
    },
    {
      jobTitle: 'Air Conditioner Installer',
      companyLocation: 'Self-employed - Basra, Iraq',
      dateRange: '2023',
      mainTasks: [
        'Installed split and window air conditioning units for residential clients.',
        'Performed basic wiring and piping for indoor and outdoor units.',
        'Checked system functionality and ensured proper cooling performance.',
        'Provided maintenance advice and usage tips to customers.',
        'Used appropriate tools and safety measures during installation.',
      ],
    },
    {
      jobTitle: 'Designer and Fabricator of Student Graduation Projects',
      companyLocation: 'Freelance / Academic Support - Basra, Iraq',
      dateRange: '2023',
      mainTasks: [
        'Designed and built custom mechanical and electromechanical graduation projects.',
        'Assisted students in selecting components and developing technical drawings.',
        'Provided guidance on control systems, wiring, and assembly techniques.',
        'Used tools like AutoCAD, SolidWorks, and Arduino-based systems.',
        'Ensured functionality, safety, and aesthetic quality of finished models.',
        'Delivered projects on time, ready for academic evaluation.',
      ],
    },
  ],
};
