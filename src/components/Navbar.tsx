'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../styles/Navbar.module.css';
import { trackNavigation, trackMobileMenuToggle } from '@/lib/analytics';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    const newState = !isMenuOpen;
    setIsMenuOpen(newState);
    trackMobileMenuToggle(newState ? 'open' : 'close');
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    trackMobileMenuToggle('close');
  };

  const handleNavClick = (destination: string, label: string) => {
    trackNavigation(destination, `navbar_${label.toLowerCase()}`);
  };

  const handleBrandClick = () => {
    trackNavigation('/', 'navbar_brand');
  };

  const isActive = (path: string) => {
    // Debug: log the current pathname and path being compared
    console.log('Current pathname:', pathname, 'Comparing with:', path);
    
    // Handle exact matches and trailing slashes
    if (path === '/') {
      return pathname === '/';
    }
    
    // For other paths, handle both with and without trailing slashes
    return pathname === path || pathname === `${path}/`;
  };

  const navigationLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' }
  ];

  return (
    <>
      <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
        {/* Particle background effect */}
        <div className={styles.particleBackground}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className={`${styles.particle} ${styles[`particle${i + 1}`]}`}></div>
          ))}
        </div>

        <div className={styles.container}>
          {/* Brand/Logo */}
          <div className={styles.brand}>
            <Link href="/" className={styles.brandLink} onClick={() => { closeMenu(); handleBrandClick(); }}>
              <span className={styles.brandText}>NT</span>
              <div className={styles.brandGlow}></div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className={styles.desktopNav} aria-label="Main navigation">
            <ul className={styles.navList}>
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${styles.navLink} ${isActive(link.href) ? styles.active : ''}`}
                    onClick={() => handleNavClick(link.href, link.label)}
                  >
                    <span className={styles.linkText}>{link.label}</span>
                    <div className={styles.linkUnderline}></div>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className={`${styles.menuButton} ${isMenuOpen ? styles.active : ''}`}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <div 
        className={`${styles.mobileOverlay} ${isMenuOpen ? styles.open : ''}`}
        onClick={closeMenu}
        aria-hidden={!isMenuOpen}
      />

      {/* Mobile Navigation Menu */}
      <nav 
        className={`${styles.mobileNav} ${isMenuOpen ? styles.open : ''}`}
        aria-label="Mobile navigation"
        aria-hidden={!isMenuOpen}
      >
        <div className={styles.mobileNavContent}>
          <div className={styles.mobileHeader}>
            <h2 className={styles.mobileTitle}>Navigation</h2>
            <button 
              className={styles.backButton}
              onClick={closeMenu}
              aria-label="Close navigation"
            >
              <svg 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
            </button>
          </div>
          <ul className={styles.mobileNavList}>
            {navigationLinks.map((link, index) => (
              <li key={link.href} style={{ animationDelay: `${0.3 + index * 0.1}s` }}>
                <Link
                  href={link.href}
                  className={`${styles.mobileLink} ${isActive(link.href) ? styles.active : ''}`}
                  onClick={() => { closeMenu(); handleNavClick(link.href, `mobile_${link.label}`); }}
                >
                  <span className={styles.mobileLinkText}>{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar; 