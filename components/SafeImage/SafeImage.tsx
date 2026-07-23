"use client";
import { useState } from "react";
import Image, { ImageProps } from "next/image";

type SafeImageProps = ImageProps & {
  fallback?: string;
};

export default function SafeImage({
  src,
  fallback = "/img/placeholder.png",
  alt,
  ...props
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src || fallback);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => setImgSrc(fallback)}
    />
  );
}