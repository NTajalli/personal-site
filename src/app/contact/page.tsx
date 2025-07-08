'use client';

import Layout from '../../components/Layout';
import styles from '../../styles/Contact.module.css';
import { useEffect, useRef } from 'react';
import { 
  trackFormStart, 
  trackFormFieldFocus, 
  trackFormSubmit, 
  trackEmailClick, 
  trackPhoneClick, 
  trackHeroSectionView,
  trackExternalLink 
} from '@/lib/analytics';
import { useScrollTracking } from '@/lib/useScrollTracking';
import { useTimeTracking } from '@/lib/useTimeTracking';
import { useIntersectionTracking } from '@/lib/useIntersectionTracking';

export default function Contact() {
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const formStarted = useRef<boolean>(false);

  // Initialize tracking hooks
  useScrollTracking({ page: 'contact' });
  useTimeTracking({ page: 'contact' });
  const { observe } = useIntersectionTracking({ page: 'contact' });

  // Track section views using intersection observer
  useEffect(() => {
    if (heroRef.current) observe(heroRef.current, 'hero_section');
    if (formRef.current) observe(formRef.current, 'contact_form');
    if (detailsRef.current) observe(detailsRef.current, 'contact_details');
  }, [observe]);

  // Track hero section view on component mount
  useEffect(() => {
    trackHeroSectionView('contact');
  }, []);

  const handleFormStart = () => {
    if (!formStarted.current) {
      trackFormStart('contact_form');
      formStarted.current = true;
    }
  };

  const handleFieldFocus = (fieldName: string) => {
    handleFormStart();
    trackFormFieldFocus(fieldName, 'contact_form');
  };

  const handleFormSubmit = () => {
    trackFormSubmit('contact_form');
    // Allow form to submit normally
  };

  const handleEmailClick = () => {
    trackEmailClick('contact_page');
  };

  const handlePhoneClick = () => {
    trackPhoneClick('contact_page');
  };

  const handleLinkedInClick = () => {
    trackExternalLink('https://linkedin.com/in/your-profile', 'LinkedIn Profile');
  };

  return (
    <Layout>
      <div className={styles.contactPage}>
        {/* Hero Section */}
        <div className={styles.heroSection} ref={heroRef}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Get In Touch</h1>
            <p className={styles.heroSubtitle}>
              Let&apos;s discuss opportunities, collaborations, or just say hello!
            </p>
            <div className={styles.contactStats}>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Email Response</span>
                <span className={styles.statValue}>Within 24h</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Location</span>
                <span className={styles.statValue}>Arlington, VA</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.statLabel}>Availability</span>
                <span className={styles.statValue}>Open to Opportunities</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.contactContainer}>
          {/* Contact Form Section */}
          <div className={styles.formSection}>
            <div className={styles.formCard}>
              <div className={styles.formHeader}>
                <h2 className={styles.formTitle}>Send a Message</h2>
                <p className={styles.formSubtitle}>
                  I&apos;d love to hear from you! Fill out the form below and I&apos;ll get back to you as soon as possible.
                </p>
              </div>
              
              <form 
                ref={formRef}
                action="https://formsubmit.co/ntajal2829@gmail.com" 
                method="POST"
                className={styles.contactForm}
                onSubmit={handleFormSubmit}
              >
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.formLabel}>
                      Name
                    </label>
                    <input 
                      type="text" 
                      id="name"
                      name="name" 
                      required 
                      className={styles.formInput}
                      placeholder="Your full name"
                      onFocus={() => handleFieldFocus('name')}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.formLabel}>
                      Email
                    </label>
                    <input 
                      type="email" 
                      id="email"
                      name="email" 
                      required 
                      className={styles.formInput}
                      placeholder="your.email@example.com"
                      onFocus={() => handleFieldFocus('email')}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.formLabel}>
                    Subject
                  </label>
                  <input 
                    type="text" 
                    id="subject"
                    name="subject" 
                    required 
                    className={styles.formInput}
                    placeholder="What&apos;s this about?"
                    onFocus={() => handleFieldFocus('subject')}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.formLabel}>
                    Message
                  </label>
                  <textarea 
                    id="message"
                    name="message" 
                    required 
                    rows={6}
                    className={styles.formInput}
                    placeholder="Tell me about your project, opportunity, or just say hello!"
                    onFocus={() => handleFieldFocus('message')}
                  ></textarea>
                </div>

                <button type="submit" className={styles.submitBtn}>
                  Send Message
                </button>
              </form>
            </div>
          </div>
          
          {/* Contact Details Section */}
          <div className={styles.detailsSection} ref={detailsRef}>
            <div className={styles.detailsCard}>
              <h2 className={styles.detailsTitle}>Other Ways to Connect</h2>
              <p className={styles.detailsSubtitle}>
                Prefer a different method? Here are other ways to reach me:
              </p>
              
              <div className={styles.contactMethods}>
                <div className={styles.contactMethod}>
                  <div className={styles.methodContent}>
                    <h3 className={styles.methodTitle}>Email</h3>
                    <p className={styles.methodDescription}>Perfect for detailed discussions</p>
                    <a href="mailto:ntajal2829@gmail.com" className={styles.methodLink} onClick={handleEmailClick}>
                      ntajal2829@gmail.com
                    </a>
                  </div>
                </div>

                <div className={styles.contactMethod}>
                  <div className={styles.methodContent}>
                    <h3 className={styles.methodTitle}>Phone</h3>
                    <p className={styles.methodDescription}>Great for quick calls</p>
                    <a href="tel:+12404790600" className={styles.methodLink} onClick={handlePhoneClick}>
                      (240) 479-0600
                    </a>
                  </div>
                </div>

                <div className={styles.contactMethod}>
                  <div className={styles.methodContent}>
                    <h3 className={styles.methodTitle}>Location</h3>
                    <p className={styles.methodDescription}>Based in Washington DC Area</p>
                    <span className={styles.methodText}>
                      Arlington, Virginia, United States
                    </span>
                  </div>
                </div>

                <div className={styles.contactMethod}>
                  <div className={styles.methodContent}>
                    <h3 className={styles.methodTitle}>LinkedIn</h3>
                    <p className={styles.methodDescription}>Professional networking</p>
                    <a href="https://linkedin.com/in/your-profile" className={styles.methodLink} target="_blank" rel="noopener noreferrer" onClick={handleLinkedInClick}>
                      Connect on LinkedIn
                    </a>
                  </div>
                </div>
              </div>

              <div className={styles.availabilityInfo}>
                <h3 className={styles.availabilityTitle}>Current Availability</h3>
                <div className={styles.availabilityStatus}>
                  <span className={styles.statusDot}></span>
                  <span className={styles.statusText}>Open to new opportunities</span>
                </div>
                <p className={styles.availabilityDescription}>
                  I&apos;m currently working as a Software Development Engineer at AWS on the EC2 VPC team. 
                  I&apos;m always interested in discussing interesting projects, networking opportunities, and potential collaborations!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 