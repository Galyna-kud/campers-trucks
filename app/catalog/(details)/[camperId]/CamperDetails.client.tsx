"use client";

import { getCamperById } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import css from "./CamperDetails.module.css";
import { FaStar } from "react-icons/fa6";
import { IoMapOutline } from "react-icons/io5";
import Gallery from "@/components/Gallery/Gallery";
import Reviews from "@/components/Reviews/Reviews";
import BookingForm from "@/components/BookingForm/BookingForm";
import { formatText, formatUnit } from "@/utils/formatters";
import Loader from "@/components/Loader/Loader";

export default function CamperDetailsClient() {
  const { camperId } = useParams<{ camperId: string }>();

  const {
    data: camper,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["camper", camperId],
    queryFn: () => getCamperById(camperId),
    refetchOnMount: false,
  });

  if (isLoading) return <Loader />;

  if (error || !camper) return <p>Something went wrong.</p>;

  return (
    <main className={css.container}>
      <section className={css.camperDetailsSection}>
        <div className={css.camperGallery}>
          <Gallery camper={camper} />
        </div>
        <div className={css.camperContent}>
          <div className={css.camperMainInfo}>
            <h2 className={css.camperName}>{camper.name}</h2>
            <div className={css.wrapper}>
              <span className={css.ratingWrapper}>
                <FaStar className={css.starIcon} />
                {camper.rating} ({camper.totalReviews} Reviews)
              </span>
              <span className={css.locationWrapper}>
                <IoMapOutline className={css.iconLocation} />
                {camper.location}
              </span>
            </div>
            <p className={css.camperPrice}>€{camper.price}</p>

            <p className={css.camperDescr}>{camper.description}</p>
          </div>

          <div className={css.camperDetails}>
            <h2 className={css.detailsCaption}>Vehicle details</h2>

            <ul className={css.tagList}>
              <li className={css.tagItem}>{camper.engine}</li>

              <li className={css.tagItem}>{camper.transmission}</li>
              <li className={css.tagItem}>{formatText(camper.form)}</li>

              {camper.amenities.map((amenity) => (
                <li className={css.tagItem} key={amenity}>
                  {formatText(amenity)}
                </li>
              ))}
            </ul>

            <div className={css.metaRow}>
              <dt>Form</dt>
              <dd className={css.metaData}>{formatText(camper.form)}</dd>
              <dt>Length</dt>
              <dd className={css.metaData}>{formatUnit(camper.length)}</dd>
              <dt>Width</dt>
              <dd className={css.metaData}>{formatUnit(camper.width)}</dd>
              <dt>Height</dt>
              <dd className={css.metaData}>{formatUnit(camper.height)}</dd>
              <dt>Tank</dt>
              <dd className={css.metaData}>{formatUnit(camper.tank)}</dd>
              <dt>Consumption</dt>
              <dd className={css.metaData}>{camper.consumption}</dd>
            </div>
          </div>
        </div>
      </section>
      <section className={css.reviewsSection}>
        <h2 className={css.reviewsTitle}>Reviews</h2>
        <div className={css.reviewsWrapper}>
          <Reviews />
          <div className={css.formContainer}>
            <h3 className={css.formCaption}>Book your campervan now</h3>
            <p className={css.formText}>
              Stay connected! We are always ready to help you.
            </p>
            <BookingForm />
          </div>
        </div>
      </section>
    </main>
  );
}