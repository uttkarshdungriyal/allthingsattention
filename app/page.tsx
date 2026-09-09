"use client";

import { useMemo, useState } from "react";

const BRAND = "althingsattention";

type View = "home" | "community" | "resources" | "tools" | "projects" | "jobs" | "events" | "dashboard";

const nav: { id: View; label: string }[] = [
  { id: "community", label: "Community" },
  { id: "resources", label: "Resources" },
  { id: "tools", label: "Tools" },
  { id: "projects", label: "Showcase" },
  { id: "jobs", label: "Opportunities" },
  { id: "events", label: "Events" },
];

const discussions = [
  { tag: "SEO & AI search", title: "How are you measuring visibility in AI answers?", body: "I’m building a lightweight reporting workflow for brands that want to understand where they appear beyond classic search.", author: "Ananya Rao", role: "SEO learner · Bengaluru", time: "2h", comments: 12, likes: 34, unanswered: false, color: "purple" },
  { tag: "Content & copywriting", title: "Landing page teardown: a first portfolio project", body: "Sharing my rewrite and the reasoning behind the new hierarchy. I’d love feedback on the value proposition.", author: "Kabir Mehta", role: "Freelance copywriter · Mumbai", time: "5h", comments: 8, likes: 27, unanswered: false, color: "teal" },
  { tag: "Freelancing & careers", title: "What should a beginner include in a marketing portfolio?", body: "I have two practice campaigns but no client work yet. What helped you land your first conversation?", author: "Meera Shah", role: "Student · Ahmedabad", time: "8h", comments: 0, likes: 9, unanswered: true, color: "orange" },
  { tag: "Marketing automation", title: "Simple lead-nurture workflow without over-automating", body: "A practical map of the triggers, human checkpoints, and follow-ups I use for warm inbound leads.", author: "David Kim", role: "Growth marketer · Singapore", time: "1d", comments: 15, likes: 41, unanswered: false, color: "blue" },
];

const resources = [
  { type: "Template", level: "Beginner", topic: "Strategy", title: "One-page campaign brief", desc: "Turn a loose idea into a focused campaign with goals, audience, message, channels, and measurement.", author: "althingsattention editorial", accent: "purple" },
  { type: "Checklist", level: "Beginner", topic: "SEO", title: "Technical SEO starter audit", desc: "A practical checklist for reviewing crawlability, indexing, performance, and on-page essentials.", author: "althingsattention editorial", accent: "teal" },
  { type: "Guide", level: "Intermediate", topic: "Freelancing", title: "From practice project to case study", desc: "Frame your thinking, process, and outcomes clearly—even when the project wasn’t for a client.", author: "althingsattention editorial", accent: "orange" },
  { type: "Prompts", level: "All levels", topic: "AI tools", title: "Research prompts with human checkpoints", desc: "A prompt pack for faster research without outsourcing judgment, fact-checking, or brand voice.", author: "althingsattention editorial", accent: "blue" },
];

const opportunities = [
  { type: "Internship", title: "Content marketing intern", org: "Demo company — not a live listing", place: "Pune · Hybrid", posted: "Demo · 08 Sep 2026", method: "Apply on company website" },
  { type: "Collaboration", title: "Partner for a nonprofit SEO practice project", org: "Demo community request — not live", place: "Remote · Worldwide", posted: "Demo · 07 Sep 2026", method: "Message the project owner" },
  { type: "Freelance", title: "Email nurture sequence writer", org: "Demo client — not a live listing", place: "Remote · India", posted: "Demo · 05 Sep 2026", method: "Submit portfolio link" },
];

const tools = [
  { name: "Google Search Console", cat: "SEO", purpose: "Monitor search performance and indexing.", use: "Queries, pages, coverage, Core Web Vitals", url: "https://search.google.com/search-console/about" },
  { name: "Canva", cat: "Design", purpose: "Create visual content with collaborative templates.", use: "Social creative, presentations, brand kits", url: "https://www.canva.com/" },
  { name: "Brevo", cat: "Email outreach", purpose: "Build email campaigns and marketing automations.", use: "Newsletters, sequences, segmentation", url: "https://www.brevo.com/" },
  { name: "Google Analytics", cat: "Analytics", purpose: "Understand traffic and product behaviour.", use: "Acquisition, journeys, conversions", url: "https://marketingplatform.google.com/about/analytics/" },
];

const projects = [
  { type: "PRACTICE PROJECT", title: "D2C skincare launch campaign", author: "Riya Nair", goal: "Build awareness among first-time skincare buyers aged 18–24.", tools: ["Canva", "Meta Ads", "Sheets"], result: "Concept project — no live performance data", tone: "purple" },
  { type: "CLIENT WORK", title: "Local café discovery campaign", author: "Arjun Patel", goal: "Increase weekday footfall from nearby college students.", tools: ["Instagram", "Maps", "GA4"], result: "Results shared with client permission", tone: "teal" },
  { type: "PRACTICE PROJECT", title: "SaaS onboarding email sequence", author: "Sofia Martin", goal: "Help new users reach the first-value moment sooner.", tools: ["Figma", "Brevo", "Notion"], result: "Prototype sequence · peer review requested", tone: "orange" },
];

const events = [
  { kind: "WORKSHOP", date: "14", month: "SEP", title: "Build your first marketing case study", meta: "6:30 PM IST · Online", host: "althingsattention editorial · Demo event" },
  { kind: "WEEKLY CHALLENGE", date: "18", month: "SEP", title: "Rewrite a confusing homepage hero", meta: "Starts 9:00 AM IST · Async", host: "Community challenge · Demo event" },
  { kind: "MEETUP", date: "28", month: "SEP", title: "Marketers’ coffee circle: Bengaluru", meta: "11:00 AM IST · In person", host: "Community hosts · Demo event" },
];

function Icon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></>,
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 5.5v14"/></>,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18"/></>,
    heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8z"/>,
    message: <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>,
    bookmark: <path d="M6 3h12v18l-6-4-6 4z"/>,
    plus: <path d="M12 5v14M5 12h14"/>,
    filter: <path d="M4 5h16M7 12h10M10 19h4"/>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18"/></>,
    external: <><path d="M14 3h7v7M10 14 21 3"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></>,
    menu: <path d="M4 6h16M4 12h16M4 18h16"/>,
    x: <path d="M6 6l12 12M18 6 6 18"/>,
  };
  return <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
}

export default function Althingsattention() {
  const [view, setView] = useState<View>("home");
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Newest");
  const [saved, setSaved] = useState<string[]>([]);
  const [notice, setNotice] = useState("");
  const [authOpen, setAuthOpen] = useState(false);

  const go = (next: View) => { setView(next); setMobile(false); setSearch(""); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const filteredDiscussions = useMemo(() => discussions.filter(d => `${d.title} ${d.body} ${d.tag}`.toLowerCase().includes(search.toLowerCase())).filter(d => sort !== "Unanswered" || d.unanswered).sort((a,b) => sort === "Popular" ? b.likes-a.likes : 0), [search, sort]);
  const save = (title: string) => { setSaved(v => v.includes(title) ? v.filter(x => x !== title) : [...v, title]); setNotice(saved.includes(title) ? "Removed from saved items" : "Saved to your dashboard"); setTimeout(() => setNotice(""), 2200); };
  const requireAuth = () => setAuthOpen(true);

  return <div className="site-shell">
    <a className="skip" href="#main">Skip to content</a>
    <header className="topbar">
      <button className="brand" onClick={() => go("home")} aria-label={`${BRAND} home`}><span className="brand-mark"><i/><i/><i/></span>{BRAND}<b>.</b></button>
      <nav className={mobile ? "nav open" : "nav"} aria-label="Main navigation">
        {nav.map(n => <button key={n.id} className={view === n.id ? "active" : ""} onClick={() => go(n.id)}>{n.label}</button>)}
      </nav>
      <div className="header-actions"><button className="login" onClick={() => setAuthOpen(true)}>Log in</button><button className="btn small" onClick={() => setAuthOpen(true)}>Join the circle <Icon name="arrow"/></button></div>
      <button className="menu" onClick={() => setMobile(!mobile)} aria-label="Toggle menu"><Icon name={mobile ? "x" : "menu"}/></button>
    </header>

    <main id="main">
      {view === "home" && <Home go={go} requireAuth={requireAuth}/>} 
      {view === "community" && <Community search={search} setSearch={setSearch} sort={sort} setSort={setSort} items={filteredDiscussions} saved={saved} save={save} requireAuth={requireAuth}/>} 
      {view === "resources" && <Resources search={search} setSearch={setSearch} saved={saved} save={save}/>} 
      {view === "tools" && <Tools search={search} setSearch={setSearch}/>} 
      {view === "projects" && <Projects requireAuth={requireAuth}/>} 
      {view === "jobs" && <Jobs search={search} setSearch={setSearch}/>} 
      {view === "events" && <Events requireAuth={requireAuth}/>} 
      {view === "dashboard" && <Dashboard saved={saved} go={go}/>} 
    </main>

    <footer><div><button className="brand footer-brand" onClick={() => go("home")}><span className="brand-mark"><i/><i/><i/></span>{BRAND}<b>.</b></button><p>A welcoming place to learn marketing,<br/>build proof of work, and grow together.</p><span>Built in India. Open to the world.</span></div><div className="footer-links"><section><h4>Platform</h4><button onClick={() => go("community")}>Community</button><button onClick={() => go("resources")}>Resources</button><button onClick={() => go("jobs")}>Opportunities</button></section><section><h4>Company</h4><button onClick={() => setNotice("About page coming next.")}>About</button><a href="mailto:hello@althingsattention.com">Contact</a><button onClick={() => setNotice("Guidelines: be helpful, specific, and respectful.")}>Community Guidelines</button></section><section><h4>Legal</h4><button onClick={() => setNotice("Privacy policy placeholder for launch review.")}>Privacy</button><button onClick={() => setNotice("Terms placeholder for launch review.")}>Terms</button></section></div><div className="footer-bottom">© 2026 {BRAND}. Demo build for review.</div></footer>

    {notice && <div className="toast" role="status">{notice}</div>}
    {authOpen && <div className="modal-wrap" role="dialog" aria-modal="true" aria-labelledby="auth-title" onMouseDown={e => e.target === e.currentTarget && setAuthOpen(false)}><div className="modal"><button className="modal-close" onClick={() => setAuthOpen(false)} aria-label="Close"><Icon name="x"/></button><span className="eyebrow">WELCOME TO THE CIRCLE</span><h2 id="auth-title">Learn, build and grow with us.</h2><p>Sign in to post, comment, bookmark resources, register for events, and manage your profile.</p><a className="btn full" href="/signin-with-chatgpt?return_to=/">Continue with ChatGPT <Icon name="arrow"/></a><div className="privacy-note">Your email stays private by default. By continuing, you agree to the Community Guidelines.</div></div></div>}
  </div>;
}

function Home({ go, requireAuth }: { go:(v:View)=>void; requireAuth:()=>void }) {
  return <>
    <section className="hero"><div className="hero-glow one"/><div className="hero-glow two"/><div className="hero-copy"><span className="eyebrow"><span className="pulse"/> INDIA-ROOTED · GLOBALLY OPEN</span><h1>Learn marketing.<br/>Build real projects.<br/><em>Grow together.</em></h1><p>{BRAND} is a practical, welcoming community for students, beginners, freelancers, and experienced marketers to learn, connect, share their work, and find their next opportunity.</p><div className="hero-actions"><button className="btn" onClick={requireAuth}>Join the Community <Icon name="arrow"/></button><button className="btn ghost" onClick={() => go("resources")}>Explore Resources</button></div><div className="hero-foot"><span><b>01</b> Learn by doing</span><span><b>02</b> Get useful feedback</span><span><b>03</b> Grow your network</span></div></div><HeroBoard/></section>
    <section className="topics section"><div className="section-heading"><div><span className="eyebrow">FIND YOUR PEOPLE</span><h2>Whatever you’re learning,<br/><em>there’s a circle for it.</em></h2></div><button className="text-link" onClick={() => go("community")}>Browse all discussions <Icon name="arrow"/></button></div><div className="topic-grid">{[ ["01","SEO & AI search","Strategy for visibility in search engines and AI answers.","purple"], ["02","Social & paid media","Creative, community, targeting, testing and campaign craft.","teal"], ["03","Content & copy","Tell clearer stories that people actually want to act on.","orange"], ["04","Automation & AI tools","Build practical systems while keeping a human in the loop.","blue"] ].map(t => <button className={`topic-card ${t[3]}`} key={t[1]} onClick={() => go("community")}><span>{t[0]}</span><h3>{t[1]}</h3><p>{t[2]}</p><i><Icon name="arrow"/></i></button>)}</div></section>
    <section className="feature-band"><div><span className="eyebrow">THIS WEEK IN THE CIRCLE</span><h2>Fresh ideas.<br/><em>Real work.</em></h2><p>Explore what members are discussing, building, and learning right now.</p></div><div className="feature-list"><button onClick={() => go("community")}><span className="mini-icon purple"><Icon name="message"/></span><div><small>DISCUSSION</small><b>How are you measuring visibility in AI answers?</b><span>12 replies · SEO & AI search</span></div><Icon name="arrow"/></button><button onClick={() => go("projects")}><span className="mini-icon teal"><Icon name="briefcase"/></span><div><small>MEMBER PROJECT</small><b>D2C skincare launch campaign</b><span>Practice project · Feedback welcome</span></div><Icon name="arrow"/></button><button onClick={() => go("events")}><span className="mini-icon orange"><Icon name="calendar"/></span><div><small>UPCOMING EVENT · DEMO</small><b>Build your first marketing case study</b><span>14 Sep · 6:30 PM IST · Online</span></div><Icon name="arrow"/></button></div></section>
    <section className="resource-preview section"><div className="section-heading"><div><span className="eyebrow">LEARN SOMETHING USEFUL</span><h2>Made to be used,<br/><em>not just saved.</em></h2></div><button className="text-link" onClick={() => go("resources")}>Explore the library <Icon name="arrow"/></button></div><div className="resource-grid">{resources.slice(0,3).map((r,i)=><article className="resource-card" key={r.title}><div className={`resource-visual v${i+1}`}><span>{r.type}</span><div className="paper"><i/><i/><i/></div></div><div className="resource-content"><div className="meta"><span>{r.topic}</span><span>{r.level}</span></div><h3>{r.title}</h3><p>{r.desc}</p><button onClick={() => go("resources")}>Open resource <Icon name="arrow"/></button></div></article>)}</div></section>
    <section className="cta"><span className="eyebrow">YOUR NEXT STEP STARTS HERE</span><h2>Curious is enough.<br/><em>Come grow with us.</em></h2><p>No polished portfolio required. Bring a question, a half-finished idea, or something you’ve learned.</p><button className="btn light" onClick={requireAuth}>Join the Community <Icon name="arrow"/></button></section>
  </>;
}

function HeroBoard(){ return <div className="hero-board" aria-label="Preview of althingsattention activity"><div className="board-top"><span><i/><i/><i/></span><b>althingsattention.com</b></div><div className="board-body"><div className="board-profile"><span className="avatar a1">AR</span><div><b>Ananya Rao</b><small>SEO learner · Bengaluru</small></div><span className="follow">+ Follow</span></div><span className="tag">SEO & AI SEARCH</span><h3>How are you measuring visibility in AI answers?</h3><p>I’m building a lightweight reporting workflow for brands that want to understand where they appear beyond classic search...</p><div className="chart"><span style={{height:"38%"}}/><span style={{height:"52%"}}/><span style={{height:"44%"}}/><span style={{height:"68%"}}/><span style={{height:"79%"}}/><span style={{height:"64%"}}/><span style={{height:"91%"}}/></div><div className="board-stats"><span><Icon name="heart"/> 34</span><span><Icon name="message"/> 12 replies</span><span><Icon name="bookmark"/></span></div></div><div className="floating-pill p1">Useful feedback, not vanity metrics <span>✓</span></div><div className="floating-pill p2"><span className="avatar a2">KM</span><div><b>New project shared</b><small>Landing page teardown</small></div></div></div> }

function PageHero({ eyebrow, title, accent, desc, action, onAction }: {eyebrow:string; title:string; accent:string; desc:string; action?:string; onAction?:()=>void}) { return <section className="page-hero"><span className="eyebrow">{eyebrow}</span><h1>{title}<br/><em>{accent}</em></h1><p>{desc}</p>{action&&<button className="btn" onClick={onAction}><Icon name="plus"/>{action}</button>}</section> }
function SearchBar({ value, setValue, placeholder }: {value:string; setValue:(s:string)=>void; placeholder:string}) { return <label className="search"><span className="sr-only">Search</span><Icon name="search"/><input value={value} onChange={e=>setValue(e.target.value)} placeholder={placeholder}/></label> }

function Community({search,setSearch,sort,setSort,items,saved,save,requireAuth}:{search:string;setSearch:(s:string)=>void;sort:string;setSort:(s:string)=>void;items:typeof discussions;saved:string[];save:(s:string)=>void;requireAuth:()=>void}){return <><PageHero eyebrow="THE COMMUNITY" title="Ask better questions." accent="Share what you know." desc="A thoughtful discussion space for marketers at every stage. Browse freely; sign in when you’re ready to join the conversation." action="Start a discussion" onAction={requireAuth}/><section className="directory section"><div className="controls"><SearchBar value={search} setValue={setSearch} placeholder="Search discussions"/><div className="sort-tabs" aria-label="Sort discussions">{["Newest","Popular","Unanswered"].map(s=><button className={sort===s?"active":""} key={s} onClick={()=>setSort(s)}>{s}</button>)}</div><button className="filter-btn"><Icon name="filter"/> Filters</button></div><div className="directory-layout"><aside><b>Categories</b>{["All discussions","SEO and AI search visibility","Social media marketing","Paid advertising","Content and copywriting","Email marketing","Lead generation and outbound","Marketing automation and AI tools","Freelancing and career advice"].map((c,i)=><button className={i===0?"active":""} key={c}>{c}<span>{i? Math.max(2,18-i*2):84}</span></button>)}</aside><div className="feed">{items.length?items.map(d=><article className="discussion-card" key={d.title}><div className="post-author"><span className={`avatar ${d.color}`}>{d.author.split(" ").map(x=>x[0]).join("")}</span><div><b>{d.author}</b><span>{d.role} · {d.time}</span></div><button aria-label="More options">•••</button></div><span className={`tag ${d.color}`}>{d.tag}</span><h3>{d.title}</h3><p>{d.body}</p><div className="post-actions"><button onClick={requireAuth}><Icon name="heart"/>{d.likes}</button><button onClick={requireAuth}><Icon name="message"/>{d.comments} {d.comments===1?"reply":"replies"}</button><button className={saved.includes(d.title)?"saved":""} onClick={()=>save(d.title)} aria-label="Bookmark"><Icon name="bookmark"/></button></div></article>):<Empty text="No discussions match your search."/>}</div></div></section></>}

function Resources({search,setSearch,saved,save}:{search:string;setSearch:(s:string)=>void;saved:string[];save:(s:string)=>void}){const list=resources.filter(r=>`${r.title} ${r.type} ${r.topic}`.toLowerCase().includes(search.toLowerCase())); return <><PageHero eyebrow="LEARNING LIBRARY" title="Practical resources." accent="Zero gatekeeping." desc="Guides, templates, checklists, prompts, and tutorials made to help you do the work—not just read about it."/><section className="directory section"><div className="controls"><SearchBar value={search} setValue={setSearch} placeholder="Search the resource library"/><select aria-label="Filter by topic"><option>All topics</option><option>SEO</option><option>Strategy</option><option>Freelancing</option></select><select aria-label="Filter by level"><option>All levels</option><option>Beginner</option><option>Intermediate</option></select><select aria-label="Filter by type"><option>All types</option><option>Guide</option><option>Template</option><option>Checklist</option><option>Prompts</option></select></div><div className="library-grid">{list.map((r,i)=><article className="library-card" key={r.title}><div className={`library-art ${r.accent}`}><span className="tag">{r.type}</span><span className="art-num">0{i+1}</span><div className="art-lines"><i/><i/><i/></div></div><div className="library-info"><div className="meta"><span>{r.topic}</span><span>{r.level}</span></div><h3>{r.title}</h3><p>{r.desc}</p><small>By {r.author}</small><div><a href={`/downloads/${r.title.toLowerCase().replaceAll(" ","-")}.txt`} download>Download resource <Icon name="arrow"/></a><button className={saved.includes(r.title)?"saved":""} onClick={()=>save(r.title)} aria-label="Save resource"><Icon name="bookmark"/></button></div></div></article>)}</div></section></>}

function Tools({search,setSearch}:{search:string;setSearch:(s:string)=>void}){const list=tools.filter(t=>`${t.name} ${t.cat} ${t.purpose}`.toLowerCase().includes(search.toLowerCase()));return <><PageHero eyebrow="TOOLS DIRECTORY" title="Choose tools with" accent="a clear purpose." desc="A no-hype directory of useful marketing tools, their key use cases, and the conversations happening around them."/><section className="directory section"><div className="controls"><SearchBar value={search} setValue={setSearch} placeholder="Search marketing tools"/><select aria-label="Tool category"><option>All categories</option><option>SEO</option><option>Content</option><option>Design</option><option>Email outreach</option><option>Analytics</option><option>Lead generation</option><option>Automation</option></select></div><div className="tools-grid">{list.map((t,i)=><article className="tool-card" key={t.name}><span className={`tool-logo logo-${i}`}>{t.name[0]}</span><span className="tag">{t.cat}</span><h3>{t.name}</h3><p>{t.purpose}</p><div><b>Key use cases</b><span>{t.use}</span></div><a href={t.url} target="_blank" rel="noreferrer">Official website <Icon name="external"/></a><button>View community discussion <Icon name="message"/></button></article>)}</div></section></>}

function Projects({requireAuth}:{requireAuth:()=>void}){return <><PageHero eyebrow="PROJECT SHOWCASE" title="Show the work." accent="Share the thinking." desc="Portfolios, live campaigns, and honest practice projects—with space for constructive feedback at every stage." action="Share a project" onAction={requireAuth}/><section className="section project-grid">{projects.map((p,i)=><article className="project-card" key={p.title}><div className={`project-cover cover-${i}`}><span>{p.type}</span><div className="mock-window"><i/><i/><i/></div></div><div className="project-info"><span className={`tag ${p.tone}`}>{p.type}</span><h3>{p.title}</h3><span>by {p.author}</span><p><b>Goal</b>{p.goal}</p><div className="chips">{p.tools.map(t=><i key={t}>{t}</i>)}</div><small>{p.result}</small><button onClick={requireAuth}>View project & feedback <Icon name="arrow"/></button></div></article>)}</section></>}

function Jobs({search,setSearch}:{search:string;setSearch:(s:string)=>void}){const list=opportunities.filter(o=>`${o.title} ${o.type} ${o.place}`.toLowerCase().includes(search.toLowerCase()));return <><PageHero eyebrow="JOBS & COLLABORATIONS" title="Find your next" accent="place to grow." desc="Explore internships, jobs, freelance projects, and collaboration requests. Every demo listing is clearly marked until real opportunities are connected."/><section className="directory section"><div className="demo-banner"><b>Demo board</b> These sample listings demonstrate the experience and are not real opportunities.</div><div className="controls"><SearchBar value={search} setValue={setSearch} placeholder="Search roles or skills"/><select aria-label="Opportunity type"><option>All types</option><option>Internship</option><option>Job</option><option>Freelance</option><option>Collaboration</option></select><select aria-label="Location"><option>All locations</option><option>India</option><option>Worldwide</option></select><select aria-label="Remote"><option>Any work mode</option><option>Remote</option><option>Hybrid</option><option>On-site</option></select></div><div className="job-list">{list.map((o,i)=><article key={o.title}><span className={`job-logo logo-${i}`}>{o.title[0]}</span><div><span className="tag">{o.type}</span><h3>{o.title}</h3><p>{o.org}</p><div className="job-meta"><span>◎ {o.place}</span><span>◷ {o.posted}</span><span>↗ {o.method}</span></div></div><button onClick={()=>alert("This is a demo listing and is not accepting applications.")}>View details <Icon name="arrow"/></button></article>)}</div></section></>}

function Events({requireAuth}:{requireAuth:()=>void}){return <><PageHero eyebrow="EVENTS & CHALLENGES" title="Learn together." accent="Try something new." desc="Workshops, community meetups, expert sessions, and weekly challenges designed for active participation."/><section className="directory section"><div className="demo-banner"><b>Demo calendar</b> These events show the intended format and are not open for real registration.</div><div className="event-grid">{events.map((e,i)=><article key={e.title}><div className={`event-date ed-${i}`}><b>{e.date}</b><span>{e.month}</span></div><span className="tag">{e.kind}</span><h3>{e.title}</h3><p>{e.meta}</p><small>Hosted by {e.host}</small><button onClick={requireAuth}>Register interest <Icon name="arrow"/></button></article>)}</div></section></>}

function Dashboard({saved,go}:{saved:string[];go:(v:View)=>void}){return <><PageHero eyebrow="MEMBER DASHBOARD" title="Welcome back." accent="Keep your momentum." desc="Your saved learning, conversations, events, and projects in one focused place."/><section className="dashboard section"><div className="profile-summary"><span className="avatar purple">UD</span><div><h3>Your profile</h3><p>Add your bio, skills, interests, portfolio and LinkedIn. Email remains private.</p></div><button className="btn ghost">Edit profile</button></div><div className="dash-grid"><article><span className="mini-icon purple"><Icon name="bookmark"/></span><h3>Saved items</h3><b>{saved.length}</b><p>{saved.length?saved.slice(0,2).join(" · "):"Save a discussion or resource to find it here."}</p><button onClick={()=>go("resources")}>Browse resources <Icon name="arrow"/></button></article><article><span className="mini-icon teal"><Icon name="message"/></span><h3>Recent discussions</h3><b>0</b><p>Your replies and conversations will appear here.</p><button onClick={()=>go("community")}>Join a discussion <Icon name="arrow"/></button></article><article><span className="mini-icon orange"><Icon name="calendar"/></span><h3>Registered events</h3><b>0</b><p>Your upcoming community sessions will appear here.</p><button onClick={()=>go("events")}>Explore events <Icon name="arrow"/></button></article></div></section></>}

function Empty({text}:{text:string}){return <div className="empty"><Icon name="search"/><h3>Nothing here yet</h3><p>{text}</p></div>}
