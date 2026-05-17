import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Collection", "Classics", "Our Story", "Visit"];

const ILLUSION_PASTRIES = [
  {
    id: 1,
    name: "Pistachio Dream",
    shape: "Pistachio Shell",
    desc: "Silky pistachio frangipane, roasted pistachio praline, whipped mascarpone — sculpted into a split pistachio shell",
    price: "€8.50",
    color: "#a8c5a0",
    accent: "#6b9e63",
    emoji: "🫘",
    tag: "BESTSELLER",
  },
  {
    id: 2,
    name: "Peanut Butter Reverie",
    shape: "Golden Peanut",
    desc: "Salted peanut caramel, brown butter mousse, crunchy nougatine — tucked inside a fondant peanut shell",
    price: "€7.50",
    color: "#d4b896",
    accent: "#a07850",
    emoji: "🥜",
    tag: "NEW",
  },
  {
    id: 3,
    name: "Walnut Nocturne",
    shape: "Whole Walnut",
    desc: "Dark chocolate ganache, walnut praline cream, espresso jelly — encased in matte chocolate walnut",
    price: "€8.00",
    color: "#c9a882",
    accent: "#7d5a38",
    emoji: "🌰",
    tag: null,
  },
  {
    id: 4,
    name: "Lemon Trompe",
    shape: "Dimpled Lemon",
    desc: "Meyer lemon curd, yuzu cream, airy meringue — hidden inside a eerily realistic fondant lemon",
    price: "€7.00",
    color: "#e8dfa0",
    accent: "#b8a030",
    emoji: "🍋",
    tag: "SEASONAL",
  },
  {
    id: 5,
    name: "Strawberry Illusion",
    shape: "Ripe Strawberry",
    desc: "Wild strawberry mousse, rose-scented jelly, vanilla chantilly — sculpted as a velvet-dusted berry",
    price: "€8.50",
    color: "#f2b8b8",
    accent: "#c05050",
    emoji: "🍓",
    tag: "SEASONAL",
  },
  {
    id: 6,
    name: "Hazelnut Fantaisie",
    shape: "Hazelnuts en Grappe",
    desc: "Gianduja ganache, feuilletine crunch, praline cream — three hazelnuts clustered on their branch",
    price: "€9.00",
    color: "#c8a87a",
    accent: "#8a6040",
    emoji: "🌿",
    tag: null,
  },
];

const CLASSICS = [
  { name: "Croissant Pur Beurre", desc: "72-hour laminated dough, AOP butter", price: "€4.00" },
  { name: "Pain au Chocolat", desc: "Valrhona dark, twice-baked crust", price: "€4.50" },
  { name: "Kouign Amann", desc: "Caramelised, flaked sea salt", price: "€5.00" },
  { name: "Tarte au Citron", desc: "Italian meringue, burnt tips", price: "€6.50" },
  { name: "Financier Noisette", desc: "Browned butter, almond flour", price: "€3.50" },
  { name: "Madeleine Vanille", desc: "Madagascar vanilla, warm from the oven", price: "€3.00" },
];

const COFFEE = [
  { name: "Espresso", desc: "Single origin Ethiopia Yirgacheffe", price: "€3.00" },
  { name: "Flat White", desc: "Double ristretto, microfoam", price: "€4.20" },
  { name: "Pistachio Latte", desc: "House pistachio syrup, oat milk", price: "€5.50" },
  { name: "Rose Cortado", desc: "Damascus rose, equal parts", price: "€4.80" },
  { name: "Matcha Ceremonial", desc: "Whisked, steamed oat milk", price: "€5.00" },
  { name: "Cold Brew Float", desc: "Vanilla ice cream, house cold brew", price: "€6.00" },
];

function useIntersection(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const visible = useIntersection(ref);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function PastryCard({ p, idx }) {
  const [hovered, setHovered] = useState(false);
  return (
    <FadeIn delay={idx * 0.08}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "#fff",
          borderRadius: "24px",
          overflow: "hidden",
          cursor: "pointer",
          transform: hovered ? "translateY(-8px) scale(1.01)" : "translateY(0) scale(1)",
          transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.4s ease",
          boxShadow: hovered
            ? `0 24px 48px ${p.color}80`
            : `0 4px 20px ${p.color}40`,
        }}
      >
        {/* Image area */}
        <div
          style={{
            height: "220px",
            background: `linear-gradient(145deg, ${p.color}55, ${p.color}cc)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{
            position: "absolute", inset: 0,
            background: `radial-gradient(circle at 30% 30%, #fff3 0%, transparent 60%)`,
          }} />
          <span style={{
            fontSize: "72px",
            transform: hovered ? "scale(1.15) rotate(-5deg)" : "scale(1) rotate(0deg)",
            transition: "transform 0.4s cubic-bezier(0.34,1.56,0.64,1)",
            filter: "drop-shadow(0 8px 16px rgba(0,0,0,0.15))",
          }}>{p.emoji}</span>
          {p.tag && (
            <div style={{
              position: "absolute", top: "14px", right: "14px",
              background: p.accent,
              color: "#fff",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              padding: "4px 10px",
              borderRadius: "99px",
              fontFamily: "'DM Sans', sans-serif",
            }}>{p.tag}</div>
          )}
          <div style={{
            position: "absolute", bottom: "12px", left: "14px",
            fontSize: "11px",
            fontFamily: "'DM Sans', sans-serif",
            color: p.accent,
            fontWeight: 600,
            letterSpacing: "0.08em",
            background: "#fff",
            padding: "3px 10px",
            borderRadius: "99px",
            opacity: 0.9,
          }}>SHAPED AS: {p.shape.toUpperCase()}</div>
        </div>

        {/* Content */}
        <div style={{ padding: "20px 22px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
            <h3 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "18px",
              fontWeight: 700,
              color: "#2d2218",
              margin: 0,
              lineHeight: 1.2,
            }}>{p.name}</h3>
            <span style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "16px",
              fontWeight: 600,
              color: p.accent,
              whiteSpace: "nowrap",
              marginLeft: "12px",
            }}>{p.price}</span>
          </div>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "13px",
            color: "#8c7b6e",
            lineHeight: 1.6,
            margin: 0,
          }}>{p.desc}</p>
        </div>
      </div>
    </FadeIn>
  );
}

function MenuRow({ item, isLast }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      padding: "14px 0",
      borderBottom: isLast ? "none" : "1px solid #f0e8e0",
      gap: "16px",
    }}>
      <div>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", color: "#2d2218" }}>
          {item.name}
        </span>
        <span style={{
          fontFamily: "'DM Sans', sans-serif", fontSize: "13px", color: "#a89080",
          marginLeft: "10px",
        }}>{item.desc}</span>
      </div>
      <span style={{
        fontFamily: "'DM Sans', sans-serif", fontSize: "15px", fontWeight: 600,
        color: "#b08060", whiteSpace: "nowrap",
      }}>{item.price}</span>
    </div>
  );
}

export default function App() {
  const [activeNav, setActiveNav] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#fdf8f3", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: #d4b896; color: #2d2218; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #fdf8f3; }
        ::-webkit-scrollbar-thumb { background: #d4b896; border-radius: 3px; }

        .nav-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #6b5c4e;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          cursor: pointer;
          padding: 6px 0;
          position: relative;
          background: none;
          border: none;
          transition: color 0.2s;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1.5px;
          background: #a07850;
          transition: width 0.3s ease;
        }
        .nav-link:hover { color: #2d2218; }
        .nav-link:hover::after { width: 100%; }

        .cta-btn {
          background: #2d2218;
          color: #fdf8f3;
          border: none;
          border-radius: 99px;
          padding: 14px 32px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-block;
        }
        .cta-btn:hover {
          background: #a07850;
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(160,120,80,0.35);
        }

        .ghost-btn {
          background: transparent;
          color: #2d2218;
          border: 1.5px solid #2d2218;
          border-radius: 99px;
          padding: 13px 32px;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-block;
        }
        .ghost-btn:hover {
          background: #2d2218;
          color: #fdf8f3;
          transform: translateY(-2px);
        }

        .social-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #fff;
          border: 1px solid #e8ddd4;
          border-radius: 99px;
          padding: 8px 16px;
          font-size: 13px;
          color: #6b5c4e;
          font-family: 'DM Sans', sans-serif;
          cursor: pointer;
          transition: all 0.25s;
          text-decoration: none;
        }
        .social-pill:hover {
          background: #2d2218;
          color: #fdf8f3;
          border-color: #2d2218;
          transform: translateY(-2px);
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-12px) rotate(2deg); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(0px) rotate(3deg); }
          50% { transform: translateY(-8px) rotate(-3deg); }
        }
        .float-a { animation: float 5s ease-in-out infinite; }
        .float-b { animation: floatB 6.5s ease-in-out infinite; }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-slow { animation: spin-slow 20s linear infinite; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(253,248,243,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid #f0e8e0" : "none",
        transition: "all 0.4s ease",
        padding: "0 clamp(20px, 5vw, 80px)",
      }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: "72px",
        }}>
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{ cursor: "pointer" }}
          >
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "22px",
              fontWeight: 700,
              color: "#2d2218",
              letterSpacing: "-0.02em",
            }}>Bloom's Cafe</div>
            <div style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "10px",
              color: "#a07850",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginTop: "-2px",
            }}>Pâtisserie · Dublin</div>
          </div>

          <div style={{ display: "flex", gap: "36px", alignItems: "center" }}>
            {[
              ["Collection", "collection"],
              ["Classics", "classics"],
              ["Our Story", "story"],
              ["Visit", "visit"],
            ].map(([label, id]) => (
              <button key={id} className="nav-link" onClick={() => scrollTo(id)}>
                {label}
              </button>
            ))}
            <button className="cta-btn" style={{ padding: "10px 24px", fontSize: "13px" }} onClick={() => scrollTo("collection")}>
              Order Now
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        padding: "100px clamp(20px, 5vw, 80px) 60px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* BG decorations */}
        <div style={{
          position: "absolute", top: "-10%", right: "-5%",
          width: "600px", height: "600px",
          background: "radial-gradient(circle, #e8ddd455 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "5%", left: "-8%",
          width: "400px", height: "400px",
          background: "radial-gradient(circle, #a8c5a033 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Spinning badge */}
        <div style={{
          position: "absolute", top: "120px", right: "clamp(20px, 8vw, 140px)",
          width: "90px", height: "90px",
        }}>
          <svg viewBox="0 0 90 90" className="spin-slow" style={{ width: "90px", height: "90px" }}>
            <defs>
              <path id="circle" d="M 45,45 m -32,0 a 32,32 0 1,1 64,0 a 32,32 0 1,1 -64,0" />
            </defs>
            <text fontSize="9" fill="#a07850" letterSpacing="2.4" fontFamily="'DM Sans', sans-serif" fontWeight="500">
              <textPath href="#circle">TROMPE L'ŒIL · ARTISAN · DUBLIN ·</textPath>
            </text>
          </svg>
          <div style={{
            position: "absolute", inset: "28px",
            background: "#2d2218", borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "16px",
          }}>🎭</div>
        </div>

        <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
          {/* Left: text */}
          <div>
            <div style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "none" : "translateY(20px)",
              transition: "all 0.8s ease 0.1s",
            }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "#f5ede4",
                border: "1px solid #e8d5c4",
                borderRadius: "99px",
                padding: "6px 16px 6px 10px",
                marginBottom: "28px",
              }}>
                <span style={{ fontSize: "16px" }}>🎭</span>
                <span style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#a07850",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}>Illusion Pâtisserie · Est. 2021</span>
              </div>
            </div>

            <div style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "none" : "translateY(24px)",
              transition: "all 0.9s ease 0.2s",
            }}>
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(44px, 5.5vw, 72px)",
                fontWeight: 900,
                color: "#2d2218",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                marginBottom: "6px",
              }}>
                Art You
              </h1>
              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(44px, 5.5vw, 72px)",
                fontWeight: 900,
                fontStyle: "italic",
                color: "#a07850",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                marginBottom: "24px",
              }}>
                Can Eat.
              </h1>
            </div>

            <div style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "none" : "translateY(24px)",
              transition: "all 0.9s ease 0.35s",
            }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "18px",
                color: "#8c7b6e",
                lineHeight: 1.7,
                maxWidth: "420px",
                marginBottom: "36px",
                fontWeight: 300,
              }}>
                We craft pastries that are <em>uncanny</em> doubles of their flavour — a peanut that tastes of peanut, a pistachio that <em>is</em> pistachio. Pure theatre, pure deliciousness.
              </p>
            </div>

            <div style={{
              opacity: heroVisible ? 1 : 0,
              transform: heroVisible ? "none" : "translateY(24px)",
              transition: "all 0.9s ease 0.5s",
              display: "flex", gap: "14px", alignItems: "center", flexWrap: "wrap",
            }}>
              <button className="cta-btn" onClick={() => scrollTo("collection")}>
                Discover Our Menu ↓
              </button>
              <button className="ghost-btn" onClick={() => scrollTo("story")}>
                Our Story
              </button>
            </div>

            <div style={{
              opacity: heroVisible ? 1 : 0,
              transition: "all 0.9s ease 0.65s",
              marginTop: "48px",
              display: "flex", gap: "32px",
            }}>
              {[["12+", "Illusion Pastries"], ["3", "Awards 2024"], ["4.9★", "Google Reviews"]].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "26px", fontWeight: 700, color: "#2d2218" }}>{n}</div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "#a89080", letterSpacing: "0.04em" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: hero visual */}
          <div style={{
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? "none" : "translateX(32px)",
            transition: "all 1s ease 0.3s",
            position: "relative",
          }}>
            {/* Main blob */}
            <div style={{
              width: "100%",
              paddingBottom: "100%",
              position: "relative",
            }}>
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, #f5ede4 0%, #e8d5c4 50%, #d4c4a8 100%)",
                borderRadius: "40% 60% 55% 45% / 45% 40% 60% 55%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "clamp(80px,10vw,120px)", lineHeight: 1 }} className="float-a">🫘</div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    color: "#a07850",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontWeight: 600,
                    marginTop: "12px",
                  }}>Pistachio Dream</div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    color: "#8c7b6e",
                    marginTop: "4px",
                  }}>It's not actually a pistachio 🤫</div>
                </div>
              </div>

              {/* Floating accent pastries */}
              <div style={{ position: "absolute", top: "8%", right: "-8%", fontSize: "48px" }} className="float-b">🥜</div>
              <div style={{ position: "absolute", bottom: "12%", left: "-6%", fontSize: "36px" }} className="float-a">🍋</div>
              <div style={{ position: "absolute", top: "60%", right: "-10%", fontSize: "28px" }} className="float-b">🍓</div>
            </div>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{
        background: "#2d2218", overflow: "hidden", padding: "14px 0",
        borderTop: "1px solid #3d3228", borderBottom: "1px solid #3d3228",
      }}>
        <div style={{
          display: "flex",
          animation: "marquee 22s linear infinite",
          whiteSpace: "nowrap",
        }}>
          <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
          {[...Array(2)].map((_, i) => (
            <span key={i} style={{ display: "inline-flex", gap: "0" }}>
              {["Trompe L'Œil Pastry", "Specialty Coffee", "Artisan Baking", "Dublin's Secret", "Edible Art", "Made Daily"].map((t, j) => (
                <span key={j} style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "14px",
                  fontStyle: "italic",
                  color: "#d4b896",
                  padding: "0 32px",
                }}>
                  {t} <span style={{ color: "#a07850", fontStyle: "normal" }}>✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* COLLECTION */}
      <section id="collection" style={{ padding: "100px clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <div style={{
                display: "inline-block",
                background: "#f5ede4", border: "1px solid #e8d5c4",
                borderRadius: "99px", padding: "5px 16px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px", fontWeight: 600, color: "#a07850",
                letterSpacing: "0.12em", textTransform: "uppercase",
                marginBottom: "16px",
              }}>Signature Collection</div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(32px,4vw,52px)",
                fontWeight: 900,
                color: "#2d2218",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}>
                The Illusion Pastries
              </h2>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "17px",
                color: "#8c7b6e",
                maxWidth: "520px",
                margin: "16px auto 0",
                lineHeight: 1.7,
                fontWeight: 300,
              }}>
                Each is sculpted by hand to be a perfect replica of its flavour. Look twice. Then eat it.
              </p>
            </div>
          </FadeIn>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "28px",
          }}>
            {ILLUSION_PASTRIES.map((p, i) => (
              <PastryCard key={p.id} p={p} idx={i} />
            ))}
          </div>
        </div>
      </section>

      {/* CLASSICS & COFFEE */}
      <section id="classics" style={{ padding: "100px clamp(20px,5vw,80px)", background: "#f5ede4" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: "64px" }}>
              <div style={{
                display: "inline-block",
                background: "#fff", border: "1px solid #e8d5c4",
                borderRadius: "99px", padding: "5px 16px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px", fontWeight: 600, color: "#a07850",
                letterSpacing: "0.12em", textTransform: "uppercase",
                marginBottom: "16px",
              }}>The Menu</div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(32px,4vw,52px)",
                fontWeight: 900,
                color: "#2d2218",
                letterSpacing: "-0.02em",
              }}>
                Classics & Coffee
              </h2>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px" }}>
            {/* Classics */}
            <FadeIn delay={0.1}>
              <div style={{ background: "#fff", borderRadius: "24px", padding: "36px 40px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
                  <span style={{ fontSize: "24px" }}>🥐</span>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#2d2218",
                  }}>Boulangerie</h3>
                </div>
                {CLASSICS.map((item, i) => (
                  <MenuRow key={item.name} item={item} isLast={i === CLASSICS.length - 1} />
                ))}
              </div>
            </FadeIn>

            {/* Coffee */}
            <FadeIn delay={0.2}>
              <div style={{ background: "#fff", borderRadius: "24px", padding: "36px 40px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
                  <span style={{ fontSize: "24px" }}>☕</span>
                  <h3 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "22px",
                    fontWeight: 700,
                    color: "#2d2218",
                  }}>Specialty Coffee</h3>
                </div>
                {COFFEE.map((item, i) => (
                  <MenuRow key={item.name} item={item} isLast={i === COFFEE.length - 1} />
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ABOUT / STORY */}
      <section id="story" style={{ padding: "100px clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
            <FadeIn>
              <div>
                <div style={{
                  display: "inline-block",
                  background: "#f5ede4", border: "1px solid #e8d5c4",
                  borderRadius: "99px", padding: "5px 16px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px", fontWeight: 600, color: "#a07850",
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  marginBottom: "20px",
                }}>Our Story</div>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(30px,3.5vw,46px)",
                  fontWeight: 900,
                  color: "#2d2218",
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  marginBottom: "24px",
                }}>
                  The Art Behind<br />
                  <span style={{ fontStyle: "italic", color: "#a07850" }}>the Shape</span>
                </h2>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "16px",
                  color: "#8c7b6e",
                  lineHeight: 1.8,
                  fontWeight: 300,
                  marginBottom: "20px",
                }}>
                  Bloom's Cafe began with a single obsession: what if a dessert could be a perfect mirror of its own flavour? Head pâtissière Síle Ní Bhriain spent three years in Lyon mastering both sculpture and pastry before returning to Dublin to open her atelier.
                </p>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "16px",
                  color: "#8c7b6e",
                  lineHeight: 1.8,
                  fontWeight: 300,
                  marginBottom: "32px",
                }}>
                  Each illusion pastry is hand-sculpted with tempered chocolate, velvet spray, and edible pigments — then filled with house-made praline, mousse, or curd that honours the ingredient it resembles. The result fools the eye and rewards the palate.
                </p>
                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                  {["Hand-sculpted daily", "No artificial flavours", "Seasonal ingredients", "Dublin sourced"].map(tag => (
                    <span key={tag} style={{
                      display: "inline-flex", alignItems: "center", gap: "6px",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13px", color: "#6b5c4e", fontWeight: 500,
                    }}>
                      <span style={{ color: "#a07850" }}>✦</span> {tag}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                {[
                  { emoji: "🎨", title: "Hand-Sculpted", desc: "Every shape formed with pastry tools, no moulds", bg: "#f5ede4" },
                  { emoji: "🫘", title: "True Flavour", desc: "The outside matches the inside, always", bg: "#e8f0e8" },
                  { emoji: "🌿", title: "Seasonal", desc: "Menu rotates with Ireland's seasons", bg: "#e8edf5" },
                  { emoji: "💫", title: "Daily Fresh", desc: "Made each morning, never carried over", bg: "#f5e8ed" },
                ].map((card, i) => (
                  <div key={i} style={{
                    background: card.bg,
                    borderRadius: "20px",
                    padding: "28px 24px",
                    transform: i % 2 === 1 ? "translateY(20px)" : "none",
                  }}>
                    <div style={{ fontSize: "32px", marginBottom: "12px" }}>{card.emoji}</div>
                    <div style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "16px", fontWeight: 700, color: "#2d2218",
                      marginBottom: "6px",
                    }}>{card.title}</div>
                    <div style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "13px", color: "#8c7b6e", lineHeight: 1.6,
                    }}>{card.desc}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* INSTAGRAM STRIP */}
      <section style={{
        padding: "80px clamp(20px,5vw,80px)",
        background: "#2d2218",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <div style={{ marginBottom: "48px" }}>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px", color: "#d4b896",
                letterSpacing: "0.14em", textTransform: "uppercase",
                marginBottom: "12px",
              }}>Follow the illusion</p>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(28px,3.5vw,42px)",
                fontWeight: 700, fontStyle: "italic",
                color: "#fdf8f3",
              }}>@bloomscafedublin</h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "8px", marginBottom: "36px" }}>
              {["🫘", "🥜", "🍋", "🍓", "🌰"].map((e, i) => (
                <a
                  key={i}
                  href="https://www.instagram.com/bloomscafedublin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    aspectRatio: "1",
                    background: `hsl(${i * 40 + 20}, 25%, 25%)`,
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "40px",
                    textDecoration: "none",
                    transition: "transform 0.3s ease, opacity 0.3s",
                    cursor: "pointer",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.opacity = "0.8"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.opacity = "1"; }}
                >
                  {e}
                </a>
              ))}
            </div>

            <a
              className="social-pill"
              href="https://www.instagram.com/bloomscafedublin/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                background: "transparent",
                border: "1px solid #6b5c4e",
                borderRadius: "99px",
                padding: "10px 24px",
                fontSize: "14px",
                color: "#d4b896",
                fontFamily: "'DM Sans', sans-serif",
                cursor: "pointer",
                transition: "all 0.25s",
                textDecoration: "none",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "#fdf8f3"; e.currentTarget.style.color = "#2d2218"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#d4b896"; }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
              Visit our Instagram
            </a>
          </FadeIn>
        </div>
      </section>

      {/* VISIT / FOOTER */}
      <footer id="visit" style={{ background: "#fdf8f3", padding: "80px clamp(20px,5vw,80px) 40px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <FadeIn>
            <div style={{
              background: "#f5ede4",
              borderRadius: "32px",
              padding: "60px",
              display: "grid",
              gridTemplateColumns: "1.5fr 1fr 1fr",
              gap: "48px",
              marginBottom: "48px",
            }}>
              <div>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "28px", fontWeight: 700, color: "#2d2218",
                  marginBottom: "4px",
                }}>Bloom's Cafe</div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px", color: "#a07850",
                  letterSpacing: "0.18em", textTransform: "uppercase",
                  marginBottom: "20px",
                }}>Pâtisserie · Dublin</div>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px", color: "#8c7b6e", lineHeight: 1.7,
                  fontWeight: 300, maxWidth: "260px",
                }}>
                  Dublin's home of trompe-l'œil pastry, specialty coffee, and edible artistry. Every piece is made by hand, every morning.
                </p>
              </div>

              <div>
                <h4 style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px", fontWeight: 600, color: "#a07850",
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  marginBottom: "16px",
                }}>Find Us</h4>
                {["14 Wicklow Street", "Dublin 2, D02 FX01", "Ireland"].map(l => (
                  <p key={l} style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px", color: "#6b5c4e", lineHeight: 1.9, fontWeight: 300,
                  }}>{l}</p>
                ))}
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px", color: "#a07850",
                  marginTop: "12px", fontWeight: 500,
                }}>hello@laforme.ie</p>
              </div>

              <div>
                <h4 style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px", fontWeight: 600, color: "#a07850",
                  letterSpacing: "0.12em", textTransform: "uppercase",
                  marginBottom: "16px",
                }}>Opening Hours</h4>
                {[
                  ["Mon – Fri", "8:00 – 18:00"],
                  ["Saturday", "8:00 – 19:00"],
                  ["Sunday", "9:00 – 17:00"],
                ].map(([day, hours]) => (
                  <div key={day} style={{
                    display: "flex", justifyContent: "space-between",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px", color: "#6b5c4e",
                    padding: "5px 0",
                    borderBottom: "1px solid #e8d5c4",
                    fontWeight: 300,
                  }}>
                    <span>{day}</span>
                    <span style={{ fontWeight: 500, color: "#2d2218" }}>{hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            borderTop: "1px solid #e8d5c4", paddingTop: "24px",
            flexWrap: "wrap", gap: "16px",
          }}>
            <p style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "13px", color: "#a89080", fontWeight: 300,
            }}>© 2025 Bloom's Cafe Pâtisserie. Made with love in Dublin.</p>
            <div style={{ display: "flex", gap: "24px" }}>
              {["Menu", "Events", "Catering", "Press"].map(l => (
                <span key={l} style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "13px", color: "#8c7b6e",
                  cursor: "pointer",
                  transition: "color 0.2s",
                }}
                  onMouseEnter={e => e.target.style.color = "#2d2218"}
                  onMouseLeave={e => e.target.style.color = "#8c7b6e"}
                >{l}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}