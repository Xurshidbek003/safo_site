'use client';

import {useLocale} from 'next-intl';
import {usePathname, useRouter} from '../../i18n/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (nextLocale: 'uz' | 'ru') => {
    router.replace(pathname, {locale: nextLocale});
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur-md">
      <button
        type="button"
        onClick={() => handleChange('uz')}
        className={`rounded-full px-3 py-1.5 text-xs font-medium transition sm:text-sm ${
          locale === 'uz'
            ? 'bg-cyan-500 text-white'
            : 'text-white/70 hover:text-white'
        }`}
      >
        UZ
      </button>

      <button
        type="button"
        onClick={() => handleChange('ru')}
        className={`rounded-full px-3 py-1.5 text-xs font-medium transition sm:text-sm ${
          locale === 'ru'
            ? 'bg-cyan-500 text-white'
            : 'text-white/70 hover:text-white'
        }`}
      >
        RU
      </button>
    </div>
  );
}