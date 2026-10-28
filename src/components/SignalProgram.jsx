import React from 'react';

const DAYS = [
  {
    day: 'THU',
    date: 'AUG 21',
    chapterId: '0',
    slots: [
      { time: '18:00', artist: 'VERA LUND', stage: 'YARD · LIVE' },
      { time: '19:30', artist: 'JONAS REITER', stage: 'MAIN · LIVE' },
      { time: '21:00', artist: 'SENA OKOYE', stage: 'MAIN · LIVE' },
      { time: '22:30', artist: 'AMARA VOSS', stage: 'MAIN · HEADLINE' },
    ],
  },
  {
    day: 'FRI',
    date: 'AUG 22',
    chapterId: '1',
    slots: [
      { time: '18:30', artist: 'RUBEN FALK', stage: 'MAIN · LIVE' },
      { time: '21:00', artist: 'ELIAS KRON', stage: 'YARD · LIVE' },
      { time: '22:00', artist: 'IVY SOLANO', stage: 'MAIN · LIVE' },
      { time: '23:30', artist: 'NINA BRUHN', stage: 'MAIN · HEADLINE' },
    ],
  },
  {
    day: 'SAT',
    date: 'AUG 23',
    chapterId: '0',
    slots: [
      { time: '18:00', artist: 'THEO MARSH', stage: 'MAIN · LIVE' },
      { time: '20:00', artist: 'LENA MARCH', stage: 'YARD · LIVE' },
      { time: '22:00', artist: 'DAX HOLLOWAY', stage: 'MAIN · HEADLINE' },
      { time: '23:30', artist: 'NADIA REKO', stage: 'YARD · CLOSING' },
    ],
  },
  {
    day: 'SUN',
    date: 'AUG 24',
    chapterId: '1',
    slots: [
      { time: '17:30', artist: 'KASPER HELD', stage: 'YARD · LIVE' },
      { time: '19:00', artist: 'OTTO BRANDT', stage: 'MAIN · LIVE' },
      { time: '21:30', artist: 'TOMAS FREI', stage: 'MAIN · HEADLINE' },
      { time: '23:00', artist: 'MIRA SOLSTAD', stage: 'MAIN · CLOSING' },
    ],
  },
];

export default function SignalProgram({ onOpenChapter }) {
  return (
    <section className="sf-section sf-program-section" id="program">
      <div className="sf-wrap">
        <div className="sf-program-head-row">
          <div className="sf-program-head-left">
            <span className="sf-pill">(Program schedule)</span>
            <h2 className="sf-lineup-title">Four days — scroll through</h2>
          </div>
          <div className="sf-hatch-box">
            <div className="sf-hatch-stripes" />
          </div>
        </div>

        {/* 4-column Schedule Field */}
        <div className="sf-schedule-grid-4col">
          {DAYS.map((col, idx) => (
            <div key={idx} className="sf-schedule-col">
              <div className="sf-schedule-col-header">
                <span className="sf-col-day">{col.day}</span>
                <span className="sf-col-date">{col.date}</span>
              </div>

              <div className="sf-schedule-col-slots">
                {col.slots.map((slot, sIdx) => (
                  <div
                    key={sIdx}
                    className="sf-slot-item"
                    onClick={() => {
                      if (onOpenChapter) onOpenChapter(col.chapterId);
                    }}
                    title={`Click to read record linked to ${slot.artist}`}
                  >
                    <span className="sf-slot-time">{slot.time}</span>
                    <h4 className="sf-slot-artist">{slot.artist}</h4>
                    <span className="sf-slot-stage">{slot.stage}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
