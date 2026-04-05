import type { QuizDef, QuizResult } from "@/components/MiniQuiz";

export const bigFiveQuiz: QuizDef = {
  id: "big-five",
  title: "Big Five (mini)",
  questions: [
    {
      text: "Yeni insanlarla tanışmak sizi nasıl hissettirir?",
      options: [
        { label: "Enerji veriyor, çok severim", scores: { E: 2 } },
        { label: "Ortama göre değişir", scores: { E: 1 } },
        { label: "Biraz yorucu buluyorum", scores: { E: 0 } },
      ],
    },
    {
      text: "Planlarınız aniden değiştiğinde tepkiniz ne olur?",
      options: [
        { label: "Heyecanlanırım, yeni fırsatlar!", scores: { O: 2 } },
        { label: "Uyum sağlarım ama biraz zorlanırım", scores: { O: 1 } },
        { label: "Rahatsız olurum, plan önemlidir", scores: { C: 2 } },
      ],
    },
    {
      text: "Bir arkadaşınız üzgün olduğunda…",
      options: [
        { label: "Hemen empati kurar, hissederim", scores: { A: 2 } },
        { label: "Dinlerim ama mesafe korurum", scores: { A: 1 } },
        { label: "Pratik çözüm önermeyi tercih ederim", scores: { A: 0 } },
      ],
    },
    {
      text: "İş veya ödev teslim tarihi yaklaşıyorsa…",
      options: [
        { label: "Zaten çoktan bitirmişimdir", scores: { C: 2 } },
        { label: "Son birkaç gün yoğunlaşırım", scores: { C: 1 } },
        { label: "Genelde son dakikaya kalırım", scores: { C: 0 } },
      ],
    },
    {
      text: "Stresli bir dönemde kendinizi nasıl hissedersiniz?",
      options: [
        { label: "Endişe ve gerginlik baskın", scores: { N: 2 } },
        { label: "Bazen bunalırım ama toparlarım", scores: { N: 1 } },
        { label: "Genelde sakin kalırım", scores: { N: 0 } },
      ],
    },
  ],
  results(scores) {
    const dims: { key: string; label: string; high: string; low: string }[] = [
      { key: "E", label: "Dışadönüklük", high: "Sosyal ve enerjik", low: "Sakin ve kendi halinde" },
      { key: "O", label: "Deneyime açıklık", high: "Meraklı ve yaratıcı", low: "Geleneksel ve pratik" },
      { key: "A", label: "Uyumluluk", high: "Empatik ve iş birlikçi", low: "Analitik ve bağımsız" },
      { key: "C", label: "Sorumluluk", high: "Düzenli ve kararlı", low: "Esnek ve spontan" },
      { key: "N", label: "Duygusal hassasiyet", high: "Derin hisseden", low: "Duygusal dayanıklı" },
    ];
    const top = dims.reduce((a, b) => ((scores[a.key] ?? 0) >= (scores[b.key] ?? 0) ? a : b));
    const isHigh = (scores[top.key] ?? 0) >= 2;
    return {
      key: top.key,
      label: `Öne çıkan boyut: ${top.label}`,
      description: isHigh
        ? `${top.high}. Bu eğilim günlük kararlarınızda ve ilişkilerinizde belirleyici bir rol oynar. Güçlü yönlerinizi tanımak, farkındalığınızı artırır.`
        : `${top.low}. Bu eğilim günlük kararlarınızda etkili. Her iki ucun da avantajları var; kendinizi tanımak en önemli adım.`,
    };
  },
};

export const enneagramQuiz: QuizDef = {
  id: "enneagram",
  title: "Enneagram (mini)",
  questions: [
    {
      text: "Sizi en çok motive eden nedir?",
      options: [
        { label: "Doğru olanı yapmak", scores: { T1: 2 } },
        { label: "Sevilen ve değer verilen biri olmak", scores: { T2: 2 } },
        { label: "Başarılı ve takdir edilen biri olmak", scores: { T3: 2 } },
      ],
    },
    {
      text: "Zor bir günde kendinizi nasıl ifade edersiniz?",
      options: [
        { label: "İçime kapanır, hissederim", scores: { T4: 2 } },
        { label: "Araştırır, anlamaya çalışırım", scores: { T5: 2 } },
        { label: "Endişelenir, en kötü senaryoyu düşünürüm", scores: { T6: 2 } },
      ],
    },
    {
      text: "Boş bir gününüzde ne yaparsınız?",
      options: [
        { label: "Yeni bir deneyim ararım", scores: { T7: 2 } },
        { label: "Kontrolü elimde tutarım, plan yaparım", scores: { T8: 2 } },
        { label: "Akışa bırakırım, huzur ararım", scores: { T9: 2 } },
      ],
    },
  ],
  results(scores) {
    const types: Record<string, { label: string; desc: string }> = {
      T1: { label: "Tip 1 – Reformcu", desc: "İdealci ve prensipli. Doğruyu yapmak sizi motive eder; düzen ve adalet önemlidir." },
      T2: { label: "Tip 2 – Yardımsever", desc: "Şefkatli ve cömert. İlişkilerde bağ kurmak ve değer görmek sizi besler." },
      T3: { label: "Tip 3 – Başarıcı", desc: "Enerjik ve hedef odaklı. Takdir ve başarı sizin için güçlü bir motor." },
      T4: { label: "Tip 4 – Bireyci", desc: "Duygusal derinlik ve özgünlük arayışındasınız; iç dünya zenginliğiniz öne çıkar." },
      T5: { label: "Tip 5 – Araştırmacı", desc: "Meraklı ve analitik. Bilgi toplamak ve anlamak temel ihtiyacınız." },
      T6: { label: "Tip 6 – Sadık", desc: "Güvenilir ve temkinli. Güven inşa etmek ve hazırlıklı olmak önceliğiniz." },
      T7: { label: "Tip 7 – Maceracı", desc: "İyimser ve çok yönlü. Yeni deneyimler ve olasılıklar sizi heyecanlandırır." },
      T8: { label: "Tip 8 – Lider", desc: "Güçlü iradeli ve koruyucu. Kontrol ve adalet duygusunuz belirleyici." },
      T9: { label: "Tip 9 – Barışçıl", desc: "Uyumlu ve sabırlı. İç huzur ve uyum en büyük önceliğiniz." },
    };
    let topKey = "T9";
    let topVal = 0;
    for (const [k, v] of Object.entries(scores)) {
      if (v > topVal) { topKey = k; topVal = v; }
    }
    const t = types[topKey] ?? types.T9!;
    return { key: topKey, label: t.label, description: t.desc };
  },
};

export const loveLanguageQuiz: QuizDef = {
  id: "ask-dili",
  title: "Aşk Dili (mini)",
  questions: [
    {
      text: "Sevdiğiniz biri size nasıl ilgi göstersin istersiniz?",
      options: [
        { label: "Güzel sözler söylesin", scores: { words: 2 } },
        { label: "Birlikte vakit geçirsin", scores: { time: 2 } },
        { label: "Hediye veya sürpriz yapsın", scores: { gifts: 2 } },
      ],
    },
    {
      text: "Kötü bir gün geçirdiğinizde en çok ne iyi gelir?",
      options: [
        { label: "Sarılmak, fiziksel yakınlık", scores: { touch: 2 } },
        { label: "Birinin işlerimi hafifletmesi", scores: { acts: 2 } },
        { label: "Bana özel bir mesaj yazması", scores: { words: 2 } },
      ],
    },
    {
      text: "Hangi jest sizi en çok mutlu eder?",
      options: [
        { label: "Dikkatli seçilmiş küçük bir hediye", scores: { gifts: 2 } },
        { label: "El ele tutuşmak, dokunuş", scores: { touch: 2 } },
        { label: "Planlarını benim için ayarlaması", scores: { time: 2 } },
      ],
    },
  ],
  results(scores) {
    const langs: Record<string, { label: string; desc: string }> = {
      words: { label: "Onaylayıcı sözler", desc: "İltifat, teşekkür ve sevgi dolu sözler sizi en çok besler. Sözlü ifade sizin için çok değerli." },
      time: { label: "Birlikte zaman", desc: "Kaliteli, kesintisiz birliktelik sizin için en güçlü bağ kurma yolu." },
      gifts: { label: "Hediye alma", desc: "Düşünceli hediyeler ve sürprizler, sevildiğinizi hissetmenizin anahtarı." },
      touch: { label: "Fiziksel dokunuş", desc: "Sarılmak, el tutmak, fiziksel yakınlık sizi güvende ve sevilen hissettirir." },
      acts: { label: "Hizmet etme", desc: "Sizin için bir şey yapılması, yükünüzün hafifletilmesi en büyük sevgi ifadesi." },
    };
    let topKey = "words";
    let topVal = 0;
    for (const [k, v] of Object.entries(scores)) {
      if (v > topVal) { topKey = k; topVal = v; }
    }
    const l = langs[topKey] ?? langs.words!;
    return { key: topKey, label: `Aşk diliniz: ${l.label}`, description: l.desc };
  },
};

export const ALL_QUIZZES = [bigFiveQuiz, enneagramQuiz, loveLanguageQuiz];
