import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const PhoenixLogo: React.FC<LogoProps> = ({ className = "w-9 h-9", size = 36 }) => {
  return (
    <img
      src="/assets/logo-mark.svg"
      alt="Orkestrim Logo"
      width={size}
      height={size}
      className={`shrink-0 object-contain drop-shadow-[0_0_12px_rgba(229,9,20,0.7)] ${className}`}
    />
  );
};

export const PhoenixWordmark: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  return (
    <span
      className={`font-bebas text-2xl sm:text-3xl tracking-[0.06em] text-[#E50914] font-black uppercase select-none drop-shadow-[0_0_12px_rgba(229,9,20,0.65)] ${className}`}
    >
      ORKESTRIM
    </span>
  );
};
