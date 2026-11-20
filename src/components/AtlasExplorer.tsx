import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { edges, nodes, threadLabels, type AtlasNode, type Thread } from '../data/atlas';

const threads: Thread[] = ['bloodline', 'exile', 'war'];

function nodeTone(node: AtlasNode) {
  if (node.kind === 'event') return 'event';
  if (node.kind === 'verse') return 'verse';
  return 'person';
}

export default function AtlasExplorer() {
  const [thread, setThread] = useState<Thread | 'all'>('all');
  const [selectedId, setSelectedId] = useState('dice');
  const [query, setQuery] = useState('');
  const reduceMotion = useReducedMotion();

  const visibleNodes = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();

    return nodes.filter((node) => {
      const withinThread = thread === 'all' || node.thread === thread;
      const matchesSearch =
        !term ||
        `${node.label} ${node.devanagari ?? ''}`.toLocaleLowerCase().includes(term);

      return withinThread && matchesSearch;
    });
  }, [query, thread]);

  const visibleIds = new Set(visibleNodes.map((node) => node.id));
  const selected =
    visibleNodes.find((node) => node.id === selectedId) ?? visibleNodes[0] ?? nodes[0];

  function selectThread(nextThread: Thread | 'all') {
    setThread(nextThread);
    const nextNode = nodes.find((node) =>
      nextThread === 'all' ? node.id === 'dice' : node.thread === nextThread,
    );

    if (nextNode) setSelectedId(nextNode.id);
  }

  return (
    <section className="atlas" id="atlas" aria-labelledby="atlas-title">
      <header className="atlas__header">
        <div>
          <p className="label">01 / THE STORY ENGINE</p>
          <h2 id="atlas-title">
            Start with
            <br />
            <em>the fracture.</em>
          </h2>
        </div>
        <p className="atlas__dek">
          Not a family tree. A pressure map of vows, claims and answers that turn kinship
          into conflict.
        </p>
      </header>

      <div className="atlas__controls">
        <div className="thread-tabs" role="tablist" aria-label="Story threads">
          <button
            aria-selected={thread === 'all'}
            className={thread === 'all' ? 'is-active' : ''}
            onClick={() => selectThread('all')}
            role="tab"
            type="button"
          >
            ALL PRESSURES
          </button>
          {threads.map((item) => (
            <button
              aria-selected={thread === item}
              className={thread === item ? 'is-active' : ''}
              key={item}
              onClick={() => selectThread(item)}
              role="tab"
              type="button"
            >
              {threadLabels[item].number} / {threadLabels[item].label}
            </button>
          ))}
        </div>
        <label className="atlas-search">
          <span className="sr-only">Search people, places and events</span>
          <span aria-hidden="true">⌕</span>
          <input
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find a name"
            type="search"
            value={query}
          />
        </label>
      </div>

      <div className="atlas__stage">
        <div className="atlas__map" role="region" aria-label="Relationship map">
          <div className="map-scale" aria-hidden="true">
            <span>ANCESTRY</span>
            <span>THE COURT</span>
            <span>THE FIELD</span>
          </div>
          <svg aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 100 100">
            {edges
              .filter(([fromId, toId]) => visibleIds.has(fromId) && visibleIds.has(toId))
              .map(([fromId, toId]) => {
                const from = nodes.find((node) => node.id === fromId);
                const to = nodes.find((node) => node.id === toId);
                const isActive = selected.id === fromId || selected.id === toId;

                if (!from || !to) return null;

                return (
                  <line
                    className={isActive ? 'map-line is-active' : 'map-line'}
                    key={`${fromId}-${toId}`}
                    x1={from.x}
                    x2={to.x}
                    y1={from.y}
                    y2={to.y}
                  />
                );
              })}
          </svg>

          {visibleNodes.map((node) => (
            <button
              aria-pressed={selected.id === node.id}
              className={`map-node map-node--${node.id} ${nodeTone(node)} ${
                selected.id === node.id ? 'is-selected' : ''
              }`}
              key={node.id}
              onClick={() => setSelectedId(node.id)}
              type="button"
            >
              <span aria-hidden="true" className="map-node__mark" />
              {node.label}
            </button>
          ))}

          <p className="map-instruction">CHOOSE A POINT TO OPEN ITS DOCKET</p>
        </div>

        <aside className="docket" aria-live="polite">
          <p className="docket__number">
            CASE FILE / {String(nodes.indexOf(selected) + 1).padStart(2, '0')}
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              key={selected.id}
            >
              <div className="docket__meta">
                <span>{selected.kind}</span>
                <span>{selected.attestation}</span>
              </div>
              <p className="docket__script">{selected.devanagari ?? 'इतिहास'}</p>
              <h3>{selected.label}</h3>
              <p className="docket__summary">{selected.summary}</p>
              <div className="docket__source">
                <span>EDITORIAL STATUS</span>
                <strong>{selected.reviewStatus}</strong>
                <p>{selected.citation}</p>
              </div>
              <a href={`/${selected.kind}s/${selected.id}`}>OPEN READING NOTE ↗</a>
            </motion.div>
          </AnimatePresence>
        </aside>
      </div>

      <div className="question-rail" aria-label="Choose a reading path">
        {threads.map((item) => (
          <button
            className={thread === item ? 'is-active' : ''}
            key={item}
            onClick={() => selectThread(item)}
            type="button"
          >
            <span>{threadLabels[item].number}</span>
            <strong>{threadLabels[item].label}</strong>
            <em>{threadLabels[item].prompt}</em>
            <i aria-hidden="true">↗</i>
          </button>
        ))}
      </div>
    </section>
  );
}
