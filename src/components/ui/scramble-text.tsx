import { useEffect, useRef, useState } from 'react';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';

interface ScrambleTextProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

export function ScrambleText({ text, className = '', speed = 30, delay = 0 }: ScrambleTextProps) {
  const [display, setDisplay] = useState('');
  const [started, setStarted] = useState(false);
  const frameRef = useRef(0);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) {
      setDisplay('\u00A0'.repeat(text.length));
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map((char, idx) => {
            if (char === ' ') return ' ';
            if (idx < iteration) return text[idx];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );
      iteration += 1 / 2;
      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplay(text);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, started]);

  return <span className={`${className} font-mono`}>{display}</span>;
}
