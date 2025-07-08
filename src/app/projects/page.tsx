'use client';

import Layout from '../../components/Layout';
import styles from '../../styles/Projects.module.css';
import { useEffect, useRef } from 'react';
import { 
  trackProjectView, 
  trackProjectDemo, 
  trackProjectCode,
  trackTechStackClick,
  trackCTAClick,
  trackHeroSectionView,
  trackGitHubClick 
} from '@/lib/analytics';
import { useScrollTracking } from '@/lib/useScrollTracking';
import { useTimeTracking } from '@/lib/useTimeTracking';
import { useIntersectionTracking } from '@/lib/useIntersectionTracking';

const projects = [
  {
    id: 1,
    title: "Machine Learning-Driven Digit Classifier Website",
    description: "A platform that seamlessly marries web development and machine/deep learning, bringing together intricate tech details with a user-friendly design. Venturing into the world of the MNIST dataset, I tapped into TensorFlow to train a Convolutional Neural Network that powers the website's core functionality, transforming hand-drawn digits into recognizable digital figures.",
    technologies: ["TensorFlow", "Python", "Flask", "AWS EC2", "JavaScript", "HTML Canvas"],
    category: "Machine Learning",
    liveUrl: "http://www.noahtajallidigitclassifier.com",
    githubUrl: "https://github.com/NTajalli/Digit_Classification_App",
    featured: true
  },
  {
    id: 2,
    title: "Forkify Recipe Search Website",
    description: "A delightful recipe browsing platform that offers real-time search capabilities, pulling data dynamically from an external API. The platform boasts robust recipe management functionalities including adjusting servings, saving cherished recipes, and adding brand-new ones.",
    technologies: ["AJAX", "HTML", "CSS", "JavaScript", "Asynchronous Programming"],
    category: "Web Development",
    liveUrl: "https://forkify-noah-tajalli.netlify.app",
    githubUrl: "https://github.com/NTajalli/Forkify",
    featured: true
  },
  {
    id: 3,
    title: "Personal Website - Digital Portfolio",
    description: "This Next.js website represents the evolution of my digital portfolio, migrated from the original HTML/CSS/JavaScript version. Built with modern technologies including Next.js 13, TypeScript, and CSS modules, this site showcases best practices in web development while maintaining the distinctive neon-blue aesthetic.",
    technologies: ["Next.js 13", "TypeScript", "CSS Modules", "React", "HTML5", "CSS3"],
    category: "Web Development",
    liveUrl: "/",
    githubUrl: "https://github.com/NTajalli/Personal-Website",
    featured: true
  },
  {
    id: 4,
    title: "MicroCaml Lexer, Parser, and Interpreter",
    description: "A comprehensive language processing system with a lexer that tokenizes code inputs, a parser that creates Abstract Syntax Trees (AST), and an interpreter that executes the processed code. The project runs seamlessly in mutop, providing a hands-on playground for MicroCaml expressions.",
    technologies: ["MicroCaml", "Lexer", "Parser", "Interpreter", "Unix OS", "Micro-utop"],
    category: "Systems Programming",
    githubUrl: "https://github.com/NTajalli/MicroCamlEvaluator",
    featured: false
  }
];

export default function Projects() {
  const featuredProjects = projects.filter(project => project.featured);
  const otherProjects = projects.filter(project => !project.featured);

  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const otherRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Initialize tracking hooks
  useScrollTracking({ page: 'projects' });
  useTimeTracking({ page: 'projects' });
  const { observe } = useIntersectionTracking({ page: 'projects' });

  // Track section views using intersection observer
  useEffect(() => {
    if (heroRef.current) observe(heroRef.current, 'hero_section');
    if (featuredRef.current) observe(featuredRef.current, 'featured_projects');
    if (otherRef.current) observe(otherRef.current, 'other_projects');
    if (ctaRef.current) observe(ctaRef.current, 'cta_section');
  }, [observe]);

  // Track hero section view on component mount
  useEffect(() => {
    trackHeroSectionView('projects');
  }, []);

  const handleProjectView = (projectName: string, category: string) => {
    trackProjectView(projectName, category);
  };

  const handleProjectDemo = (projectName: string, demoUrl: string) => {
    trackProjectDemo(projectName, demoUrl);
  };

  const handleProjectCode = (projectName: string, githubUrl: string) => {
    trackProjectCode(projectName, githubUrl);
  };

  const handleTechStackClick = (technology: string, projectName: string) => {
    trackTechStackClick(technology, projectName);
  };

  const handleCTAClick = (buttonText: string, destination: string) => {
    if (destination.includes('github.com')) {
      trackGitHubClick('projects_cta');
    } else {
      trackCTAClick(buttonText, 'projects', destination);
    }
  };

  return (
    <Layout>
      <div className={styles.projectsPage}>
        {/* Hero Section */}
        <div className={styles.heroSection} ref={heroRef}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>My Projects</h1>
            <p className={styles.heroSubtitle}>
              Showcasing my journey through code, from cloud infrastructure to web development
            </p>
            <div className={styles.projectStats}>
              <div className={styles.stat}>
                <span className={styles.statNumber}>{projects.length}</span>
                <span className={styles.statLabel}>Projects</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>4</span>
                <span className={styles.statLabel}>Categories</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statNumber}>100%</span>
                <span className={styles.statLabel}>Open Source</span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Projects */}
        <div className={styles.featuredSection} ref={featuredRef}>
          <div className={styles.sectionContainer}>
            <h2 className={styles.sectionTitle}>Featured Projects</h2>
            <div className={styles.featuredGrid}>
              {featuredProjects.map((project) => (
                <div 
                  key={project.id} 
                  className={styles.featuredCard}
                  onMouseEnter={() => handleProjectView(project.title, project.category)}
                >
                  <div className={styles.cardHeader}>
                    <div className={styles.projectMeta}>
                      <span className={styles.projectCategory}>{project.category}</span>
                      <h3 className={styles.projectTitle}>{project.title}</h3>
                    </div>
                  </div>
                  
                  <p className={styles.projectDescription}>{project.description}</p>
                  
                  <div className={styles.techStack}>
                    <h4>Technologies Used:</h4>
                    <div className={styles.techTags}>
                      {project.technologies.map((tech, index) => (
                        <span 
                          key={index} 
                          className={styles.techTag}
                          onClick={() => handleTechStackClick(tech, project.title)}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className={styles.projectActions}>
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        className={styles.actionBtn}
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => handleProjectDemo(project.title, project.liveUrl)}
                      >
                        Live Demo
                      </a>
                    )}
                    <a 
                      href={project.githubUrl} 
                      className={styles.actionBtn}
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={() => handleProjectCode(project.title, project.githubUrl)}
                    >
                      View Code
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div className={styles.otherSection} ref={otherRef}>
            <div className={styles.sectionContainer}>
              <h2 className={styles.sectionTitle}>Other Projects</h2>
              <div className={styles.otherGrid}>
                {otherProjects.map((project) => (
                  <div 
                    key={project.id} 
                    className={styles.otherCard}
                    onMouseEnter={() => handleProjectView(project.title, project.category)}
                  >
                    <div className={styles.cardHeader}>
                      <div className={styles.projectMeta}>
                        <span className={styles.projectCategory}>{project.category}</span>
                        <h3 className={styles.projectTitle}>{project.title}</h3>
                      </div>
                    </div>
                    
                    <p className={styles.projectDescription}>{project.description}</p>
                    
                    <div className={styles.techStack}>
                      <div className={styles.techTags}>
                        {project.technologies.slice(0, 4).map((tech, index) => (
                          <span 
                            key={index} 
                            className={styles.techTag}
                            onClick={() => handleTechStackClick(tech, project.title)}
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className={styles.techTag}>+{project.technologies.length - 4} more</span>
                        )}
                      </div>
                    </div>
                    
                    <div className={styles.projectActions}>
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          className={styles.actionBtn}
                          target="_blank" 
                          rel="noopener noreferrer"
                          onClick={() => handleProjectDemo(project.title, project.liveUrl)}
                        >
                          Live Demo
                        </a>
                      )}
                      <a 
                        href={project.githubUrl} 
                        className={styles.actionBtn}
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => handleProjectCode(project.title, project.githubUrl)}
                      >
                        View Code
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className={styles.ctaSection} ref={ctaRef}>
          <div className={styles.ctaCard}>
            <h3>Interested in Collaborating?</h3>
            <p>I&apos;m always open to discussing new opportunities and exciting projects.</p>
            <div className={styles.ctaButtons}>
              <a 
                href="/contact" 
                className={styles.ctaBtnPrimary}
                onClick={() => handleCTAClick('Get In Touch', '/contact')}
              >
                Get In Touch
              </a>
              <a 
                href="https://github.com/NTajalli" 
                className={styles.ctaBtnSecondary} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => handleCTAClick('View GitHub', 'https://github.com/NTajalli')}
              >
                View GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 