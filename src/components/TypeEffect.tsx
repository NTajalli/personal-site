'use client';

import { useState, useEffect } from 'react';
import styles from '../styles/TypeEffect.module.css';

interface TypeEffectProps {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  delaySpeed?: number;
  onCycleComplete?: () => void; // Called once per full pass through all words
}

const TypeEffect = ({
  words,
  typeSpeed = 100,
  deleteSpeed = 100,
  delaySpeed = 1000,
  onCycleComplete
}: TypeEffectProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    
    if (!isDeleting) {
      // Typing phase
      if (currentText.length < currentWord.length) {
        const timeout = setTimeout(() => {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        }, typeSpeed);
        return () => clearTimeout(timeout);
      } else {
        // Finished typing, wait then start deleting
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, delaySpeed);
        return () => clearTimeout(timeout);
      }
    } else {
      // Deleting phase
      if (currentText.length > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, deleteSpeed);
        return () => clearTimeout(timeout);
      } else {
        // Finished deleting, move to next word
        setIsDeleting(false);
        setCurrentWordIndex((prev) => {
          const next = (prev + 1) % words.length;
          if (next === 0) {
            onCycleComplete?.();
          }
          return next;
        });
      }
    }
  }, [currentText, isDeleting, currentWordIndex, words, typeSpeed, deleteSpeed, delaySpeed, onCycleComplete]);

  return (
    <div className={styles.typeEffect}>
      <span>{currentText}</span>
      <span className={styles.cursor}>|</span>
    </div>
  );
};

export default TypeEffect; 