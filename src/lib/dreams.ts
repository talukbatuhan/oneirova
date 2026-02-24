export type DreamSection = {
  title: string;
  body: string[];
};

export type DreamEntry = {
  slug: string;
  title: string;
  excerpt: string;
  themes: string[];
  updatedAt: string;
  quickMeaning: string[];
  sections: DreamSection[];
};

const dreams: DreamEntry[] = [
  {
    slug: "teeth-falling-out",
    title: "Dişlerin Dökülmesi",
    excerpt: "Çoğunlukla kırılganlık, değişim ve başkalarınca nasıl algılandığınızla ilişkilidir.",
    themes: ["Kaygı", "Kimlik", "Değişim"],
    updatedAt: "2026-02-24",
    quickMeaning: [
      "Kırılganlık veya kendini fazla izleme hâline işaret edebilir.",
      "Kontrolünüz dışında ilerleyen bir geçiş dönemini yansıtabilir.",
      "Görünüş, ifade veya özgüvenle ilgili bir endişeyi gösterebilir.",
    ],
    sections: [
      {
        title: "Yaygın Yorumlar",
        body: [
          "Sizin için önemli bir konuda kontrol kaybetme korkusu.",
          "Özellikle bir geçiş döneminde başkalarının sizi nasıl gördüğüne dair kaygı.",
          "Özgüveninizin veya etkinizin azaldığı hissi.",
        ],
      },
      {
        title: "Duygusal Bağlam",
        body: [
          "Duyguya dikkat edin: panik, utanç, rahatlama ya da hissizlik.",
          "Duygu çoğu zaman baskı altındaki gerçek hayat alanını işaret eder.",
        ],
      },
      {
        title: "Düşünmek İçin Sorular",
        body: [
          "Şu an nerede kendinizi açıkta veya yargılanıyor hissediyorsunuz?",
          "Hangi değişime direniyor ya da kontrol edemiyor hissediyorsunuz?",
          "Kaçındığınız bir konuşma var mı?",
        ],
      },
    ],
  },
  {
    slug: "being-chased",
    title: "Kovalanmak",
    excerpt: "Genellikle kaçınma, baskı veya ilgi isteyen bir yaşam alanını yansıtır.",
    themes: ["Kaygı", "Kaçınma"],
    updatedAt: "2026-02-24",
    quickMeaning: [
      "Çözülmemiş ve ısrarcı bir mesele hissi.",
      "Kaçmaya çalıştığınız bir baskı.",
      "Sürekli ertelediklerinize dönüp bakma çağrısı.",
    ],
    sections: [
      {
        title: "Yaygın Yorumlar",
        body: [
          "Bir sorumluluk, gerçek veya karardan kaçınmak.",
          "Zaman baskısı veya performans beklentisi hissi.",
          "Sonuçların sizi yakaladığına dair korku.",
        ],
      },
      {
        title: "Durum Varyasyonları",
        body: [
          "Koşamıyorsanız: uyanık hayatta sıkışmış veya güçsüz hissetmek.",
          "Saklanıyorsanız: dikkat dağıtma ya da geri çekilme ile kaçınmak.",
          "Yüzleşiyorsanız: korktuğunuz şeyle ilgilenmeye hazır olmak.",
        ],
      },
    ],
  },
  {
    slug: "flying",
    title: "Uçmak",
    excerpt: "Sıklıkla özgürlük, perspektif ve kısıtların ötesine geçmeyi simgeler.",
    themes: ["Özgürlük", "Gelişim"],
    updatedAt: "2026-02-22",
    quickMeaning: [
      "Özgürleşme veya genişleme isteği.",
      "Eski bir probleme yeni bir bakış açısı.",
      "Bir hedefe doğru ivme.",
    ],
    sections: [
      {
        title: "Yaygın Yorumlar",
        body: [
          "Sınırların veya şüphelerin üzerine çıkmak.",
          "Bir kırılma noktasından sonra özgüvenin artması.",
          "Büyük resmi görmek için geri çekilme ihtiyacı.",
        ],
      },
      {
        title: "Duygusal Bağlam",
        body: [
          "Rahatlık ve sakinlik çoğu zaman uyuma işaret eder.",
          "Uçarken korkmak; başarıdan veya görünür olmaktan çekinmeyi gösterebilir.",
        ],
      },
    ],
  },
  {
    slug: "falling",
    title: "Düşmek",
    excerpt: "Çoğu zaman güvensizlik, istikrarsızlık veya kontrol kaybı korkusuyla bağlantılıdır.",
    themes: ["Kaygı", "Kontrol"],
    updatedAt: "2026-02-21",
    quickMeaning: [
      "Belirsizlik veya dengesizlik hissi.",
      "Başarısız olma ya da birini hayal kırıklığına uğratma korkusu.",
      "Bir ilişkide veya planda zeminin kaydığı hissi.",
    ],
    sections: [
      {
        title: "Yaygın Yorumlar",
        body: [
          "Bir durumun öngörülemez veya desteksiz hissettirmesi.",
          "Yeni bir dönem ya da sorumluluk sırasında kendinden şüphe.",
          "Bedensel stresin rüyada sinyal olarak belirmesi.",
        ],
      },
    ],
  },
  {
    slug: "snake",
    title: "Yılan",
    excerpt: "Sezgi, dönüşüm, korku veya gizli bir gerilimi temsil edebilir.",
    themes: ["Dönüşüm", "Korku", "Sezgi"],
    updatedAt: "2026-02-20",
    quickMeaning: [
      "Yoğun veya yabancı gelen bir dönüşüm.",
      "Yüzeye çıkan gizli bir gerilim.",
      "Sezgine güvenme çağrısı.",
    ],
    sections: [
      {
        title: "Yaygın Yorumlar",
        body: [
          "Hissettiğiniz ama adını koymadığınız zor bir gerçek.",
          "Yenilenme: eski bir kimliği geride bırakmak.",
          "Sınır meselesi: bir şeyin fazla yakına girmesi.",
        ],
      },
    ],
  },
  {
    slug: "spider",
    title: "Örümcek",
    excerpt: "Sıklıkla kalıplara, kontrole, üretkenliğe veya ağda sıkışmış hissetmeye işaret eder.",
    themes: ["Kalıplar", "Kontrol"],
    updatedAt: "2026-02-18",
    quickMeaning: [
      "Sürekli geri döndüğünüz bir kalıp.",
      "Sarılmış/izleniyor gibi hissetmek.",
      "Yaratıcı güç: bir şeyi yavaşça inşa etmek.",
    ],
    sections: [
      {
        title: "Yaygın Yorumlar",
        body: [
          "Küçük seçimlerin birikerek bir tuzağa dönüştüğü bir durum.",
          "Ne inşa ettiğinizi ve nedenini inceleme çağrısı.",
          "İzlenme veya yargılanma kaygısı.",
        ],
      },
    ],
  },
  {
    slug: "water",
    title: "Su",
    excerpt: "Sıklıkla duygusal durumu, derinliği ve değişimin akışını yansıtır.",
    themes: ["Duygu", "Değişim"],
    updatedAt: "2026-02-17",
    quickMeaning: [
      "Duygusal durumunuzun şekil alması.",
      "Bir geçiş veya arınma süreci.",
      "Derinlik: altta konuşulmayan bir şey.",
    ],
    sections: [
      {
        title: "Durum Varyasyonları",
        body: [
          "Berrak su: netlik, sakinlik, duygu düzenleme.",
          "Fırtınalı su: bunalmışlık, çatışma, yoğunluk.",
          "Boğulmak: aynı anda çok şey, sınırlara ihtiyaç.",
        ],
      },
    ],
  },
  {
    slug: "ocean",
    title: "Okyanus",
    excerpt: "Geniş duyguları, bilinmeyeni ve derinliğin çekimini simgeler.",
    themes: ["Duygu", "Gizem"],
    updatedAt: "2026-02-16",
    quickMeaning: [
      "Büyük bir yaşam bölümünde bilinmeyenle yüzleşmek.",
      "Hissettiğiniz geniş bir duygusal alan.",
      "Derinliğe ve sınırlara saygı çağrısı.",
    ],
    sections: [
      {
        title: "Yaygın Yorumlar",
        body: [
          "Tam kontrol edemediklerinize karşı hayranlık/çekinme.",
          "Daha derin duygu veya anlamı keşfetme isteği.",
          "Duygular büyüdüğünde temponuzu ayarlama hatırlatması.",
        ],
      },
    ],
  },
  {
    slug: "fire",
    title: "Ateş",
    excerpt: "Genellikle yoğunluk, öfke, arınma veya ani dönüşümle bağlantılıdır.",
    themes: ["Dönüşüm", "Yoğunluk"],
    updatedAt: "2026-02-15",
    quickMeaning: [
      "İfade arayan güçlü bir duygu.",
      "Göz ardı edilemeyen hızlı bir değişim.",
      "Artık uymayanı temizleme ihtiyacı.",
    ],
    sections: [
      {
        title: "Yaygın Yorumlar",
        body: [
          "Eyleme dönüşen bir motivasyon birikimi.",
          "Güvenli bir çıkışa ihtiyaç duyan öfke veya tutku.",
          "Geri dönülmez gibi hissedilen bir dönüşüm evresi.",
        ],
      },
    ],
  },
  {
    slug: "exam",
    title: "Sınav",
    excerpt: "Değerlendirilme kaygısı ve yeterli olamama korkusunun klasik bir göstergesidir.",
    themes: ["Kaygı", "Performans"],
    updatedAt: "2026-02-14",
    quickMeaning: [
      "Yargılanıyor veya değerlendiriliyor hissetmek.",
      "Kendini kanıtlama baskısı.",
      "Ağır gelen, kendinize koyduğunuz bir standart.",
    ],
    sections: [
      {
        title: "Yaygın Yorumlar",
        body: [
          "Gerçek hayatta iyi yapmak istediğiniz bir an.",
          "Yeterli olsanız bile hazırlıksız yakalanma korkusu.",
          "Mükemmeliyetçilik ve sürekli kıyasın bedeli.",
        ],
      },
    ],
  },
  {
    slug: "lost",
    title: "Kaybolmak",
    excerpt: "Çoğu zaman belirsizliği, yön arayışını veya yolunuzla uyumsuzluğu yansıtır.",
    themes: ["Değişim", "Kimlik"],
    updatedAt: "2026-02-13",
    quickMeaning: [
      "Yön veya amaç konusunda belirsizlik.",
      "Net işaretler olmadan bir geçiş evresi.",
      "Rehberlik veya köklenme ihtiyacı.",
    ],
    sections: [
      {
        title: "Düşünmek İçin Sorular",
        body: [
          "Nerede çok erken bir kesinlik bekliyorsunuz?",
          "Küçük ve net bir sonraki adım ne olurdu?",
          "Sizi kim/neyin yanında daha yönlenmiş hissettiriyor?",
        ],
      },
    ],
  },
  {
    slug: "death",
    title: "Ölüm",
    excerpt: "Çoğunlukla gerçek kayıptan ziyade bitişleri, dönüşümü ve kimlik değişimlerini simgeler.",
    themes: ["Bitişler", "Dönüşüm"],
    updatedAt: "2026-02-12",
    quickMeaning: [
      "Yeni bir başlangıca yer açan bir kapanış.",
      "Kapanan bir bölüm: kimlik, alışkanlık, rol veya inanç.",
      "İçselleştirdiğiniz bir dönüşüm.",
    ],
    sections: [
      {
        title: "Yaygın Yorumlar",
        body: [
          "Eski bir versiyonun ötesine evrilen bir parçanız.",
          "Bir ilişki dinamiğini veya beklentiyi bırakmak.",
          "Uzun süren stresten sonra derin bir sıfırlanma.",
        ],
      },
    ],
  },
  {
    slug: "pregnancy",
    title: "Hamilelik",
    excerpt: "Genellikle üretim, gelişim, beklenti veya yeni bir fikrin şekillenmesini temsil eder.",
    themes: ["Gelişim", "Yaratım"],
    updatedAt: "2026-02-11",
    quickMeaning: [
      "Gelişen yeni bir fikir veya kimlik.",
      "Kırılganlıkla karışmış bir beklenti.",
      "Bir proje veya ilişkinin yeni bir evreye girmesi.",
    ],
    sections: [
      {
        title: "Yaygın Yorumlar",
        body: [
          "Henüz görünür olmayan ama önemli bir şeyi beslemek.",
          "Umutla birlikte büyüyen sorumluluk hissi.",
          "Olduğunuz kişiyi koruma isteği.",
        ],
      },
    ],
  },
  {
    slug: "wedding",
    title: "Düğün",
    excerpt: "Bağlılık, bütünleşme, seçim veya yeni bir role dair kaygıyı yansıtabilir.",
    themes: ["Bağlılık", "Değişim"],
    updatedAt: "2026-02-10",
    quickMeaning: [
      "Düşündüğünüz veya direndiğiniz bir bağlılık.",
      "Hayatınızın iki parçasını birleştirmek.",
      "Kimlikle ilgili beklentilerden duyulan çekince.",
    ],
    sections: [
      {
        title: "Yaygın Yorumlar",
        body: [
          "Eylemleri değerlerle hizalama hazırlığı.",
          "İlişki dinamiklerinde veya önceliklerde değişim.",
          "Bir soru: gerçekten neyi seçmek istiyorsunuz?",
        ],
      },
    ],
  },
  {
    slug: "money",
    title: "Para",
    excerpt: "Sıklıkla değer, güvenlik, enerji ve öz-değeri simgeler.",
    themes: ["Güvenlik", "Öz-değer"],
    updatedAt: "2026-02-09",
    quickMeaning: [
      "İstikrar veya kaynaklarla ilgili endişeler.",
      "En çok neye değer verdiğinize dair bir soru.",
      "Öz-değerin para olarak görünmesi.",
    ],
    sections: [
      {
        title: "Durum Varyasyonları",
        body: [
          "Para bulmak: değer veya fırsat keşfetmek.",
          "Para kaybetmek: kıtlık veya kontrol kaybı korkusu.",
          "Para vermek: enerji ve cömertlik sınırları.",
        ],
      },
    ],
  },
  {
    slug: "car-crash",
    title: "Trafik Kazası",
    excerpt: "Kontrol kaybı korkusunu, çatışmayı veya güvensiz hissettiren bir yolu yansıtabilir.",
    themes: ["Kontrol", "Çatışma"],
    updatedAt: "2026-02-08",
    quickMeaning: [
      "Bir yolun riskli veya uyumsuz hissettirmesi.",
      "İçsel ya da dışsal bir çatışmanın tırmanması.",
      "Yavaşlayıp yeniden değerlendirme uyarısı.",
    ],
    sections: [
      {
        title: "Yaygın Yorumlar",
        body: [
          "Aşırı yüklenme ve hızın bedeli.",
          "İstediğiniz şey ile sürdürebileceğiniz şey arasındaki gerilim.",
          "Bir karar kesinleşmeden önce durup düşünme ihtiyacı.",
        ],
      },
    ],
  },
  {
    slug: "storm",
    title: "Fırtına",
    excerpt: "Duygusal çalkantıyı ve arındırıcı bir dönüm noktasını yansıtabilir.",
    themes: ["Duygu", "Yoğunluk"],
    updatedAt: "2026-02-07",
    quickMeaning: [
      "Boşalma arayan duygusal çalkantı.",
      "Dönüm noktası: netlikten önce çatışma.",
      "Yoğunluğun ötesinde bir arınma süreci.",
    ],
    sections: [
      {
        title: "Yaygın Yorumlar",
        body: [
          "Bir durumun gürültülü, hızlı ve kontrolü zor hissettirmesi.",
          "İç çatışmanın hava durumu gibi yüzeye çıkması.",
          "Köklenip koşulların geçmesini bekleme hatırlatması.",
        ],
      },
    ],
  },
  {
    slug: "house",
    title: "Ev",
    excerpt: "Çoğunlukla benliği simgeler: odalar, yapı ve saklı/yaşanmış olan.",
    themes: ["Kimlik", "İç dünya"],
    updatedAt: "2026-02-06",
    quickMeaning: [
      "İç dünyanızın mekânlar ve odalar olarak ifade bulması.",
      "İlgi isteyen saklı benlik alanları.",
      "İstikrar, güvenlik ya da eksikliği.",
    ],
    sections: [
      {
        title: "Durum Varyasyonları",
        body: [
          "Yeni ev: yeni bir kimlik evresi veya taze başlangıç.",
          "Eski ev: geçmiş kalıplar ve anılar.",
          "Gizli odalar: keşfedilmemiş potansiyel veya kaçınma.",
        ],
      },
    ],
  },
  {
    slug: "baby",
    title: "Bebek",
    excerpt: "Masumiyeti, sorumluluğu veya yeni ve hassas bir başlangıcı temsil edebilir.",
    themes: ["Gelişim", "Kırılganlık"],
    updatedAt: "2026-02-05",
    quickMeaning: [
      "Hayatınıza giren yeni bir sorumluluk.",
      "Korunmaya ihtiyaç duyan hassas bir başlangıç.",
      "İlgi isteyen daha yumuşak bir yanınız.",
    ],
    sections: [
      {
        title: "Düşünmek İçin Sorular",
        body: [
          "Şu an neyi büyütmeye/beslemeye çalışıyorsunuz?",
          "Nerede kapasitenizin ötesinde sorumluluk hissediyorsunuz?",
          "Baskı yerine nezakete/şefkate ne ihtiyaç duyuyor?",
        ],
      },
    ],
  },
  {
    slug: "cat",
    title: "Kedi",
    excerpt: "Bağımsızlığı, sezgiyi ve sakin sınırları simgeleyebilir.",
    themes: ["Sezgi", "Sınırlar"],
    updatedAt: "2026-02-04",
    quickMeaning: [
      "Bağımsızlık veya alan ihtiyacı.",
      "Sezgine küçük işaretlerle güvenmek.",
      "Sınır farkındalığı: güvenli ve sakin olanı seçmek.",
    ],
    sections: [
      {
        title: "Yaygın Yorumlar",
        body: [
          "Küçük seçimlerle artan öz-güven.",
          "Eylemden önce sessiz gözlem.",
          "Ortamınızı bilinçli seçme hatırlatması.",
        ],
      },
    ],
  },
  {
    slug: "dog",
    title: "Köpek",
    excerpt: "Sadakat, yoldaşlık, korunma ve güveni temsil edebilir.",
    themes: ["İlişkiler", "Güven"],
    updatedAt: "2026-02-03",
    quickMeaning: [
      "Sadakat veya güvence isteği.",
      "Güçlenen koruma içgüdüsü.",
      "Güvenin sınanması veya pekişmesi.",
    ],
    sections: [
      {
        title: "Yaygın Yorumlar",
        body: [
          "Destek sistemleri: kim yanınızda?",
          "Önem verdiğinizi korumak.",
          "Yoğunluk yerine istikrara güvenmeyi öğrenmek.",
        ],
      },
    ],
  },
  {
    slug: "ex",
    title: "Eski Sevgili",
    excerpt: "Yarım kalmış duyguları, anı kalıplarını veya kimlik yankılarını yansıtabilir.",
    themes: ["İlişkiler", "Anılar"],
    updatedAt: "2026-02-02",
    quickMeaning: [
      "Kapanış için yeniden beliren eski bir kalıp.",
      "Eskiden kim olduğunuza dair bir anı döngüsü.",
      "Bir dersi entegre etme; yeniden yaşama değil.",
    ],
    sections: [
      {
        title: "Yaygın Yorumlar",
        body: [
          "Her zaman kişiyle ilgili değildir; çoğu kez bir dönemle ilgilidir.",
          "O zaman karşılanmayan ihtiyaçların hatırlatması.",
          "Bugün neyi farklı yapacağınızı fark etme ipucu.",
        ],
      },
    ],
  },
];

export function getDreams(): DreamEntry[] {
  return dreams;
}

export function getDreamBySlug(slug: string): DreamEntry | undefined {
  return dreams.find((d) => d.slug === slug);
}

export function getLatestDreams(limit: number): DreamEntry[] {
  return [...dreams]
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
    .slice(0, limit);
}

export function getTrendingDreams(limit: number): DreamEntry[] {
  const curated = [
    "teeth-falling-out",
    "being-chased",
    "flying",
    "falling",
    "snake",
    "water",
    "exam",
    "house",
    "death",
  ];

  const picked = curated
    .map((slug) => getDreamBySlug(slug))
    .filter((d): d is DreamEntry => Boolean(d));

  return picked.slice(0, limit);
}

export function getDreamThemes(): string[] {
  const set = new Set<string>();
  for (const dream of dreams) for (const t of dream.themes) set.add(t);
  return [...set].sort((a, b) => a.localeCompare(b));
}

function indexLetter(value: string): string {
  const ch = value.trim().slice(0, 1).toLowerCase();
  if (!ch) return "";
  const map: Record<string, string> = {
    ç: "c",
    ğ: "g",
    ı: "i",
    i̇: "i",
    ö: "o",
    ş: "s",
    ü: "u",
  };
  return map[ch] ?? ch;
}

export function getDreamsByLetter(letter: string): DreamEntry[] {
  const l = letter.trim().slice(0, 1).toLowerCase();
  return dreams
    .filter((d) => indexLetter(d.title) === l)
    .sort((a, b) => a.title.localeCompare(b.title));
}
