import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Footer.module.css';
import { trackSocialClick, trackNavigation, trackCTAClick, trackEmailClick, trackPhoneClick } from '@/lib/analytics';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const handleSocialClick = (platform: string) => {
    trackSocialClick(platform, 'footer');
  };

  const handleQuickLinkClick = (path: string, name: string) => {
    trackNavigation(path, `footer_${name.toLowerCase()}`);
  };

  const handleCTAClick = () => {
    trackCTAClick('Get In Touch', 'footer', '/contact');
  };

  const handleContactClick = (method: string) => {
    if (method === 'email') {
      trackEmailClick('footer');
    } else if (method === 'phone') {
      trackPhoneClick('footer');
    }
  };

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/noah-tajalli/',
      icon: '/linkedin-icon.png'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/NTajalli',
      icon: '/github-icon.png'
    }
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' }
  ];

  const contactInfo = [
    { label: 'Email', value: 'ntajal2829@gmail.com', link: 'mailto:ntajal2829@gmail.com' },
    { label: 'Phone', value: '(240) 479-0600', link: 'tel:+12404790600' },
    { label: 'Location', value: 'Arlington, Virginia', link: null }
  ];

  return (
    <footer className={styles.footer}>
      {/* Main Footer Content */}
      <div className={styles.footerContent}>
        <div className={styles.footerGrid}>
          {/* Brand Section */}
          <div className={styles.brandSection}>
            <div className={styles.brandInfo}>
              <div className={styles.brandLogo}>
                <span className={styles.logoText}>NT</span>
                <div className={styles.logoGlow}></div>
              </div>
              <h3 className={styles.brandName}>Noah Tajalli</h3>
              <p className={styles.brandTagline}>
                Software Development Engineer at AWS
              </p>
            </div>
            <div className={styles.socialLinks}>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={social.name}
                  onClick={() => handleSocialClick(social.name)}
                >
                  <div className={styles.socialIcon}>
                    <Image 
                      src={social.icon} 
                      alt={social.name} 
                      width={24} 
                      height={24} 
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.linksSection}>
            <h4 className={styles.sectionTitle}>Quick Links</h4>
            <ul className={styles.quickLinks}>
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.path} className={styles.quickLink} onClick={() => handleQuickLinkClick(link.path, link.name)}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className={styles.contactSection}>
            <h4 className={styles.sectionTitle}>Contact Info</h4>
            <div className={styles.contactList}>
              {contactInfo.map((contact, index) => (
                <div key={index} className={styles.contactItem}>
                  <div className={styles.contactDetails}>
                    <span className={styles.contactLabel}>{contact.label}</span>
                    {contact.link ? (
                      <a href={contact.link} className={styles.contactLink} onClick={() => handleContactClick(contact.label.toLowerCase())}>
                        {contact.value}
                      </a>
                    ) : (
                      <span className={styles.contactText}>{contact.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter/CTA Section */}
          <div className={styles.ctaSection}>
            <h4 className={styles.sectionTitle}>Let&apos;s Connect</h4>
            <p className={styles.ctaText}>
              Interested in collaborating or just want to say hello?
            </p>
            <Link href="/contact" className={styles.ctaButton} onClick={handleCTAClick}>
              Get In Touch
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.footerBottom}>
        <div className={styles.bottomContent}>
          <div className={styles.copyright}>
            <span>&copy; {currentYear} Noah Tajalli. All rights reserved.</span>
          </div>
          
          <div className={styles.footerStats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>4+</span>
              <span className={styles.statLabel}>Years Experience</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>10+</span>
              <span className={styles.statLabel}>Projects</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>100%</span>
              <span className={styles.statLabel}>Passionate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Particle Effect Background */}
      <div className={styles.particleBackground}>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
      </div>
    </footer>
  );
};

export default Footer; 