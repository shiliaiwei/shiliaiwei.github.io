/* ═══════════════════════════════════════════════════════
   CV Dashboard — Tag-based Navigation, Single Candidate
   ═══════════════════════════════════════════════════════ */

const state = { role: "embedded", type: "combination" };

const candidate = {
  nameCn: "史力爱卫",
  nameEn: "SHILI AIWEI",
  location: "Krong Siem Reap, Cambodia",
  phone: "+855 69 800 600",
  email: "contact@shiliaiwei.dev",
  github: "github.com/shiliaiwei",
  linkedin: "linkedin.com/in/shiliaiwei",
  photo: "https://github.com/shiliaiwei.png",
};

const cvTypes = [
  { id: "chronological", icon: "fa-solid fa-clock-rotate-left", label: "Timeline" },
  { id: "functional",    icon: "fa-solid fa-layer-group",       label: "Skills-First" },
  { id: "combination",   icon: "fa-solid fa-table-columns",     label: "Combined" },
];

const sectionLabels = {
  summary: "Summary",
  highlights: "Key Highlights",
  skills: "Skills",
  experience: "Experience",
  projects: "Projects",
  education: "Education",
  certs: "Certifications",
  publications: "Publications & Presentations",
  snapshot: "Experience Snapshot",
};

/* ─── Profile Data ─── */
const profiles = [
  {
    roleId: "embedded",
    roleTitle: "Embedded Systems Engineer (IoT / RTOS)",
    tagLabel: "Embedded / IoT",
    summary: "Embedded systems engineer focused on reliable firmware, low-power IoT, and hardware bring-up. Ships production-grade RTOS features end-to-end\u2014from board verification to OTA updates\u2014while keeping timing, power, and field-debugability non-negotiable.",
    highlights: [
      "Cut boot time from 9.2s to 2.1s by reworking init order, DMA usage, and flash layout; improved cold-start reliability in the field.",
      "Built OTA update pipeline with rollback safety and signature verification; reduced incident rate tied to firmware updates by 60%.",
      "Reduced average device current by 38% using deep-sleep profiling, interrupt hygiene, and sensor duty-cycling; extended battery life from 8 to 13 months.",
    ],
    skills: [
      { title: "Firmware & RTOS", items: "C/C++, FreeRTOS, Zephyr, bootloaders, OTA, watchdogs, concurrency, interrupts" },
      { title: "Hardware Bring-up", items: "STM32, ESP32, UART/I2C/SPI, JTAG/SWD, logic analyzer, oscilloscopes, power profiling" },
      { title: "Connectivity", items: "BLE, Wi\u2011Fi, MQTT, CoAP, TLS, device provisioning" },
      { title: "Tooling", items: "Git, CMake, GCC/Clang, CI builds, Python test harness, Wireshark" },
    ],
    experience: [
      {
        title: "Embedded Firmware Engineer", org: "Mekong IoT Labs",
        location: "Phnom Penh, Cambodia", dates: "Feb 2023 \u2013 Present",
        bullets: [
          "Engineered a telemetry stack (MQTT + TLS) with backpressure control; stabilized 30k+ daily message bursts without packet-loss regressions.",
          "Reworked sensor drivers and scheduling to eliminate 3 race conditions causing intermittent hangs; improved field uptime to 99.95%.",
          "Built manufacturing test mode (UART CLI + fixtures) that cut board validation time from 12 minutes to 4 minutes per unit.",
        ],
      },
      {
        title: "Junior Embedded Engineer (Intern)", org: "Southeast Smart Devices",
        location: "Siem Reap, Cambodia", dates: "Jun 2021 \u2013 Jan 2023",
        bullets: [
          "Developed BLE commissioning flow and pairing UX for installers; reduced on-site setup time by ~25%.",
          "Implemented CRC and flash wear-leveling policy for config storage; prevented field corruption incidents during brown-outs.",
        ],
      },
    ],
    projects: [
      {
        title: "Solar Sensor Node (BLE + LoRa)", meta: "Personal project \u2022 2025",
        bullets: [
          "Designed low-power duty-cycle logic and achieved 10+ months runtime on a 18650 cell under realistic sampling rates.",
          "Created Python-based test harness that simulates sensor faults and verifies recovery paths.",
        ],
      },
      {
        title: "RTOS Timing Analyzer", meta: "Work sample \u2022 C + tracing",
        bullets: [
          "Instrumented task latency and ISR execution; identified jitter sources and reduced worst-case latency by 32%.",
        ],
      },
    ],
    education: [
      {
        title: "B.S. Electrical Engineering (Hardware Systems)", org: "Royal University of Phnom Penh",
        location: "Phnom Penh, Cambodia", dates: "2017 \u2013 2021",
        bullets: [
          "Coursework: Microcontrollers, Digital Systems, Signals & Systems, Control, Embedded Linux.",
          "Capstone: Smart irrigation controller with current sensing and fault detection.",
        ],
      },
    ],
    certs: [
      "ARM Cortex\u2011M: Advanced Embedded Development (2025)",
      "IoT Security Foundations (TLS, provisioning, key hygiene) (2024)",
    ],
    lens: {
      hiringContext: "Teams need firmware that survives real-world noise: brown-outs, RF interference, partial updates, and field debugging with minimal tooling.",
      recruiterPsych: "In the first scan, they look for: RTOS + bring-up proof, reliability metrics, and evidence you can debug hardware+software under pressure.",
      careerStory: "Built from driver-level work to owning fleet reliability\u2014turning lab behavior into predictable field behavior.",
      outputGoals: "Make impact visible fast: reliability, timing, power, and production readiness.",
    },
  },
  {
    roleId: "hardware",
    roleTitle: "Hardware Design Engineer (PCB / Signal)",
    tagLabel: "Hardware / PCB",
    summary: "Hardware design engineer who turns requirements into manufacturable boards\u2014power integrity, EMC, and testability included. Comfortable at the bench and in the DFM review, with a bias toward designs that ship cleanly and scale.",
    highlights: [
      "Designed 6-layer IoT gateway PCB with robust power tree; improved conducted EMI margin by 7 dB\u00b5V after layout + filtering iteration.",
      "Introduced boundary-scan + fixture strategy that cut first-article debug cycle from 10 days to 4 days.",
      "Improved yield from 92% to 98% by tightening component derating, solder-mask rules, and test-point coverage.",
    ],
    skills: [
      { title: "PCB & SI/PI", items: "Altium Designer, 4\u20138 layer stackups, impedance control, PDN design, decoupling strategy" },
      { title: "Validation", items: "EMI pre-scan, oscilloscope, VNA basics, thermal profiling, failure analysis" },
      { title: "DFM/DFT", items: "test points, fixtures, boundary scan, BOM risk review, manufacturability reviews" },
      { title: "Systems", items: "DC/DC, analog front ends, sensors, high-speed connectors, ESD protection" },
    ],
    experience: [
      {
        title: "Hardware Design Engineer", org: "Astra Edge Devices",
        location: "Bangkok, Thailand", dates: "Mar 2022 \u2013 Present",
        bullets: [
          "Owned schematic + layout for an ARM-based edge controller; delivered EVT\u2192DVT without respin by front-loading SI/PI and DFM checks.",
          "Built a repeatable bench validation checklist (power rails, clocks, IO margins); reduced bring-up uncertainty and shortened debug handoffs.",
          "Negotiated alternates for 18 constrained components and stabilized the BOM against shortages while preserving performance envelope.",
        ],
      },
      {
        title: "Electronics Engineer", org: "Kampong Tech Manufacturing",
        location: "Kampong Cham, Cambodia", dates: "Jul 2019 \u2013 Feb 2022",
        bullets: [
          "Designed fixture-based tests for SMT assemblies; improved fault localization and reduced rework time by 35%.",
          "Standardized ESD and component handling SOPs across the line; decreased field returns tied to handling defects.",
        ],
      },
    ],
    projects: [
      {
        title: "High-Reliability Power Module", meta: "Design + validation \u2022 2024",
        bullets: [
          "Designed a buck stage with load-step tuning and thermal margin; held ripple under 22 mVpp across operating conditions.",
          "Implemented protection (TVS, current limit, UVLO) to reduce \u201cmystery failures\u201d during field wiring mistakes.",
        ],
      },
    ],
    education: [
      {
        title: "B.Eng. Mechanical Engineering (Hardware-focused)", org: "Chulalongkorn University",
        location: "Bangkok, Thailand", dates: "2015 \u2013 2019",
        bullets: [
          "Coursework: Materials, manufacturing processes, CAD, controls, basic electronics and instrumentation.",
          "Senior project: energy harvesting device with PCB-based sensing and enclosure DFM.",
        ],
      },
    ],
    certs: ["IPC-A-610 Essentials (2023)", "EMC Pre-Compliance Workshop (2024)"],
    lens: {
      hiringContext: "Hardware teams are judged by how quickly they converge: fewer respins, clear validation, and resilient supply chains.",
      recruiterPsych: "They scan for ownership signals: shipped boards, yield improvements, and bench-level credibility (not just CAD screenshots).",
      careerStory: "Moved from manufacturing test to full board ownership\u2014designing with production reality in mind.",
      outputGoals: "Communicate manufacturability: SI/PI discipline, validation clarity, and yield/supply wins.",
    },
  },
  {
    roleId: "robotics",
    roleTitle: "Robotics Software Engineer (ROS2)",
    tagLabel: "Robotics / ROS2",
    summary: "Robotics engineer building dependable autonomy pipelines: perception, localization, and motion control that behave consistently outside the demo. Ships ROS2 systems with measurable safety and repeatability.",
    highlights: [
      "Improved localization stability by 40% by fusing IMU + wheel odometry with tuned EKF and outlier rejection.",
      "Reduced mission failure rate from 1/12 to 1/40 runs by hardening recovery behaviors and watchdog logic.",
      "Built simulation-first validation (Gazebo) with scenario suites; cut regression triage time by 50%.",
    ],
    skills: [
      { title: "Robotics Stack", items: "ROS2, Nav2, TF2, SLAM concepts, sensor fusion, behavior trees" },
      { title: "Perception", items: "OpenCV, point cloud basics, camera calibration, feature tracking" },
      { title: "Control", items: "PID tuning, kinematics, constraints, trajectory tracking" },
      { title: "Engineering", items: "C++/Python, Docker, Git, CI, profiling, logging discipline" },
    ],
    experience: [
      {
        title: "Robotics Software Engineer", org: "Harbor Automation",
        location: "Singapore", dates: "Jan 2022 \u2013 Present",
        bullets: [
          "Implemented navigation behaviors for indoor mobile robots; improved corridor throughput by 18% while respecting safety speed limits.",
          "Tuned sensor-fusion and map update policies to reduce oscillations near reflective surfaces; stabilized docking success to 97%.",
          "Built post-run analytics to flag anomaly trajectories and localization jumps; enabled faster root-cause isolation for field logs.",
        ],
      },
      {
        title: "Software Engineer (Autonomy)", org: "Mekong Robotics Lab",
        location: "Phnom Penh, Cambodia", dates: "Aug 2020 \u2013 Dec 2021",
        bullets: [
          "Developed calibration and time-sync tools for camera + IMU; reduced alignment drift that impacted tracking quality.",
          "Created repeatable lab scenarios with recorded sensor bags to validate algorithm changes before deployment.",
        ],
      },
    ],
    projects: [
      {
        title: "Warehouse Nav2 Benchmark Suite", meta: "Open-source style \u2022 2025",
        bullets: ["Defined scenario KPIs (time-to-goal, collision-free rate, path smoothness) and automated comparisons across releases."],
      },
    ],
    education: [
      {
        title: "B.S. Mechatronics Engineering", org: "National University of Singapore (Exchange)",
        location: "Singapore", dates: "2016 \u2013 2020",
        bullets: [
          "Hardware-focused labs: sensors, actuators, embedded control, and system identification.",
          "Senior project: autonomous cart with safety stop and repeatable docking routine.",
        ],
      },
    ],
    certs: ["ROS2 Navigation (Nav2) Workshop (2024)", "Industrial Safety Basics for Mobile Robots (2023)"],
    lens: {
      hiringContext: "Robotics hiring rewards repeatability: reducing edge-case failures, building validation loops, and being precise about safety.",
      recruiterPsych: "They scan for: ROS2 depth, measurable stability improvements, and proof you can debug messy real-world sensor data.",
      careerStory: "Shifted from algorithms to autonomy reliability\u2014shipping systems that behave outside controlled environments.",
      outputGoals: "Make autonomy credibility obvious: stability, safety, and validation discipline.",
    },
  },
  {
    roleId: "fullstack",
    roleTitle: "Full Stack Engineer (Web)",
    tagLabel: "Full Stack / Web",
    summary: "Full stack engineer who ships measurable product outcomes: fast UIs, stable APIs, and pragmatic infrastructure. Strong at turning unclear requirements into clean systems that teams can maintain.",
    highlights: [
      "Reduced page load (LCP) from 4.6s to 2.1s through caching, bundle trimming, and image pipeline tuning; lifted conversion by 9%.",
      "Designed event-driven order pipeline; decreased failed payments by 28% via idempotency keys and retry strategy.",
      "Built internal admin tools that reduced manual ops time by 6 hours/week via workflow automation.",
    ],
    skills: [
      { title: "Frontend", items: "React, TypeScript, accessibility, performance profiling, CSS architecture" },
      { title: "Backend", items: "Node.js, REST, PostgreSQL, Redis, queues, background jobs" },
      { title: "Infrastructure", items: "Docker, CI/CD, AWS basics, observability, rate limiting" },
      { title: "Product Delivery", items: "scoping, tradeoffs, rollout plans, incident response" },
    ],
    experience: [
      {
        title: "Senior Full Stack Engineer", org: "Atlas Commerce",
        location: "Kuala Lumpur, Malaysia", dates: "May 2023 \u2013 Present",
        bullets: [
          "Rebuilt checkout UI with performance budgets and server-side caching; increased successful checkouts by 11% on mobile.",
          "Implemented audit logging and role-based permissions for finance workflows; reduced \u201caccess confusion\u201d tickets by 45%.",
          "Introduced CI checks for type-safety and API contract tests; lowered production rollback frequency by 30%.",
        ],
      },
      {
        title: "Full Stack Engineer", org: "Mekong FinTech Studio",
        location: "Phnom Penh, Cambodia", dates: "Jan 2021 \u2013 Apr 2023",
        bullets: [
          "Built customer onboarding flow with robust validation and retry-safe APIs; reduced onboarding drop-off by 14%.",
          "Designed reporting endpoints and SQL optimizations; cut dashboard queries from 2.8s to 0.9s median.",
        ],
      },
    ],
    projects: [
      {
        title: "Resume-to-Job Match Scorer", meta: "Side project \u2022 2025",
        bullets: ["Built a keyword + weighting model that highlights missing requirements and suggests targeted bullet rewrites."],
      },
    ],
    education: [
      {
        title: "B.S. Computer Science (Hardware electives)", org: "Royal University of Phnom Penh",
        location: "Phnom Penh, Cambodia", dates: "2017 \u2013 2021",
        bullets: [
          "Coursework: Data Structures, Operating Systems, Database Systems, Embedded Systems fundamentals.",
          "Capstone: inventory tracking with barcode scanners and offline-first sync.",
        ],
      },
    ],
    certs: ["AWS Cloud Practitioner (2024)", "Web Performance & Core Web Vitals (2025)"],
    lens: {
      hiringContext: "Hiring teams want engineers who can lift conversion, reduce incidents, and build systems that don\u2019t require heroics to maintain.",
      recruiterPsych: "They scan for: metrics, ownership, and stack match. Clear numbers beat broad claims.",
      careerStory: "Progressed from shipping features to shaping reliability and performance as product levers.",
      outputGoals: "Make ROI obvious: speed, stability, and product outcomes.",
    },
  },
  {
    roleId: "research",
    roleTitle: "Research Associate (Materials / Photonics)",
    tagLabel: "Research / Photonics",
    summary: "Research associate working at the boundary of hardware, materials, and measurement. Builds reproducible experiments, publishes clearly, and translates lab results into device-level performance improvements.",
    highlights: [
      "Improved thin-film process stability by standardizing etch parameters and metrology; reduced variance in key dimensions by 22%.",
      "Built a documentation + data pipeline that made experiment reproduction faster; cut onboarding time for new lab members by ~30%.",
      "Co-authored 2 conference presentations and 1 manuscript draft; prioritized clarity and data integrity over volume.",
    ],
    skills: [
      { title: "Lab & Fabrication", items: "cleanroom workflows, lithography basics, thin-film deposition, etching, SEM coordination" },
      { title: "Measurement", items: "optical transmission setups, calibration, uncertainty tracking, data QC" },
      { title: "Data & Writing", items: "Python, Jupyter, plotting discipline, technical writing, versioned protocols" },
      { title: "Collaboration", items: "research coordination, mentoring juniors, presentation structure" },
    ],
    experience: [
      {
        title: "Research Associate", org: "Nanoscale Optics Group",
        location: "Cambridge, MA", dates: "Sep 2022 \u2013 Present",
        bullets: [
          "Optimized dry-etch recipes for TiO2 and diamond thin films; improved device yield by 12% across two fabrication runs.",
          "Characterized photonic devices using transmission measurements; created QC checklist to catch drift before it invalidated runs.",
          "Prepared figures and methods sections for internal manuscript drafts; ensured traceability from plots to raw data.",
        ],
      },
      {
        title: "Undergraduate Researcher", org: "Applied Physics Lab",
        location: "Phnom Penh, Cambodia", dates: "Jan 2020 \u2013 Aug 2022",
        bullets: [
          "Built repeatable experiment logs and standardized naming; improved data findability during reviews and audits.",
          "Trained peers on measurement setup and safety procedures; reduced setup errors in shared equipment use.",
        ],
      },
    ],
    projects: [
      {
        title: "Reproducible Lab Notebook Template", meta: "Internal tooling \u2022 2023",
        bullets: ["Designed a structured template for parameters, calibration state, and anomalies; reduced ambiguous experiment notes."],
      },
    ],
    education: [
      {
        title: "M.S. Materials Science & Engineering (Hardware track)", org: "Harvard University",
        location: "Cambridge, MA", dates: "2020 \u2013 2022",
        bullets: [
          "Coursework: nanofabrication, photonics, characterization, experimental design.",
          "Thesis: process control strategies for thin-film device reproducibility.",
        ],
      },
    ],
    certs: ["Research Integrity & Data Management (2022)", "Cleanroom Safety & Protocols (2021)"],
    publications: [
      "Conference: \u201cThin-film process stability for photonic resonators\u201d (Poster), 2025.",
      "Talk: \u201cMeasurement QA for transmission setups\u201d (Invited lab seminar), 2024.",
    ],
    lens: {
      hiringContext: "Research roles prioritize rigor: reproducibility, clear writing, and the ability to turn experimental mess into defensible results.",
      recruiterPsych: "They look for: coherent category structure (CV norms), publications/presentations evidence, and measurable lab impact.",
      careerStory: "From measurement reliability to process control\u2014making experiments faster to reproduce and easier to trust.",
      outputGoals: "Show research credibility: rigor, reproducibility, and published communication.",
    },
  },
  {
    roleId: "datasci",
    roleTitle: "Data Scientist / ML Engineer",
    tagLabel: "Data Science / ML",
    summary: "Data scientist who bridges statistical rigor with production ML\u2014turning messy business data into deployed models that move metrics. Strong at experiment design, feature engineering, and communicating uncertainty to stakeholders who need decisions, not dashboards.",
    highlights: [
      "Built churn prediction model (XGBoost) that identified 73% of at-risk accounts 30 days early; retention team recovered $2.1M ARR in first quarter.",
      "Reduced recommendation latency from 420ms to 85ms by converting batch pipeline to real-time feature store; lifted CTR by 11%.",
      "Designed A/B testing framework with power analysis and guardrail metrics; eliminated 4 inconclusive experiment cycles per quarter.",
    ],
    skills: [
      { title: "Machine Learning", items: "scikit-learn, XGBoost, PyTorch, experiment design, feature engineering, model evaluation" },
      { title: "Data Engineering", items: "SQL, Spark, Airflow, dbt, feature stores, data quality checks" },
      { title: "Analysis & Viz", items: "Python, pandas, hypothesis testing, Bayesian methods, Plotly, stakeholder reporting" },
      { title: "MLOps", items: "MLflow, Docker, CI/CD for models, monitoring, drift detection, A/B infrastructure" },
    ],
    experience: [
      {
        title: "Senior Data Scientist", org: "Vela Analytics",
        location: "Ho Chi Minh City, Vietnam", dates: "Apr 2023 \u2013 Present",
        bullets: [
          "Deployed demand forecasting model (LightGBM + calendar features) that reduced inventory waste by 18% across 12 warehouses.",
          "Built real-time anomaly detection pipeline for transaction fraud; flagged 92% of confirmed cases with <0.3% false-positive rate.",
          "Mentored 2 junior data scientists on experiment design and code review practices; both promoted within 14 months.",
        ],
      },
      {
        title: "Data Scientist", org: "Saigon FinTech",
        location: "Ho Chi Minh City, Vietnam", dates: "Jan 2021 \u2013 Mar 2023",
        bullets: [
          "Created credit scoring model using alternative data (mobile usage, repayment patterns); improved approval accuracy by 14% vs. legacy rules.",
          "Automated weekly reporting pipeline; freed 8 hours/week of analyst time and reduced data lag from 3 days to 4 hours.",
        ],
      },
    ],
    projects: [
      {
        title: "Open-Source Feature Store Benchmark", meta: "Side project \u2022 2025",
        bullets: ["Benchmarked Feast vs. custom Redis store on latency, consistency, and cost; published comparison used by 200+ practitioners."],
      },
    ],
    education: [
      {
        title: "M.S. Statistics (Machine Learning focus)", org: "University of Melbourne",
        location: "Melbourne, Australia", dates: "2019 \u2013 2021",
        bullets: [
          "Coursework: Statistical Learning, Bayesian Inference, Causal Inference, Time Series, Deep Learning fundamentals.",
          "Thesis: Robust feature selection under distribution shift in financial data.",
        ],
      },
    ],
    certs: ["Google Professional Machine Learning Engineer (2024)", "AWS Data Analytics Specialty (2023)"],
    lens: {
      hiringContext: "Data science hiring shifted from notebook demos to production impact: deployed models, measured outcomes, and reproducible experiments.",
      recruiterPsych: "They scan for: business metrics (revenue, retention, CTR), production deployment evidence, and statistical rigor\u2014not just Kaggle scores.",
      careerStory: "Progressed from analysis to production ML\u2014making models that survive real data and move real metrics.",
      outputGoals: "Make ROI obvious: models deployed, metrics moved, experiments that led to decisions.",
    },
  },
  {
    roleId: "product",
    roleTitle: "Product Manager (Tech)",
    tagLabel: "Product Manager",
    summary: "Product manager who ships by aligning user needs, business goals, and engineering capacity. Turns ambiguous opportunities into scoped roadmaps, measurable launches, and iterative improvements\u2014without mistaking activity for progress.",
    highlights: [
      "Led cross-functional launch of payment feature used by 340k+ MAU; drove 22% increase in transaction completion within 90 days.",
      "Defined and prioritized a 12-month roadmap that delivered 4 major features while reducing scope creep incidents by 60%.",
      "Established product analytics framework (funnels, cohorts, retention curves) that became the standard decision tool for 3 squads.",
    ],
    skills: [
      { title: "Product Strategy", items: "roadmapping, OKRs, competitive analysis, market sizing, go-to-market" },
      { title: "Execution", items: "sprint planning, backlog grooming, cross-functional coordination, launch checklists" },
      { title: "Analytics", items: "SQL, Amplitude, A/B testing, funnel analysis, cohort retention, stakeholder reporting" },
      { title: "Communication", items: "PRDs, executive briefings, user interviews, stakeholder management, design reviews" },
    ],
    experience: [
      {
        title: "Senior Product Manager", org: "Nusa Digital",
        location: "Jakarta, Indonesia", dates: "Jun 2023 \u2013 Present",
        bullets: [
          "Owned payments vertical end-to-end; coordinated 3 engineering pods, design, compliance, and ops to ship QR and wallet features.",
          "Ran 14 user interviews and synthesized findings into 3 persona-driven epics; improved onboarding completion by 19%.",
          "Introduced weekly metrics review ritual; reduced time-to-detect regressions from ~5 days to <24 hours.",
        ],
      },
      {
        title: "Product Manager", org: "Mekong Commerce",
        location: "Phnom Penh, Cambodia", dates: "Feb 2021 \u2013 May 2023",
        bullets: [
          "Scoped and launched seller dashboard with real-time inventory sync; reduced stock-out complaints by 34%.",
          "Partnered with data team to build cohort retention analysis; identified and fixed onboarding friction that was causing 28% early churn.",
        ],
      },
    ],
    projects: [
      {
        title: "Product Teardown Blog", meta: "Writing \u2022 ongoing",
        bullets: ["Published 12 deep-dive analyses of Southeast Asian fintech products; 3 posts featured in industry newsletters."],
      },
    ],
    education: [
      {
        title: "MBA (Technology Management)", org: "Asian Institute of Management",
        location: "Makati, Philippines", dates: "2019 \u2013 2021",
        bullets: [
          "Coursework: Product Strategy, Digital Transformation, Data-Driven Decision Making, Operations.",
          "Capstone: Go-to-market strategy for mobile banking in underserved rural markets.",
        ],
      },
    ],
    certs: ["Pragmatic Institute Certified Product Manager (2024)", "Google Analytics Certification (2023)"],
    lens: {
      hiringContext: "PM hiring favors proof of shipped outcomes over frameworks knowledge\u2014show launches, metrics moved, and cross-functional leadership.",
      recruiterPsych: "They scan for: user impact numbers, stakeholder management proof, and evidence you can prioritize under ambiguity.",
      careerStory: "From execution-focused PM to strategic product leader\u2014connecting user insights to business outcomes at scale.",
      outputGoals: "Make product leadership visible: launches, metrics, and the decisions that shaped outcomes.",
    },
  },
  {
    roleId: "cybersec",
    roleTitle: "Cybersecurity Analyst (Defense)",
    tagLabel: "Cybersecurity",
    summary: "Defensive security analyst who reduces exposure methodically: threat detection, incident response, and hardening that survives real attacks. Builds detection-as-code, automates triage, and keeps mean-time-to-respond measured and improving.",
    highlights: [
      "Reduced mean-time-to-detect (MTTD) from 72 hours to 8 hours by deploying SIEM correlation rules and automated alert enrichment.",
      "Led incident response for 3 critical events (ransomware attempt, credential stuffing, supply-chain probe); contained all within SLA.",
      "Authored 45+ detection rules (Sigma/YARA) with <2% false-positive rate; reduced alert fatigue across the SOC team.",
    ],
    skills: [
      { title: "Detection & Response", items: "SIEM (Splunk, Elastic), SOAR, Sigma rules, YARA, incident triage, forensics basics" },
      { title: "Hardening", items: "CIS benchmarks, IAM policies, network segmentation, vulnerability management, patch prioritization" },
      { title: "Threat Intel", items: "MITRE ATT&CK mapping, IOC curation, adversary emulation, purple team exercises" },
      { title: "Automation", items: "Python, Bash, detection-as-code, CI for rules, playbook development, API integrations" },
    ],
    experience: [
      {
        title: "Security Analyst II", org: "CyberShield Asia",
        location: "Taipei, Taiwan", dates: "Aug 2022 \u2013 Present",
        bullets: [
          "Deployed log correlation rules across 14 data sources; increased threat visibility and caught 2 previously-undetected lateral movement attempts.",
          "Automated phishing triage with SOAR playbooks; cut analyst handling time from 25 minutes to 6 minutes per incident.",
          "Conducted quarterly purple team exercises mapped to MITRE ATT&CK; validated 12 detection gaps and closed 10 within 30 days.",
        ],
      },
      {
        title: "Junior Security Analyst", org: "Mekong SecOps",
        location: "Phnom Penh, Cambodia", dates: "Mar 2020 \u2013 Jul 2022",
        bullets: [
          "Monitored SIEM alerts and triaged 50+ events/day; maintained <4-hour response SLA for P1 incidents.",
          "Standardized incident documentation and created runbooks for top 10 alert types; reduced onboarding time for new analysts by 40%.",
        ],
      },
    ],
    projects: [
      {
        title: "Detection-as-Code Pipeline", meta: "Internal tooling \u2022 2024",
        bullets: ["Built CI/CD pipeline for Sigma rules with automated testing against sample logs; prevented 3 broken rules from reaching production."],
      },
    ],
    education: [
      {
        title: "B.S. Computer Science (Security focus)", org: "National Taiwan University",
        location: "Taipei, Taiwan", dates: "2016 \u2013 2020",
        bullets: [
          "Coursework: Network Security, Cryptography, Operating Systems, Malware Analysis, Digital Forensics.",
          "Capstone: Honeypot deployment and attack pattern analysis for campus network defense.",
        ],
      },
    ],
    certs: [
      "CompTIA Security+ (2022)",
      "Certified SOC Analyst (CSA) \u2013 EC-Council (2023)",
      "GIAC Security Essentials (GSEC) (2024)",
    ],
    lens: {
      hiringContext: "Security hiring values detection engineering, incident response composure, and the ability to reduce noise\u2014not just compliance checkbox completion.",
      recruiterPsych: "They scan for: MTTD/MTTR improvements, detection rule authoring, incident leadership, and tooling automation\u2014not just cert lists.",
      careerStory: "From SOC monitoring to proactive threat engineering\u2014building detection systems that scale and reducing exposure before incidents happen.",
      outputGoals: "Show defensive impact: detection coverage, response speed, and noise reduction.",
    },
  },
  {
    roleId: "devops",
    roleTitle: "DevOps / Platform Engineer",
    tagLabel: "DevOps / SRE",
    summary: "Platform engineer who builds reliable deployment pipelines and observable infrastructure. Reduces deployment friction, improves system reliability, and enables teams to ship faster with confidence through automation and monitoring.",
    highlights: [
      "Reduced deployment time from 45 minutes to 8 minutes by implementing containerized CI/CD pipeline with parallel testing stages.",
      "Improved system uptime from 99.2% to 99.9% through proactive monitoring, auto-scaling policies, and incident response automation.",
      "Cut infrastructure costs by 32% through resource optimization, spot instance strategies, and automated scaling policies.",
    ],
    skills: [
      { title: "Cloud & Infrastructure", items: "AWS/Azure/GCP, Terraform, CloudFormation, Kubernetes, Docker, service mesh" },
      { title: "CI/CD & Automation", items: "Jenkins, GitLab CI, GitHub Actions, ArgoCD, Ansible, scripting (Bash/Python)" },
      { title: "Monitoring & Observability", items: "Prometheus, Grafana, ELK Stack, Datadog, distributed tracing, SLO/SLI design" },
      { title: "Reliability", items: "incident response, post-mortems, capacity planning, disaster recovery, chaos engineering" },
    ],
    experience: [
      {
        title: "Senior DevOps Engineer", org: "CloudScale Systems",
        location: "Singapore", dates: "Mar 2023 – Present",
        bullets: [
          "Architected multi-region Kubernetes platform serving 50+ microservices; achieved 99.95% uptime across 3 availability zones.",
          "Implemented GitOps workflow with ArgoCD; reduced configuration drift incidents by 85% and improved deployment auditability.",
          "Built comprehensive observability stack with custom dashboards and alerting; reduced mean-time-to-resolution from 2.5 hours to 35 minutes.",
        ],
      },
      {
        title: "DevOps Engineer", org: "TechFlow Solutions",
        location: "Kuala Lumpur, Malaysia", dates: "Jan 2021 – Feb 2023",
        bullets: [
          "Migrated monolithic application to containerized microservices; improved deployment frequency from weekly to daily releases.",
          "Automated infrastructure provisioning with Terraform; reduced environment setup time from 3 days to 2 hours.",
        ],
      },
    ],
    projects: [
      {
        title: "Internal Developer Platform", meta: "Platform tooling • 2024",
        bullets: ["Built self-service deployment platform that reduced developer wait time for environments from 8 hours to 15 minutes."],
      },
    ],
    education: [
      {
        title: "B.S. Computer Engineering", org: "National University of Singapore",
        location: "Singapore", dates: "2017 – 2021",
        bullets: [
          "Coursework: Distributed Systems, Cloud Computing, Network Engineering, Operating Systems.",
          "Capstone: Auto-scaling system for containerized applications based on custom metrics.",
        ],
      },
    ],
    certs: ["AWS Certified Solutions Architect – Professional (2024)", "Certified Kubernetes Administrator (CKA) (2023)", "HashiCorp Certified: Terraform Associate (2023)"],
    lens: {
      hiringContext: "DevOps roles reward reliability engineering: reducing toil, improving observability, and enabling teams to deploy confidently and frequently.",
      recruiterPsych: "They scan for: uptime improvements, deployment automation, incident response leadership, and infrastructure-as-code discipline.",
      careerStory: "Evolved from manual deployments to platform engineering—building systems that make reliability and velocity compatible.",
      outputGoals: "Make platform impact visible: uptime, deployment speed, cost optimization, and developer productivity.",
    },
  },
  {
    roleId: "blockchain",
    roleTitle: "Blockchain / Web3 Developer",
    tagLabel: "Blockchain / Web3",
    summary: "Blockchain developer building secure smart contracts and decentralized applications. Focuses on security auditing, gas optimization, and building trustless systems that handle real value with measurable safety guarantees.",
    highlights: [
      "Audited and secured 12 smart contracts managing $8.5M TVL; identified and fixed 3 critical vulnerabilities before mainnet deployment.",
      "Optimized gas costs by 45% through storage pattern improvements and batch transaction design; saved users $120k+ in fees annually.",
      "Built cross-chain bridge protocol with multi-sig security; processed 50k+ transactions with zero security incidents.",
    ],
    skills: [
      { title: "Smart Contracts", items: "Solidity, Rust (Solana), Vyper, OpenZeppelin, upgradeable patterns, security best practices" },
      { title: "Blockchain Platforms", items: "Ethereum, Polygon, Solana, Binance Smart Chain, Layer 2 solutions (Arbitrum, Optimism)" },
      { title: "Development Tools", items: "Hardhat, Foundry, Truffle, Web3.js, Ethers.js, IPFS, The Graph" },
      { title: "Security & Testing", items: "Slither, Mythril, formal verification, fuzzing, test coverage, audit preparation" },
    ],
    experience: [
      {
        title: "Senior Blockchain Developer", org: "DeFi Innovations Lab",
        location: "Remote", dates: "Jun 2023 – Present",
        bullets: [
          "Architected and deployed DeFi lending protocol with $12M TVL; maintained 100% uptime and zero exploits across 8 months of operation.",
          "Implemented comprehensive test suite with 98% coverage and formal verification for critical functions; caught 5 edge-case bugs pre-deployment.",
          "Led security audit preparation and remediation; achieved clean audit report from two independent firms.",
        ],
      },
      {
        title: "Blockchain Developer", org: "CryptoVentures",
        location: "Singapore", dates: "Feb 2021 – May 2023",
        bullets: [
          "Developed NFT marketplace smart contracts with royalty enforcement and gas-optimized batch minting; processed 25k+ transactions.",
          "Built automated testing and deployment pipeline; reduced contract deployment errors by 90%.",
        ],
      },
    ],
    projects: [
      {
        title: "DAO Governance Framework", meta: "Open-source • 2025",
        bullets: ["Created modular governance contracts with timelock, delegation, and proposal execution; adopted by 3 DAOs managing $2M+ treasury."],
      },
    ],
    education: [
      {
        title: "B.S. Computer Science (Cryptography focus)", org: "National University of Singapore",
        location: "Singapore", dates: "2017 – 2021",
        bullets: [
          "Coursework: Cryptography, Distributed Systems, Game Theory, Security Engineering.",
          "Thesis: Formal verification methods for smart contract security.",
        ],
      },
    ],
    certs: ["Certified Blockchain Security Professional (CBSP) (2024)", "Ethereum Developer Certification (2023)"],
    lens: {
      hiringContext: "Web3 hiring prioritizes security-first thinking: audit experience, gas optimization, and proven ability to handle real value safely.",
      recruiterPsych: "They scan for: TVL managed, security audit experience, gas optimization wins, and evidence of production contract deployments.",
      careerStory: "From smart contract development to security-focused blockchain architecture—building systems where code is law and bugs are expensive.",
      outputGoals: "Show blockchain credibility: TVL secured, audits passed, gas optimizations, and zero-exploit track record.",
    },
  },
  {
    roleId: "mobile",
    roleTitle: "Mobile Developer (iOS / Android)",
    tagLabel: "Mobile Dev",
    summary: "Mobile developer shipping polished native experiences with performance, accessibility, and offline-first design. Builds apps that feel fast, work reliably, and handle edge cases gracefully across diverse devices and network conditions.",
    highlights: [
      "Reduced app launch time from 3.2s to 1.1s through lazy loading, image optimization, and startup profiling; improved App Store rating from 4.1 to 4.7.",
      "Implemented offline-first architecture with conflict resolution; reduced data loss complaints by 95% and improved user retention by 18%.",
      "Built accessibility features achieving WCAG AA compliance; expanded addressable market by 12% and received positive press coverage.",
    ],
    skills: [
      { title: "iOS Development", items: "Swift, SwiftUI, UIKit, Combine, Core Data, push notifications, App Store optimization" },
      { title: "Android Development", items: "Kotlin, Jetpack Compose, MVVM, Room, WorkManager, Material Design, Play Store guidelines" },
      { title: "Cross-Platform", items: "React Native, Flutter, shared business logic, platform-specific optimizations" },
      { title: "Mobile Engineering", items: "performance profiling, battery optimization, offline sync, crash analytics, A/B testing" },
    ],
    experience: [
      {
        title: "Senior Mobile Engineer", org: "FinTech Mobile",
        location: "Jakarta, Indonesia", dates: "Apr 2023 – Present",
        bullets: [
          "Led iOS and Android development for banking app with 500k+ MAU; maintained 99.8% crash-free rate across 200+ device models.",
          "Implemented biometric authentication and secure enclave integration; passed security audit with zero critical findings.",
          "Optimized network layer with request batching and intelligent caching; reduced data usage by 40% and improved performance on 3G networks.",
        ],
      },
      {
        title: "Mobile Developer", org: "Southeast Digital",
        location: "Bangkok, Thailand", dates: "Jan 2021 – Mar 2023",
        bullets: [
          "Built e-commerce app features including product search, cart management, and payment integration; contributed to 25% revenue growth.",
          "Implemented comprehensive analytics and crash reporting; reduced critical bugs in production by 60% through data-driven prioritization.",
        ],
      },
    ],
    projects: [
      {
        title: "Offline-First News Reader", meta: "Side project • 2024",
        bullets: ["Built React Native app with intelligent prefetching and conflict-free sync; featured in Product Hunt with 500+ upvotes."],
      },
    ],
    education: [
      {
        title: "B.S. Software Engineering", org: "Chulalongkorn University",
        location: "Bangkok, Thailand", dates: "2017 – 2021",
        bullets: [
          "Coursework: Mobile Computing, Human-Computer Interaction, Software Architecture, Database Systems.",
          "Capstone: Cross-platform mobile app for local business discovery with offline maps.",
        ],
      },
    ],
    certs: ["Google Associate Android Developer (2023)", "iOS App Development with Swift Certification (2022)"],
    lens: {
      hiringContext: "Mobile hiring values polish and reliability: crash-free rates, performance metrics, and ability to ship features that work across device fragmentation.",
      recruiterPsych: "They scan for: App Store/Play Store links, performance improvements, crash rates, and evidence of handling scale and device diversity.",
      careerStory: "From feature development to mobile platform ownership—building apps that feel native, work offline, and delight users.",
      outputGoals: "Make mobile impact visible: performance metrics, crash rates, user ratings, and features that moved business metrics.",
    },
  },
  {
    roleId: "aiml",
    roleTitle: "AI/ML Research Engineer",
    tagLabel: "AI/ML Research",
    summary: "ML research engineer bridging academic research and production systems. Implements state-of-the-art models, runs rigorous experiments, and translates research papers into deployable systems that improve product metrics.",
    highlights: [
      "Implemented transformer-based recommendation system that improved CTR by 23% and user session time by 15% across 2M+ daily users.",
      "Reduced model inference latency from 850ms to 120ms through quantization, pruning, and TensorRT optimization while maintaining 98% accuracy.",
      "Published 2 papers at top-tier conferences (NeurIPS, CVPR) on efficient attention mechanisms; cited 150+ times within first year.",
    ],
    skills: [
      { title: "Deep Learning", items: "PyTorch, TensorFlow, Transformers, CNNs, RNNs, attention mechanisms, transfer learning" },
      { title: "ML Engineering", items: "model optimization, quantization, distillation, ONNX, TensorRT, model serving, A/B testing" },
      { title: "Research", items: "experiment design, paper implementation, ablation studies, statistical analysis, technical writing" },
      { title: "MLOps", items: "training pipelines, experiment tracking (W&B, MLflow), distributed training, GPU optimization" },
    ],
    experience: [
      {
        title: "Senior ML Research Engineer", org: "AI Labs Southeast Asia",
        location: "Singapore", dates: "May 2023 – Present",
        bullets: [
          "Led research on efficient vision transformers for mobile deployment; achieved 2.5x speedup with <1% accuracy loss, deployed to 5M+ devices.",
          "Built multi-modal search system combining text and image embeddings; improved search relevance by 35% measured through user engagement.",
          "Mentored 3 junior researchers on experiment design and paper writing; 2 papers accepted to major conferences.",
        ],
      },
      {
        title: "ML Research Engineer", org: "TechVision AI",
        location: "Seoul, South Korea", dates: "Jan 2021 – Apr 2023",
        bullets: [
          "Implemented and optimized BERT-based NLP models for multilingual text classification; achieved 92% F1 score across 8 languages.",
          "Built automated hyperparameter tuning pipeline; reduced experiment iteration time from 3 days to 8 hours.",
        ],
      },
    ],
    projects: [
      {
        title: "Efficient Attention Library", meta: "Open-source • 2024",
        bullets: ["Released PyTorch library for memory-efficient attention mechanisms; 2k+ GitHub stars, used in production by 5 companies."],
      },
    ],
    education: [
      {
        title: "Ph.D. Computer Science (Machine Learning)", org: "KAIST",
        location: "Daejeon, South Korea", dates: "2019 – 2023",
        bullets: [
          "Dissertation: Efficient architectures for vision-language models.",
          "Published 5 papers at NeurIPS, ICLR, CVPR on model efficiency and multimodal learning.",
        ],
      },
    ],
    certs: ["TensorFlow Developer Certificate (2022)", "AWS Machine Learning Specialty (2024)"],
    publications: [
      "NeurIPS 2024: 'Sparse Attention Mechanisms for Efficient Transformers'",
      "CVPR 2023: 'Cross-Modal Retrieval with Contrastive Learning'",
    ],
    lens: {
      hiringContext: "ML research roles reward both research rigor and production impact: published papers, deployed models, and measurable product improvements.",
      recruiterPsych: "They scan for: top-tier publications, production deployments, performance optimizations, and ability to bridge research and engineering.",
      careerStory: "From academic research to applied ML—implementing cutting-edge models that ship to millions while advancing the field.",
      outputGoals: "Show research + engineering impact: papers published, models deployed, metrics improved, and systems optimized.",
    },
  },
  {
    roleId: "cloud",
    roleTitle: "Cloud Architect / Solutions Architect",
    tagLabel: "Cloud Architect",
    summary: "Cloud architect designing scalable, secure, and cost-effective cloud infrastructure. Translates business requirements into technical architecture, leads cloud migrations, and establishes best practices for multi-cloud environments.",
    highlights: [
      "Architected multi-region cloud infrastructure serving 10M+ users with 99.99% uptime; designed for disaster recovery with <15min RTO.",
      "Led cloud migration of legacy monolith to microservices; reduced infrastructure costs by 45% while improving performance by 3x.",
      "Designed zero-trust security architecture with identity-based access; passed SOC 2 Type II audit with zero findings.",
    ],
    skills: [
      { title: "Cloud Platforms", items: "AWS (Solutions Architect Pro), Azure, GCP, multi-cloud strategy, hybrid cloud" },
      { title: "Architecture", items: "microservices, event-driven, serverless, API design, scalability patterns, disaster recovery" },
      { title: "Security & Compliance", items: "IAM, encryption, network security, compliance frameworks (SOC 2, HIPAA, GDPR)" },
      { title: "Cost Optimization", items: "FinOps, reserved instances, spot instances, resource rightsizing, cost allocation" },
    ],
    experience: [
      {
        title: "Principal Cloud Architect", org: "Enterprise Cloud Solutions",
        location: "Singapore", dates: "Jun 2023 – Present",
        bullets: [
          "Designed cloud architecture for financial services platform handling $500M+ annual transaction volume; achieved PCI DSS compliance.",
          "Led architecture review board evaluating 20+ major initiatives; prevented 3 costly architectural mistakes through early intervention.",
          "Established cloud center of excellence; created reference architectures and best practices adopted across 15 product teams.",
        ],
      },
      {
        title: "Senior Cloud Architect", org: "Digital Transformation Partners",
        location: "Kuala Lumpur, Malaysia", dates: "Feb 2021 – May 2023",
        bullets: [
          "Architected and executed cloud migration for enterprise client; moved 50+ applications to AWS with zero downtime.",
          "Designed auto-scaling architecture that reduced infrastructure costs by 40% while handling 5x traffic spikes during peak events.",
        ],
      },
    ],
    projects: [
      {
        title: "Cloud Cost Optimization Framework", meta: "Internal tooling • 2024",
        bullets: ["Built automated cost analysis and recommendation system; identified $2M+ in annual savings across client portfolio."],
      },
    ],
    education: [
      {
        title: "M.S. Computer Science (Distributed Systems)", org: "National University of Singapore",
        location: "Singapore", dates: "2019 – 2021",
        bullets: [
          "Coursework: Cloud Computing, Distributed Systems, Network Security, Software Architecture.",
          "Thesis: Cost-performance optimization for serverless computing platforms.",
        ],
      },
    ],
    certs: [
      "AWS Certified Solutions Architect – Professional (2024)",
      "Google Cloud Professional Cloud Architect (2023)",
      "Azure Solutions Architect Expert (2023)",
      "TOGAF 9 Certified (2022)",
    ],
    lens: {
      hiringContext: "Cloud architecture roles demand both technical depth and business acumen: designing for scale, security, and cost while aligning with business goals.",
      recruiterPsych: "They scan for: multi-cloud expertise, migration leadership, cost optimization wins, and security/compliance experience.",
      careerStory: "From infrastructure engineering to enterprise architecture—designing cloud systems that scale globally while controlling costs.",
      outputGoals: "Make architectural impact visible: uptime, cost savings, successful migrations, and security posture improvements.",
    },
  },
  {
    roleId: "ux",
    roleTitle: "UX / Product Designer",
    tagLabel: "UX / Design",
    summary: "Product designer who turns ambiguous problems into clear, tested interfaces. Combines user research, interaction design, and data analysis to ship experiences that reduce friction and move business metrics.",
    highlights: [
      "Redesigned onboarding flow based on 22 user interviews; reduced drop-off by 34% and cut time-to-first-value from 8 minutes to 2.5 minutes.",
      "Built and maintained design system adopted by 6 product teams; reduced design-to-dev handoff time by 50% and improved UI consistency.",
      "Led accessibility audit and remediation; achieved WCAG AA compliance and expanded user base by 11%.",
    ],
    skills: [
      {title: "Design Tools", items: "Figma, Protopie, Framer, Adobe XD, design systems, component libraries"},
      {title: "Research", items: "user interviews, usability testing, card sorting, journey mapping, heuristic evaluation"},
      {title: "Interaction Design", items: "information architecture, wireframing, prototyping, micro-interactions, motion design"},
      {title: "Data & Metrics", items: "Hotjar, Mixpanel, A/B testing, funnel analysis, accessibility auditing"},
    ],
    experience: [
      {
        title: "Senior Product Designer", org: "Finova Digital",
        location: "Singapore", dates: "Apr 2023 – Present",
        bullets: [
          "Owned end-to-end design for payments product used by 800k+ users; shipped 6 major features with measurable retention improvements.",
          "Established design critique and review process; reduced design rework cycles from 4 rounds to 1.5 on average.",
          "Partnered with data team to build behavioral analytics dashboards; identified 3 high-impact friction points that became roadmap priorities.",
        ],
      },
      {
        title: "UX Designer", org: "Mekong Digital Studio",
        location: "Phnom Penh, Cambodia", dates: "Jan 2021 – Mar 2023",
        bullets: [
          "Designed mobile-first e-commerce experience for Southeast Asian market; improved checkout completion by 22%.",
          "Conducted 40+ usability sessions and synthesized findings into actionable design recommendations.",
        ],
      },
    ],
    projects: [
      {
        title: "Open Design System", meta: "Side project • 2024",
        bullets: ["Built accessible component library with 80+ components; 1.2k GitHub stars, used by 15+ startups."],
      },
    ],
    education: [
      {
        title: "B.Des. Interaction Design", org: "LASALLE College of the Arts",
        location: "Singapore", dates: "2017 – 2021",
        bullets: [
          "Coursework: Human-Computer Interaction, Visual Communication, Design Research, Prototyping.",
          "Capstone: Inclusive banking app design for elderly users in Southeast Asia.",
        ],
      },
    ],
    certs: ["Google UX Design Certificate (2022)", "Nielsen Norman Group UX Certification (2024)"],
    lens: {
      hiringContext: "Design hiring rewards research-backed decisions, measurable outcomes, and the ability to align design work with business goals.",
      recruiterPsych: "They scan for: portfolio quality, user research depth, metrics tied to design decisions, and cross-functional collaboration.",
      careerStory: "From visual design to product design leadership—connecting user insights to business outcomes through rigorous research and iteration.",
      outputGoals: "Make design impact visible: user metrics improved, research conducted, systems built, and accessibility achieved.",
    },
  },
  {
    roleId: "devsec",
    roleTitle: "DevSecOps / Application Security Engineer",
    tagLabel: "DevSecOps",
    summary: "Application security engineer embedding security into the development lifecycle. Shifts security left through automated scanning, developer education, and threat modeling—reducing vulnerabilities before they reach production.",
    highlights: [
      "Reduced critical vulnerabilities in production by 78% by integrating SAST/DAST into CI/CD pipeline and enforcing security gates.",
      "Built developer security training program; improved secure coding assessment scores by 45% across 80+ engineers in 6 months.",
      "Led threat modeling for 3 high-value services; identified 12 design-level risks and drove remediation before launch.",
    ],
    skills: [
      {title: "AppSec Tools", items: "SAST (Semgrep, SonarQube), DAST (OWASP ZAP, Burp Suite), SCA (Snyk, Dependabot), secrets scanning"},
      {title: "Secure Development", items: "threat modeling (STRIDE), secure code review, OWASP Top 10, API security, auth patterns"},
      {title: "DevSecOps", items: "CI/CD security gates, container scanning, IaC security (Checkov, tfsec), policy-as-code"},
      {title: "Compliance", items: "OWASP ASVS, NIST CSF, PCI DSS, GDPR technical controls, audit support"},
    ],
    experience: [
      {
        title: "Senior Application Security Engineer", org: "SecureStack Asia",
        location: "Singapore", dates: "May 2023 – Present",
        bullets: [
          "Integrated security scanning into 25+ CI/CD pipelines; blocked 340+ high-severity findings from reaching production in first year.",
          "Established bug bounty program and triage process; resolved 18 valid external reports with average 4-day remediation time.",
          "Created security champions program across 8 engineering teams; reduced security review bottlenecks by 60%.",
        ],
      },
      {
        title: "Application Security Engineer", org: "FinGuard Technologies",
        location: "Kuala Lumpur, Malaysia", dates: "Feb 2021 – Apr 2023",
        bullets: [
          "Performed 30+ application penetration tests; identified critical auth bypass and injection vulnerabilities before production.",
          "Automated dependency vulnerability scanning; reduced mean-time-to-patch for critical CVEs from 21 days to 5 days.",
        ],
      },
    ],
    projects: [
      {
        title: "Security Pipeline Toolkit", meta: "Open-source • 2024",
        bullets: ["Built reusable GitHub Actions security workflow templates; adopted by 50+ repositories across 3 organizations."],
      },
    ],
    education: [
      {
        title: "B.S. Information Security", org: "Nanyang Technological University",
        location: "Singapore", dates: "2017 – 2021",
        bullets: [
          "Coursework: Application Security, Penetration Testing, Cryptography, Secure Software Development.",
          "Capstone: Automated vulnerability detection framework for web applications.",
        ],
      },
    ],
    certs: ["OSCP (Offensive Security Certified Professional) (2023)", "Certified Application Security Engineer (CASE) (2024)", "AWS Security Specialty (2024)"],
    lens: {
      hiringContext: "DevSecOps roles reward automation-first thinking: shifting security left, reducing developer friction, and proving measurable risk reduction.",
      recruiterPsych: "They scan for: CI/CD security integration, vulnerability reduction metrics, developer enablement, and hands-on pen testing experience.",
      careerStory: "From reactive security testing to proactive security engineering—building systems where security is a feature, not a gate.",
      outputGoals: "Show security impact: vulnerabilities blocked, pipelines secured, developer adoption, and risk reduction metrics.",
    },
  },
  {
    roleId: "dataeng",
    roleTitle: "Data Engineer / Analytics Engineer",
    tagLabel: "Data Engineering",
    summary: "Data engineer building reliable pipelines and analytics infrastructure that teams actually trust. Focuses on data quality, pipeline observability, and modeling that makes downstream analysis fast and accurate.",
    highlights: [
      "Built real-time data platform processing 2B+ events/day with <500ms latency; enabled product teams to act on live user behavior.",
      "Reduced data pipeline failures by 85% through comprehensive testing, monitoring, and automated alerting on data quality metrics.",
      "Designed dimensional data model that cut average analyst query time from 45 seconds to 3 seconds across 200+ daily users.",
    ],
    skills: [
      {title: "Pipeline & Orchestration", items: "Apache Spark, Kafka, Airflow, dbt, Flink, batch and streaming architectures"},
      {title: "Storage & Warehousing", items: "Snowflake, BigQuery, Redshift, Delta Lake, data modeling, partitioning strategies"},
      {title: "Data Quality", items: "Great Expectations, dbt tests, data contracts, lineage tracking, anomaly detection"},
      {title: "Engineering", items: "Python, SQL, Scala, Docker, Terraform, CI/CD for data, cost optimization"},
    ],
    experience: [
      {
        title: "Senior Data Engineer", org: "DataFlow Analytics",
        location: "Ho Chi Minh City, Vietnam", dates: "Jun 2023 – Present",
        bullets: [
          "Architected lakehouse platform on Delta Lake; unified batch and streaming data for 15 product teams with single source of truth.",
          "Implemented data contracts between producers and consumers; reduced breaking schema changes from 8/month to 0 in 6 months.",
          "Built cost monitoring and optimization system; reduced Snowflake spend by 38% through query optimization and clustering strategies.",
        ],
      },
      {
        title: "Data Engineer", org: "Mekong Commerce",
        location: "Phnom Penh, Cambodia", dates: "Jan 2021 – May 2023",
        bullets: [
          "Built ELT pipelines ingesting data from 20+ sources; reduced data freshness from T+1 day to T+2 hours for critical metrics.",
          "Migrated legacy ETL scripts to dbt; improved test coverage from 0% to 85% and reduced pipeline maintenance time by 50%.",
        ],
      },
    ],
    projects: [
      {
        title: "Open Data Quality Framework", meta: "Open-source • 2024",
        bullets: ["Built lightweight data quality monitoring library for dbt projects; 800+ GitHub stars, used in production by 20+ teams."],
      },
    ],
    education: [
      {
        title: "B.S. Computer Science (Database Systems)", org: "University of Technology Ho Chi Minh City",
        location: "Ho Chi Minh City, Vietnam", dates: "2017 – 2021",
        bullets: [
          "Coursework: Database Systems, Distributed Computing, Data Warehousing, Algorithms.",
          "Capstone: Real-time analytics platform for e-commerce transaction monitoring.",
        ],
      },
    ],
    certs: ["dbt Certified Developer (2024)", "Google Professional Data Engineer (2023)", "Databricks Certified Associate Developer (2024)"],
    lens: {
      hiringContext: "Data engineering hiring rewards reliability and trust: pipelines that don’t break, data that analysts can rely on, and infrastructure that scales.",
      recruiterPsych: "They scan for: pipeline scale (events/day), data quality metrics, warehouse optimization, and evidence of cross-team impact.",
      careerStory: "From building pipelines to owning data infrastructure—making data reliable, fast, and trustworthy at scale.",
      outputGoals: "Make data engineering impact visible: pipeline reliability, query performance, data quality, and cost optimization.",
    },
  },
  {
    roleId: "sre",
    roleTitle: "Site Reliability Engineer (SRE)",
    tagLabel: "SRE / Reliability",
    summary: "SRE who treats reliability as a product feature. Defines and defends SLOs, reduces toil through automation, and builds systems that fail gracefully and recover fast—keeping engineering teams focused on features, not firefighting.",
    highlights: [
      "Defined SLO framework across 12 services; reduced P1 incidents by 55% and improved mean-time-to-recovery from 4.2 hours to 28 minutes.",
      "Automated 70% of recurring operational tasks; freed 15 engineering hours/week and eliminated 3 classes of human-error incidents.",
      "Led capacity planning initiative; prevented 2 projected outages during peak traffic events through proactive scaling and load testing.",
    ],
    skills: [
      {title: "Reliability Engineering", items: "SLO/SLI/error budgets, incident management, post-mortems, chaos engineering, capacity planning"},
      {title: "Observability", items: "Prometheus, Grafana, Jaeger, OpenTelemetry, distributed tracing, log aggregation, alerting design"},
      {title: "Automation & Toil Reduction", items: "Python, Go, Bash, runbook automation, self-healing systems, auto-remediation"},
      {title: "Infrastructure", items: "Kubernetes, Terraform, service mesh (Istio), load balancing, traffic management"},
    ],
    experience: [
      {
        title: "Senior Site Reliability Engineer", org: "Apex Platform",
        location: "Singapore", dates: "Jul 2023 – Present",
        bullets: [
          "Established error budget policy and SLO review cadence; aligned engineering priorities with reliability targets across 5 product teams.",
          "Built automated incident response playbooks with PagerDuty integration; reduced alert-to-action time from 18 minutes to 4 minutes.",
          "Implemented progressive delivery with feature flags and canary releases; reduced blast radius of deployments by 90%.",
        ],
      },
      {
        title: "SRE / Infrastructure Engineer", org: "CloudNative Solutions",
        location: "Bangkok, Thailand", dates: "Mar 2021 – Jun 2023",
        bullets: [
          "Migrated alerting from threshold-based to symptom-based; reduced alert noise by 65% while improving signal quality.",
          "Built load testing framework simulating realistic traffic patterns; identified 4 bottlenecks before production incidents occurred.",
        ],
      },
    ],
    projects: [
      {
        title: "SLO Toolkit", meta: "Open-source • 2024",
        bullets: ["Built Prometheus-based SLO calculation and burn-rate alerting library; adopted by 30+ teams across 8 companies."],
      },
    ],
    education: [
      {
        title: "B.S. Computer Science (Systems)", org: "Chulalongkorn University",
        location: "Bangkok, Thailand", dates: "2017 – 2021",
        bullets: [
          "Coursework: Operating Systems, Distributed Systems, Computer Networks, Performance Engineering.",
          "Capstone: Fault-tolerant distributed key-value store with automatic leader election.",
        ],
      },
    ],
    certs: ["Google Cloud Professional DevOps Engineer (2024)", "Certified Kubernetes Administrator (CKA) (2023)", "PagerDuty Certified (2022)"],
    lens: {
      hiringContext: "SRE hiring values measurable reliability improvements: SLO discipline, toil reduction, and incident response that gets faster over time.",
      recruiterPsych: "They scan for: MTTR/MTTD improvements, SLO ownership, automation wins, and post-mortem culture evidence.",
      careerStory: "From reactive ops to proactive reliability engineering—building systems that self-heal and teams that sleep through the night.",
      outputGoals: "Make reliability impact visible: uptime improvements, incident reduction, toil eliminated, and SLO compliance.",
    },
  },
  {
    roleId: "genai",
    roleTitle: "Generative AI / LLM Engineer",
    tagLabel: "GenAI / LLM",
    summary: "LLM engineer building production-grade AI applications: RAG pipelines, fine-tuned models, and agentic systems that deliver reliable, measurable value. Focuses on evaluation rigor, latency optimization, and responsible deployment.",
    highlights: [
      "Built RAG-based enterprise search system reducing average query resolution time from 12 minutes to 45 seconds across 5,000 employees.",
      "Fine-tuned domain-specific LLM achieving 91% accuracy on internal classification tasks vs. 67% for GPT-4 zero-shot baseline.",
      "Designed LLM evaluation framework with 200+ test cases; reduced hallucination rate from 18% to 3% before production deployment.",
    ],
    skills: [
      {title: "LLM & GenAI", items: "OpenAI API, Anthropic Claude, LLaMA, fine-tuning (LoRA/QLoRA), prompt engineering, RAG"},
      {title: "Frameworks", items: "LangChain, LlamaIndex, Haystack, vector databases (Pinecone, Weaviate, pgvector)"},
      {title: "Evaluation & Safety", items: "LLM evaluation frameworks, RAGAS, hallucination detection, guardrails, red-teaming"},
      {title: "MLOps", items: "model serving (vLLM, TGI), latency optimization, cost management, A/B testing, monitoring"},
    ],
    experience: [
      {
        title: "Senior LLM Engineer", org: "AI Ventures Asia",
        location: "Singapore", dates: "Jan 2024 – Present",
        bullets: [
          "Architected multi-agent system for automated code review; reduced review cycle time by 40% while maintaining engineer satisfaction scores.",
          "Built production RAG pipeline with hybrid search and re-ranking; improved answer relevance from 62% to 89% on internal benchmarks.",
          "Implemented cost optimization strategy (caching, model routing, batching); reduced LLM API costs by 55% at same quality level.",
        ],
      },
      {
        title: "ML Engineer (NLP)", org: "TechForward",
        location: "Kuala Lumpur, Malaysia", dates: "Jun 2022 – Dec 2023",
        bullets: [
          "Built multilingual text classification system using fine-tuned BERT; achieved 94% F1 across 6 Southeast Asian languages.",
          "Designed prompt optimization pipeline with automated evaluation; improved task completion rate by 28% through systematic iteration.",
        ],
      },
    ],
    projects: [
      {
        title: "LLM Evaluation Harness", meta: "Open-source • 2025",
        bullets: ["Built modular evaluation framework for RAG systems; 1.5k GitHub stars, cited in 3 industry blog posts on LLM reliability."],
      },
    ],
    education: [
      {
        title: "M.S. Computer Science (NLP / AI)", org: "Nanyang Technological University",
        location: "Singapore", dates: "2020 – 2022",
        bullets: [
          "Coursework: Natural Language Processing, Deep Learning, Information Retrieval, Probabilistic Graphical Models.",
          "Thesis: Efficient domain adaptation for low-resource multilingual NLP.",
        ],
      },
    ],
    certs: ["DeepLearning.AI LLMOps Specialization (2024)", "OpenAI API Developer Certification (2024)"],
    lens: {
      hiringContext: "GenAI hiring rewards production discipline: evaluation rigor, hallucination reduction, cost management, and systems that work reliably beyond demos.",
      recruiterPsych: "They scan for: RAG/fine-tuning experience, evaluation frameworks, production deployments, and measurable accuracy/latency improvements.",
      careerStory: "From NLP engineering to LLM systems—building AI applications that are reliable, measurable, and cost-effective in production.",
      outputGoals: "Show GenAI credibility: accuracy improvements, hallucination reduction, latency/cost optimization, and production deployments.",
    },
  },
  {
    roleId: "quant",
    roleTitle: "Quantitative Analyst / Quant Developer",
    tagLabel: "Quant / FinTech",
    summary: "Quantitative analyst building systematic trading strategies and risk models. Combines statistical rigor, financial theory, and high-performance engineering to deliver alpha-generating systems with robust risk controls.",
    highlights: [
      "Developed mean-reversion equity strategy with Sharpe ratio of 1.8; deployed to live trading with $15M AUM and consistent monthly alpha.",
      "Built real-time risk monitoring system processing 500k+ market events/second; reduced risk limit breach detection from 30 seconds to 200ms.",
      "Optimized backtesting engine with vectorized computation; reduced strategy research cycle from 3 days to 4 hours.",
    ],
    skills: [
      {title: "Quantitative Finance", items: "statistical arbitrage, factor models, options pricing, risk management, portfolio optimization"},
      {title: "Programming", items: "Python (NumPy, pandas, scipy), C++, R, SQL, vectorized computation, parallel processing"},
      {title: "ML for Finance", items: "time series forecasting, regime detection, alternative data, feature engineering, backtesting"},
      {title: "Infrastructure", items: "low-latency systems, market data feeds, execution algorithms, real-time risk, FIX protocol"},
    ],
    experience: [
      {
        title: "Quantitative Developer", org: "Meridian Capital",
        location: "Hong Kong", dates: "Mar 2023 – Present",
        bullets: [
          "Researched and implemented 4 systematic equity strategies; 3 passed live trading validation with positive risk-adjusted returns.",
          "Built alternative data ingestion pipeline (satellite, web scraping, NLP signals); improved factor model predictive power by 18%.",
          "Designed execution algorithm with adaptive order sizing; reduced market impact costs by 22% vs. VWAP baseline.",
        ],
      },
      {
        title: "Quantitative Analyst", org: "Pacific Quant Fund",
        location: "Singapore", dates: "Jul 2021 – Feb 2023",
        bullets: [
          "Built cross-sectional momentum factor model; contributed to 12% annual alpha in equity long-short portfolio.",
          "Automated daily P&L attribution and risk reporting; reduced manual reporting time from 3 hours to 15 minutes.",
        ],
      },
    ],
    projects: [
      {
        title: "Open Backtesting Framework", meta: "Open-source • 2024",
        bullets: ["Built vectorized backtesting engine with realistic transaction cost modeling; 900+ GitHub stars, used by 50+ quant researchers."],
      },
    ],
    education: [
      {
        title: "M.S. Financial Engineering", org: "National University of Singapore",
        location: "Singapore", dates: "2019 – 2021",
        bullets: [
          "Coursework: Stochastic Calculus, Derivatives Pricing, Portfolio Theory, Econometrics, Algorithmic Trading.",
          "Thesis: Machine learning approaches to regime detection in equity markets.",
        ],
      },
    ],
    certs: ["CFA Level II (2023)", "FRM Part II (2024)", "Certificate in Quantitative Finance (CQF) (2022)"],
    lens: {
      hiringContext: "Quant roles demand both research rigor and engineering discipline: strategies that survive live trading, risk systems that catch problems fast.",
      recruiterPsych: "They scan for: live trading experience, Sharpe ratios, risk system ownership, and evidence of full research-to-production pipeline.",
      careerStory: "From academic finance to systematic trading—building strategies that generate alpha and infrastructure that keeps risk under control.",
      outputGoals: "Show quant credibility: live strategies deployed, risk metrics, alpha generated, and engineering performance wins.",
    },
  },
  {
    roleId: "biomedeng",
    roleTitle: "Biomedical / Medical Device Engineer",
    tagLabel: "Biomedical Eng.",
    summary: "Biomedical engineer developing regulated medical devices from concept to clinical validation. Navigates FDA/CE regulatory pathways, designs for safety and reliability, and translates clinical requirements into manufacturable hardware.",
    highlights: [
      "Led hardware development for Class II wearable cardiac monitor; achieved FDA 510(k) clearance on first submission with zero deficiencies.",
      "Reduced device power consumption by 42% through analog front-end optimization; extended continuous monitoring from 48 to 82 hours.",
      "Designed and executed IEC 60601-1 safety testing protocol; identified and resolved 4 compliance gaps before formal lab testing.",
    ],
    skills: [
      {title: "Medical Device Design", items: "analog front-end, biosignal acquisition (ECG, EMG, EEG), sensor integration, low-noise design"},
      {title: "Regulatory", items: "FDA 510(k)/PMA, ISO 13485, IEC 60601-1, risk management (ISO 14971), design controls, DHF"},
      {title: "Embedded & Firmware", items: "C, ARM Cortex-M, real-time signal processing, DSP algorithms, BLE health profiles"},
      {title: "Validation & Testing", items: "V&V protocols, biocompatibility, EMC/EMI, clinical study support, FMEA"},
    ],
    experience: [
      {
        title: "Senior Medical Device Engineer", org: "MedTech Innovations",
        location: "Singapore", dates: "Apr 2023 – Present",
        bullets: [
          "Designed analog front-end for 12-lead ECG acquisition with 24-bit ADC; achieved clinical-grade signal quality (SNR >60 dB) in ambulatory conditions.",
          "Authored Design History File and risk management documentation; supported successful ISO 13485 audit with zero major findings.",
          "Collaborated with clinical team on usability study (IEC 62366); incorporated 18 design changes that improved clinician task completion by 35%.",
        ],
      },
      {
        title: "Biomedical Engineer", org: "HealthTech Labs",
        location: "Phnom Penh, Cambodia", dates: "Feb 2021 – Mar 2023",
        bullets: [
          "Developed firmware for pulse oximetry device; implemented SpO2 algorithm achieving ±1.5% accuracy vs. reference oximeter.",
          "Built automated test fixtures for production verification; reduced test time per unit from 8 minutes to 90 seconds.",
        ],
      },
    ],
    projects: [
      {
        title: "Open-Source ECG Signal Library", meta: "Research tool • 2024",
        bullets: ["Released Python library for ECG signal processing and arrhythmia detection; used in 3 academic research projects."],
      },
    ],
    education: [
      {
        title: "M.S. Biomedical Engineering", org: "National University of Singapore",
        location: "Singapore", dates: "2019 – 2021",
        bullets: [
          "Coursework: Biosignal Processing, Medical Instrumentation, Regulatory Affairs, Biomaterials.",
          "Thesis: Low-power wearable ECG acquisition system for long-term cardiac monitoring.",
        ],
      },
    ],
    certs: ["Regulatory Affairs Certification (RAC) – RAPS (2023)", "ISO 13485 Internal Auditor (2024)"],
    publications: [
      "Journal: ‘Low-power ECG acquisition for ambulatory monitoring’, IEEE TBME, 2024.",
      "Conference: ‘Noise reduction techniques for wearable biosignal devices’, EMBC 2023.",
    ],
    lens: {
      hiringContext: "Medical device roles demand regulatory fluency alongside engineering rigor: designs that are safe, compliant, and manufacturable.",
      recruiterPsych: "They scan for: regulatory submission experience, ISO 13485 familiarity, clinical validation, and signal quality metrics.",
      careerStory: "From biosignal hardware to full device development—building medical devices that meet clinical standards and regulatory requirements.",
      outputGoals: "Show medical device credibility: regulatory clearances, signal quality metrics, compliance achievements, and clinical validation.",
    },
  },
  {
    roleId: "supplychain",
    roleTitle: "Supply Chain / Operations Engineer",
    tagLabel: "Supply Chain / Ops",
    summary: "Operations engineer applying data-driven methods to supply chain design, demand forecasting, and logistics optimization. Reduces costs, improves service levels, and builds resilient supply networks that adapt to disruption.",
    highlights: [
      "Redesigned regional distribution network using optimization modeling; reduced logistics costs by 19% while improving on-time delivery from 87% to 96%.",
      "Built demand forecasting model (ensemble ML) that reduced forecast error by 31%; decreased excess inventory by $4.2M annually.",
      "Led supplier diversification initiative after single-source disruption; reduced supply risk exposure by 60% across 12 critical components.",
    ],
    skills: [
      { title: "Supply Chain Analytics", items: "demand forecasting, inventory optimization, network design, S&OP, simulation modeling" },
      { title: "Operations Research", items: "linear programming, mixed-integer optimization, Python (PuLP, OR-Tools), scenario analysis" },
      { title: "Data & Systems", items: "SQL, Python, ERP systems (SAP, Oracle), Power BI, supply chain KPI dashboards" },
      { title: "Risk & Resilience", items: "supplier risk assessment, BCP, multi-sourcing strategy, lead time analysis, FMEA" },
    ],
    experience: [
      {
        title: "Senior Supply Chain Engineer", org: "Pacific Logistics Group",
        location: "Singapore", dates: "May 2023 – Present",
        bullets: [
          "Optimized warehouse slotting and pick-path routing; reduced order fulfillment time by 28% and labor cost per order by 22%.",
          "Built real-time supply chain visibility dashboard integrating 8 data sources; reduced exception resolution time from 3 days to 4 hours.",
          "Designed safety stock policy using service-level optimization; balanced inventory investment with 98.5% fill rate target.",
        ],
      },
      {
        title: "Operations Analyst", org: "Mekong Manufacturing",
        location: "Phnom Penh, Cambodia", dates: "Jan 2021 – Apr 2023",
        bullets: [
          "Implemented statistical demand forecasting replacing manual estimates; reduced stockout incidents by 45% in first 6 months.",
          "Analyzed supplier lead time variability and recommended dual-sourcing for 8 critical SKUs; eliminated 3 production stoppages.",
        ],
      },
    ],
    projects: [
      {
        title: "Open Supply Chain Optimizer", meta: "Side project • 2024",
        bullets: ["Built Python library for multi-echelon inventory optimization; used by 3 SMEs to reduce working capital by 15–25%."],
      },
    ],
    education: [
      {
        title: "M.S. Industrial Engineering & Operations Research", org: "National University of Singapore",
        location: "Singapore", dates: "2019 – 2021",
        bullets: [
          "Coursework: Supply Chain Management, Stochastic Modeling, Optimization, Logistics Systems, Simulation.",
          "Thesis: Robust inventory optimization under demand uncertainty for multi-echelon supply chains.",
        ],
      },
    ],
    certs: [
      "APICS Certified Supply Chain Professional (CSCP) (2023)",
      "Six Sigma Green Belt (2022)",
      "Google Data Analytics Certificate (2024)",
    ],
    lens: {
      hiringContext: "Supply chain roles reward quantitative rigor and business impact: cost reductions, service level improvements, and resilience under disruption.",
      recruiterPsych: "They scan for: cost savings metrics, forecast accuracy improvements, network optimization experience, and cross-functional leadership.",
      careerStory: "From operations analysis to supply chain engineering—applying optimization and data science to build networks that are efficient and resilient.",
      outputGoals: "Make supply chain impact visible: cost reductions, service level improvements, inventory optimization, and risk mitigation.",
    },
  },
  {
    roleId: "fineng",
    roleTitle: "Financial Engineer / FinTech Developer",
    tagLabel: "FinTech / Finance",
    summary: "Financial engineer building high-reliability payment systems, risk engines, and regulatory-compliant infrastructure. Combines deep financial domain knowledge with software engineering to ship systems that handle real money safely.",
    highlights: [
      "Built real-time payment processing engine handling 12,000 TPS with 99.999% uptime; processed $2.4B in annual transaction volume.",
      "Designed fraud detection system using behavioral analytics; reduced fraudulent transactions by 67% while keeping false-positive rate under 0.8%.",
      "Led PCI DSS Level 1 compliance implementation; passed QSA audit on first attempt with zero critical findings.",
    ],
    skills: [
      { title: "Payment Systems", items: "payment rails (SWIFT, ACH, SEPA), ISO 20022, FIX protocol, settlement, reconciliation" },
      { title: "Risk & Compliance", items: "PCI DSS, AML/KYC, Basel III, GDPR, regulatory reporting, audit support" },
      { title: "Engineering", items: "Java, Python, Kafka, PostgreSQL, Redis, microservices, event sourcing, CQRS" },
      { title: "Financial Modeling", items: "credit risk, market risk, VaR, stress testing, pricing models, P&L attribution" },
    ],
    experience: [
      {
        title: "Senior FinTech Engineer", org: "Nexus Payments Asia",
        location: "Singapore", dates: "Jun 2023 – Present",
        bullets: [
          "Architected idempotent payment processing service with exactly-once semantics; eliminated duplicate payment incidents that previously cost $180k/year.",
          "Built real-time AML transaction monitoring pipeline; flagged 94% of confirmed suspicious activity with <1% false-positive rate.",
          "Designed multi-currency settlement engine supporting 18 currencies; reduced FX reconciliation time from 4 hours to 12 minutes daily.",
        ],
      },
      {
        title: "Software Engineer (Payments)", org: "Mekong FinTech",
        location: "Phnom Penh, Cambodia", dates: "Jan 2021 – May 2023",
        bullets: [
          "Built mobile wallet top-up and withdrawal flows with retry-safe APIs; reduced failed transaction rate from 3.2% to 0.4%.",
          "Implemented automated reconciliation between internal ledger and bank statements; reduced manual reconciliation effort by 90%.",
        ],
      },
    ],
    projects: [
      {
        title: "Open Ledger Engine", meta: "Side project • 2024",
        bullets: ["Built double-entry accounting engine with audit trail and multi-currency support; used by 2 early-stage fintech startups."],
      },
    ],
    education: [
      {
        title: "B.S. Computer Science + Finance (Double Major)", org: "Singapore Management University",
        location: "Singapore", dates: "2017 – 2021",
        bullets: [
          "Coursework: Financial Markets, Derivatives, Database Systems, Distributed Computing, Cryptography.",
          "Capstone: Real-time fraud detection system for peer-to-peer payment networks.",
        ],
      },
    ],
    certs: [
      "PCI DSS Implementer (2023)",
      "AWS Certified Solutions Architect – Associate (2024)",
      "CFA Level I (2022)",
    ],
    lens: {
      hiringContext: "FinTech engineering demands correctness above all: idempotency, auditability, compliance, and systems that handle money without losing it.",
      recruiterPsych: "They scan for: transaction volume handled, uptime metrics, compliance certifications, and fraud/risk system experience.",
      careerStory: "From payment feature development to financial infrastructure ownership—building systems where correctness and compliance are non-negotiable.",
      outputGoals: "Show FinTech credibility: transaction volume, uptime, fraud reduction, compliance achieved, and reconciliation accuracy.",
    },
  },
  {
    roleId: "climatetech",
    roleTitle: "Climate Tech / Sustainability Engineer",
    tagLabel: "Climate Tech",
    summary: "Sustainability engineer applying data science and systems thinking to decarbonization challenges. Builds carbon accounting platforms, energy optimization systems, and climate analytics tools that turn ESG commitments into measurable outcomes.",
    highlights: [
      "Built carbon accounting platform tracking Scope 1, 2, and 3 emissions for 40+ enterprise clients; enabled $12M in verified carbon credit transactions.",
      "Designed energy optimization algorithm for commercial buildings; reduced average energy consumption by 23% across 15 facilities.",
      "Developed climate risk assessment model for infrastructure portfolio; identified $85M in stranded asset risk over 20-year horizon.",
    ],
    skills: [
      { title: "Climate & Energy", items: "GHG accounting (GHG Protocol), life cycle assessment, energy modeling, renewable integration" },
      { title: "Data & Analytics", items: "Python, time series analysis, geospatial data (GIS), IoT sensor data, emissions factor databases" },
      { title: "Software Engineering", items: "REST APIs, PostgreSQL, cloud platforms, data pipelines, dashboard development" },
      { title: "Standards & Reporting", items: "TCFD, CDP, SBTi, ISO 14064, ESG reporting frameworks, regulatory compliance" },
    ],
    experience: [
      {
        title: "Senior Climate Tech Engineer", org: "GreenScale Technologies",
        location: "Singapore", dates: "Apr 2023 – Present",
        bullets: [
          "Architected automated Scope 3 emissions calculation engine integrating supplier data from 200+ sources; reduced reporting time from 3 months to 2 weeks.",
          "Built real-time energy monitoring platform for industrial clients; identified optimization opportunities saving average $340k/year per facility.",
          "Developed climate scenario analysis tool aligned with IPCC pathways; used by 8 institutional investors for portfolio stress testing.",
        ],
      },
      {
        title: "Sustainability Data Analyst", org: "EcoMetrics Asia",
        location: "Kuala Lumpur, Malaysia", dates: "Feb 2021 – Mar 2023",
        bullets: [
          "Built automated ESG data collection and validation pipeline; reduced data quality errors in sustainability reports by 78%.",
          "Created carbon footprint benchmarking tool for manufacturing sector; adopted by 12 companies for annual reporting.",
        ],
      },
    ],
    projects: [
      {
        title: "Open Carbon Calculator", meta: "Open-source • 2024",
        bullets: ["Built open-source Scope 1/2/3 emissions calculator with 50+ emission factor databases; 600+ GitHub stars, used by 20+ NGOs."],
      },
    ],
    education: [
      {
        title: "M.S. Environmental Engineering (Energy Systems)", org: "National University of Singapore",
        location: "Singapore", dates: "2019 – 2021",
        bullets: [
          "Coursework: Energy Systems Modeling, Climate Policy, Industrial Ecology, Environmental Data Science.",
          "Thesis: Machine learning approaches to building energy consumption forecasting.",
        ],
      },
    ],
    certs: [
      "GHG Protocol Certification (2022)",
      "LEED Green Associate (2023)",
      "Certified Energy Manager (CEM) (2024)",
    ],
    lens: {
      hiringContext: "Climate tech hiring rewards measurable impact: verified emissions reductions, energy savings, and platforms that make ESG data trustworthy.",
      recruiterPsych: "They scan for: GHG accounting depth, quantified environmental impact, software engineering rigor, and standards knowledge.",
      careerStory: "From sustainability analysis to climate tech engineering—building systems that turn net-zero commitments into auditable, measurable outcomes.",
      outputGoals: "Show climate impact: emissions tracked, energy saved, carbon credits enabled, and ESG reporting accuracy improved.",
    },
  },
  {
    roleId: "xr",
    roleTitle: "XR / Spatial Computing Engineer",
    tagLabel: "XR / Spatial",
    summary: "Spatial computing engineer building immersive AR/VR/MR experiences and enterprise XR applications. Combines real-time 3D rendering, computer vision, and hardware optimization to ship experiences that work reliably outside the lab.",
    highlights: [
      "Built industrial AR training application reducing equipment maintenance errors by 52% and onboarding time from 3 weeks to 4 days.",
      "Optimized VR rendering pipeline achieving stable 90 FPS on standalone headsets; eliminated motion sickness complaints in user testing.",
      "Developed spatial mapping system for warehouse AR navigation; reduced pick errors by 38% and improved throughput by 24%.",
    ],
    skills: [
      { title: "XR Development", items: "Unity, Unreal Engine, WebXR, ARKit, ARCore, OpenXR, Meta SDK, HoloLens 2" },
      { title: "Computer Vision", items: "SLAM, object detection, hand tracking, pose estimation, spatial anchors, occlusion" },
      { title: "Performance", items: "GPU profiling, draw call optimization, LOD systems, foveated rendering, thermal management" },
      { title: "Engineering", items: "C#, C++, shader programming, real-time networking, 3D math, physics simulation" },
    ],
    experience: [
      {
        title: "Senior XR Engineer", org: "Immersive Systems Asia",
        location: "Singapore", dates: "Mar 2023 – Present",
        bullets: [
          "Led development of enterprise MR application for surgical planning; reduced pre-operative planning time by 40% in clinical pilot.",
          "Built multi-user collaborative XR platform with sub-100ms synchronization; deployed to 3 manufacturing clients with 200+ concurrent users.",
          "Optimized shader pipeline and occlusion culling; reduced GPU frame time by 35% enabling deployment on lower-cost hardware.",
        ],
      },
      {
        title: "XR Developer", org: "Digital Reality Studio",
        location: "Bangkok, Thailand", dates: "Jan 2021 – Feb 2023",
        bullets: [
          "Built AR product visualization app for retail; increased customer engagement by 45% and reduced product return rate by 18%.",
          "Implemented hand tracking and gesture recognition for touchless kiosk; deployed in 30+ locations across Southeast Asia.",
        ],
      },
    ],
    projects: [
      {
        title: "WebXR Spatial UI Framework", meta: "Open-source • 2024",
        bullets: ["Built accessible spatial UI component library for WebXR; 700+ GitHub stars, used in 10+ commercial projects."],
      },
    ],
    education: [
      {
        title: "B.S. Computer Science (Computer Graphics)", org: "Chulalongkorn University",
        location: "Bangkok, Thailand", dates: "2017 – 2021",
        bullets: [
          "Coursework: Computer Graphics, Computer Vision, Real-Time Rendering, Human-Computer Interaction.",
          "Capstone: Markerless AR system for architectural visualization using mobile devices.",
        ],
      },
    ],
    certs: [
      "Unity Certified Professional: Programmer (2023)",
      "Meta Certified Spatial Computing Developer (2024)",
    ],
    lens: {
      hiringContext: "XR hiring rewards production discipline: stable frame rates, real-world deployment, and measurable business outcomes beyond impressive demos.",
      recruiterPsych: "They scan for: shipped XR applications, performance optimization wins, hardware platform breadth, and enterprise deployment experience.",
      careerStory: "From XR prototypes to production spatial computing—building immersive systems that work reliably and deliver measurable business value.",
      outputGoals: "Show XR credibility: applications shipped, performance metrics, user adoption, and business outcomes achieved.",
    },
  },
];

/* ═══════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════ */
function el(id) { return document.getElementById(id); }

function emphasize(text) {
  return text
    .replace(/(\b\d+(\.\d+)?%?\b)/g, "<strong>$1</strong>")
    .replace(/(\b(OTA|RTOS|ROS2|TLS|EMI|SI\/PI|SQL|API|BLE|MQTT|CI\/CD|SIEM|SOAR|MTTD|MTTR|MAU|ARR|CTR|LCP|RAG|LLM|SLO|SLI|SRE|XR|GHG|ESG|AML|KYC|TVL|DAO|NFT|EKF|SLAM|VWAP|AUM|ECG|SNR|ADC|FMEA|BCP|ERP)\b)/g, "<strong>$1</strong>");
}

function getProfile() {
  return profiles.find(p => p.roleId === state.role) || profiles[0];
}

function getTypeInfo() {
  return cvTypes.find(t => t.id === state.type) || cvTypes[2];
}

/* ═══════════════════════════════════════════════════════
   RENDER TAGS
   ═══════════════════════════════════════════════════════ */
function renderTags() {
  const roleTags = el("role-tags");
  roleTags.innerHTML = profiles.map(p =>
    `<button class="role-tag" type="button" data-role="${p.roleId}" aria-pressed="${p.roleId === state.role}">${p.tagLabel}</button>`
  ).join("");

  roleTags.querySelectorAll(".role-tag").forEach(btn => {
    btn.addEventListener("click", () => {
      state.role = btn.dataset.role;
      render();
    });
  });

  const typeTabs = el("type-tabs");
  typeTabs.innerHTML = cvTypes.map(t =>
    `<button class="type-tab" type="button" data-type="${t.id}" aria-pressed="${t.id === state.type}"><i class="${t.icon}"></i>${t.label}</button>`
  ).join("");

  typeTabs.querySelectorAll(".type-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      state.type = btn.dataset.type;
      render();
    });
  });
}

/* ═══════════════════════════════════════════════════════
   RENDER CV
   ═══════════════════════════════════════════════════════ */
function section(titleKey, bodyHtml) {
  return `<section class="section"><h2 class="section-title">${sectionLabels[titleKey]}</h2><div class="section-body">${bodyHtml}</div></section>`;
}

function bulletList(items) {
  return `<ul class="bullets">${items.map(x => `<li>${x}</li>`).join("")}</ul>`;
}

function renderSkills(p) {
  return `<div class="skill-grid">${p.skills.map(s =>
    `<div><div class="skill-cat-title">${s.title}</div><div class="skill-cat-items">${s.items}</div></div>`
  ).join("")}</div>`;
}

function renderEntries(entries) {
  return entries.map(e => `
    <div class="entry">
      <div class="entry-head">
        <div class="entry-main">
          <div class="entry-title">${e.title}</div>
          <div class="entry-org">${e.org}</div>
        </div>
        <div class="entry-right">${e.dates}<br>${e.location}</div>
      </div>
      ${bulletList(e.bullets.map(b => emphasize(b)))}
    </div>
  `).join("");
}

function renderProjects(p) {
  return p.projects.map(pr => `
    <div class="entry">
      <div class="entry-head">
        <div class="entry-main">
          <div class="entry-title">${pr.title}</div>
          <div class="entry-org">${pr.meta}</div>
        </div>
        <div class="entry-right"></div>
      </div>
      ${bulletList(pr.bullets.map(b => emphasize(b)))}
    </div>
  `).join("");
}

function renderResume() {
  const p = getProfile();
  const c = candidate;

  const head = `
    <header class="cv-head">
      <div class="avatar"><img src="${c.photo}" alt="Portrait"></div>
      <div>
        <span class="cv-name-cn">${c.nameCn}</span>
        <span class="cv-name-en">${c.nameEn}</span>
        <div class="cv-role">${p.roleTitle}</div>
        <div class="cv-contact">
          <span><i class="fa-solid fa-location-dot"></i>${c.location}</span>
          <span><i class="fa-solid fa-envelope"></i>${c.email}</span>
          <span><i class="fa-solid fa-phone"></i>${c.phone}</span>
          <span><i class="fa-brands fa-github"></i>${c.github}</span>
          <span><i class="fa-brands fa-linkedin"></i>${c.linkedin}</span>
        </div>
      </div>
    </header>
  `;

  const summary = section("summary", `<div class="summary">${p.summary}</div>`);
  const highlights = section("highlights", bulletList(p.highlights.map(h => emphasize(h))));
  const skills = section("skills", renderSkills(p));
  const experience = section("experience", renderEntries(p.experience));
  const projects = section("projects", renderProjects(p));
  const education = section("education", renderEntries(p.education));
  const certs = section("certs", `<div class="kv">${p.certs.map(c => `<div>${c}</div>`).join("")}</div>`);

  const publications = p.publications
    ? section("publications", `<div class="kv">${p.publications.map(x => `<div>${x}</div>`).join("")}</div>`)
    : "";

  const snapshot = section("snapshot",
    `<div class="kv">${p.experience.map(e => `<div><strong>${e.title}</strong> \u2014 ${e.org} \u2022 ${e.dates}</div>`).join("")}</div>`
  );

  if (state.type === "chronological") {
    return `${head}${summary}${skills}${experience}${projects}${education}${certs}${publications}`;
  }
  if (state.type === "functional") {
    return `${head}${summary}${skills}${highlights}${projects}${snapshot}${education}${certs}${publications}`;
  }
  /* combination */
  return `${head}${summary}${highlights}${skills}${experience}${projects}${education}${certs}${publications}`;
}

/* ═══════════════════════════════════════════════════════
   RENDER INSIGHTS (Professional)
   ═══════════════════════════════════════════════════════ */
function renderInsights() {
  const p = getProfile();
  const typeInfo = getTypeInfo();
  const wrap = el("insights");

  const skillTags = p.skills.map(s => `
    <div class="insight-skill-group">
      <div class="insight-skill-label">${s.title}</div>
      <div class="insight-skill-tags">
        ${s.items.split(", ").map(item => `<span class="insight-skill-tag">${item}</span>`).join("")}
      </div>
    </div>
  `).join("");

  wrap.innerHTML = `
    <div class="insight-card insight-card--role">
      <div class="insight-role-name">${p.roleTitle}</div>
      <div class="insight-role-type"><i class="${typeInfo.icon}"></i>${typeInfo.label}</div>
    </div>

    <div class="insight-card insight-card--hook">
      <div class="insight-header">
        <i class="fa-solid fa-quote-left"></i>
        <h3>Recruiter Hook</h3>
      </div>
      <p class="insight-hook-text">${p.summary}</p>
    </div>

    <div class="insight-card">
      <div class="insight-header">
        <i class="fa-solid fa-tags"></i>
        <h3>Key Competencies</h3>
      </div>
      ${skillTags}
    </div>

    <div class="insight-card">
      <div class="insight-header">
        <i class="fa-solid fa-crosshairs"></i>
        <h3>Hiring Context</h3>
      </div>
      <p class="insight-body">${p.lens.hiringContext}</p>
    </div>

    <div class="insight-card">
      <div class="insight-header">
        <i class="fa-solid fa-brain"></i>
        <h3>Recruiter Psychology</h3>
      </div>
      <p class="insight-body">${p.lens.recruiterPsych}</p>
    </div>

    <div class="insight-card">
      <div class="insight-header">
        <i class="fa-solid fa-route"></i>
        <h3>Career Story</h3>
      </div>
      <p class="insight-body">${p.lens.careerStory}</p>
    </div>

    <div class="insight-card">
      <div class="insight-header">
        <i class="fa-solid fa-bullseye"></i>
        <h3>Output Goals</h3>
      </div>
      <p class="insight-body">${p.lens.outputGoals}</p>
    </div>
  `;
}

/* ═══════════════════════════════════════════════════════
   MAIN RENDER + INIT
   ═══════════════════════════════════════════════════════ */
function render() {
  renderTags();
  el("paper").innerHTML = renderResume();
  renderInsights();
}

function init() {
  render();

  /* Insights panel toggle (tablet/mobile) */
  const toggle = el("insights-toggle");
  const panel = el("insights");

  let backdrop = document.querySelector(".insights-backdrop");
  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.className = "insights-backdrop";
    document.body.appendChild(backdrop);
  }

  function closePanel() {
    panel.classList.remove("open");
    backdrop.classList.remove("open");
  }

  toggle.addEventListener("click", () => {
    const isOpen = panel.classList.contains("open");
    if (isOpen) {
      closePanel();
    } else {
      panel.classList.add("open");
      backdrop.classList.add("open");
    }
  });

  backdrop.addEventListener("click", closePanel);

  /* Keyboard: Escape closes panel */
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") closePanel();
  });
}

document.addEventListener("DOMContentLoaded", init);
