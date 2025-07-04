import Layout from '../components/Layout';
import TypeEffect from '../components/TypeEffect';
import styles from '../styles/Home.module.css';

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
  return (
    <Layout>
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1 className={styles.greeting}>Hi! I'm Noah</h1>
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
                <div className={styles.stats}>
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

      <div className={styles.introduction}>
        <div className={styles.introGrid}>
          <div className={styles.introCard}>
            <div className={styles.cardHeader}>
              <h3>Education</h3>
            </div>
            <p>
              Bachelor of Science in Computer Science with a minor in Statistics from the University of Maryland, College Park. 
              Specializing in cloud computing and distributed systems, I'm passionate about building scalable infrastructure 
              and solving complex technical challenges.
            </p>
          </div>
          
          <div className={styles.introCard}>
            <div className={styles.cardHeader}>
              <h3>Current Role</h3>
            </div>
            <p>
              Software Development Engineer at AWS working on the EC2 VPC team, where I contribute to building and maintaining 
              the core networking infrastructure that powers the cloud. I'm excited to continue growing and making an impact 
              in the cloud computing space.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.skillsSection}>
        <h2 className={styles.sectionTitle}>Technical Skills</h2>
        <div className={styles.skillsGrid}>
          {skills.map((skill, index) => (
            <div key={index} className={styles.skillCard}>
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

      <div className={styles.ctaSection}>
        <div className={styles.ctaCard}>
          <h3>Ready to Connect?</h3>
          <p>Let's discuss how we can work together to bring your ideas to life.</p>
          <div className={styles.ctaButtons}>
            <a href="/projects" className={styles.ctaBtnPrimary}>
              View My Work
            </a>
            <a href="/contact" className={styles.ctaBtnSecondary}>
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
