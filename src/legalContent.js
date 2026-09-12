const shared = {
  company: "Hakan Köse Unternehmensverwaltung",
  owner: "Hakan Köse",
  address: "Bernburger Str. 32, 10963 Berlin, Deutschland",
  phone: "030 / 42 80 26 36",
  email: "info@koese-uvw.de",
  vat: "DE321053398",
};

export const legalContent = {
  tr: {
    impressum: {
      eyebrow: "YASAL BİLGİLER",
      title: "Impressum",
      intro: "DDG § 5 uyarınca sağlayıcı bilgileri",
      sections: [
        ["Hizmet sağlayıcı", [shared.company, `İşletme sahibi: ${shared.owner}`, shared.address]],
        ["İletişim", [`Telefon: ${shared.phone}`, `E-posta: ${shared.email}`]],
        ["Katma değer vergisi kimlik numarası", [`USt-IdNr. (§ 27a UStG): ${shared.vat}`]],
        ["İçerik sorumluluğu", ["Bu internet sitesindeki bilgiler genel bilgilendirme amaçlıdır. Hukuki ve vergi danışmanlığı, ilgili yetkiye sahip iş ortakları tarafından sağlanır."]],
      ],
    },
    privacy: {
      eyebrow: "VERİ KORUMA",
      title: "Datenschutzerklärung",
      intro: "Bu açıklama, internet sitesini kullanırken kişisel verilerin nasıl işlendiğini açıklar.",
      sections: [
        ["Veri sorumlusu", [shared.company, shared.address, `E-posta: ${shared.email}`, `Telefon: ${shared.phone}`]],
        ["Hosting ve sunucu kayıtları", ["Site, Almanya'da bulunan bir OVHcloud VPS üzerinde barındırılır. Siteye erişildiğinde IP adresi, tarih ve saat, istenen sayfa, tarayıcı bilgisi ve hata kayıtları teknik olarak işlenebilir. İşleme; güvenli, kararlı ve hatasız hizmet sunma konusundaki meşru menfaate dayanır (GDPR Madde 6(1)(f)). Kayıtlar yalnızca teknik ve güvenlik amacı için gerekli olduğu sürece tutulur."]],
        ["Dil tercihi", ["Seçtiğiniz dil yalnızca tarayıcınızın yerel depolama alanında saklanır. Bu bilgi profil oluşturma veya reklam amacıyla kullanılmaz ve tarayıcı ayarlarından silinebilir."]],
        ["İletişim", ["Telefon veya e-posta yoluyla iletişime geçtiğinizde gönderdiğiniz bilgiler talebinizi yanıtlamak için işlenir. Sözleşme öncesi taleplerde GDPR Madde 6(1)(b), diğer taleplerde GDPR Madde 6(1)(f) uygulanır. Yasal saklama yükümlülükleri saklıdır."]],
        ["Çerezler ve analiz", ["Bu site analiz, reklam veya pazarlama çerezleri kullanmaz. Harici yazı tipi hizmeti çağrılmaz; yazı tipleri site sunucusundan yüklenir."]],
        ["Harici bağlantılar", ["Google Maps yalnızca adres bağlantısına tıkladığınızda açılır. Bu durumda Google'ın veri koruma koşulları geçerlidir; site açılışında Google Maps'e otomatik bağlantı kurulmaz."]],
        ["Haklarınız", ["Verilerinize erişme, düzeltme, silme, işlemeyi sınırlandırma, itiraz etme ve uygun durumlarda veri taşınabilirliği talep etme hakkınız vardır. Ayrıca yetkili veri koruma denetim makamına şikâyette bulunabilirsiniz."]],
      ],
    },
  },
  de: {
    impressum: {
      eyebrow: "RECHTLICHE ANGABEN",
      title: "Impressum",
      intro: "Angaben gemäß § 5 DDG",
      sections: [
        ["Diensteanbieter", [shared.company, `Inhaber: ${shared.owner}`, shared.address]],
        ["Kontakt", [`Telefon: ${shared.phone}`, `E-Mail: ${shared.email}`]],
        ["Umsatzsteuer-Identifikationsnummer", [`USt-IdNr. gemäß § 27a UStG: ${shared.vat}`]],
        ["Hinweis zu den Inhalten", ["Die Informationen auf dieser Website dienen der allgemeinen Information. Rechts- und Steuerberatung werden durch die jeweils dazu befugten Kooperationspartner erbracht."]],
      ],
    },
    privacy: {
      eyebrow: "DATENSCHUTZ",
      title: "Datenschutzerklärung",
      intro: "Diese Erklärung informiert über die Verarbeitung personenbezogener Daten bei der Nutzung dieser Website.",
      sections: [
        ["Verantwortlicher", [shared.company, shared.address, `E-Mail: ${shared.email}`, `Telefon: ${shared.phone}`]],
        ["Hosting und Server-Logfiles", ["Diese Website wird auf einem OVHcloud VPS in Deutschland gehostet. Beim Aufruf können insbesondere IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Browserinformationen und Fehlerdaten technisch verarbeitet werden. Rechtsgrundlage ist unser berechtigtes Interesse an einem sicheren, stabilen und fehlerfreien Betrieb gemäß Art. 6 Abs. 1 lit. f DSGVO. Protokolle werden nur so lange gespeichert, wie dies für technische und sicherheitsbezogene Zwecke erforderlich ist."]],
        ["Sprachauswahl", ["Die von Ihnen gewählte Sprache wird ausschließlich im lokalen Speicher Ihres Browsers gespeichert. Die Angabe wird weder für Werbung noch zur Profilbildung verwendet und kann über die Browsereinstellungen gelöscht werden."]],
        ["Kontaktaufnahme", ["Wenn Sie uns telefonisch oder per E-Mail kontaktieren, verarbeiten wir Ihre Angaben zur Bearbeitung Ihrer Anfrage. Bei vorvertraglichen Anfragen gilt Art. 6 Abs. 1 lit. b DSGVO, im Übrigen Art. 6 Abs. 1 lit. f DSGVO. Gesetzliche Aufbewahrungspflichten bleiben unberührt."]],
        ["Cookies und Analyse", ["Diese Website verwendet keine Analyse-, Werbe- oder Marketing-Cookies. Es werden keine externen Schriftanbieterdienste aufgerufen; die Schriftdateien werden vom eigenen Webserver geladen."]],
        ["Externe Links", ["Google Maps wird erst geöffnet, wenn Sie den Adresslink anklicken. Dann gelten die Datenschutzbestimmungen von Google. Beim bloßen Aufruf dieser Website wird keine automatische Verbindung zu Google Maps hergestellt."]],
        ["Ihre Rechte", ["Sie haben insbesondere Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Widerspruch und – soweit anwendbar – Datenübertragbarkeit. Außerdem können Sie sich bei einer zuständigen Datenschutzaufsichtsbehörde beschweren."]],
      ],
    },
  },
  en: {
    impressum: {
      eyebrow: "LEGAL INFORMATION",
      title: "Legal notice",
      intro: "Provider information pursuant to Section 5 DDG",
      sections: [
        ["Service provider", [shared.company, `Owner: ${shared.owner}`, shared.address]],
        ["Contact", [`Phone: ${shared.phone}`, `Email: ${shared.email}`]],
        ["VAT identification number", [`VAT ID pursuant to Section 27a UStG: ${shared.vat}`]],
        ["Content notice", ["The information on this website is provided for general information. Legal and tax advice is supplied by the appropriately authorised cooperation partners."]],
      ],
    },
    privacy: {
      eyebrow: "DATA PROTECTION",
      title: "Privacy policy",
      intro: "This notice explains how personal data is processed when you use this website.",
      sections: [
        ["Controller", [shared.company, shared.address, `Email: ${shared.email}`, `Phone: ${shared.phone}`]],
        ["Hosting and server logs", ["This website is hosted on an OVHcloud VPS located in Germany. When you access the site, technical data such as your IP address, date and time, requested page, browser information and error data may be processed. The legal basis is our legitimate interest in secure, stable and error-free operation under Article 6(1)(f) GDPR. Logs are retained only for as long as required for technical and security purposes."]],
        ["Language preference", ["Your selected language is stored only in your browser's local storage. It is not used for advertising or profiling and can be removed through your browser settings."]],
        ["Contact", ["If you contact us by telephone or email, we process the information you provide to respond to your enquiry. Article 6(1)(b) GDPR applies to pre-contractual enquiries and Article 6(1)(f) GDPR to other enquiries. Statutory retention obligations remain unaffected."]],
        ["Cookies and analytics", ["This website does not use analytics, advertising or marketing cookies. It does not call an external font provider; fonts are served from the website's own server."]],
        ["External links", ["Google Maps opens only after you select the address link. Google's privacy terms then apply. Merely visiting this website does not establish an automatic connection to Google Maps."]],
        ["Your rights", ["You may request access, correction, deletion, restriction of processing, object to processing and, where applicable, data portability. You may also lodge a complaint with a competent data protection supervisory authority."]],
      ],
    },
  },
};
