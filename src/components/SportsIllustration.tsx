import React from 'react';

interface Props {
  name: string;
  className?: string;
}

export const SportsIllustration: React.FC<Props> = ({ name, className = 'w-16 h-16' }) => {
  switch (name) {
    case 'skateboard':
    case 'skateboarding':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Deck */}
          <rect x="18" y="52" width="84" height="16" rx="8" fill="#F59E0B" stroke="#B45309" strokeWidth="3" />
          <path d="M18 56 Q10 54 12 50 Q16 48 24 53" fill="#D97706" />
          <path d="M102 56 Q110 54 108 50 Q104 48 96 53" fill="#D97706" />
          <line x1="28" y1="60" x2="92" y2="60" stroke="#FDE68A" strokeWidth="3" strokeDasharray="6 4" strokeLinecap="round" />
          {/* Trucks */}
          <rect x="30" y="68" width="12" height="6" rx="2" fill="#4B5563" />
          <rect x="78" y="68" width="12" height="6" rx="2" fill="#4B5563" />
          {/* Wheels */}
          <circle cx="28" cy="78" r="8" fill="#EF4444" stroke="#991B1B" strokeWidth="2" />
          <circle cx="28" cy="78" r="3" fill="#FEE2E2" />
          <circle cx="44" cy="78" r="8" fill="#EF4444" stroke="#991B1B" strokeWidth="2" />
          <circle cx="44" cy="78" r="3" fill="#FEE2E2" />
          <circle cx="76" cy="78" r="8" fill="#3B82F6" stroke="#1E40AF" strokeWidth="2" />
          <circle cx="76" cy="78" r="3" fill="#DBEAFE" />
          <circle cx="92" cy="78" r="8" fill="#3B82F6" stroke="#1E40AF" strokeWidth="2" />
          <circle cx="92" cy="78" r="3" fill="#DBEAFE" />
          {/* Sparkles / motion */}
          <path d="M14 74 L6 76 M18 84 L10 88" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'baseball':
    case 'hitting':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Wooden Bat */}
          <g transform="rotate(-38 60 60)">
            <rect x="52" y="10" width="16" height="70" rx="8" fill="#D97706" stroke="#78350F" strokeWidth="3" />
            <rect x="55" y="80" width="10" height="28" rx="4" fill="#92400E" stroke="#78350F" strokeWidth="2" />
            <circle cx="60" cy="110" r="7" fill="#78350F" />
            {/* Grip wrap */}
            <line x1="55" y1="86" x2="65" y2="84" stroke="#FEF3C7" strokeWidth="2" />
            <line x1="55" y1="92" x2="65" y2="90" stroke="#FEF3C7" strokeWidth="2" />
            <line x1="55" y1="98" x2="65" y2="96" stroke="#FEF3C7" strokeWidth="2" />
          </g>
          {/* Baseball */}
          <circle cx="86" cy="34" r="18" fill="#F9FAFB" stroke="#374151" strokeWidth="3" />
          {/* Red stitching curves */}
          <path d="M76 22 C82 28 82 40 76 46" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 2" />
          <path d="M96 22 C90 28 90 40 96 46" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="3 2" />
          {/* Hit impact stars */}
          <path d="M72 18 L76 10 L80 18 L88 20 L80 24 L76 32 L72 24 L64 20 Z" fill="#FBBF24" />
        </svg>
      );

    case 'table_tennis':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Table Tennis Paddle */}
          <g transform="rotate(18 60 60)">
            <ellipse cx="56" cy="46" rx="28" ry="32" fill="#EF4444" stroke="#991B1B" strokeWidth="3.5" />
            <ellipse cx="56" cy="46" rx="25" ry="29" fill="#DC2626" />
            <rect x="50" y="78" width="12" height="34" rx="4" fill="#D97706" stroke="#78350F" strokeWidth="2.5" />
            <rect x="52" y="90" width="8" height="18" fill="#FDE68A" />
          </g>
          {/* Ping Pong Ball */}
          <circle cx="88" cy="48" r="10" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="2" />
          <path d="M84 44 Q88 42 92 46" stroke="#F3F4F6" strokeWidth="2" strokeLinecap="round" />
          {/* Speed swoosh */}
          <path d="M98 48 C108 44 112 36 110 28" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="4 3" />
        </svg>
      );

    case 'tennis':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Tennis Racket */}
          <g transform="rotate(-25 60 60)">
            <ellipse cx="60" cy="40" rx="26" ry="32" fill="none" stroke="#2563EB" strokeWidth="5" />
            {/* Strings */}
            <line x1="42" y1="40" x2="78" y2="40" stroke="#93C5FD" strokeWidth="1.5" />
            <line x1="46" y1="28" x2="74" y2="28" stroke="#93C5FD" strokeWidth="1.5" />
            <line x1="46" y1="52" x2="74" y2="52" stroke="#93C5FD" strokeWidth="1.5" />
            <line x1="60" y1="12" x2="60" y2="68" stroke="#93C5FD" strokeWidth="1.5" />
            <line x1="50" y1="16" x2="50" y2="64" stroke="#93C5FD" strokeWidth="1.5" />
            <line x1="70" y1="16" x2="70" y2="64" stroke="#93C5FD" strokeWidth="1.5" />
            {/* Handle */}
            <rect x="56" y="72" width="8" height="40" rx="3" fill="#1E3A8A" stroke="#172554" strokeWidth="2" />
            <line x1="56" y1="84" x2="64" y2="82" stroke="#60A5FA" strokeWidth="2" />
            <line x1="56" y1="94" x2="64" y2="92" stroke="#60A5FA" strokeWidth="2" />
          </g>
          {/* Tennis Ball */}
          <circle cx="88" cy="80" r="14" fill="#A3E635" stroke="#4D7C0F" strokeWidth="2.5" />
          <path d="M78 74 C84 80 84 86 80 92" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <path d="M98 74 C92 80 92 86 96 92" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'volleyball':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Volleyball Ball */}
          <circle cx="50" cy="50" r="30" fill="#FEF08A" stroke="#CA8A04" strokeWidth="3" />
          {/* Blue and white panel arcs */}
          <path d="M22 42 C34 50 48 50 56 34" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
          <path d="M50 20 C54 36 68 46 80 44" fill="#FFFFFF" stroke="#9CA3AF" strokeWidth="2" />
          <path d="M42 78 C48 64 62 58 76 66" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
          <circle cx="50" cy="50" r="30" stroke="#854D0E" strokeWidth="3" fill="none" />
          {/* Net in background */}
          <rect x="80" y="20" width="34" height="70" fill="none" stroke="#94A3B8" strokeWidth="2.5" />
          <line x1="80" y1="35" x2="114" y2="35" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="80" y1="50" x2="114" y2="50" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="80" y1="65" x2="114" y2="65" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="92" y1="20" x2="92" y2="90" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 2" />
          <line x1="104" y1="20" x2="104" y2="90" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="3 2" />
        </svg>
      );

    case 'gymnastics':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Floor Mat */}
          <polygon points="15,85 105,85 115,105 5,105" fill="#38BDF8" stroke="#0284C7" strokeWidth="3" />
          <line x1="15" y1="95" x2="108" y2="95" stroke="#BAE6FD" strokeWidth="2" strokeDasharray="4 4" />
          {/* Gymnast Stylized Silhouette Figure (Handstand / Balance) */}
          <circle cx="60" cy="68" r="9" fill="#F43F5E" stroke="#BE123C" strokeWidth="2" />
          {/* Torso */}
          <line x1="60" y1="60" x2="60" y2="38" stroke="#F43F5E" strokeWidth="6" strokeLinecap="round" />
          {/* Arms holding floor */}
          <path d="M60 62 L48 85 M60 62 L72 85" stroke="#FB7185" strokeWidth="4.5" strokeLinecap="round" />
          {/* Legs split in balance */}
          <path d="M60 38 L42 20 M60 38 L80 22" stroke="#E11D48" strokeWidth="5" strokeLinecap="round" />
          {/* Sparkles */}
          <circle cx="36" cy="18" r="3" fill="#FACC15" />
          <circle cx="88" cy="22" r="3" fill="#FACC15" />
        </svg>
      );

    case 'throwing':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Throwing arm & flying ball */}
          <path d="M20 70 Q45 40 70 52" stroke="#3B82F6" strokeWidth="7" strokeLinecap="round" />
          <circle cx="20" cy="70" r="8" fill="#1D4ED8" />
          <circle cx="70" cy="52" r="6" fill="#F97316" />
          {/* Flying Ball */}
          <circle cx="94" cy="38" r="14" fill="#EF4444" stroke="#991B1B" strokeWidth="2.5" />
          {/* Speed trails */}
          <path d="M72 44 Q80 40 82 38" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
          <path d="M74 52 Q84 46 86 42" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'running':
    case 'exercising':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Running Track */}
          <ellipse cx="60" cy="95" rx="50" ry="12" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
          {/* Runner Shoe */}
          <path d="M35 70 Q55 60 75 70 L95 72 Q98 80 92 84 L38 84 Q32 80 35 70 Z" fill="#10B981" stroke="#047857" strokeWidth="3" />
          <path d="M50 68 L60 80 M62 68 L72 80" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <path d="M92 84 L102 82 Q105 84 98 86 Z" fill="#FBBF24" />
          {/* Wind swooshes */}
          <path d="M15 65 H28 M10 75 H24 M18 85 H30" stroke="#34D399" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    case 'watering':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Watering can */}
          <path d="M30 45 H65 L60 85 H35 Z" fill="#10B981" stroke="#047857" strokeWidth="3" />
          {/* Handle */}
          <path d="M30 50 C18 50 18 80 32 82" stroke="#059669" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Spout */}
          <path d="M62 60 L85 45" stroke="#047857" strokeWidth="6" strokeLinecap="round" />
          {/* Rose head */}
          <ellipse cx="88" cy="42" rx="6" ry="10" transform="rotate(-30 88 42)" fill="#34D399" stroke="#047857" strokeWidth="2" />
          {/* Water droplets */}
          <circle cx="98" cy="54" r="3" fill="#38BDF8" />
          <circle cx="106" cy="62" r="3" fill="#38BDF8" />
          <circle cx="102" cy="74" r="3.5" fill="#0284C7" />
          <circle cx="112" cy="80" r="3" fill="#38BDF8" />
          {/* Flower pot */}
          <path d="M92 90 H112 L108 108 H96 Z" fill="#D97706" stroke="#92400E" strokeWidth="2" />
          <circle cx="102" cy="86" r="6" fill="#F43F5E" />
        </svg>
      );

    case 'detective':
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Magnifying Glass */}
          <circle cx="52" cy="48" r="30" fill="#E0F2FE" stroke="#0284C7" strokeWidth="6" />
          <circle cx="52" cy="48" r="24" fill="#BAE6FD" opacity="0.4" />
          {/* Highlight glare */}
          <path d="M38 34 A20 20 0 0 1 64 30" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          {/* Handle */}
          <rect x="73" y="69" width="12" height="38" rx="4" transform="rotate(-45 73 69)" fill="#78350F" stroke="#451A03" strokeWidth="3" />
          {/* Detective Clue Footprint */}
          <ellipse cx="50" cy="48" rx="7" ry="10" fill="#0369A1" />
          <circle cx="44" cy="35" r="2" fill="#0369A1" />
          <circle cx="49" cy="33" r="2" fill="#0369A1" />
          <circle cx="54" cy="34" r="2" fill="#0369A1" />
          <circle cx="58" cy="37" r="2" fill="#0369A1" />
        </svg>
      );

    case 'table_tennis_court':
      return (
        <svg viewBox="0 0 160 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* 3D Perspective Table */}
          <polygon points="20,55 140,55 155,90 5,90" fill="#15803D" stroke="#166534" strokeWidth="3" />
          {/* White court boundary lines */}
          <polygon points="24,57 136,57 150,88 10,88" fill="none" stroke="#FFFFFF" strokeWidth="2" />
          <line x1="80" y1="57" x2="80" y2="88" stroke="#FFFFFF" strokeWidth="2" />
          {/* Net */}
          <rect x="18" y="44" width="124" height="12" fill="#E2E8F0" opacity="0.85" stroke="#94A3B8" strokeWidth="2" />
          <line x1="80" y1="44" x2="80" y2="56" stroke="#475569" strokeWidth="2" />
          {/* Table Legs */}
          <line x1="20" y1="90" x2="20" y2="115" stroke="#374151" strokeWidth="5" strokeLinecap="round" />
          <line x1="140" y1="90" x2="140" y2="115" stroke="#374151" strokeWidth="5" strokeLinecap="round" />
          <line x1="80" y1="90" x2="80" y2="115" stroke="#374151" strokeWidth="4" strokeLinecap="round" />
          {/* Red and Blue paddles */}
          <circle cx="45" cy="70" r="10" fill="#EF4444" stroke="#991B1B" strokeWidth="2" />
          <circle cx="115" cy="70" r="10" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
          {/* White Ping Pong Ball */}
          <circle cx="72" cy="48" r="5" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="1.5" />
        </svg>
      );

    case 'mrs_clark_watering':
      return (
        <svg viewBox="0 0 160 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Garden Fence & Bushes */}
          <rect x="5" y="60" width="150" height="40" rx="8" fill="#15803D" />
          <circle cx="25" cy="55" r="20" fill="#22C55E" />
          <circle cx="65" cy="50" r="24" fill="#16A34A" />
          <circle cx="105" cy="52" r="22" fill="#22C55E" />
          <circle cx="140" cy="58" r="18" fill="#15803D" />
          {/* Mrs Clark Character Silhouette */}
          <circle cx="120" cy="32" r="10" fill="#F472B6" />
          <path d="M110 52 Q120 42 130 52 L125 75 H115 Z" fill="#9333EA" />
          {/* Water Hose */}
          <path d="M125 55 Q100 48 75 58" stroke="#10B981" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Water Spray Mist over poor Tom! */}
          <path d="M72 58 L45 52 M72 58 L42 62 M72 58 L48 70" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="38" cy="55" r="3" fill="#0284C7" />
          <circle cx="32" cy="65" r="3" fill="#0284C7" />
          {/* Tom soaked with dripping water */}
          <circle cx="30" cy="70" r="8" fill="#FBBF24" />
          <path d="M22 86 Q30 78 38 86 L35 105 H25 Z" fill="#EF4444" />
          <path d="M28 62 Q30 58 32 62" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'tom_running_ball':
      return (
        <svg viewBox="0 0 160 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Path */}
          <rect x="0" y="90" width="160" height="30" fill="#FDE047" opacity="0.3" />
          {/* Tom Running Happily */}
          <circle cx="75" cy="35" r="14" fill="#FED7AA" stroke="#EA580C" strokeWidth="2" />
          {/* Hair */}
          <path d="M63 32 Q75 18 87 30 Q75 22 63 32 Z" fill="#78350F" />
          {/* Happy Face */}
          <circle cx="71" cy="34" r="2" fill="#1F2937" />
          <circle cx="79" cy="34" r="2" fill="#1F2937" />
          <path d="M72 40 Q75 44 78 40" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round" />
          {/* Red Jersey Shirt */}
          <path d="M65 50 H85 L88 78 H62 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
          {/* Outstretched Hand holding the "Mystery Egg / Ball" */}
          <path d="M85 55 L108 50" stroke="#FED7AA" strokeWidth="5" strokeLinecap="round" />
          {/* White Oval Egg-like Object! */}
          <ellipse cx="114" cy="48" rx="8" ry="11" transform="rotate(15 114 48)" fill="#FFFFFF" stroke="#D1D5DB" strokeWidth="2.5" />
          {/* Running Legs */}
          <path d="M68 78 L58 102 M78 78 L92 98" stroke="#1D4ED8" strokeWidth="5" strokeLinecap="round" />
          {/* Sneakers */}
          <rect x="52" y="100" width="12" height="6" rx="2" fill="#111827" />
          <rect x="88" y="96" width="12" height="6" rx="2" fill="#111827" />
        </svg>
      );

    case 'yucky_egg_splat':
      return (
        <svg viewBox="0 0 160 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Window Frame */}
          <rect x="25" y="15" width="110" height="90" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="4" />
          <line x1="80" y1="15" x2="80" y2="105" stroke="#93C5FD" strokeWidth="2" />
          <line x1="25" y1="60" x2="135" y2="60" stroke="#93C5FD" strokeWidth="2" />
          {/* Egg White Splat */}
          <path d="M80 40 Q105 32 108 55 Q115 72 95 82 Q82 88 68 78 Q50 82 55 60 Q52 42 75 42 Z" fill="#FEF08A" stroke="#FBBF24" strokeWidth="3" />
          {/* Dripping yolk */}
          <path d="M75 80 Q78 96 74 100 Q70 96 73 80" fill="#F59E0B" />
          <path d="M92 82 Q94 94 91 97 Q88 94 90 82" fill="#F59E0B" />
          {/* Golden Yellow Yolk Center */}
          <circle cx="82" cy="60" r="16" fill="#F59E0B" stroke="#D97706" strokeWidth="2.5" />
          <ellipse cx="78" cy="55" rx="5" ry="3" fill="#FEF3C7" />
          {/* Eggshell shards */}
          <polygon points="56,38 62,32 66,40" fill="#FFFFFF" stroke="#9CA3AF" strokeWidth="1.5" />
          <polygon points="106,78 114,80 110,86" fill="#FFFFFF" stroke="#9CA3AF" strokeWidth="1.5" />
          {/* Funny Text Bubble "YUCK!" */}
          <rect x="100" y="10" width="55" height="24" rx="12" fill="#EF4444" stroke="#991B1B" strokeWidth="2" />
          <text x="127" y="26" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">YUCK!</text>
        </svg>
      );

    case 'trophy':
    default:
      return (
        <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Trophy Cup */}
          <path d="M38 28 H82 V55 C82 68 72 78 60 78 C48 78 38 68 38 55 Z" fill="#FBBF24" stroke="#B45309" strokeWidth="3.5" />
          {/* Handles */}
          <path d="M38 35 C22 35 20 60 38 62" stroke="#F59E0B" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M82 35 C98 35 100 60 82 62" stroke="#F59E0B" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          {/* Star on Cup */}
          <polygon points="60,42 63,50 71,50 64,55 67,63 60,58 53,63 56,55 49,50 57,50" fill="#FFFBEB" stroke="#D97706" strokeWidth="1" />
          {/* Stem & Base */}
          <rect x="54" y="78" width="12" height="14" fill="#D97706" stroke="#92400E" strokeWidth="2" />
          <path d="M34 92 H86 L90 106 H30 Z" fill="#78350F" stroke="#451A03" strokeWidth="2.5" />
          <rect x="42" y="96" width="36" height="6" rx="2" fill="#FDE68A" />
          {/* Sparkles */}
          <path d="M22 24 L24 16 L26 24 L34 26 L26 28 L24 36 L22 28 L14 26 Z" fill="#FDE047" />
          <path d="M96 22 L98 16 L100 22 L106 24 L100 26 L98 32 L96 26 L90 24 Z" fill="#FDE047" />
        </svg>
      );
  }
};
