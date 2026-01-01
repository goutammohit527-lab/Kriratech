import React, { useState } from 'react';
import { Menu, X, ChevronRight, Cpu, Wifi, Shield, Zap, Mail, Phone, MapPin, Clock } from 'lucide-react';

const KriraTechWebsite = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const projects = [
    {
      id: 'dual-arduino',
      name: 'Dual-Arduino Robot System',
      short: 'RFID-triggered automation with distributed processing across two Arduino boards',
      why: 'To divide workload between boards to improve automation flow and reduce processing load on a single microcontroller.',
      problem: 'Single-board systems often face processing bottlenecks when handling multiple sensors, motor control, and communication simultaneously. This dual-board architecture solves that limitation.',
      work: 'RFID decides action ➜ Servos handle mechanism ➜ DC motors navigate and position the robot with precision.',
      how: 'One Arduino handles RFID scanning and servo control, while the second Arduino manages motor drivers and IR detection through serial communication commands.',
      sensors: 'RFID-RC522 Module, IR Obstacle Sensor, Multiple Servo Motors (via PCA9685 driver), L293D Motor Driver, HC-05 Bluetooth Module',
      usecase: 'Warehouses for automated material delivery, product sorting facilities, inventory management systems, and industrial pick-and-place operations.',
      upgrade: 'Add ESP32-CAM for visual recognition, implement GPS for outdoor navigation, integrate robotic arm with gripper mechanism, add weight sensors for load management.'
    },
    {
      id: 'self-balancing',
      name: 'Self-Balancing Robot',
      short: 'Dynamic stability control system using accelerometer feedback',
      why: 'To demonstrate dynamic stability and balance control similar to Segway systems and modern two-wheeled transport vehicles.',
      problem: 'Traditional robots require 3-4 wheels for stability. This project proves that intelligent sensor feedback can maintain balance on just two wheels.',
      work: 'Maintains its vertical position by continuously adjusting motor speed according to tilt angle detected by the accelerometer.',
      how: 'GY-61 accelerometer measures tilt angle → Arduino processes data using PID algorithm → L293D motor driver adjusts motor speeds to counteract tilt and maintain balance.',
      sensors: 'GY-61 Accelerometer Module (3-axis), L293D Motor Driver IC, DC Geared Motors with Encoders, Arduino Uno',
      usecase: 'R&D laboratories for control system research, robotics education institutions, industrial balance technology prototypes, autonomous delivery robots.',
      upgrade: 'Implement gyroscope fusion for better stability, add remote control capability, integrate cargo carrying platform, implement autonomous navigation with ultrasonic sensors.'
    },
    {
      id: 'rfid-pickup',
      name: 'RFID Object Pickup Robot',
      short: 'Autonomous object selection and retrieval using RFID identification',
      why: 'To automate object selection and handling using RFID tag identity, eliminating human intervention in material transport.',
      problem: 'Manual object sorting and retrieval is time-consuming and error-prone. RFID-based automation ensures accurate object identification and handling.',
      work: 'Robot scans RFID tag → identifies object → moves to pre-mapped location → servo-controlled gripper picks object → returns to drop zone.',
      how: 'RFID reader identifies tag UID, Arduino matches it with stored location database, motors navigate to coordinates, servo mechanism activates to grip object.',
      sensors: 'RFID-RC522 Module, Servo Motors for Gripper, L293D Motor Driver, IR Sensors for Line Following, Arduino Nano',
      usecase: 'Logistics centers for package sorting, warehouse material transport, automated storage and retrieval systems, pharmacy medicine dispensing.',
      upgrade: 'Add conveyor belt integration, implement multi-object pickup queue, integrate barcode scanning backup, add weight verification sensor.'
    },
    {
      id: 'aqi-meter',
      name: 'Air Quality Index (AQI) Meter',
      short: 'ESP32-based real-time air quality monitoring system',
      why: 'To measure indoor air quality for pollution detection and health monitoring in real-time with wireless data logging capability.',
      problem: 'Indoor air pollution is invisible but harmful. This device provides quantifiable data to help people make informed decisions about their environment.',
      work: 'Reads sensor values → calculates AQI → classifies as Good / Moderate / Unhealthy / Hazardous → displays on OLED and sends to cloud.',
      how: 'Dust sensor measures PM2.5/PM10 particles, DHT11 reads temperature and humidity, ESP32 calculates AQI using standard formulae and transmits data via Wi-Fi.',
      sensors: 'ESP32 Microcontroller, DHT11 Temperature & Humidity Sensor, GP2Y1010AU0F Dust Sensor, OLED Display Module (128x64)',
      usecase: 'Offices for employee health monitoring, hospitals and clinics, smart homes, schools and educational institutions, industrial facilities.',
      upgrade: 'Add CO2 and VOC sensors, implement mobile app with push notifications, integrate with smart home systems, add historical data graphing.'
    },
    {
      id: 'uv-hepa',
      name: 'AQI + UV & HEPA Purifier System',
      short: 'Automatic air purification triggered by air quality thresholds',
      why: 'To provide automatic sterilization and air purification when unsafe AQI levels are detected, protecting occupant health proactively.',
      problem: 'Manual air purifiers require constant monitoring. This system automatically activates purification when air quality degrades.',
      work: 'AQI sensor monitors air continuously → When AQI exceeds threshold → UV-C lamp and HEPA fan activate automatically → Purification continues until air quality improves.',
      how: 'Dust sensor feeds real-time data to Arduino, threshold comparison triggers relay module to power UV lamp and HEPA filter fan unit.',
      sensors: 'Arduino Uno, GP2Y1010AU0F Dust Sensor, DHT11, Relay Module (2-channel), UV-C Germicidal Lamp, HEPA Filter Fan Unit',
      usecase: 'Hospitals for infection control, medical laboratories, cleanrooms in pharmaceutical facilities, isolation rooms, indoor cultivation facilities.',
      upgrade: 'Add ozone level monitoring, implement smart scheduling, integrate air quality prediction algorithms, add voice control interface.'
    },
    {
      id: 'early-warning',
      name: 'Early Warning System',
      short: 'Disturbance detection and immediate alarm activation',
      why: 'To prevent accidents by detecting environmental disturbances early and alerting personnel before situations escalate.',
      problem: 'Equipment failures and security breaches often go unnoticed until damage occurs. Early detection saves lives and property.',
      work: 'Vibration/shock sensor monitors for abnormal changes → When threshold exceeded → Buzzer sounds alarm immediately → LED indicators activate → Optional SMS alert sent.',
      how: 'SW-420 vibration sensor detects motion/shock, Arduino processes signal intensity, triggers multiple alert mechanisms simultaneously.',
      sensors: 'SW-420 Vibration Sensor Module, Arduino Nano, High-decibel Buzzer, LED Indicators, GSM Module (optional for SMS alerts)',
      usecase: 'Machine monitoring areas, perimeter security systems, earthquake early warning, equipment safety monitoring, construction site alerts.',
      upgrade: 'Add camera trigger for visual recording, implement sensor fusion with multiple detection points, integrate with facility management systems, add ML for false alarm reduction.'
    },
    {
      id: 'driving-awareness',
      name: 'Driving Awareness System',
      short: 'Driver drowsiness detection with automatic vehicle shutdown',
      why: 'To reduce accidents caused by driver drowsiness by monitoring eye closure and taking immediate preventive action.',
      problem: 'Drowsy driving causes thousands of accidents annually. Automatic detection and intervention can save lives.',
      work: 'IR sensor monitors driver eyes continuously → If eyes remain closed beyond threshold time → Arduino triggers motor shutdown → Alarm sounds → Vehicle stops safely.',
      how: 'IR eye blink sensor mounted near steering detects eyelid closure, Arduino counts duration, exceeding 2-3 seconds triggers emergency stop protocol.',
      sensors: 'IR Eye Blink Detection Sensor, Arduino Uno, L293D Motor Driver, DC Motors (vehicle simulation), High-decibel Buzzer, Power Relay',
      usecase: 'Driving school training vehicles, industrial forklifts and machinery, long-haul transport vehicles, mining equipment operators.',
      upgrade: 'Add heart rate monitoring, implement facial recognition for driver verification, integrate with vehicle CAN bus, add GPS logging for incident analysis.'
    },
    {
      id: 'esp32-rfid',
      name: 'ESP32 + RFID Serial Communication Robot',
      short: 'Decision-based movement system controlled via RFID tags',
      why: 'To create a decision-based movement system controlled completely through RFID tags, enabling secure and programmable robot behavior.',
      problem: 'Traditional robots require programming for each task. RFID-based control allows field personnel to change robot behavior simply by scanning different tags.',
      work: 'RFID tag acts as trigger → ESP32 interprets tag UID → Executes corresponding movement logic → Robot performs programmed action sequence.',
      how: 'RFID reader scans tag, ESP32 matches UID with stored command database, sends serial commands to motor controller, robot executes movement pattern.',
      sensors: 'ESP32 Microcontroller, RFID-RC522 Module, L293D Motor Driver, DC Geared Motors, Ultrasonic Sensor (optional obstacle avoidance)',
      usecase: 'Security-based item movement, access-controlled delivery robots, museum guide robots, hospital medicine cart automation.',
      upgrade: 'Add ESP32-CAM for remote monitoring, implement cloud-based tag programming, integrate voice feedback system, add multiple robot coordination.'
    }
  ];

  const navigation = [
    { name: 'Home', page: 'home' },
    { name: 'About Us', page: 'about' },
    { name: 'Services', page: 'services' },
    { name: 'Projects', page: 'projects' },
    { name: 'Contact', page: 'contact' }
  ];

  const ProjectCard = ({ project, onClick }) => (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="h-48 bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
        <Cpu className="w-20 h-20 text-white opacity-80" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{project.name}</h3>
        <p className="text-gray-600 mb-4 line-clamp-3">{project.short}</p>
        <button
          onClick={onClick}
          className="bg-cyan-400 hover:bg-cyan-500 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 hover:shadow-lg uppercase text-sm"
        >
          View Details
        </button>
      </div>
    </div>
  );

  const renderPage = () => {
    const projectPage = projects.find(p => currentPage === p.id);
    if (projectPage) {
      return (
        <div className="min-h-screen">
          <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white py-20">
            <div className="max-w-6xl mx-auto px-6">
              <button
                onClick={() => setCurrentPage('projects')}
                className="text-cyan-400 hover:text-cyan-300 mb-4 flex items-center gap-2"
              >
                ← Back to Projects
              </button>
              <h1 className="text-5xl font-bold mb-4">{projectPage.name}</h1>
              <p className="text-xl text-gray-300">{projectPage.short}</p>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-6 py-16">
            <div className="space-y-12">
              <section className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="w-2 h-8 bg-cyan-400 rounded"></div>
                  Why It Was Made
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">{projectPage.why}</p>
              </section>

              <section className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="w-2 h-8 bg-cyan-400 rounded"></div>
                  Problem It Solves
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">{projectPage.problem}</p>
              </section>

              <section className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="w-2 h-8 bg-cyan-400 rounded"></div>
                  What Work It Does
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">{projectPage.work}</p>
              </section>

              <section className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="w-2 h-8 bg-cyan-400 rounded"></div>
                  How It Works
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">{projectPage.how}</p>
              </section>

              <section className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="w-2 h-8 bg-cyan-400 rounded"></div>
                  Sensors & Components Used
                </h2>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-lg text-gray-700 leading-relaxed font-mono">{projectPage.sensors}</p>
                </div>
              </section>

              <section className="bg-gradient-to-br from-green-50 to-cyan-50 rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="w-2 h-8 bg-cyan-400 rounded"></div>
                  Real-World Industrial Use Case
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">{projectPage.usecase}</p>
              </section>

              <section className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                  <div className="w-2 h-8 bg-cyan-400 rounded"></div>
                  Upgrade Possibilities
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">{projectPage.upgrade}</p>
              </section>

              <section className="bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg shadow-2xl p-12 text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Interested in a Live Demo?</h2>
                <p className="text-xl text-white mb-6 opacity-90">Contact us to see this project in action or discuss custom modifications</p>
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="bg-white text-cyan-600 font-bold py-4 px-8 rounded-full hover:shadow-2xl transition-all duration-300 uppercase text-lg"
                >
                  Contact for Demo
                </button>
              </section>
            </div>
          </div>
        </div>
      );
    }

    switch (currentPage) {
      case 'home':
        return (
          <div>
            <section className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white min-h-screen flex items-center">
              <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-6xl font-bold mb-6 leading-tight">
                    Empowering Automation Through Embedded Systems & Robotics
                  </h1>
                  <p className="text-2xl mb-8 text-gray-300 leading-relaxed">
                    We design, build, and deploy real-world hardware solutions using Arduino, ESP32, IoT, RFID systems, and robotics.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={() => setCurrentPage('projects')}
                      className="bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 hover:shadow-cyan uppercase"
                    >
                      View Projects
                    </button>
                    <button
                      onClick={() => setCurrentPage('services')}
                      className="bg-transparent border-2 border-cyan-400 hover:bg-cyan-400 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 uppercase"
                    >
                      Our Services
                    </button>
                    <button
                      onClick={() => setCurrentPage('contact')}
                      className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 uppercase"
                    >
                      Contact Us
                    </button>
                  </div>
                </div>
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-cyan-400 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                    <Cpu className="w-96 h-96 text-cyan-400 relative z-10" />
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white py-20">
              <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                  <h2 className="text-5xl font-bold text-gray-900 mb-6">Welcome to Our Development Workspace</h2>
                  <p className="text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
                    Welcome to our development workspace where engineering meets automation. We build practical and scalable embedded solutions for industries, institutions, and startups. From concept to prototype and from prototype to functional demo, we convert ideas into working machines.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-6">What We Focus On</h3>
                    <ul className="space-y-4">
                      {[
                        'Industry-level robotics systems',
                        'IoT monitoring and sensor network devices',
                        'RFID and automation-based control systems',
                        'Smart safety and protection hardware',
                        'Real-use embedded prototypes'
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <ChevronRight className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                          <span className="text-lg text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-8 shadow-lg">
                    <h3 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Us</h3>
                    <ul className="space-y-4">
                      {[
                        'Real hardware, not theory',
                        'Purpose-driven engineering',
                        'Customizable solutions',
                        'Clean circuit logic & optimized control flow',
                        'Built to solve real problems'
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-lg text-gray-700 font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-gray-50 py-20">
              <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-5xl font-bold text-center text-gray-900 mb-16">What We Build</h2>
                <div className="grid md:grid-cols-4 gap-8">
                  {[
                    { icon: Cpu, title: 'Robotics Systems', desc: 'Autonomous and controlled robots' },
                    { icon: Wifi, title: 'IoT Solutions', desc: 'Smart monitoring devices' },
                    { icon: Shield, title: 'Safety Systems', desc: 'Protection and warning hardware' },
                    { icon: Zap, title: 'Automation', desc: 'RFID and sensor control' }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 text-center">
                      <div className="flex justify-center mb-4">
                        <div className="bg-cyan-100 p-4 rounded-full">
                          <item.icon className="w-12 h-12 text-cyan-500" />
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="bg-white py-20">
              <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-5xl font-bold text-center text-gray-900 mb-4">Featured Projects</h2>
                <p className="text-xl text-center text-gray-600 mb-16">Explore our showcase of real-world embedded systems solutions</p>
                <div className="grid md:grid-cols-3 gap-8">
                  {projects.slice(0, 3).map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onClick={() => setCurrentPage(project.id)}
                    />
                  ))}
                </div>
                <div className="text-center mt-12">
                  <button
                    onClick={() => setCurrentPage('projects')}
                    className="bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 hover:shadow-lg uppercase"
                  >
                    View All Projects
                  </button>
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-r from-cyan-400 to-blue-500 py-20">
              <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-5xl font-bold text-white mb-6">Ready to Build Your Solution?</h2>
                <p className="text-2xl text-white mb-8 opacity-90">
                  Let's discuss how we can help automate your operations with custom embedded systems
                </p>
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="bg-white text-cyan-600 font-bold py-4 px-12 rounded-full hover:shadow-2xl transition-all duration-300 uppercase text-lg"
                >
                  Get In Touch
                </button>
              </div>
            </section>
          </div>
        );

      case 'about':
        return (
          <div className="min-h-screen">
            <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white py-20">
              <div className="max-w-6xl mx-auto px-6">
                <h1 className="text-6xl font-bold mb-6">About Krira Tech</h1>
                <p className="text-2xl text-gray-300">Engineering intelligent systems that matter</p>
              </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-16">
              <div className="space-y-16">
                <section className="bg-white rounded-lg shadow-lg p-10">
                  <p className="text-xl text-gray-700 leading-relaxed">
                    We specialize in embedded systems engineering, IoT solutions, robotic automation, and custom electronic product development. Our work focuses on intelligent systems that solve problems in monitoring, control, safety, and movement automation.
                  </p>
                </section>

                <section className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg shadow-lg p-10">
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Vision</h2>
                  <p className="text-xl text-gray-700 leading-relaxed">
                    To build real-world electronic solutions that enhance efficiency, safety, and automation across industries and everyday life.
                  </p>
                </section>

                <section className="bg-white rounded-lg shadow-lg p-10">
                  <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Technical Strengths</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      'Arduino & ESP32 Systems',
                      'Digital & Analog Sensors',
                      'Motor Drivers: L293D, ULN2003AN, IRFZ44N MOSFET',
                      'Wireless Communication: Bluetooth, Wi-Fi, Serial',
                      'Servo, DC Motor, Encoder Motor Integration',
                      'Automation Logic for Industrial Applications'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                        <ChevronRight className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
                        <span className="text-lg text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg shadow-lg p-10">
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">Microcontrollers We Use</h2>
                  <div className="flex flex-wrap gap-4">
                    {['Arduino Uno', 'Arduino Nano', 'ESP32', 'ESP32-CAM'].map((item, idx) => (
                      <span key={idx} className="bg-white px-6 py-3 rounded-full shadow text-lg font-semibold text-gray-800">
                        {item}
                      </span>
                    ))}
                  </div>
                </section>

                <section className="bg-white rounded-lg shadow-lg p-10">
                  <h2 className="text-4xl font-bold text-gray-900 mb-6">Sensors We Work With</h2>
                  <div className="flex flex-wrap gap-3">
                    {['RFID', 'IR Eye Blink', 'GY-61 Accelerometer', 'DHT11', 'SW420 Vibration', 'AQI/Dust Sensor', 'LDR', 'Ultrasonic', 'PIR Motion', 'MQ Gas Sensors'].map((item, idx) => (
                      <span key={idx} className="bg-cyan-100 text-cyan-700 px-5 py-2 rounded-full text-base font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </section>

                <section className="bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg shadow-2xl p-10 text-white">
                  <h2 className="text-4xl font-bold mb-6">What Makes Our Builds Different</h2>
                  <p className="text-xl leading-relaxed">
                    Every device is made with real-world feasibility in mind — scalable, repairable, modular, and field-friendly. We don't just build prototypes that work on a bench; we engineer solutions that function reliably in actual industrial and commercial environments.
                  </p>
                </section>
              </div>
            </div>
          </div>
        );

      case 'services':
        return (
          <div className="min-h-screen">
            <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white py-20">
              <div className="max-w-6xl mx-auto px-6">
                <h1 className="text-6xl font-bold mb-6">Our Core Services</h1>
                <p className="text-2xl text-gray-300">Comprehensive embedded systems solutions for modern automation needs</p>
              </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-16">
              <div className="space-y-12">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-cyan-400 to-blue-500 p-8 flex items-center justify-center">
                    <div className="text-center">
                      <Cpu className="w-20 h-20 text-white mx-auto mb-4" />
                      <h3 className="text-3xl font-bold text-white">Robotics Development</h3>
                    </div>
                  </div>
                  <div className="md:col-span-2 p-8">
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">What We Provide</h4>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      Warehouse robots, object handling bots, self-balancing robotic units, RFID-controlled autonomous systems, and custom robotic mechanisms tailored to your operational requirements.
                    </p>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Benefits</h4>
                    <ul className="space-y-2 mb-6">
                      {[
                        'Reduces manual labor and operational costs',
                        'Increases precision and repeatability',
                        'Operates 24/7 without fatigue',
                        'Scalable to multiple units',
                        'Customizable for specific tasks'
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Where It Can Be Used</h4>
                    <p className="text-gray-700">
                      Manufacturing facilities, warehouses, logistics centers, material handling operations, retail automation, hospital logistics, educational institutions.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-8 flex items-center justify-center">
                    <div className="text-center">
                      <Wifi className="w-20 h-20 text-white mx-auto mb-4" />
                      <h3 className="text-3xl font-bold text-white">IoT Systems</h3>
                    </div>
                  </div>
                  <div className="md:col-span-2 p-8">
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">What We Provide</h4>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      Wi-Fi and Bluetooth monitoring dashboards, air quality index systems, live data logging platforms, environmental monitoring stations, and cloud-connected sensor networks.
                    </p>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Benefits</h4>
                    <ul className="space-y-2 mb-6">
                      {[
                        'Real-time remote monitoring from anywhere',
                        'Historical data tracking and analytics',
                        'Automated alerts and notifications',
                        'Energy-efficient wireless operation',
                        'Easy integration with existing systems'
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Where It Can Be Used</h4>
                    <p className="text-gray-700">
                      Smart buildings, industrial facilities, agriculture, environmental monitoring, smart homes, healthcare facilities, research laboratories.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-green-500 to-cyan-500 p-8 flex items-center justify-center">
                    <div className="text-center">
                      <Zap className="w-20 h-20 text-white mx-auto mb-4" />
                      <h3 className="text-3xl font-bold text-white">RFID Automation</h3>
                    </div>
                  </div>
                  <div className="md:col-span-2 p-8">
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">What We Provide</h4>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      RFID-based movement logic systems, scanning and access-triggered action mechanisms, automated sorting systems, and identity-based control solutions.
                    </p>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Benefits</h4>
                    <ul className="space-y-2 mb-6">
                      {[
                        'Eliminates manual identification processes',
                        'Extremely fast and accurate scanning',
                        'Works without line-of-sight requirement',
                        'Programmable action triggering',
                        'Secure access control integration'
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Where It Can Be Used</h4>
                    <p className="text-gray-700">
                      Inventory management, access control systems, automated libraries, parking systems, retail checkout, supply chain tracking, asset management.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-orange-500 to-red-500 p-8 flex items-center justify-center">
                    <div className="text-center">
                      <Cpu className="w-20 h-20 text-white mx-auto mb-4" />
                      <h3 className="text-3xl font-bold text-white">Motor & Mechanism Control</h3>
                    </div>
                  </div>
                  <div className="md:col-span-2 p-8">
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">What We Provide</h4>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      DC, servo, and stepper motor automation for mechanical applications, precise position control systems, speed control mechanisms, and synchronized multi-motor operations.
                    </p>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Benefits</h4>
                    <ul className="space-y-2 mb-6">
                      {[
                        'Precise control over movement and positioning',
                        'Variable speed control for different operations',
                        'Smooth acceleration and deceleration',
                        'Energy-efficient operation',
                        'Programmable motion profiles'
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Where It Can Be Used</h4>
                    <p className="text-gray-700">
                      CNC machines, conveyor systems, automated gates, robotic arms, material handling equipment, packaging machines, 3D printers.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-red-500 to-pink-500 p-8 flex items-center justify-center">
                    <div className="text-center">
                      <Shield className="w-20 h-20 text-white mx-auto mb-4" />
                      <h3 className="text-3xl font-bold text-white">Safety Monitoring</h3>
                    </div>
                  </div>
                  <div className="md:col-span-2 p-8">
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">What We Provide</h4>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      Eye blink safety systems, disturbance alarm mechanisms, early warning solutions for equipment and personnel, vibration detection systems, and drowsiness monitoring.
                    </p>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Benefits</h4>
                    <ul className="space-y-2 mb-6">
                      {[
                        'Prevents accidents before they occur',
                        'Immediate alert generation',
                        'Reduces workplace injuries',
                        'Continuous 24/7 monitoring',
                        'Complements existing safety protocols'
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Where It Can Be Used</h4>
                    <p className="text-gray-700">
                      Manufacturing plants, construction sites, mining operations, transportation, heavy machinery operations, security systems.
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden grid md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-purple-500 to-indigo-500 p-8 flex items-center justify-center">
                    <div className="text-center">
                      <Zap className="w-20 h-20 text-white mx-auto mb-4" />
                      <h3 className="text-3xl font-bold text-white">Product Prototyping</h3>
                    </div>
                  </div>
                  <div className="md:col-span-2 p-8">
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">What We Provide</h4>
                    <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                      End-to-end hardware development for startups and institutions, from concept validation to functional prototypes, PCB design, enclosure design, and production-ready documentation.
                    </p>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Benefits</h4>
                    <ul className="space-y-2 mb-6">
                      {[
                        'Rapid concept-to-prototype development',
                        'Cost-effective proof of concept',
                        'Iterative design refinement',
                        'Production-ready solutions',
                        'Technical documentation included'
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <ChevronRight className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Where It Can Be Used</h4>
                    <p className="text-gray-700">
                      Startups launching hardware products, research institutions, product development companies, innovation labs, educational projects.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl shadow-2xl p-12">
                <h2 className="text-4xl font-bold text-white mb-8 text-center">Why Our Solutions Matter</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    { title: 'Reduces Manual Operations', desc: 'Automate repetitive tasks and free up human resources for higher-value work' },
                    { title: 'Improves Safety & Efficiency', desc: 'Prevent accidents and optimize processes with intelligent monitoring and control' },
                    { title: 'Smart Automation with Sensor Logic', desc: 'Make decisions based on real-time data from multiple sensor inputs' },
                    { title: 'Expandable and Future-Upgrade Ready', desc: 'Our modular designs allow easy addition of new features and capabilities' }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white bg-opacity-20 backdrop-blur rounded-lg p-6">
                      <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                      <p className="text-white text-lg opacity-90">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'projects':
        return (
          <div className="min-h-screen">
            <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white py-20">
              <div className="max-w-6xl mx-auto px-6">
                <h1 className="text-6xl font-bold mb-6">Our Projects</h1>
                <p className="text-2xl text-gray-300">Real-world embedded systems solving real problems</p>
              </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-16">
              <p className="text-xl text-gray-700 mb-12 text-center leading-relaxed">
                Below are our highlight projects showcasing our expertise in robotics, IoT, RFID automation, and safety systems. Click on any project to see detailed information about its design, functionality, and real-world applications.
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => setCurrentPage(project.id)}
                  />
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-400 to-blue-500 py-16">
              <div className="max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold text-white mb-4">Have a Custom Project in Mind?</h2>
                <p className="text-xl text-white mb-8 opacity-90">
                  We can design and build embedded systems tailored to your specific requirements
                </p>
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="bg-white text-cyan-600 font-bold py-4 px-10 rounded-full hover:shadow-2xl transition-all duration-300 uppercase text-lg"
                >
                  Discuss Your Project
                </button>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="min-h-screen">
            <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white py-20">
              <div className="max-w-6xl mx-auto px-6">
                <h1 className="text-6xl font-bold mb-6">Let's Build Something Together</h1>
                <p className="text-2xl text-gray-300">Get in touch to discuss your embedded systems project</p>
              </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-16">
              <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="bg-cyan-100 p-3 rounded-full">
                          <MapPin className="w-6 h-6 text-cyan-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 mb-1">Location</h3>
                          <p className="text-gray-700">Nagpur, Maharashtra, India</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="bg-cyan-100 p-3 rounded-full">
                          <Phone className="w-6 h-6 text-cyan-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 mb-1">Phone / WhatsApp</h3>
                          <p className="text-gray-700">[Your Contact Number]</p>
                          <p className="text-sm text-gray-500 mt-1">Available for calls and WhatsApp messages</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="bg-cyan-100 p-3 rounded-full">
                          <Mail className="w-6 h-6 text-cyan-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 mb-1">Email</h3>
                          <p className="text-gray-700">[Your Email Address]</p>
                          <p className="text-sm text-gray-500 mt-1">We respond within 24 hours</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="bg-cyan-100 p-3 rounded-full">
                          <Clock className="w-6 h-6 text-cyan-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-gray-900 mb-1">Available Hours</h3>
                          <p className="text-gray-700">Monday – Saturday</p>
                          <p className="text-gray-700">10:00 AM – 7:00 PM IST</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg shadow-lg p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick Inquiry</h3>
                    <p className="text-gray-700 mb-4">
                      For immediate assistance or quick questions, reach out via WhatsApp or call us directly during business hours.
                    </p>
                    <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-all duration-300 uppercase">
                      Message on WhatsApp
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
                  <form className="space-y-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Your Name *</label>
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cyan-400 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                      <input
                        type="email"
                        placeholder="your.email@example.com"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cyan-400 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+91 XXXXXXXXXX"
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cyan-400 focus:outline-none transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Project Type</label>
                      <select className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cyan-400 focus:outline-none transition-colors">
                        <option>Select a service</option>
                        <option>Robotics Development</option>
                        <option>IoT Solutions</option>
                        <option>RFID Automation</option>
                        <option>Safety Systems</option>
                        <option>Product Prototyping</option>
                        <option>Custom Project</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">Project Details *</label>
                      <textarea
                        rows="5"
                        placeholder="Tell us about your project requirements, timeline, and budget..."
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-cyan-400 hover:bg-cyan-500 text-white font-bold py-4 px-6 rounded-full transition-all duration-300 hover:shadow-lg uppercase text-lg"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>

              <div className="mt-20">
                <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Frequently Asked Questions</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    {
                      q: 'What is the typical project timeline?',
                      a: 'Simple prototypes can be completed in 2-3 weeks, while complex systems may take 6-8 weeks. We provide detailed timelines during initial consultation.'
                    },
                    {
                      q: 'Do you provide post-deployment support?',
                      a: 'Yes, we offer maintenance packages and technical support for all projects. We ensure your systems run smoothly even after deployment.'
                    },
                    {
                      q: 'Can you modify existing projects?',
                      a: 'Absolutely! We can upgrade, modify, or expand any of our existing projects to match your specific requirements.'
                    },
                    {
                      q: 'What industries do you serve?',
                      a: 'We work with manufacturing, logistics, healthcare, education, agriculture, security, and retail sectors among others.'
                    },
                    {
                      q: 'Do you offer on-site installation?',
                      a: 'Yes, for projects within India, we provide on-site installation, testing, and training services.'
                    },
                    {
                      q: 'What is included in the project cost?',
                      a: 'All hardware components, software development, testing, documentation, and basic training are included. Custom requirements are quoted separately.'
                    }
                  ].map((faq, idx) => (
                    <div key={idx} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-6 shadow">
                      <h3 className="font-bold text-lg text-gray-900 mb-3">{faq.q}</h3>
                      <p className="text-gray-700">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <Cpu className="w-10 h-10 text-cyan-400" />
              <div>
                <h1 className="text-2xl font-bold">Krira Tech</h1>
                <p className="text-xs text-gray-400">Embedded Systems & Robotics</p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {navigation.map((item) => (
                <button
                  key={item.page}
                  onClick={() => setCurrentPage(item.page)}
                  className={`font-semibold transition-colors duration-300 ${
                    currentPage === item.page
                      ? 'text-cyan-400'
                      : 'text-white hover:text-cyan-400'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden pb-6">
              {navigation.map((item) => (
                <button
                  key={item.page}
                  onClick={() => {
                    setCurrentPage(item.page);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left py-3 font-semibold transition-colors duration-300 ${
                    currentPage === item.page
                      ? 'text-cyan-400'
                      : 'text-white hover:text-cyan-400'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <main>{renderPage()}</main>

      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="w-8 h-8 text-cyan-400" />
                <h3 className="text-xl font-bold">Krira Tech</h3>
              </div>
              <p className="text-gray-400">
                Building intelligent automation solutions for a smarter tomorrow
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <div className="space-y-2">
                {navigation.map((item) => (
                  <button
                    key={item.page}
                    onClick={() => setCurrentPage(item.page)}
                    className="block text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4">Our Expertise</h4>
              <div className="space-y-2 text-gray-400">
                <p>Embedded Systems</p>
                <p>Robotics Development</p>
                <p>IoT Solutions</p>
                <p>RFID Automation</p>
                <p>Safety Hardware</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400 text-lg mb-2">
              Embedded Systems | Robotics | IoT | RFID | Automation
            </p>
            <p className="text-gray-500">© {new Date().getFullYear()} Krira Tech. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default KriraTechWebsite;
