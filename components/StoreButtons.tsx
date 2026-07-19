import { PLAY_STORE_URL, APP_STORE_URL } from "@/lib/site";

/* Google Play + App Store badges. Dark pills with a border so they read on both
   the light and dark canvas. Replaces the dead href="#" links the inner pages
   used to carry. */
export default function StoreButtons({ className = "" }: { className?: string }) {
  const pill =
    "flex items-center gap-3 bg-[#14161C] text-white px-6 py-3.5 rounded-xl font-semibold text-sm hover:bg-[#23262E] transition-colors border border-white/15 min-w-[180px] justify-center";
  return (
    <div className={`flex flex-col sm:flex-row gap-3.5 ${className}`}>
      <a href={PLAY_STORE_URL} className={pill}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M3 20.5V3.5c0-.59.34-1.11.84-1.35L13.69 12 3.84 21.85c-.5-.24-.84-.76-.84-1.35zm13.81-5.38L6.05 21.34l8.49-8.49 2.27 2.27zm3.35-4.31c.34.27.59.69.59 1.19s-.25.92-.59 1.19l-2.27 1.31L15.39 12l2.5-2.5 2.27 1.31zM6.05 2.66l10.76 6.22-2.27 2.27L6.05 2.66z" /></svg>
        <span className="text-left leading-tight"><span className="block text-[10px] font-normal opacity-75">GET IT ON</span>Google Play</span>
      </a>
      <a href={APP_STORE_URL} className={pill}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
        <span className="text-left leading-tight"><span className="block text-[10px] font-normal opacity-75">Download on the</span>App Store</span>
      </a>
    </div>
  );
}
