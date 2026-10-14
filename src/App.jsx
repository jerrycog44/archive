import { useMemo, useState, useEffect, useRef } from 'react';
import { collections, objects, threads } from './data.js';

/* Original generative plates. Abstract compositions, not reproductions of any real work. */
function Plate({ index, kind, label }) {
  const s = (index * 37) % 60;
  const shapes = {
    photography: (<><rect x="18" y="18" width="164" height="204" fill="none" stroke="#171715" strokeWidth="2" /><rect x={50 + s / 2} y="60" width="70" height="110" fill="#171715" /><circle cx={120 + s / 3} cy="90" r="22" fill="#F2F0E9" /></>),
    music: (<><circle cx="100" cy="120" r="84" fill="#171715" /><circle cx="100" cy="120" r="56" fill="none" stroke="#F2F0E9" strokeWidth="1.5" /><circle cx="100" cy="120" r="26" fill="#B6382D" /></>),
    fashion: (<>{Array.from({ length: 8 }).map((_, i) => <rect key={i} x={14 + i * 24} y="14" width={i % 2 ? 10 : 18} height="212" fill={i === 3 + (s % 3) ? '#B6382D' : '#171715'} />)}</>),
    design: (<><rect x="14" y="14" width="100" height="100" fill="#171715" /><rect x="118" y="118" width="68" height="108" fill="#B6382D" /><rect x="14" y="118" width="100" height="108" fill="none" stroke="#171715" strokeWidth="2" /></>),
  };
  return (
    <svg className="plate" viewBox="0 0 200 240" role="img" aria-label={label}>
      <rect width="200" height="240" fill="#E7E3D8" />
      {shapes[kind]}
    </svg>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [threadId, setThreadId] = useState(threads[0].id);
  const detailRef = useRef(null);

  const shown = useMemo(() => objects.filter(o => filter === 'all' || o.collection === filter), [filter]);
  const thread = threads.find(t => t.id === threadId);
  const linked = objects.filter(o => o.themes.includes(threadId));
  const sel = objects.find(o => o.id === selected);

  useEffect(() => {
    if (!selected) return;
    const onKey = e => e.key === 'Escape' && setSelected(null);
    window.addEventListener('keydown', onKey);
    detailRef.current?.focus();
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  const go = () => setOpen(false);

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="bar">
        <a className="mark" href="#top" aria-label="ARCHIVE, back to top">ARCHIVE</a>
        <button className="menu" aria-expanded={open} aria-controls="nav" onClick={() => setOpen(!open)}>{open ? 'Close' : 'Menu'}</button>
        <nav id="nav" className={open ? 'on' : ''} aria-label="Sections">
          <a href="#collections" onClick={go}>Collections</a>
          <a href="#objects" onClick={go}>Objects</a>
          <a href="#thread" onClick={go}>Thread</a>
          <a href="#blind-spot" onClick={go}>Blind spot</a>
          <a href="#record" onClick={go}>The record</a>
        </nav>
      </header>

      <main id="main">
        <section className="hero" id="top">
          <p className="meta">Nigerian creative history · working catalogue · {objects.length} placeholder entries</p>
          <h1>A history of us, <span className="still">still unfolding.</span></h1>
          <div className="hero-foot">
            <p className="lede">Photographs, records, cloth and printed things, held together as one argument: the story is not finished, and neither is the archive.</p>
            <svg className="hero-plate" viewBox="0 0 200 240" aria-hidden="true"><rect width="200" height="240" fill="#171715" /><rect x="24" y="24" width="152" height="192" fill="none" stroke="#F2F0E9" strokeWidth="1.5" /><rect x="24" y="150" width="152" height="66" fill="#B6382D" /><circle cx="100" cy="90" r="34" fill="#F2F0E9" /></svg>
          </div>
        </section>

        <section id="collections" aria-labelledby="c-h">
          <h2 id="c-h">Four collections</h2>
          <ul className="cols">
            {collections.map((c, i) => (
              <li key={c.id}>
                <button onClick={() => { setFilter(c.id); document.getElementById('objects').scrollIntoView({ behavior: 'smooth' }); }}>
                  <Plate index={i} kind={c.id} label={`${c.name} collection plate`} />
                  <span className="cname">{c.name}</span>
                  <span className="cline">{c.line}</span>
                  <span className="meta">{objects.filter(o => o.collection === c.id).length} entries</span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section id="objects" aria-labelledby="o-h">
          <h2 id="o-h">Selected objects</h2>
          <div className="filters" role="group" aria-label="Filter by collection">
            {[{ id: 'all', name: 'All' }, ...collections].map(c => (
              <button key={c.id} aria-pressed={filter === c.id} onClick={() => setFilter(c.id)}>{c.name}</button>
            ))}
          </div>
          <p className="meta" aria-live="polite">{shown.length} of {objects.length} shown</p>
          <ul className="objs">
            {shown.map((o, i) => (
              <li key={o.id}>
                <button onClick={() => setSelected(o.id)} aria-label={`Open record: ${o.title}`}>
                  <Plate index={i + 1} kind={o.collection} label="" />
                  <span className="meta">{o.id} · {o.verified ? 'verified' : 'unverified'}</span>
                  <span className="otitle">{o.title}</span>
                </button>
              </li>
            ))}
          </ul>
          {sel && (
            <aside className="detail" role="dialog" aria-modal="false" aria-labelledby="d-h" tabIndex={-1} ref={detailRef}>
              <button className="x" onClick={() => setSelected(null)}>Close record</button>
              <p className="meta">{sel.id} · {collections.find(c => c.id === sel.collection).name}</p>
              <h3 id="d-h">{sel.title}</h3>
              <p className="ask">{sel.ask}</p>
              <dl>
                {Object.entries(sel.record).map(([k, v]) => (<div key={k}><dt>{k}</dt><dd className={v.includes('pending') || v.includes('No source') ? 'pend' : ''}>{v}</dd></div>))}
              </dl>
              <p className="meta">Threads: {sel.themes.map(t => threads.find(x => x.id === t).label).join(', ')}</p>
              <button className="link" onClick={() => { setThreadId(sel.themes[0]); setSelected(null); document.getElementById('thread').scrollIntoView({ behavior: 'smooth' }); }}>Follow its thread</button>
            </aside>
          )}
        </section>

        <section id="thread" aria-labelledby="t-h">
          <h2 id="t-h">The cultural thread</h2>
          <p className="lede">Choose a theme. Objects that share it are drawn together. These are curatorial groupings, not claims that the makers knew each other.</p>
          <div className="filters" role="group" aria-label="Choose a thread">
            {threads.map(t => (<button key={t.id} aria-pressed={threadId === t.id} onClick={() => setThreadId(t.id)}>{t.label}</button>))}
          </div>
          <p className="blurb" aria-live="polite">{thread.blurb}</p>
          <ol className="thread">
            {linked.map(o => (
              <li key={o.id}>
                <button onClick={() => { setSelected(o.id); document.getElementById('objects').scrollIntoView({ behavior: 'smooth' }); }}>
                  <span className="meta">{o.id}</span>
                  <span className="otitle">{o.title}</span>
                </button>
              </li>
            ))}
          </ol>
        </section>

        <section id="blind-spot" className="dark" aria-labelledby="b-h">
          <h2 id="b-h">Every archive has a blind spot.</h2>
          <p>What is kept depends on who had a camera, a press, a shelf and a reason to save things. Oral memory, work done without credit, regions far from the studios and presses, and everything lost to damage or neglect can be thin or missing from any collection, this one included.</p>
          <p>Here, that gap is shown rather than hidden: every record that lacks a source says so, and unnamed makers stay visible as a theme instead of disappearing.</p>
        </section>

        <section id="record" aria-labelledby="r-h">
          <h2 id="r-h">The record isn&rsquo;t closed.</h2>
          <p className="lede">If you hold a photograph, a record, a garment or a printed piece, or know who made one, the entry can be corrected. Sources come first; unsourced claims stay marked as pending.</p>
          <p className="meta">Contributions: connect your own channel in <code>src/App.jsx</code> (see README).</p>
        </section>
      </main>
      <footer><p className="meta">ARCHIVE · prototype for the ONE-TEN Web Design Challenge · all entries are placeholders until sourced</p></footer>
    </>
  );
}
