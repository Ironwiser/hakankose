import React, { useState, useEffect, useRef } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
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
import { legalContent } from "./legalContent.js";

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
    image: "/img/muhasebe-belgeleri.jpg",
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
    image: "/img/service-payroll-v3.png",
    title: "Bordro ve ücret muhasebesi",
    tag: "Sizin ve çalışanlarınız için güvenilir bordrolama.",
    text: "Ücret ve maaş bordrolaması doğruluk, zamanında işlem ve hassas verilerin dikkatli şekilde ele alınmasını gerektirir. Devam eden bordro süreçlerinde size destek oluyor ve düzenli, güvenilir iş akışları sağlıyoruz.",
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
    image: "/img/service-startup-v2.jpg",
    title: "Şirket kuruluş danışmanlığı",
    tag: "Fikirden başarılı bir işletmeye.",
    text: "Serbest çalışmaya veya kendi işletmenizi kurmaya başlamak önemli bir adımdır. Girişimcilere ticari ve organizasyonel konularda eşlik ediyor, en başından sağlam bir temel oluşturmalarına yardımcı oluyoruz.",
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
    image: "/img/dijital-surecler.jpg",
    title: "İşletme danışmanlığı",
    tag: "İşletmeyi anlamak. Potansiyeli görmek. Geleceği şekillendirmek.",
    text: "Yalnızca tek tek rakamlara değil, işletmenin tamamına bakıyoruz. Yapıları iyileştirmek, potansiyelleri belirlemek ve işletmenizi geleceğe yönelik sağlam bir yapıya kavuşturmak için birlikte çalışıyoruz.",
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
  const [activeService, setActiveService] = useState(0);
  const [inlineServices, setInlineServices] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 950px)").matches,
  );
  useEffect(() => {
    const query = window.matchMedia("(max-width: 950px)");
    const update = () => setInlineServices(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const [emailDialog, setEmailDialog] = useState(null);
  const [emailCopied, setEmailCopied] = useState(false);
  const [phoneDialog, setPhoneDialog] = useState(false);
  const [phoneCopied, setPhoneCopied] = useState(false);
  const [legalPage, setLegalPage] = useState(null);
  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);
  const emailDialogRef = useRef(null);
  const phoneDialogRef = useRef(null);
  const legalDialogRef = useRef(null);
  const selectedService = services[activeService];
  const SelectedServiceIcon = selectedService.icon;
  const openEmailDialog = (event, email, subject) => {
    event.preventDefault();
    setEmailCopied(false);
    setEmailDialog({ email, subject });
  };
  const copyValue = async (value) => {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      const field = document.createElement("textarea");
      field.value = value;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      const previousFocus = document.activeElement;
      (document.querySelector("dialog[open]") || document.body).appendChild(field);
      try {
        field.focus();
        field.select();
        return document.execCommand("copy");
      } catch {
        return false;
      } finally {
        field.remove();
        previousFocus?.focus();
      }
    }
  };
  const copyEmail = async () => {
    if (!emailDialog) return;
    setEmailCopied(await copyValue(emailDialog.email) ? true : "failed");
  };
  const openPhoneDialog = (event) => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    event.preventDefault();
    setPhoneCopied(false);
    setPhoneDialog(true);
  };
  const copyPhone = async () => {
    setPhoneCopied(await copyValue("+49 30 42 80 26 36") ? true : "failed");
  };
  useEffect(() => {
    if (emailDialog && !emailDialogRef.current?.open) {
      emailDialogRef.current?.showModal();
    }
  }, [emailDialog]);
  useEffect(() => {
    if (phoneDialog && !phoneDialogRef.current?.open) {
      phoneDialogRef.current?.showModal();
    }
  }, [phoneDialog]);
  useEffect(() => {
    if (legalPage && !legalDialogRef.current?.open) {
      legalDialogRef.current?.showModal();
    }
  }, [legalPage]);
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
                <a className="text-link" href="#hizmetler">
                  {t("Hizmetlerimizi inceleyin")} <ArrowRight size={18} />
                </a>
              </div>
              <p className="hero-audience-label">{t("İşinizin her aşamasında")}</p>
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
                <svg className="panel-ornament panel-ornament-orbit" viewBox="0 0 36 36" aria-hidden="true" focusable="false">
                  <circle cx="14" cy="18" r="10" />
                  <circle cx="22" cy="18" r="10" />
                  <circle cx="18" cy="18" r="2" fill="currentColor" stroke="none" />
                </svg>
              </div>
              <div className="panel-title">
                {t("Rakamlar.")}<br />
                {t("Yapılar.")}<br />
                <span>{t("Çözümler.")}</span>
              </div>
              <div className="panel-bottom">
                <span>{t("Ticari hayatınızda")}<br />{t("sağlam bir temel.")}</span>
                <svg className="panel-ornament panel-ornament-arcs" viewBox="0 0 64 48" aria-hidden="true" focusable="false">
                  <path d="M8 40V28a24 24 0 0 1 48 0v12M16 40V28a16 16 0 0 1 32 0v12M24 40V28a8 8 0 0 1 16 0v12" />
                  <path d="M4 44h56" opacity=".45" />
                </svg>
              </div>
              <div className="since">
                <strong>2020</strong>
                <span>{t("GÜVENLE, BİRLİKTE.")}</span>
              </div>
            </div>
          </div>
        </section>
        <div className="intro-strip">
          <div className="container">
            <p>{t("Serbest meslek sahipleri")}</p>
            <p>{t("Bağımsız çalışanlar")}</p>
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
          <div className={"service-grid" + (inlineServices ? " service-grid-inline" : "")} role={inlineServices ? undefined : "tablist"} aria-label={t("HİZMETLERİMİZ")}>
            {services.map((s, i) => {
              const isActive = activeService === i;
              return <article
                className={"service " + (!inlineServices && isActive ? "is-active" : "")}
                key={s.title}
              >
                <div className="service-image" aria-hidden="true">
                  <img src={s.image} alt="" width="1536" height="1024" loading="lazy" />
                </div>
                <div className="service-top">
                  <div className="service-heading">
                    <s.icon size={28} strokeWidth={1.3} />
                    <h3>{t(s.title)}</h3>
                  </div>
                  <span>0{i + 1}</span>
                </div>
                {!inlineServices && <button
                  className="detail-button"
                  id={"service-tab-" + i}
                  role="tab"
                  aria-label={t(s.title)}
                  aria-selected={isActive}
                  aria-controls="service-details"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveService(i)}
                  onKeyDown={(event) => {
                    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
                    event.preventDefault();
                    const next = event.key === "Home" ? 0 : event.key === "End" ? services.length - 1 :
                      (i + (event.key === "ArrowRight" ? 1 : -1) + services.length) % services.length;
                    setActiveService(next);
                    document.getElementById("service-tab-" + next)?.focus();
                  }}
                >
                  <span>{t("Detayları görüntüle")}</span>
                  <span className="detail-button-icon" aria-hidden="true">
                    <ArrowRight size={16} />
                  </span>
                </button>}
                {inlineServices && <div className="service-inline-details">
                  <strong>{t(s.tag)}</strong>
                  <p>{t(s.text)}</p>
                  <ul>{s.items.map(item => <li key={item}>{t(item)}</li>)}</ul>
                </div>}
              </article>;
            })}
          </div>
          {!inlineServices && <div
            className="service-detail-panel"
            id="service-details"
            role="tabpanel"
            aria-labelledby={"service-tab-" + activeService}
          >
            <div className="service-detail-summary">
              <div className="service-detail-heading">
                <SelectedServiceIcon size={27} strokeWidth={1.35} />
                <div>
                  <span>0{activeService + 1} · {t("Hizmet kapsamı")}</span>
                  <h3>{t(selectedService.title)}</h3>
                </div>
              </div>
              <strong>{t(selectedService.tag)}</strong>
              <p>{t(selectedService.text)}</p>
            </div>
            <ul>
              {selectedService.items.map((item) => (
                <li key={item}>{t(item)}</li>
              ))}
            </ul>
          </div>}
        </section>
        <section className="partners section" id="is-ortaklari">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="eyebrow">{t("İŞ ORTAKLARIMIZ")}</div>
                <h2>{t("Birlikte daha fazlası.")}</h2>
              </div>
              <p>
                {t("İşletmelerin karşılaştığı zorluklar çok yönlüdür. Bu nedenle seçilmiş uzmanlardan oluşan güçlü bir iş ortağı ağıyla çalışıyoruz.")}
              </p>
            </div>
            <div className="partner-feature">
              <div className="partner-feature-media">
                <img
                  src="/img/partner-feature-v3.jpg"
                  alt={t("Profesyonel danışmanlık görüşmesi")}
                  width="1536"
                  height="1024"
                  loading="lazy"
                />
              </div>
              <div className="partner-feature-copy">
                <div className="eyebrow">{t("UZMAN AĞIMIZ")}</div>
                <h3>{t("İhtiyacınız olduğunda doğru uzman masada.")}</h3>
                <p>
                  {t(
                    "Vergi hukuku alanında çalışan bir avukatla iş birliğimiz; kısa iletişim yolları, doğrudan koordinasyon ve ek uzmanlık sağlar.",
                  )}
                </p>
                <div className="partner-feature-focus">
                  <Scale size={25} strokeWidth={1.4} />
                  <div>
                    <strong>{t("Vergi hukuku ve hukuki destek")}</strong>
                    <span>{t("Doğrudan koordinasyon")}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="partner-grid">
              <article className="partner-card partner-card-legal">
                <div className="partner-card-image" aria-hidden="true">
                  <img
                    src="/img/partner-legal-v2.jpg"
                    alt=""
                    width="1536"
                    height="1024"
                    loading="lazy"
                  />
                </div>
                <div className="partner-card-heading">
                  <Scale size={29} strokeWidth={1.4} />
                  <h3>{t("Vergi hukuku ve hukuki destek")}</h3>
                </div>
                <div className="partner-card-body">
                  <p>
                    {t(
                      "Vergi hukuku alanında çalışan bir avukatla iş birliğimiz; kısa iletişim yolları, doğrudan koordinasyon ve ek uzmanlık sağlar.",
                    )}
                  </p>
                  <div className="chips">
                    <span>{t("Kısa iletişim yolları")}</span>
                    <span>{t("Doğrudan koordinasyon")}</span>
                    <span>{t("Ek vergi hukuku uzmanlığı")}</span>
                    <span>{t("Profesyonel destek")}</span>
                  </div>
                  <small>
                    {t(
                      "Vergi hukuku danışmanlığı ve hukuki temsil ilgili avukat tarafından sağlanır.",
                    )}
                  </small>
                </div>
              </article>
              <article>
                <div className="partner-card-image" aria-hidden="true">
                  <img
                    src="/img/partner-insurance-v2.jpg"
                    alt=""
                    width="1536"
                    height="1024"
                    loading="lazy"
                  />
                </div>
                <div className="partner-card-heading">
                  <ShieldCheck size={29} strokeWidth={1.4} />
                  <h3>{t("Sigorta ve işletme güvencesi")}</h3>
                </div>
                <div className="partner-card-body">
                  <p>
                    {t(
                      "İşletme güvenceleri, mesleki riskler, şirket sigortaları, kişi ve mal sigortaları için sizi yetkin bir sigorta brokeriyle buluşturuyoruz.",
                    )}
                  </p>
                  <div className="chips">
                    <span>{t("İşletme güvenceleri")}</span>
                    <span>{t("Mesleki riskler")}</span>
                    <span>{t("Şirket sigortaları")}</span>
                    <span>{t("Kişi ve mal sigortaları")}</span>
                    <span>{t("Bireysel güvence konseptleri")}</span>
                  </div>
                  <small>
                    {t(
                      "Sigorta danışmanlığı ve aracılık hizmeti ilgili sigorta brokeri tarafından sağlanır.",
                    )}
                  </small>
                </div>
              </article>
            </div>
          </div>
        </section>
        <section className="why" id="neden-biz">
          <div className="container why-grid">
            <div className="why-intro">
              <div className="eyebrow">{t("NEDEN HAKAN KÖSE UNTERNEHMENSVERWALTUNG?")}</div>
              <h2>
                {t("Kişisel.")}
                <br />
                {t("Güvenilir.")}
                <br />
                <em>{t("Dijital.")}</em>
              </h2>
              <p>
                {t(
                  "2020 yılındaki kuruluşumuzdan bu yana müşterilerimizin ticari ve idari konularında güvenilir bir muhatap olarak yanlarında yer alıyoruz.",
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
                  "Bizim için müşteriler bir numaradan ibaret değildir. Kişisel ve güvene dayalı bir iş birliğine önem veriyoruz.",
                  "/img/why-personal-v1.jpg",
                ],
                [
                  "Modern çalışma şekli",
                  "Dijital süreçler verimli, hızlı ve kolay bir iş birliği sağlar.",
                  "/img/why-digital-v1.jpg",
                ],
                [
                  "Girişimci bakış açısı",
                  "Yalnızca tek tek muhasebe kayıtlarına değil, işletmenin ekonomik bağlantılarına ve genel yapısına bakıyoruz.",
                  "/img/why-entrepreneur-v1.jpg",
                ],
                [
                  "Güçlü ağ",
                  "Vergi hukuku alanında bir avukat ve bir sigorta brokeriyle yaptığımız iş birlikleri sayesinde gerektiğinde ek uzmanlıktan yararlanabiliyoruz.",
                  "/img/why-expert-v1.jpg",
                ],
              ].map(([title, desc, image], i) => (
                <div className="value" key={title}>
                  <span>0{i + 1}</span>
                  <div className="value-copy">
                    <h3>{t(title)}</h3>
                    <p>{t(desc)}</p>
                  </div>
                  <div className="value-image" aria-hidden="true">
                    <img src={image} alt="" />
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
                  "/img/process-handshake-v1.jpg",
                ],
                [
                  "İhtiyaç analizi",
                  "Hangi alanlarda destek olabileceğimizi birlikte değerlendiriyoruz.",
                  "/img/process-analysis-v1.jpg",
                ],
                [
                  "Çözüm geliştirme",
                  "Bireysel ihtiyaçlarınıza uygun, açık ve uygulanabilir bir yapı oluşturuyoruz.",
                  "/img/process-solution-v1.jpg",
                ],
                [
                  "Birlikte uygulama",
                  "Siz gerekli belgeleri sağlıyorsunuz; biz üzerinde anlaştığımız ticari ve idari görevleri üstleniyoruz.",
                  "/img/process-implementation-v1.jpg",
                ],
            ].map(([title, text, image], i) => (
              <article key={title}>
                <div className="step-image" aria-hidden="true">
                  <img src={image} alt="" />
                </div>
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
          <div className="about-media">
            <img
              src="/img/about-team-v3.png"
              alt=""
              width="1536"
              height="1024"
              loading="lazy"
            />
            <div className="about-overlay">
              <div className="about-heading">
                <div className="eyebrow">{t("HAKKIMIZDA")}</div>
                <h2>
                  {t("about.line1")}
                  <br />
                  {t("about.line2")}
                </h2>
              </div>
              <div className="about-copy">
                <p className="large-copy">
                  {t("Sadece muhasebenizi değil,")}
                  <br />
                  <span>{t("işletmenizin bütününü düşünüyoruz.")}</span>
                </p>
                <div className="about-copy-details">
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
                <p>
                  {t(
                    "Amacımız, ticari ve idari görevlerinizde güvenilir ve kişisel destek sunmaktır.",
                  )}
                </p>
                <p>
                  {t(
                    "Finansal muhasebe, bordrolama, şirket kuruluşu ve işletme danışmanlığında yanınızdayız; vergi hukuku, hukuki ve sigorta konularında iş ortağı ağımız üzerinden ek uzmanlığa ulaşmanızı sağlıyoruz.",
                  )}
                </p>
                </div>
              </div>
            </div>
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
            </div>
            <div className="contact-details">
              <a href="tel:+493042802636" onClick={openPhoneDialog}>
                <Phone size={21} />
                <span>
                  <small>{t("BİZİ ARAYIN")}</small>030 / 42 80 26 36
                </span>
                <ArrowUpRight size={21} />
              </a>
              <a
                href="mailto:info@koese-uvw.de"
                onClick={(event) =>
                  openEmailDialog(event, "info@koese-uvw.de", t("BİZE YAZIN"))
                }
              >
                <Mail size={21} />
                <span>
                  <small>{t("BİZE YAZIN")}</small>info@koese-uvw.de
                </span>
                <ArrowUpRight size={21} />
              </a>
              <a
                href="mailto:lohn@koese-uvw.de"
                onClick={(event) =>
                  openEmailDialog(
                    event,
                    "lohn@koese-uvw.de",
                    t("BORDRO İŞLEMLERİ"),
                  )
                }
              >
                <Users size={21} />
                <span>
                  <small>{t("BORDRO İŞLEMLERİ")}</small>lohn@koese-uvw.de
                </span>
                <ArrowUpRight size={21} />
              </a>
              <a href="https://www.google.com/maps/search/?api=1&amp;query=Bernburger%20Str.%2032%2C%2010963%20Berlin" target="_blank" rel="noopener noreferrer"><MapPin size={21} /><span>
                  <small>{t("ADRESİMİZ")}</small>Bernburger Str. 32
                  <br />
                  10963 Berlin
                </span><ArrowUpRight size={21} aria-hidden="true" /></a>
            </div>
          </div>
        </section>
      </main>
      <dialog
        ref={emailDialogRef}
        className="email-dialog"
        aria-labelledby="email-dialog-title"
        onClose={() => {
          setEmailDialog(null);
          setEmailCopied(false);
        }}
        onClick={(event) => {
          if (event.target === emailDialogRef.current) {
            emailDialogRef.current.close();
          }
        }}
      >
        {emailDialog && (
          <div className="email-dialog-card">
            <button
              className="email-dialog-close"
              type="button"
              aria-label={t("Kapat")}
              onClick={() => emailDialogRef.current?.close()}
            >
              <X size={20} />
            </button>
            <div className="email-dialog-icon" aria-hidden="true">
              <Mail size={25} />
            </div>
            <div className="eyebrow">{t("E-POSTA İLE İLETİŞİM")}</div>
            <h2 id="email-dialog-title">{t("Size nasıl yardımcı olabiliriz?")}</h2>
            <p>{t("E-posta adresini kopyalayabilir veya e-posta uygulamanızı açabilirsiniz.")}</p>
            <div className="email-dialog-address">{emailDialog.email}</div>
            <div className="email-dialog-actions">
              <button className="button primary" type="button" onClick={copyEmail}>
                {t(emailCopied === true ? "E-posta adresi kopyalandı" : "E-posta adresini kopyala")}
              </button>
              <a
                className="button email-app-link"
                href={
                  `mailto:${emailDialog.email}?subject=` +
                  encodeURIComponent(emailDialog.subject)
                }
              >
                {t("E-posta uygulamasını aç")} <ArrowUpRight size={18} />
              </a>
            </div>
            {emailCopied === "failed" && <p role="status">{t("Kopyalama yapılamadı. Bilgiyi seçip elle kopyalayabilirsiniz.")}</p>}
          </div>
        )}
      </dialog>
      <dialog
        ref={phoneDialogRef}
        className="email-dialog"
        aria-labelledby="phone-dialog-title"
        onClose={() => {
          setPhoneDialog(false);
          setPhoneCopied(false);
        }}
        onClick={(event) => {
          if (event.target === phoneDialogRef.current) {
            phoneDialogRef.current.close();
          }
        }}
      >
        <div className="email-dialog-card">
          <button
            className="email-dialog-close"
            type="button"
            aria-label={t("Kapat")}
            onClick={() => phoneDialogRef.current?.close()}
          >
            <X size={20} />
          </button>
          <div className="email-dialog-icon" aria-hidden="true">
            <Phone size={25} />
          </div>
          <div className="eyebrow">{t("TELEFON İLE İLETİŞİM")}</div>
          <h2 id="phone-dialog-title">{t("Bizi arayın")}</h2>
          <p>{t("Telefon numarasını kopyalayabilir veya telefon uygulamanızı açabilirsiniz.")}</p>
          <div className="email-dialog-address">030 / 42 80 26 36</div>
          <div className="email-dialog-actions">
            <button className="button primary" type="button" onClick={copyPhone}>
              {t(phoneCopied === true ? "Telefon numarası kopyalandı" : "Telefon numarasını kopyala")}
            </button>
            <a className="button email-app-link" href="tel:+493042802636">
              {t("Telefon uygulamasını aç")} <ArrowUpRight size={18} />
            </a>
          </div>
        </div>
        {phoneCopied === "failed" && <p role="status">{t("Kopyalama yapılamadı. Bilgiyi seçip elle kopyalayabilirsiniz.")}</p>}
      </dialog>
      <dialog
        ref={legalDialogRef}
        className="legal-dialog"
        aria-labelledby="legal-dialog-title"
        onClose={() => setLegalPage(null)}
      >
        {legalPage && (() => {
          const document = legalContent[language][legalPage];
          return <article className="legal-document">
            <div className="legal-document-head">
              <div>
                <div className="eyebrow">{document.eyebrow}</div>
                <h1 id="legal-dialog-title">{document.title}</h1>
                <p>{document.intro}</p>
              </div>
              <button type="button" aria-label={t("Kapat")} onClick={() => legalDialogRef.current?.close()}><X size={22} /></button>
            </div>
            <div className="legal-document-body">
              {document.sections.map(([title, paragraphs]) => <section key={title}>
                <h2>{title}</h2>
                {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </section>)}
            </div>
          </article>;
        })()}
      </dialog>
      <footer className="site-footer">
        <div className="container footer-bar">
          <div className="footer-legal">
            <span>© {new Date().getFullYear()} Hakan Köse Unternehmensverwaltung</span>
            <span>{t("Steuernummer: 14/391/00508")}</span>
            <span>{t("USt-ID: DE321053398")}</span>
          </div>
          <div className="footer-actions">
            <nav className="footer-legal-nav" aria-label={t("Yasal bağlantılar")}>
              <a href="#impressum" onClick={(event) => { event.preventDefault(); setLegalPage("impressum"); }}>Impressum</a>
              <a href="#datenschutz" onClick={(event) => { event.preventDefault(); setLegalPage("privacy"); }}>{t("Datenschutz")}</a>
            </nav>
            <span className="footer-credit">{t("Web tasarım ve geliştirme:")} <strong>Ömür Genç</strong></span>
            <a className="footer-bar-back" href="#" aria-label={t("Başa dön")}>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

