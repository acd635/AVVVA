import React from 'react';
import { Award, ShieldCheck, Scale, Package, Sparkles } from 'lucide-react';
import { Language } from '../types';

interface CertificatesSectionProps {
  lang: Language;
}

export const CertificatesSection: React.FC<CertificatesSectionProps> = ({ lang }) => {
  const guarantees = [
    {
      icon: Scale,
      titleKA: 'ზუსტი წონა & ძვირფასი ქვები',
      titleEN: 'Authentic Weight & Gemstones',
      titleRU: 'Точный вес и подлинные камни',
      descKA: 'ყველა სამკაულს ახლავს ოფიციალური ხარისხის სერტიფიკატი და გრამული წონის დოკუმენტაცია.',
      descEN: 'Every piece is accompanied by an official quality certificate and exact scale weight documentation.',
      descRU: 'Каждое изделие сопровождается официальным сертификатом качества и точным весом.',
    },
    {
      icon: Award,
      titleKA: 'სერტიფიცირებული ბრილიანტები',
      titleEN: 'GIA & IGI Certified Diamonds',
      titleRU: 'Сертифицированные камни',
      descKA: '100% ნატურალური, VVS1 სუფთა ბრილიანტები და ძვირფასი ქვები გლობალური სერტიფიკატით.',
      descEN: '100% natural, ethically sourced VVS1 diamonds and gemstones certified by GIA & IGI laboratories.',
      descRU: '100% натуральные драгоценные камни высшей чистоты с международной сертификацией.',
    },
    {
      icon: Sparkles,
      titleKA: 'ექსკლუზიური ხელნაკეთობა',
      titleEN: 'Bespoke Handcrafted Design',
      titleRU: 'Эксклюзивная ручная работа',
      descKA: 'თითოეული მოდელი მზადდება ხელით თბილისის ატელიეში ოსტატი იუველირების მიერ.',
      descEN: 'Individually hand-carved and enameled by master artisans in our Tbilisi atelier.',
      descRU: 'Каждое изделие создается вручную мастерами-ювелирами в Тбилисском ателье.',
    },
    {
      icon: Package,
      titleKA: 'სამეფო შეფუთვა',
      titleEN: 'Royal Velvet Gift Packaging',
      titleRU: 'Фирменная бархатная упаковка',
      descKA: 'მოყვება AVA-ს მუქი ლურჯი ხავერდის ყუთი, აბრეშუმის ბაფთა და ემბოსირებული სასაჩუქრე ჩანთა.',
      descEN: 'Delivered in signature dark blue AVA velvet box with silk ribbon & embossed gift bag.',
      descRU: 'Фирменная темно-синяя бархатная шкатулка AVA с шелковой лентой и подарочным пакетом.',
    },
  ];

  return (
    <section id="certificates" className="scroll-mt-24 py-16 px-4 sm:px-6 lg:px-8 bg-[#FAF9F5] text-slate-900 border-b border-slate-200">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Title */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-montserrat font-light tracking-[0.08em] text-slate-900">
            {lang === 'KA' ? 'უნაკლო ხარისხი & ავთენტურობა' : lang === 'RU' ? 'Безупречное качество и подлинность' : 'Uncompromising Purity & Authenticity'}
          </h2>
        </div>

        {/* 4 Feature Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-sky-400 transition-all group space-y-3 shadow-sm hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 group-hover:scale-110 transition-transform shadow-sm">
                  <IconComponent className="w-6 h-6" />
                </div>

                <h3 className="text-base font-montserrat font-normal text-slate-900">
                  {lang === 'KA' ? item.titleKA : lang === 'RU' ? item.titleRU : item.titleEN}
                </h3>

                <p className="text-xs text-slate-600 font-inter font-normal leading-relaxed">
                  {lang === 'KA' ? item.descKA : lang === 'RU' ? item.descRU : item.descEN}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
