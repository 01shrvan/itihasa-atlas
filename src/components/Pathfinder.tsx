import { useState } from 'react';

type Choice = {
  id: string;
  label: string;
  consequence: string;
  citation: string;
};

const choices: Choice[] = [
  {
    id: 'refuse',
    label: 'Refuse the second game',
    consequence:
      'The court must confront the insult in public. The story does not promise that refusal prevents war; it makes the cost of consent visible earlier.',
    citation: 'Sabhā Parva · Dice Game · citation review pending',
  },
  {
    id: 'accept',
    label: 'Accept the summons',
    consequence:
      'The wager turns a dispute over sovereignty into exile. The injury acquires time, witnesses and a date of return.',
    citation: 'Sabhā Parva → Vana Parva · citation review pending',
  },
  {
    id: 'question',
    label: 'Ask the court to answer',
    consequence:
      'Draupadī’s question does not settle the law. It exposes whose voices the court has decided not to recognise.',
    citation: 'Sabhā Parva · Draupadī in the assembly · citation review pending',
  },
];

export default function Pathfinder() {
  const [selectedId, setSelectedId] = useState(choices[1].id);
  const selected = choices.find((choice) => choice.id === selectedId) ?? choices[1];

  return (
    <section className="pathfinder-tool" aria-labelledby="pathfinder-question">
      <div className="pathfinder-tool__prompt">
        <p className="label">A DECISION, NOT A QUIZ</p>
        <p className="pathfinder-tool__index">SABHĀ PARVA / MOMENT 01</p>
        <h2 id="pathfinder-question">
          What becomes possible when the court stays silent?
        </h2>
      </div>

      <div className="pathfinder-tool__choices" role="list">
        {choices.map((choice, index) => (
          <button
            aria-pressed={choice.id === selectedId}
            className={choice.id === selectedId ? 'is-selected' : ''}
            key={choice.id}
            onClick={() => setSelectedId(choice.id)}
            role="listitem"
            type="button"
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            {choice.label}
          </button>
        ))}
      </div>

      <article className="pathfinder-tool__result" aria-live="polite">
        <p className="label">PRESSURE CREATED</p>
        <p>{selected.consequence}</p>
        <small>{selected.citation}</small>
      </article>
    </section>
  );
}
