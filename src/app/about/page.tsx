'use client';

import Layout from '../../components/Layout';
import Image from 'next/image';
import styles from '../../styles/About.module.css';
import { useEffect, useRef } from 'react';
import { 
  trackWorkExperienceView, 
  trackWorkExperienceClick, 
  trackSkillCategoryView, 
  trackHeroSectionView,
  trackStatsView 
} from '@/lib/analytics';
import { useScrollTracking } from '@/lib/useScrollTracking';
import { useTimeTracking } from '@/lib/useTimeTracking';
import { useIntersectionTracking } from '@/lib/useIntersectionTracking';

const skills = [
  { category: "Programming Languages", items: ["Java", "Python", "JavaScript/TypeScript", "C/C++", "C#", "Ruby", "Scala", "Rust", "SQL"] },
  { category: "Cloud & Infrastructure", items: ["AWS (EC2, Lambda, S3, DynamoDB, SNS, SQS, ECS, Step Functions)", "MySQL", "Distributed Systems", "Networking", "Concurrency Control"] },
  { category: "Web Technologies", items: ["React/Next.js", "TypeScript", "HTML/CSS", "REST APIs"] },
  { category: "Testing & Quality", items: ["Jest", "Cypress", "Unit, Component & End-to-End Testing"] },
  { category: "AI & Agentic Development", items: ["Claude Code / Codex", "Agentic Development", "Machine Learning"] },
  { category: "Tools & Practices", items: ["Git", "Agile Methodology", "Confluence", "Jira", "Splunk", "Linux"] }
];

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);

  // Initialize tracking hooks
  useScrollTracking({ page: 'about' });
  useTimeTracking({ page: 'about' });
  const { observe } = useIntersectionTracking({ page: 'about' });

  // Track section views using intersection observer
  useEffect(() => {
    if (heroRef.current) observe(heroRef.current, 'hero_section');
    if (aboutRef.current) observe(aboutRef.current, 'about_section');
    if (skillsRef.current) observe(skillsRef.current, 'skills_section');
    if (experienceRef.current) observe(experienceRef.current, 'experience_section');
  }, [observe]);

  // Track hero section view on component mount
  useEffect(() => {
    trackHeroSectionView('about');
  }, []);

  const handleWorkExperienceClick = (company: string, position: string) => {
    trackWorkExperienceClick(company, position);
  };

  const handleSkillCategoryView = (category: string, skillCount: number) => {
    trackSkillCategoryView(category, skillCount);
  };

  const handleStatsView = () => {
    trackStatsView('about', 'hero_stats');
  };

  return (
    <Layout>
      <div className={styles.aboutPage}>
        {/* Hero Section */}
        <div className={styles.heroSection} ref={heroRef}>
          <div className={styles.heroContent}>
            <div className={styles.headshotContainer}>
              <div className={styles.headshotWrapper}>
                <Image 
                  src="/headshot.jpg" 
                  alt="Noah's headshot" 
                  width={200} 
                  height={200}
                  className={styles.headshot}
                />
                <div className={styles.headshotGlow}></div>
              </div>
            </div>
            <div className={styles.heroText}>
              <h1 className={styles.heroTitle}>Hi, I&apos;m Noah</h1>
              <p className={styles.heroSubtitle}>
                Software Development Engineer at AWS • UMD Graduate
              </p>
              <div className={styles.heroStats} onMouseEnter={handleStatsView}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>22</span>
                  <span className={styles.statLabel}>Years Old</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>4</span>
                  <span className={styles.statLabel}>Internships</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>Arlington</span>
                  <span className={styles.statLabel}>Virginia</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* About Me Section */}
        <div className={styles.aboutSection} ref={aboutRef}>
          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>About Me</h2>
            <div className={styles.aboutGrid}>
              <div className={styles.aboutCard}>
                <h3>Education</h3>
                <p>
                  Bachelor of Science in Computer Science with a minor in Statistics from the University of Maryland, College Park. 
                  Graduated with a strong foundation in algorithms, data structures, and statistical analysis, 
                  preparing me for a career in cloud computing and distributed systems.
                </p>
              </div>
              
              <div className={styles.aboutCard}>
                <h3>Current Role</h3>
                <p>
                  Software Development Engineer at AWS working on the EC2 VPC team, where I contribute to building and maintaining 
                  the core networking infrastructure that powers Amazon&apos;s cloud computing platform. 
                  I&apos;m passionate about creating scalable, reliable systems that serve millions of customers.
                </p>
              </div>
              
              <div className={styles.aboutCard}>
                <h3>Passion</h3>
                <p>
                  What excites me most is the opportunity to work on systems that impact millions of users worldwide. 
                  Whether it&apos;s optimizing cloud infrastructure, building scalable services, or solving complex technical challenges, 
                  I love creating solutions that make a real difference.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className={styles.skillsSection} ref={skillsRef}>
          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>Technical Skills</h2>
            <div className={styles.skillsGrid}>
              {skills.map((skillGroup, index) => (
                <div 
                  key={index} 
                  className={styles.skillGroup}
                  onMouseEnter={() => handleSkillCategoryView(skillGroup.category, skillGroup.items.length)}
                >
                  <h3 className={styles.skillCategory}>{skillGroup.category}</h3>
                  <div className={styles.skillItems}>
                    {skillGroup.items.map((skill, skillIndex) => (
                      <span key={skillIndex} className={styles.skillTag}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Work Experience Timeline */}
        <div className={styles.experienceSection} ref={experienceRef}>
          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>Work Experience</h2>
            <div className={styles.timeline}>
              <div
                className={styles.timelineItem}
                onClick={() => handleWorkExperienceClick('Amazon Web Services (AWS)', 'Software Development Engineer, EC2 Networking/VPC Control Plane')}
                onMouseEnter={() => trackWorkExperienceView('Amazon Web Services (AWS)', 'Software Development Engineer, EC2 Networking/VPC Control Plane')}
              >
                <div className={styles.timelineMarker}>
                  <div className={styles.markerDot}></div>
                  <div className={styles.markerLine}></div>
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.jobHeader}>
                    <h3 className={styles.companyName}>Amazon Web Services (AWS)</h3>
                    <span className={styles.location}>Arlington, VA</span>
                    <span className={styles.duration}>June 2025 - Present</span>
                  </div>
                  <h4 className={styles.jobTitle}>Software Development Engineer, EC2 Networking/VPC Control Plane</h4>
                  <p className={styles.jobDescription}>
                    Core infrastructure engineer owning the system-of-record for EC2 network interface lifecycle, IP management, and
                    instance-launch networking — every EC2 launch, ENI attachment, Elastic IP, and Load Balancer operation in AWS
                    transits this service across 40+ regions.
                  </p>
                  <div className={styles.achievements}>
                    <h5>Key Responsibilities:</h5>
                    <ul>
                      <li>Architected a cell-based sharding migration for the control plane spanning 40+ AWS regions, reducing the blast radius of zone-level failures from full-AZ to sub-zone cells and enabling faster incident recovery for a service on the critical path of every EC2 instance launch</li>
                      <li>Built a Java data-partitioning tool that splits multi-terabyte MySQL databases into isolated, cell-scoped replicas with dry-run validation and zero-downtime bootstrap, used in production to stand up new shards without impacting the millions of networking mutations processed daily at sub-100ms P99</li>
                      <li>Implemented strongly consistent distributed reads across the sharded topology via scatter-gather routing, migrating 45+ API paths to enforce cell-level transaction isolation and building fleet-wide rollback tooling for safe reversibility during the multi-month migration</li>
                      <li>Owned CloudFormation resource provider reliability for EC2 network resources across all 4 AWS partitions (commercial, GovCloud, China, isolated), building automated contract testing and canary infrastructure while shipping customer-requested features end-to-end</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div
                className={styles.timelineItem}
                onClick={() => handleWorkExperienceClick('Amazon', 'Software Development Engineering Intern')}
                onMouseEnter={() => trackWorkExperienceView('Amazon', 'Software Development Engineering Intern')}
              >
                <div className={styles.timelineMarker}>
                  <div className={styles.markerDot}></div>
                  <div className={styles.markerLine}></div>
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.jobHeader}>
                    <h3 className={styles.companyName}>Amazon</h3>
                    <span className={styles.location}>Arlington, VA</span>
                    <span className={styles.duration}>August 2024 - November 2024</span>
                  </div>
                  <h4 className={styles.jobTitle}>Software Development Engineering Intern</h4>
                  <p className={styles.jobDescription}>
                    Interned on the payments team, expanding local payment method coverage for Prime Video, Amazon Music, and Kindle.
                  </p>
                  <div className={styles.achievements}>
                    <h5>Key Achievements:</h5>
                    <ul>
                      <li>Expanded payment method coverage for Prime Video, Amazon Music, and Kindle across 26 countries by integrating 7 new local payment methods, improving checkout accessibility for 200M+ customers</li>
                      <li>Extended the LPCA payment processing service by implementing a new Lambda handler with retry logic, improving fault tolerance and adding a new processing dimension to the distributed payments pipeline</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div
                className={styles.timelineItem}
                onClick={() => handleWorkExperienceClick('Capital One', 'Software Engineering Intern')}
                onMouseEnter={() => trackWorkExperienceView('Capital One', 'Software Engineering Intern')}
              >
                <div className={styles.timelineMarker}>
                  <div className={styles.markerDot}></div>
                  <div className={styles.markerLine}></div>
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.jobHeader}>
                    <h3 className={styles.companyName}>Capital One</h3>
                    <span className={styles.location}>McLean, VA</span>
                    <span className={styles.duration}>June 2024 - August 2024</span>
                  </div>
                  <h4 className={styles.jobTitle}>Software Engineering Intern</h4>
                  <p className={styles.jobDescription}>
                    Developed an Admin Console UI using React and TypeScript for campaign recovery on the Portfolio 
                    Decisioning project, saving the company potentially millions in revenue monthly.
                  </p>
                  <div className={styles.achievements}>
                    <h5>Key Achievements:</h5>
                    <ul>
                      <li>Collaborated with a team of 3 interns to develop an admin console for managing credit card campaigns</li>
                      <li>Utilized Cypress and Jest for rigorous testing, ensuring high-quality, reliable software</li>
                      <li>Developed API endpoints using Python, AWS Lambda, and DynamoDB for efficient management</li>
                      <li>Implemented full coverage cucumber feature tests within limited timeframe</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className={styles.timelineItem}>
                <div className={styles.timelineMarker}>
                  <div className={styles.markerDot}></div>
                  <div className={styles.markerLine}></div>
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.jobHeader}>
                    <h3 className={styles.companyName}>Noblis</h3>
                    <span className={styles.location}>Reston, VA</span>
                    <span className={styles.duration}>June 2023 - August 2023</span>
                  </div>
                  <h4 className={styles.jobTitle}>Software Engineering Intern</h4>
                  <p className={styles.jobDescription}>
                    Enhanced project data accessibility and user experience through comprehensive dashboard development.
                  </p>
                  <div className={styles.achievements}>
                    <h5>Key Achievements:</h5>
                    <ul>
                      <li>Designed dashboard with visually appealing charts and data tables</li>
                      <li>Streamlined user tasks, eliminating need for redirections to cluttered pages</li>
                      <li>Reduced project backlog through effective Agile methodologies</li>
                      <li>Collaborated with cross-functional teams using ASP.NET MVC and Syncfusion</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className={styles.timelineItem}>
                <div className={styles.timelineMarker}>
                  <div className={styles.markerDot}></div>
                </div>
                <div className={styles.timelineContent}>
                  <div className={styles.jobHeader}>
                    <h3 className={styles.companyName}>OnSystem Logic</h3>
                    <span className={styles.location}>Baltimore, MD</span>
                    <span className={styles.duration}>June 2022 - August 2022</span>
                  </div>
                  <h4 className={styles.jobTitle}>Software Developer Intern</h4>
                  <p className={styles.jobDescription}>
                    Enhanced security of management console through two-factor authentication integration.
                  </p>
                  <div className={styles.achievements}>
                    <h5>Key Achievements:</h5>
                    <ul>
                      <li>Deep-dived into MVC structure of the management console</li>
                      <li>Successfully engineered robust two-factor authentication process, reducing unauthorized access risk by 75%</li>
                      <li>Enhanced user customization features using yii2 PHP framework</li>
                      <li>Developed Python scripts to optimize software behavioral learning data organization</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 