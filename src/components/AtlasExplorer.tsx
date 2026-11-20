import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { edges, nodes, threadLabels, type AtlasNode, type Thread } from '../data/atlas';

const threads: Thread[] = ['bloodline', 'exile', 'war'];
const tone = (node: AtlasNode) => node.kind === 'event' ? 'event' : node.kind === 'verse' ? 'verse' : 'person';

export default function AtlasExplorer() {
  const [thread, setThread] = useState<Thread | 'all'>('all');
  const [selected, setSelected] = useState('dice');
  const [query, setQuery] = useState('');
  const reduceMotion = useReducedMotion();
  const shown = useMemo(() => nodes.filter((node) => (thread === 'all' || node.thread === thread) && `${node.label} ${node.devanagari ?? ''}`.toLowerCase().includes(query.toLowerCase())), [query, thread]);
  const shownIds = new Set(shown.map((node) => node.id));
  const current = nodes.find((node) => node.id === selected) ?? nodes[0];

  return <section className="atlas" id="atlas" aria-labelledby="atlas-title">
    <div className="atlas__topline"><div><p className="eyebrow">THE STORY ENGINE</p><h2 id="atlas-title">A family is not<br /><em>a straight line.</em></h2></div><p>Each thread carries a different kind of proof: kinship, consequence, a question asked in public.</p></div>
    <div className="toolbar"><div className="tabs" role="tablist"><button className={thread === 'all' ? 'active' : ''} onClick={() => setThread('all')}>ALL</button>{threads.map((item) => <button key={item} className={thread === item ? 'active' : ''} onClick={() => setThread(item)}>{threadLabels[item].number} {threadLabels[item].label.toUpperCase()}</button>)}</div><label className="search"><span className="sr-only">Search the atlas</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search names" />⌕</label></div>
    <div className="atlas-grid"><div className="map" role="region" aria-label="Interactive relationship map"><div className="ruler"><span>ANCESTRY</span><span>THE COURT</span><span>THE FIELD</span></div><svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">{edges.filter(([a,b]) => shownIds.has(a) && shownIds.has(b)).map(([a,b]) => { const from = nodes.find((node) => node.id === a)!; const to = nodes.find((node) => node.id === b)!; const active = selected === a || selected === b; return <line key={`${a}-${b}`} x1={from.x} y1={from.y} x2={to.x} y2={to.y} className={active ? 'edge active' : 'edge'} />; })}</svg>{shown.map((node) => <motion.button layout={!reduceMotion} key={node.id} className={`map-node ${tone(node)} ${selected === node.id ? 'selected' : ''}`} style={{ left: `${node.x}%`, top: `${node.y}%` }} onClick={() => setSelected(node.id)} aria-pressed={selected === node.id}><b>{node.kind === 'person' ? '◌' : node.kind === 'event' ? '✦' : '॥'}</b>{node.label}</motion.button>)}<small>SELECT A THREAD TO FOLLOW ITS PRESSURE →</small></div>
      <aside className="detail" aria-live="polite"><AnimatePresence mode="wait"><motion.div key={current.id} initial={reduceMotion ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}><div className="detail-top"><span>{current.kind.toUpperCase()}</span><span>{current.attestation}</span></div><p className="script">{current.devanagari ?? 'इतिहास'}</p><h3>{current.label}</h3><p>{current.summary}</p><hr /><small><strong>READING NOTE</strong>{current.citation}</small><a href={`/${current.kind}s/${current.id}`}>OPEN READING PAGE →</a>{current.thread !== 'bloodline' && <button onClick={() => setThread(current.thread)}>FOLLOW {threadLabels[current.thread].label.toUpperCase()} →</button>}</motion.div></AnimatePresence></aside></div>
    <div className="paths">{threads.map((item) => <button key={item} onClick={() => setThread(item)} className={thread === item ? 'active' : ''}><span>{threadLabels[item].number}</span><strong>{threadLabels[item].label}</strong><em>{threadLabels[item].prompt}</em>↗</button>)}</div>
  </section>;
}
