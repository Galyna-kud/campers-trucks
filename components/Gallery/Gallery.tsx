"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import css from "./Gallery.module.css";
import { GetCamperByIdResponse } from "@/lib/api";
import SafeImage from "../SafeImage/SafeImage";

interface GalleryProps {
  camper: GetCamperByIdResponse;
}

export default function Gallery({ camper }: GalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className={css.container}>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className={css.mainSwiper}
      >
        {camper.gallery.map((image, index) => (
          <SwiperSlide key={image.original}>
            <SafeImage
              src={image.original}
              alt={`${camper.name} - image ${index + 1}`}
              width={638}
              height={505}
              preload={index === 0}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        loop={false}
        spaceBetween={12}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className={css.thumbSwiper}
        breakpoints={{
          768: {
            spaceBetween: 20,
          },

          1440: {
            spaceBetween: 32,
          },
        }}
      >
        {camper.gallery.map((image) => (
          <SwiperSlide key={image.thumb}>
            <div className={css.thumbImgWrapper}>
              <SafeImage
                className={css.thumbImg}
                src={image.thumb}
                alt={`Thumb ${camper.name}`}
                width={136}
                height={144}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}