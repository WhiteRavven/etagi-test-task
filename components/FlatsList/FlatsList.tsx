import styles from "./FlatsList.module.css";
import { Flat } from "../../types/Flat";
import FlatCard from "../FlatCard/FlatCard";

export default function FlatsList({
  flats,
  onCardClick,
  onShowClick,
}: {
  flats: Flat[];
  onCardClick: (event: any, flat: Flat) => void;
  onShowClick: (event: any, flat: Flat) => void;
}) {
  return (
    <div className={styles.flatsList}>
      {flats.map((flat: Flat) => (
        <FlatCard
          onCardClick={onCardClick}
          onShowClick={onShowClick}
          key={flat.id}
          flat={flat}
        />
      ))}
    </div>
  );
}
