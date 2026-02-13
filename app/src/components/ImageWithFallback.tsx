import { useState, useEffect } from 'react';
import { Coffee } from 'lucide-react';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallbackClassName?: string;
  onError?: () => void;
}

export default function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackClassName = '',
  onError,
}: ImageWithFallbackProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 2;

  useEffect(() => {
    setImageError(false);
    setImageLoaded(false);
  }, [src]);

  const handleImageError = () => {
    if (retryCount < maxRetries) {
      // Retry with a different approach
      setRetryCount(retryCount + 1);
      setImageError(false);
    } else {
      setImageError(true);
      onError?.();
    }
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };

  if (imageError) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-[#E8DCC8] via-[#D7B899] to-[#C6A75E] ${className} ${fallbackClassName}`}
      >
        <div className="text-center flex flex-col items-center gap-2">
          <Coffee className="w-12 h-12 text-[#3E2723] opacity-70" />
          <span className="text-xs text-[#3E2723] font-medium">Premium Coffee</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleImageError}
      onLoad={handleImageLoad}
      loading="lazy"
    />
  );
}
