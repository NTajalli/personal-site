'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <>
      <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
        {/* Particle effect background */}
        <div className={styles.particleBackground}>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
          <div className={styles.particle}></div>
        </div>

        <div className={styles.navContainer}>
          {/* Logo/Brand */}
          <div className={styles.brand}>
            <Link href="/" className={styles.brandLink}>
              <span className={styles.brandText}>NT</span>
              <div className={styles.brandGlow}></div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className={styles.desktopLinks}>
            <Link 
              href="/" 
              className={`${styles.navLink} ${isActive('/') ? styles.active : ''}`}
            >
              <span className={styles.linkText}>Home</span>
              <div className={styles.linkUnderline}></div>
            </Link>
            <Link 
              href="/about" 
              className={`${styles.navLink} ${isActive('/about') ? styles.active : ''}`}
            >
              <span className={styles.linkText}>About</span>
              <div className={styles.linkUnderline}></div>
            </Link>
            <Link 
              href="/projects" 
              className={`${styles.navLink} ${isActive('/projects') ? styles.active : ''}`}
            >
              <span className={styles.linkText}>Projects</span>
              <div className={styles.linkUnderline}></div>
            </Link>
            <Link 
              href="/contact" 
              className={`${styles.navLink} ${isActive('/contact') ? styles.active : ''}`}
            >
              <span className={styles.linkText}>Contact</span>
              <div className={styles.linkUnderline}></div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`${styles.hamburger} ${isOpen ? styles.active : ''}`} 
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`${styles.mobileLinks} ${isOpen ? styles.open : ''}`}>
          <div className={styles.mobileLinksContainer}>
            <div className={styles.mobileHeader}>
              <span className={styles.mobileTitle}>Navigation</span>
            </div>
            <Link 
              href="/" 
              className={`${styles.mobileLink} ${isActive('/') ? styles.active : ''}`} 
              onClick={closeMenu}
            >
              <span className={styles.mobileLinkText}>Home</span>
            </Link>
            <Link 
              href="/about" 
              className={`${styles.mobileLink} ${isActive('/about') ? styles.active : ''}`} 
              onClick={closeMenu}
            >
              <span className={styles.mobileLinkText}>About</span>
            </Link>
            <Link 
              href="/projects" 
              className={`${styles.mobileLink} ${isActive('/projects') ? styles.active : ''}`} 
              onClick={closeMenu}
            >
              <span className={styles.mobileLinkText}>Projects</span>
            </Link>
            <Link 
              href="/contact" 
              className={`${styles.mobileLink} ${isActive('/contact') ? styles.active : ''}`} 
              onClick={closeMenu}
            >
              <span className={styles.mobileLinkText}>Contact</span>
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Overlay for mobile menu */}
      {isOpen && <div className={styles.overlay} onClick={closeMenu}></div>}
    </>
  );
};

export default Navbar; 