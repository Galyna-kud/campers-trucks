import { Camper } from "@/types/camper";
import css from "./CamperList.module.css";
import Button from "../Button/Button";
import { BsFuelPump, BsDiagram3 } from "react-icons/bs";
import { FaCar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { IoMapOutline } from "react-icons/io5";
import { formatText } from "@/utils/formatters";
import SafeImage from "../SafeImage/SafeImage";

interface CamperListProps {
  campers: Camper[];
}
export default function CamperList({ campers }: CamperListProps) {
  return (
    <ul className={css.camperList}>
      {campers.map((camper) => (
        <li key={camper.id} className={css.camperItem}>
          <SafeImage
            src={camper.coverImage}
            alt={camper.name}
            width={220}
            height={240}
            className={css.camperImage}
          />

          <div className={css.camperInfo}>
            <div className={css.camperHeader}>
              <h2 className={css.camperName}>{camper.name}</h2>
              <p className={css.camperPrice}>€{camper.price}</p>
              <div className={css.meta}>
                <span className={css.ratingWrapper}>
                  <FaStar className={css.starIcon} />
                  {camper.rating} ({camper.totalReviews} Reviews)
                </span>
                <span className={css.locationWrapper}>
                  <IoMapOutline className={css.iconLocation} />
                  {camper.location}
                </span>
              </div>
            </div>

            <p className={css.camperDescr}>{camper.description}</p>

            <ul className={css.tagList}>
              <li className={css.tagItem}>
                <BsFuelPump className={css.tagIcon} />
                {camper.engine}
              </li>
              <li className={css.tagItem}>
                <BsDiagram3 className={css.tagIcon} /> {camper.transmission}
              </li>
              <li className={css.tagItem}>
                <FaCar className={css.tagIcon} />
                {formatText(camper.form)}
              </li>
            </ul>
            <Button
              className={css.btnShowMore}
              href={`/catalog/${camper.id}`}
              target="_blank"
              text="Show more"
              rel="noopener noreferrer"
            />
          </div>
        </li>
      ))}
    </ul>
  );
}