"use client";

import { useState, useEffect, useRef, useCallback, ReactNode } from "react";
import {
  Shield,
  Heart,
  Star,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Instagram,
  Facebook,
  X,
  Loader2,
  Mail,
} from "lucide-react";
import Image from "next/image";

// ── Skeleton primitives ──────────────────────────────────────────────
function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-[#ECE5D6]/60 rounded-xl ${className}`}
    />
  );
}

// ── Lazy section wrapper (IntersectionObserver) ──────────────────────
function LazySection({
  children,
  skeleton,
  className = "",
  rootMargin = "200px",
}: {
  children: ReactNode;
  skeleton: ReactNode;
  className?: string;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {visible ? (
        <div className="animate-[fadeIn_0.6s_ease-out]">{children}</div>
      ) : (
        skeleton
      )}
    </div>
  );
}

// ── Skeleton layouts for each section ────────────────────────────────
function VideoSkeleton() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <Skeleton className="h-10 w-80 mx-auto mb-4" />
        <Skeleton className="h-6 w-64 mx-auto" />
      </div>
      <Skeleton className="max-w-4xl mx-auto h-[300px] md:h-[420px] rounded-3xl" />
    </div>
  );
}

function WhyUsSkeleton() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <Skeleton className="h-10 w-72 mx-auto mb-4" />
        <Skeleton className="h-6 w-56 mx-auto" />
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[0, 1, 2].map((i) => (
          <div key={i} className="p-8 rounded-2xl border border-[#F0F0F0] text-center">
            <Skeleton className="w-20 h-20 rounded-full mx-auto mb-6" />
            <Skeleton className="h-8 w-40 mx-auto mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

function PackagesSkeleton() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <Skeleton className="h-5 w-32 mx-auto mb-2" />
        <Skeleton className="h-10 w-64 mx-auto mb-4" />
        <Skeleton className="h-6 w-96 mx-auto" />
      </div>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-3xl border border-[#EAEaea] overflow-hidden">
            <Skeleton className="h-48 rounded-none" />
            <div className="p-8">
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-6 w-24 mb-6" />
              <Skeleton className="h-4 w-full mb-3" />
              <Skeleton className="h-4 w-full mb-3" />
              <Skeleton className="h-4 w-3/4 mb-8" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>
        ))}
      </div>
      <Skeleton className="mt-12 max-w-6xl mx-auto h-72 rounded-3xl" />
    </div>
  );
}

function TestimonialsSkeleton() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <Skeleton className="h-10 w-72 mx-auto mb-4" />
        <Skeleton className="h-6 w-56 mx-auto" />
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[0, 1, 2].map((i) => (
          <div key={i} className="p-8 rounded-2xl border border-[#EAEaea]">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mb-6" />
            <div className="flex items-center gap-4">
              <Skeleton className="w-12 h-12 rounded-full" />
              <div>
                <Skeleton className="h-5 w-28 mb-1" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GallerySkeleton() {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <Skeleton className="h-10 w-56 mx-auto mb-4" />
        <Skeleton className="h-6 w-64 mx-auto" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-64 md:h-80 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

function ContactSkeleton() {
  return (
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <Skeleton className="h-10 w-52" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-12 w-64 rounded-full" />
        </div>
        <Skeleton className="h-[400px] rounded-3xl" />
      </div>
    </div>
  );
}

// ── Map component with loading indicator ─────────────────────────────
function MapEmbed() {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="h-[400px] rounded-3xl overflow-hidden shadow-lg border-4 border-white relative bg-[#ECE5D6]/30"
    >
      {/* Loading indicator */}
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
          <Loader2 className="w-8 h-8 text-[#A5A364] animate-spin" />
          <span className="text-sm text-gray-500">جاري تحميل الخريطة...</span>
        </div>
      )}
      {inView && (
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3576.8!2d50.1211005!3d26.4400171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDI2JzI0LjEiTiA1MMKwMDcnMTYuMCJF!5e0!3m2!1sen!2ssa!4v1234567890"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setLoaded(true)}
          className={`transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────────────
export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const testimonials = [
    {
      text: "المكان خيال! راحة نفسية من أول ما تدخلين. الحمام المغربي عندهم تجربة ثانية، والموظفات قمة في الذوق والاحترافية. أخيراً لقيت مكاني المفضل.",
      name: "سارة العتيبي",
      initial: "س",
      service: "حمام مغربي ملكي",
    },
    {
      text: "شغل الأظافر دقيق ونظيف جداً، والأحلى هو الهدوء والخصوصية. حسيت إني أميرة وأنا عندهم. شكراً سول ميت على هالتجربة الراقية.",
      name: "نورة الدوسري",
      initial: "ن",
      service: "بديكير ومانيكير",
    },
    {
      text: "جربت عندهم المساج وكان من أفضل ما يكون. المكان يفتح النفس والتعامل راقي جداً. أنصح كل وحدة تبي تدلل نفسها تروح لهم.",
      name: "ريم محمد",
      initial: "ر",
      service: "مساج استرخائي",
    },
  ];

  const galleryImages = [
    "/images/IMG_6540.jpg",
    "/images/IMG_6557.jpg",
    "/images/IMG_6642.jpg",
    "/images/IMG_6822.jpg",
  ];

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#4A4A4A] overflow-x-hidden">
      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-4">
        <a
          href="https://wa.me/966506866088"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center group relative"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          <span className="absolute left-full ml-3 bg-white text-gray-800 px-3 py-1 rounded-lg shadow-md text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            احجزي الآن
          </span>
        </a>
        <a
          href="tel:966506866088"
          className="bg-[#A5A364] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center group relative"
        >
          <Phone size={28} />
          <span className="absolute left-full ml-3 bg-white text-gray-800 px-3 py-1 rounded-lg shadow-md text-sm font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            اتصلي بنا
          </span>
        </a>
      </div>

      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full bg-[#FDFBF7]/90 backdrop-blur-md z-50 border-b border-[#EAEaea] md:py-2 transition-all duration-300 ${scrolled ? "shadow-md" : ""
          }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Image src="/images/soulmate-logo.png" alt="SOUL MATE" width={240} height={70} className="h-20 w-auto object-contain" priority />
          <div className="flex gap-4 items-center">
            <a
              href="https://www.instagram.com/soulmate.ksa?igsh=MTZlcWc1dTMwbW5raA=="
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5C5B3E] hover:text-[#A5A364] transition-colors"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61582868433794"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5C5B3E] hover:text-[#A5A364] transition-colors"
            >
              <Facebook className="w-6 h-6" />
            </a>
            <a
              href="https://wa.me/966506866088"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#5C5B3E] text-[#5C5B3E] hover:bg-[#5C5B3E] hover:text-white transition-colors rounded-full px-6 py-2 text-sm font-medium"
            >
              احجزي الآن
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section - loaded eagerly (above the fold) */}
      <section className="relative min-h-screen flex items-center pt-25 md:pt-20 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 0 C 50 100 80 100 100 0 Z" fill="#A5A364" />
          </svg>
        </div>
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="text-right space-y-6">
            <span className="text-[#A5A364] font-medium tracking-wider text-lg">
              ملاذكِ الآمن للراحة والجمال
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-[#2C2C2C] leading-tight">
              هنا... <br />
              <span className="text-[#A5A364]">تهدأ روحكِ</span> <br />
              ويزدهر جمالكِ
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              في SOUL MATE، نقدم لكِ أكثر من مجرد خدمة. نمنحكِ تجربة استرخاء
              عميقة في مساحة مصممة خصيصاً لراحتكِ النفسية وخصوصيتكِ المطلقة.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="https://wa.me/966506866088" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#A5A364] hover:bg-[#8F8D55] text-white text-lg px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 font-medium">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /></svg>
                احجزي تجربتك الخاصة
              </a>
              <a href="tel:966506866088" className="inline-flex items-center gap-2 border border-[#A5A364] text-[#A5A364] hover:bg-[#A5A364] hover:text-white text-lg px-8 py-3.5 rounded-full transition-colors font-medium">
                <Phone size={20} />
                اتصلي بنا
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
              <Image src="/images/IMG_6540.jpg" alt="Soul Mate Salon Interior" width={600} height={700} className="w-full h-[600px] object-cover scale-120 hover:scale-[1.3c] transition-transform duration-700" priority />
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#ECE5D6] rounded-full z-0 opacity-50 blur-2xl" />
            <div className="absolute -top-10 -left-10 w-60 h-60 bg-[#A5A364] rounded-full z-0 opacity-20 blur-3xl" />
          </div>
        </div>
      </section>

      {/* Video Tour Section - lazy */}
      <LazySection className="py-24 bg-white relative overflow-hidden" skeleton={<div className="py-24 bg-white"><VideoSkeleton /></div>}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#2C2C2C] mb-4">جولة في عالم SOUL MATE</h2>
            <p className="text-gray-500 text-lg">اكتشفي أجواء الراحة والفخامة التي تنتظرك</p>
          </div>
          <div className="relative max-w-xl mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-[#A5A364]/20 aspect-[9/16] md:aspect-[9/6] max-h-[70vh]">
            <video className="w-full h-full object-contain" controls playsInline preload="metadata" poster="/images/IMG_6540.jpg">
              <source src="/images/soulmateedit.mp4" type="video/mp4" />
              متصفحك لا يدعم تشغيل الفيديو.
            </video>
          </div>
        </div>
      </LazySection>

      {/* Why SOUL MATE - lazy */}
      <LazySection className="py-24 bg-[#FDFBF7] relative" skeleton={<div className="py-24 bg-[#FDFBF7]"><WhyUsSkeleton /></div>}>
        <section id="why-us">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#2C2C2C] mb-4">لماذا SOUL MATE؟</h2>
              <p className="text-gray-500 text-lg">تجربة مختلفة صممت خصيصاً لكِ</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Shield, title: "خصوصية مطلقة", desc: "نضمن لكِ تجربة مريحة في مساحاتنا الخاصة التي تحترم حاجتكِ للهدوء والخصوصية." },
                { icon: Heart, title: "فريق يتفهمك", desc: "فريقنا لا يمتلك الخبرة الفنية فقط، بل يمتلك قلباً يستمع ويفهم احتياجاتكِ الشخصية." },
                { icon: Star, title: "أجواء فاخرة", desc: "ديكور أنيق، موسيقى هادئة، وإضاءة مريحة لتمنحكِ شعوراً بالسكينة والاسترخاء." },
              ].map((item, i) => (
                <div key={i} className="bg-[#FDFBF7] p-8 rounded-2xl hover:shadow-lg transition-shadow border border-[#F0F0F0] text-center group">
                  <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-10 h-10 text-[#A5A364]" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#2C2C2C] mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </LazySection>

      {/* Packages - lazy */}
      <LazySection className="py-24 bg-[#FDFBF7]" skeleton={<div className="py-24 bg-[#FDFBF7]"><PackagesSkeleton /></div>}>
        <section id="packages">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-[#A5A364] font-medium tracking-wider uppercase">عروض الافتتاح</span>
              <h2 className="text-4xl font-bold text-[#2C2C2C] mt-2 mb-4">باقات صممت لتدليلك</h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">بمناسبة افتتاحنا، ندعوكِ لتجربة خدماتنا المميزة. اختاري الباقة التي تلامس روحكِ.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                { title: "باقة الاسترخاء الملكي", price: "222 ريال", items: ["حمام مغربي ملكي", "جلسة مساج للاسترخاء", "سيشوار للشعر"], img: "/images/image.png", wa: "https://wa.me/966506866088?text=مرحباً، أرغب بحجز باقة الاسترخاء الملكي (222 ريال)", popular: false, imgClass: "w-full h-full object-cover scale-110 hover:scale-125 transition-transform duration-700" },
                { title: "باقة الجمال المتكامل", price: "222 ريال", items: ["باديكير ومانيكير", "لون أظافر مميز", "تصفيف شعر (ويفي أو سيشوار)"], img: "/images/IMG_6541.jpg", wa: "https://wa.me/966506866088?text=مرحباً، أرغب بحجز باقة الجمال المتكامل (222 ريال)", popular: true, imgClass: "w-full h-full object-cover -rotate-90 scale-150 hover:scale-[1.6] transition-transform duration-700" },
                { title: "باقة التألق للمناسبات", price: "333 ريال", items: ["ميك آب ناعم", "تسريحة شعر ناعمة", "باديكير"], img: "/images/IMG_6557.jpg", wa: "https://wa.me/966506866088?text=مرحباً، أرغب بحجز باقة التألق للمناسبات (333 ريال)", popular: false, imgClass: "w-full h-full object-cover -rotate-90 scale-150 hover:scale-[1.6] transition-transform duration-700" },
              ].map((pkg, i) => (
                <div key={i} className={`bg-white rounded-3xl overflow-hidden shadow-xl flex flex-col ${pkg.popular ? "border-2 border-[#A5A364] transform md:-translate-y-4 relative" : "border border-[#EAEaea]"}`}>
                  {pkg.popular && <div className="absolute top-4 left-4 bg-[#A5A364] text-white text-xs font-bold px-3 py-1 rounded-full z-10">الأكثر طلباً</div>}
                  <div className="h-72 overflow-hidden">
                    <Image src={pkg.img} alt={pkg.title} width={400} height={300} className={pkg.imgClass} />
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold text-[#2C2C2C] mb-2">{pkg.title}</h3>
                    <div className="text-[#A5A364] font-bold text-xl mb-6">{pkg.price}</div>
                    <ul className="space-y-4 mb-8 flex-1">
                      {pkg.items.map((item, j) => (
                        <li key={j} className="flex items-center text-gray-600">
                          <span className="w-2 h-2 bg-[#A5A364] rounded-full ml-3 shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <a href={pkg.wa} target="_blank" rel="noopener noreferrer" className={`w-full py-3.5 rounded-xl font-medium transition-colors text-sm inline-flex items-center justify-center ${pkg.popular ? "bg-[#A5A364] hover:bg-[#8F8D55] text-white shadow-lg" : "bg-[#2C2C2C] hover:bg-[#4A4A4A] text-white"}`}>
                      اطلبي العرض الآن
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Bridal Package */}
            <div className="mt-12 max-w-6xl mx-auto">
              <div className="bg-[#2C2C2C] text-white rounded-3xl overflow-hidden shadow-2xl border border-[#A5A364] relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#A5A364] opacity-10 rounded-bl-full" />
                <div className="grid md:grid-cols-2 h-full">
                  <div className="h-64 md:h-full overflow-hidden">
                    <Image src="/images/IMG_6822.jpg" alt="Bridal" width={600} height={400} className="w-full h-full object-cover -rotate-90 hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-5 h-5 text-[#A5A364] fill-current" />
                      <span className="text-[#A5A364] font-bold tracking-wider uppercase text-sm">باقة خاصة</span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">رحلة البدايات المترفة</h3>
                    <p className="text-gray-300 text-lg leading-relaxed mb-8">لأنكِ تستحقين تدليلاً استثنائياً في أهم أيام حياتك.. صممنا لكِ تجربة متكاملة تعتني بأدق تفاصيل جمالك وراحتك النفسية. من قمة رأسك حتى أخمص قدميك، دعينا نجهزك لتطلي كالملكة.</p>
                    <a href="https://wa.me/966506866088?text=مرحباً، أنا عروس وأرغب بالاستفسار عن باقة رحلة البدايات المترفة" target="_blank" rel="noopener noreferrer" className="bg-[#A5A364] hover:bg-[#8F8D55] text-white text-lg px-10 py-3.5 rounded-full shadow-lg font-medium transition-colors w-full md:w-auto text-center">
                      احجزي استشارتك الخاصة
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </LazySection>

      {/* Testimonials - lazy */}
      <LazySection className="py-24 bg-[#FDFBF7] relative overflow-hidden" skeleton={<div className="py-24 bg-[#FDFBF7]"><TestimonialsSkeleton /></div>}>
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="#A5A364" />
          </svg>
        </div>
        <section id="testimonials">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#2C2C2C] mb-4">قصص سعادة من عميلاتنا</h2>
              <p className="text-gray-500 text-lg">كلمات نعتز بها من قلوب محبة</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-lg border border-[#EAEaea] relative">
                  <div className="text-[#A5A364] text-6xl font-serif absolute top-4 right-6 opacity-20">&ldquo;</div>
                  <p className="text-gray-600 leading-relaxed mb-6 relative z-10">{t.text}</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#FDFBF7] rounded-full flex items-center justify-center text-[#A5A364] font-bold text-xl border border-[#A5A364]">{t.initial}</div>
                    <div>
                      <h4 className="font-bold text-[#2C2C2C]">{t.name}</h4>
                      <span className="text-xs text-[#A5A364] font-medium bg-[#A5A364]/10 px-2 py-1 rounded-full">{t.service}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </LazySection>

      {/* Gallery - lazy */}
      <LazySection className="py-24 bg-white overflow-hidden" skeleton={<div className="py-24 bg-white"><GallerySkeleton /></div>}>
        <section id="gallery">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#2C2C2C] mb-4">لمسة من إبداعنا</h2>
              <p className="text-gray-500 text-lg">دقة في التفاصيل.. وفن في التنفيذ</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryImages.map((img, i) => (
                <div key={i} className="rounded-2xl overflow-hidden h-64 md:h-80 cursor-pointer group" onClick={() => setLightboxImage(img)}>
                  <Image src={img} alt={`Gallery ${i}`} width={400} height={500} className="w-full h-full object-cover -rotate-90 group-hover:scale-110 transition-transform duration-700" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </LazySection>

      {/* Contact - lazy */}
      <LazySection className="py-24 bg-[#FDFBF7]" skeleton={<div className="py-24 bg-[#FDFBF7]"><ContactSkeleton /></div>}>
        <section id="contact">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl font-bold text-[#2C2C2C]">تفضلي بزيارتنا</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-[#A5A364] mt-1 shrink-0" />
                    <div>
                      <h4 className="font-bold text-lg mb-1">العنوان</h4>
                      <p className="text-gray-600">الدمام، حي المزروعية، شارع 4701</p>
                      <p className="text-gray-500 text-sm mt-1">EMAA6781, 6781 8د, Dammam 32414</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-[#A5A364] mt-1 shrink-0" />
                    <div>
                      <h4 className="font-bold text-lg mb-1">أوقات العمل</h4>
                      <p className="text-gray-600">يومياً من 2:00 ظهراً حتى 10:00 مساءً</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-[#A5A364] mt-1 shrink-0" />
                    <div>
                      <h4 className="font-bold text-lg mb-1">للتواصل</h4>
                      <p className="text-gray-600" dir="ltr">0506866088</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-[#A5A364] mt-1 shrink-0" />
                    <div>
                      <h4 className="font-bold text-lg mb-1">البريد الإلكتروني</h4>
                      <a href="mailto:info@soulmatebeautysalon.com" className="text-gray-600 hover:text-[#A5A364] transition-colors">info@soulmatebeautysalon.com</a>
                    </div>
                  </div>
                </div>
                <a href="https://maps.app.goo.gl/example" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-[#2C2C2C] text-[#2C2C2C] hover:bg-[#2C2C2C] hover:text-white rounded-full px-8 py-3 font-medium transition-colors text-sm">
                  <MapPin size={18} />
                  افتحي الموقع في Google Maps
                </a>
              </div>
              <MapEmbed />
            </div>
          </div>
        </section>
      </LazySection>

      {/* Footer */}
      <footer className="bg-[#2C2C2C] text-white py-12 border-t border-[#3D3D3D]">
        <div className="container mx-auto px-4 text-center">
          <Image src="/images/soulmate-logo.png" alt="SOUL MATE" width={280} height={80} className="h-24 w-auto object-contain mx-auto mb-6 brightness-0 invert" />
          <p className="text-gray-400 mb-8 max-w-md mx-auto">وجهتكِ الأولى للراحة والجمال في الدمام. دعينا نعتني بكِ كما تستحقين.</p>
          <div className="flex justify-center gap-4 mb-8">
            <a href="https://www.instagram.com/soulmate.ksa?igsh=MTZlcWc1dTMwbW5raA==" target="_blank" rel="noopener noreferrer" className="bg-[#A5A364] p-3 rounded-full text-white hover:bg-[#8F8D55] transition-colors"><Instagram className="w-6 h-6" /></a>
            <a href="https://wa.me/966506866088" target="_blank" rel="noopener noreferrer" className="bg-[#A5A364] p-3 rounded-full text-white hover:bg-[#8F8D55] transition-colors"><MessageCircle className="w-6 h-6" /></a>
            <a href="tel:966506866088" className="bg-[#A5A364] p-3 rounded-full text-white hover:bg-[#8F8D55] transition-colors"><Phone className="w-6 h-6" /></a>
          </div>
          <div className="text-gray-500 text-sm">© 2026 SOUL MATE Beauty Salon. جميع الحقوق محفوظة.</div>
        </div>
      </footer>

      {/* Lightbox */}
      {lightboxImage && (
        <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4" onClick={() => setLightboxImage(null)}>
          <button className="absolute top-6 right-6 text-white hover:text-[#A5A364] transition-colors" onClick={() => setLightboxImage(null)}><X size={32} /></button>
          <Image src={lightboxImage} alt="عرض الصورة" width={1200} height={800} className="max-w-full max-h-[90vh] object-contain rounded-2xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
}
