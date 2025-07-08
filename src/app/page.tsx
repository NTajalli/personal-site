'use client';

import Layout from '../components/Layout';
import TypeEffect from '../components/TypeEffect';
import styles from '../styles/Home.module.css';
import { useEffect, useRef } from 'react';
import { 
  trackCTAClick, 
  trackSkillView, 
  trackHeroSectionView,
  trackStatsView 
} from '@/lib/analytics';
import { useScrollTracking } from '@/lib/useScrollTracking';
import { useTimeTracking } from '@/lib/useTimeTracking';
import { useIntersectionTracking } from '@/lib/useIntersectionTracking';

const words = [
  "Software Engineer", 
  "AWS SDE", 
  "Computer Scientist", 
  "Cloud Developer", 
  "Problem-Solver", 
  "Creative Thinker", 
  "Technologist"
];

const skills = [
  { name: "AWS Cloud Services", level: 90 },
  { name: "React/Next.js", level: 85 },
  { name: "Python", level: 88 },
  { name: "TypeScript", level: 82 },
  { name: "Cloud Infrastructure", level: 85 },
  { name: "C/C++", level: 80 }
];

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Initialize tracking hooks
  useScrollTracking({ page: 'home' });
  useTimeTracking({ page: 'home' });
  const { observe } = useIntersectionTracking({ page: 'home' });

  // Track section views using intersection observer
  useEffect(() => {
    if (heroRef.current) observe(heroRef.current, 'hero_section');
    if (skillsRef.current) observe(skillsRef.current, 'skills_section');
    if (introRef.current) observe(introRef.current, 'introduction_section');
    if (ctaRef.current) observe(ctaRef.current, 'cta_section');
  }, [observe]);

  // Track hero section view on component mount
  useEffect(() => {
    trackHeroSectionView('home');
  }, []);

  const handleCTAClick = (buttonText: string, destination: string) => {
    trackCTAClick(buttonText, 'home', destination);
  };

  const handleSkillHover = (skillName: string, skillLevel: number) => {
    trackSkillView(skillName, skillLevel);
  };

  const handleStatsView = () => {
    trackStatsView('home', 'hero_stats');
  };

  return (
    <Layout>
      <div className={styles.heroSection} ref={heroRef}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.greeting}>Hi! I&apos;m Noah</h1>
            <h2 className={styles.title}>I am a:</h2>
            <div className={styles.typeEffectContainer}>
              <TypeEffect words={words} />
            </div>
            <p className={styles.subtitle}>
              Software Development Engineer at AWS • UMD Graduate
            </p>
          </div>
          
          <div className={styles.heroVisual}>
            <div className={styles.floatingCard}>
              <div className={styles.cardContent}>
                <div className={styles.avatarPlaceholder}>
                  <span className={styles.avatarText}>NT</span>
                </div>
                <div className={styles.stats} onMouseEnter={handleStatsView}>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>4+</span>
                    <span className={styles.statLabel}>Years Experience</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>10+</span>
                    <span className={styles.statLabel}>Projects</span>
                  </div>
                  <div className={styles.stat}>
                    <span className={styles.statNumber}>3</span>
                    <span className={styles.statLabel}>Internships</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.introduction} ref={introRef}>
        <div className={styles.introGrid}>
          <div className={styles.introCard}>
            <div className={styles.cardHeader}>
              <h3>Education</h3>
            </div>
            <p>
              Bachelor of Science in Computer Science with a minor in Statistics from the University of Maryland, College Park. 
              Specializing in cloud computing and distributed systems, I&apos;m passionate about building scalable infrastructure 
              and solving complex technical challenges.
            </p>
          </div>
          
          <div className={styles.introCard}>
            <div className={styles.cardHeader}>
              <h3>Current Role</h3>
            </div>
            <p>
              Software Development Engineer at AWS working on the EC2 VPC team, where I contribute to building and maintaining 
              the core networking infrastructure that powers the cloud. I&apos;m excited to continue growing and making an impact 
              in the cloud computing space.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.skillsSection} ref={skillsRef}>
        <h2 className={styles.sectionTitle}>Technical Skills</h2>
        <div className={styles.skillsGrid}>
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className={styles.skillCard}
              onMouseEnter={() => handleSkillHover(skill.name, skill.level)}
            >
              <div className={styles.skillHeader}>
                <span className={styles.skillName}>{skill.name}</span>
              </div>
              <div className={styles.progressBar}>
                <div 
                  className={styles.progressFill} 
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
              <span className={styles.skillLevel}>{skill.level}%</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.ctaSection} ref={ctaRef}>
        <div className={styles.ctaCard}>
          <h3>Ready to Connect?</h3>
          <p>Let&apos;s discuss how we can work together to bring your ideas to life.</p>
          <div className={styles.ctaButtons}>
            <a 
              href="/projects" 
              className={styles.ctaBtnPrimary}
              onClick={() => handleCTAClick('View My Work', '/projects')}
            >
              View My Work
            </a>
            <a 
              href="/contact" 
              className={styles.ctaBtnSecondary}
              onClick={() => handleCTAClick('Get In Touch', '/contact')}
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
