import React, { useState, useEffect, useRef } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Plus,
  Minus,
  BookOpen,
  Users,
  Sprout,
  ChartNoAxesCombined,
  Check,
  Phone,
  Mail,
  MapPin,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher.jsx";
import { useScrollReveal } from "./useScrollReveal.js";
import { useActiveSection } from "./useActiveSection.js";
import {
  storageKey,
  translate,
  readLanguage,
  metadata,
} from "./translations.js";

const nav = [
  ["Ana Sayfa", "main"],
  ["Hizmetler", "hizmetler"],
  ["İş Ortakları", "is-ortaklari"],
  ["Neden Biz?", "neden-biz"],
  ["Çalışma Süreci", "surec"],
  ["Hakkımızda", "hakkimizda"],
];
const services = [
  {
    icon: BookOpen,
    title: "Finansal muhasebe",
    tag: "Rakamlarınız - düzenli, anlaşılır ve güvenilir.",
    text: "Devam eden finansal muhasebe işlemlerinizi üstleniyor, ticari belgelerinizde düzen ve şeffaflık sağlıyoruz.",
    items: [
      "Devam eden finansal muhasebe işlemleri",
      "Belgelerin kaydedilmesi ve işlenmesi",
      "Borçlu ve alacaklı hesaplarının takibi",
      "Ticari işlemlerin hesaplandırılması ve muhasebeleştirilmesi",
      "İşletme ve finansal değerlendirmeler",
      "Yıl sonu kapanışının hazırlanmasına destek",
    ],
  },
  {
    icon: Users,
    title: "Bordro ve ücret muhasebesi",
    tag: "Sizin ve çalışanlarınız için güvenilir bordrolama.",
    text: "Hassas verilerinizi özenle ele alıyor, sizin ve çalışanlarınız için düzenli ve güvenilir bordro süreçleri sağlıyoruz.",
    items: [
      "Aylık ücret ve maaş bordroları",
      "Bordro belgelerinin hazırlanması",
      "İşe giriş ve işten çıkış bildirimleri",
      "Devam eden gerekli bildirimler",
      "İlgili belgelerin yönetimi",
      "Bordro süreçlerinin organizasyonuna destek",
    ],
  },
  {
    icon: Sprout,
    title: "Şirket kuruluş danışmanlığı",
    tag: "Fikirden başarılı bir işletmeye.",
    text: "İşletmenizi kurarken ticari ve organizasyonel konularda yanınızdayız. Birlikte, en başından sağlam bir temel oluşturuyoruz.",
    items: [
      "İş fikrinin geliştirilmesi ve yapılandırılması",
      "İş planı ve finansal planlama",
      "Maliyet ve ciro planlaması",
      "Likidite planlaması",
      "Ticari organizasyon",
      "Düzenli bir muhasebe sisteminin kurulması",
      "Banka ve finansman görüşmelerine hazırlık",
    ],
  },
  {
    icon: ChartNoAxesCombined,
    title: "İşletme danışmanlığı",
    tag: "İşletmeyi anlamak. Potansiyeli görmek. Geleceği şekillendirmek.",
    text: "Tek tek rakamların ötesine bakıyor; işletmenizin ekonomik, finansal ve organizasyonel gelişimine destek oluyoruz.",
    items: [
      "İşletme analizleri",
      "Maliyet ve gelir analizleri",
      "Likidite planlaması",
      "İşletme planlaması",
      "Ticari süreçlerin optimize edilmesi",
      "İş süreçlerinin analizi",
      "İşletme göstergelerinin değerlendirilmesi",
      "Girişimcilik ve işletme kararlarında destek",
    ],
  },
];
export default function App() {
  useScrollReveal();
  const activeSection = useActiveSection();
  const [language, setLanguage] = useState(readLanguage);
  const t = (key) => translate(key, language);
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = metadata[language].title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", metadata[language].description);
    try {
      localStorage.setItem(storageKey, language);
    } catch {
      /* Language switching also works without storage. */
    }
  }, [language]);
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState(null);
  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);
  useEffect(() => {
    if (!menu) return;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setMenu(false);
        menuButtonRef.current?.focus();
      }
    };
    const closeOutside = (event) => {
      if (!headerRef.current?.contains(event.target)) setMenu(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [menu]);
  return (
    <>
      <a className="skip" href="#main">
        {t("İçeriğe geç")}
      </a>
      <header ref={headerRef}>
        <div className="container header-inner">
          <a className="brand" href="#" aria-label={t("Hakan Köse ana sayfa")}>
            <img
              className="brand-image"
              src="/img/hklogo.jpeg"
              alt="Hakan Köse Unternehmensverwaltung"
              width="500"
              height="500"
            />
          </a>
          <nav
            id="primary-navigation"
            className={menu ? "nav expanded" : "nav"}
            aria-label={t("Ana menü")}
          >
            {nav.map(([label, id]) => (
              <a
                key={id}
                aria-current={activeSection === id ? "location" : undefined}
                href={"#" + id}
                onClick={() => setMenu(false)}
              >
                {t(label)}
              </a>
            ))}
            <a
              className="nav-contact"
              aria-current={
                activeSection === "iletisim" ? "location" : undefined
              }
              href="#iletisim"
              onClick={() => setMenu(false)}
            >
              {t("İletişime geçin")} <ArrowUpRight size={16} />
            </a>
          </nav>
          <div className="header-controls">
            <LanguageSwitcher
              language={language}
              onChange={(code) => {
                setLanguage(code);
                setMenu(false);
              }}
            />
            <button
              ref={menuButtonRef}
              type="button"
              aria-controls="primary-navigation"
              className="menu-button"
              aria-label={t(menu ? "Menüyü kapat" : "Menüyü aç")}
              aria-expanded={menu}
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      <main id="main" tabIndex={-1}>
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <div className="eyebrow">
                <span className="dot" /> {t("BERLİN’DEN İŞLETMENİZE DESTEK")}
              </div>
              <h1>
                {t("hero.line1")}
                <br />
                {t("hero.line2")}
                <em>{t("hero.emphasis")}</em>
              </h1>
              <p className="hero-lead">
                {t("Siz işinize odaklanın.")}
                <br />
                {t("Ticari ve idari işlerinizi biz üstlenelim.")}
              </p>
              <p className="hero-text">
                {t(
                  "Muhasebeden bordroya, ilk iş fikrinden bir sonraki büyüme adımına. İşletmenizi anlayan, yükünüzü hafifleten bir iş ortağı.",
                )}
              </p>
              <div className="actions">
                <a className="button primary" href="#iletisim">
                  {t("Ücretsiz ön görüşme")} <ArrowUpRight size={19} />
                </a>
                <a className="text-link" href="#hizmetler">
                  {t("Hizmetlerimizi inceleyin")} <ArrowRight size={18} />
                </a>
              </div>
              <div className="hero-trust">
                <span>
                  <Check size={15} /> {t("Kişisel hizmet")}
                </span>
                <span>
                  <Check size={15} /> {t("Dijital süreçler")}
                </span>
                <span>
                  <Check size={15} /> {t("2020’den beri")}
                </span>
              </div>
            </div>
            <div className="hero-panel">
              <div className="panel-top">
                <span>HAKAN KÖSE</span>
                <span className="panel-location">BERLIN</span>
              </div>
              <div className="panel-composition">
                <div className="panel-word"><BookOpen aria-hidden="true" strokeWidth={1.25}/><span>{t("Rakamlar.")}</span></div>
                <div className="panel-word"><Users aria-hidden="true" strokeWidth={1.25}/><span>{t("Yapılar.")}</span></div>
                <div className="panel-word"><ChartNoAxesCombined aria-hidden="true" strokeWidth={1.25}/><span>{t("Çözümler.")}</span></div>
              </div>
              <div className="panel-signoff">
                <p>{t("Ticari hayatınızda")}<br/>{t("sağlam bir temel.")}</p>
                <div className="panel-year"><strong>2020</strong><span>{t("GÜVENLE, BİRLİKTE.")}</span></div>
              </div>
            </div>
          </div>
        </section>
        <div className="intro-strip">
          <div className="container">
            <span>{t("İŞİNİZİN HER AŞAMASINDA")}</span>
            <p>{t("Serbest meslek sahipleri")}</p>
            <i />
            <p>{t("Bağımsız çalışanlar")}</p>
            <i />
            <p>{t("Küçük ve orta ölçekli işletmeler")}</p>
          </div>
        </div>
        <section className="section container" id="hizmetler">
          <div className="section-head">
            <div>
              <div className="eyebrow">{t("HİZMETLERİMİZ")}</div>
              <h2>{t("İşinizi kolaylaştıran uzmanlık.")}</h2>
            </div>
            <p>
              {t("Günlük işlerinize düzen, kararlarınıza netlik.")}
              <br />
              {t("İhtiyacınız olan desteği birlikte belirleyelim.")}
            </p>
          </div>
          <div className="service-grid">
            {services.map((s, i) => (
              <article
                className={"service " + (open === i ? "is-open" : "")}
                key={s.title}
              >
                <div className="service-top">
                  <s.icon size={28} strokeWidth={1.3} />
                  <span>0{i + 1}</span>
                </div>
                <h3>{t(s.title)}</h3>
                <strong className="tagline">{t(s.tag)}</strong>
                <p>{t(s.text)}</p>
                <button
                  className="detail-button"
                  aria-expanded={open === i}
                  aria-controls={"details-" + i}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  {t("Hizmet kapsamı")}{" "}
                  {open === i ? <Minus size={18} /> : <Plus size={18} />}
                </button>
                <div id={"details-" + i} hidden={open !== i}>
                  <ul>
                    {s.items.map((item) => (
                      <li key={item}>{t(item)}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="partners section" id="is-ortaklari">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="eyebrow">{t("İŞ ORTAKLARIMIZ")}</div>
                <h2>{t("Birlikte daha fazlası.")}</h2>
              </div>
              <p>
                {t("Farklı ihtiyaçlar, doğru uzmanlar.")}
                <br />
                {t("Seçilmiş iş ortaklarımızla yanınızdayız.")}
              </p>
            </div>
            <div className="partner-grid">
              <article>
                <Scale size={29} strokeWidth={1.4} />
                <h3>{t("Vergi hukuku ve hukuki destek")}</h3>
                <p>
                  {t(
                    "Vergi hukuku alanında çalışan bir avukatla iş birliğimiz; kısa iletişim yolları, doğrudan koordinasyon ve ek uzmanlık sağlar.",
                  )}
                </p>
                <div className="chips">
                  <span>{t("Doğrudan koordinasyon")}</span>
                  <span>{t("Profesyonel destek")}</span>
                </div>
                <small>
                  {t(
                    "Vergi hukuku danışmanlığı ve hukuki temsil ilgili avukat tarafından sağlanır.",
                  )}
                </small>
              </article>
              <article>
                <ShieldCheck size={29} strokeWidth={1.4} />
                <h3>{t("Sigorta ve işletme güvencesi")}</h3>
                <p>
                  {t(
                    "İşletme güvenceleri, mesleki riskler, şirket sigortaları, kişi ve mal sigortaları için sizi yetkin bir sigorta brokeriyle buluşturuyoruz.",
                  )}
                </p>
                <div className="chips">
                  <span>{t("İşletme güvenceleri")}</span>
                  <span>{t("Bireysel güvence konseptleri")}</span>
                </div>
                <small>
                  {t(
                    "Sigorta danışmanlığı ve aracılık hizmeti ilgili sigorta brokeri tarafından sağlanır.",
                  )}
                </small>
              </article>
            </div>
          </div>
        </section>
        <section className="why" id="neden-biz">
          <div className="container why-grid">
            <div>
              <div className="eyebrow">{t("NEDEN BİZ?")}</div>
              <h2>
                {t("Kişisel.")}
                <br />
                {t("Güvenilir.")}
                <br />
                <em>{t("Dijital.")}</em>
              </h2>
              <p>
                {t(
                  "Bizim için bir müşteri numarasından fazlasısınız. İşletmenizi tanır, ihtiyaçlarınızı anlar ve uzun vadeli bir iş birliği kurarız.",
                )}
              </p>
              <a className="text-link" href="#hakkimizda">
                {t("Bizi daha yakından tanıyın")} <ArrowUpRight size={18} />
              </a>
            </div>
            <div className="values">
              {[
                [
                  "Kişisel hizmet",
                  "Her aşamada ulaşabileceğiniz, işinizi ve hedeflerinizi tanıyan güvenilir bir muhatap.",
                ],
                [
                  "Modern çalışma şekli",
                  "Dijital süreçlerle verimli, hızlı ve kolay bir iş birliği.",
                ],
                [
                  "Girişimci bakış açısı",
                  "Yalnızca kayıtlara değil, işletmenizin ekonomik bağlantılarına ve bütününe odaklanırız.",
                ],
                [
                  "Güçlü uzman ağı",
                  "Gerektiğinde avukat ve sigorta brokeri iş ortaklarımızın uzmanlığına erişim.",
                ],
              ].map(([title, desc], i) => (
                <div className="value" key={title}>
                  <span>0{i + 1}</span>
                  <div>
                    <h3>{t(title)}</h3>
                    <p>{t(desc)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="section container" id="surec">
          <div className="section-head">
            <div>
              <div className="eyebrow">{t("ÇALIŞMA SÜRECİ")}</div>
              <h2>{t("İlk görüşmeden birlikte uygulamaya.")}</h2>
            </div>
            <a className="text-link" href="#iletisim">
              {t("İlk adımı atalım")} <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="steps">
            {[
              [
                "Tanışma",
                "Bağlayıcı olmayan ilk görüşmede işletmenizi, mevcut durumunuzu ve hedeflerinizi konuşuyoruz.",
              ],
              [
                "İhtiyaç analizi",
                "Hangi alanlarda destek olabileceğimizi birlikte değerlendiriyoruz.",
              ],
              [
                "Çözüm geliştirme",
                "Bireysel ihtiyaçlarınıza uygun, açık ve uygulanabilir bir yapı oluşturuyoruz.",
              ],
              [
                "Birlikte uygulama",
                "Siz gerekli belgeleri sağlıyorsunuz; biz üzerinde anlaştığımız ticari ve idari görevleri üstleniyoruz.",
              ],
            ].map(([title, text], i) => (
              <article key={title}>
                <div className="step-number">
                    <span>0{i + 1}</span>
                    <h3>{t(title)}</h3>
                    <ArrowRight size={19} aria-hidden="true" />
                  </div>
                <p>{t(text)}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section container about" id="hakkimizda">
          <div>
            <div className="eyebrow">{t("HAKKIMIZDA")}</div>
            <h2>
              {t("about.line1")}
              <br />
              {t("about.line2")}
            </h2>
          </div>
          <div>
            <p className="large-copy">
              {t("Sadece muhasebenizi değil,")}
              <br />
              <span>{t("işletmenizin bütününü düşünüyoruz.")}</span>
            </p>
            <p>
              {t(
                "Hakan Köse Unternehmensverwaltung olarak serbest meslek sahiplerine, bağımsız çalışanlara ve küçük ve orta ölçekli işletmelere ticari ve idari konularda destek veriyoruz.",
              )}
            </p>
            <p>
              {t(
                "Güven, özen ve uzun vadeli iş birliği temel değerlerimiz. İşletmenizi anlamak, bağlantıları görmek ve günlük iş hayatında yükünüzü hafifletmek için buradayız.",
              )}
            </p>
          </div>
        </section>
        <section className="contact" id="iletisim">
          <div className="container contact-grid">
            <div>
              <div className="eyebrow">{t("BİRLİKTE BAŞLAYALIM")}</div>
              <h2>
                {t("contact.line1")}
                <br />
                <em>{t("contact.line2")}</em>
              </h2>
              <p>
                {t(
                  "Finansal muhasebe, bordro, şirket kuruluşu veya işletme danışmanlığı. İlk görüşmede ihtiyacınızı birlikte değerlendirelim.",
                )}
              </p>
              <a
                className="button light"
                href={
                  "mailto:info@koese-uvw.de?subject=" +
                  encodeURIComponent(t("Ücretsiz ön görüşme"))
                }
              >
                {t("Ücretsiz ön görüşme")} <ArrowUpRight size={19} />
              </a>
            </div>
            <div className="contact-details">
              <a href="tel:+493042802636">
                <Phone size={21} />
                <span>
                  <small>{t("BİZİ ARAYIN")}</small>030 / 42 80 26 36
                </span>
                <ArrowUpRight size={21} />
              </a>
              <a href="mailto:info@koese-uvw.de">
                <Mail size={21} />
                <span>
                  <small>{t("BİZE YAZIN")}</small>info@koese-uvw.de
                </span>
                <ArrowUpRight size={21} />
              </a>
              <a href="mailto:lohn@koese-uvw.de">
                <Users size={21} />
                <span>
                  <small>{t("BORDRO İŞLEMLERİ")}</small>lohn@koese-uvw.de
                </span>
                <ArrowUpRight size={21} />
              </a>
              <div>
                <MapPin size={21} />
                <span>
                  <small>{t("ADRESİMİZ")}</small>Bernburger Str. 32
                  <br />
                  10963 Berlin
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="container">
        <div className="footer-top">
          <a className="brand" href="#">
            <img
              className="brand-image"
              src="/img/hklogo.jpeg"
              alt="Hakan Köse Unternehmensverwaltung"
              width="500"
              height="500"
            />
          </a>
          <p>{t("Rakamlar. Yapılar. Çözümler.")}</p>
          <a className="text-link" href="#">
            {t("Başa dön ↑")}
          </a>
        </div>
        <div className="footer-contact">
          <address>
            <span className="footer-label">{t("ADRESİMİZ")}</span>Bernburger
            Str. 32
            <br />
            10963 Berlin
          </address>
          <div>
            <span className="footer-label">{t("BİZİ ARAYIN")}</span>
            <a href="tel:+493042802636">030 / 42 80 26 36</a>
          </div>
          <div>
            <span className="footer-label">{t("BİZE YAZIN")}</span>
            <a href="mailto:info@koese-uvw.de">info@koese-uvw.de</a>
          </div>
          <div>
            <span className="footer-label">{t("BORDRO İŞLEMLERİ")}</span>
            <a href="mailto:lohn@koese-uvw.de">lohn@koese-uvw.de</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Hakan Köse Unternehmensverwaltung
          </span>
          <span>{t("Steuernummer: 14/391/00508")}</span>
          <span>{t("USt-ID: DE321053398")}</span>
        </div>
      </footer>
    </>
  );
}

