import React, { useState, useEffect } from 'react';

export default function SignalFinalCta({ onOpenReader }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 84,
    hours: 16,
    minutes: 34,
    seconds: 22,
  });

  useEffect(() => {
    const target = new Date('2026-08-21T16:00:00Z').getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');

  return (
    <section className="sf-final-cta-section">
      <div className="sf-wrap">
        <div className="sf-final-cta-sheet">
          <div className="sf-final-cta-bg">
            <img src="/images/signalfest/final_cta.png" alt="Signal Festival crowd" loading="lazy" />
            <div className="sf-final-cta-dim" />
          </div>

          <div className="sf-final-cta-content">
            <h2 className="sf-final-cta-headline">LOS ANGELES GETS LOUD IN EXACTLY</h2>

            <div className="sf-final-cta-clock">
              <div className="sf-clock-segment">
                <span className="sf-clock-num">{timeLeft.days}</span>
                <span className="sf-clock-unit">DAYS</span>
              </div>
              <span className="sf-clock-colon">:</span>
              <div className="sf-clock-segment">
                <span className="sf-clock-num">{pad(timeLeft.hours)}</span>
                <span className="sf-clock-unit">HOURS</span>
              </div>
              <span className="sf-clock-colon">:</span>
              <div className="sf-clock-segment">
                <span className="sf-clock-num">{pad(timeLeft.minutes)}</span>
                <span className="sf-clock-unit">MINUTES</span>
              </div>
              <span className="sf-clock-colon">:</span>
              <div className="sf-clock-segment">
                <span className="sf-clock-num">{pad(timeLeft.seconds)}</span>
                <span className="sf-clock-unit">SECONDS</span>
              </div>
            </div>

            <div className="sf-final-cta-actions">
              <a href="#tickets" className="sf-btn sf-btn-red sf-btn-huge">
                GET YOUR PASS
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
