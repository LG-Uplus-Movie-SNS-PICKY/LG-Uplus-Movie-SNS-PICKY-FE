import ArrowLeft from "@assets/icons/arrow_left.svg?react";

import styles from "./index.styles";

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useState } from "react";

interface OperationCardTypes {
  image: string;
  title: string;
  context: string;
}

function OperationCard({ image, title, context }: OperationCardTypes) {
  const [isLoading, setIsLoading] = useState(false);
  const [isHover, setIsHover] = useState(false);
  return (
    // Card Container
    <div css={styles.cardContainer()} onMouseOver={() => setIsHover(true)}>
      {/* Card Thumbnail */}
      <div css={styles.cardThumbnail()}>
        <LazyLoadImage
          src={image}
          effect={"blur"}
          onLoad={() => setIsLoading(true)}
          onError={() => setIsLoading(false)}
          className={isHover ? "hover" : ""}
        />
      </div>

      {/* Card Context */}
      <div css={styles.cardContext()}>
        {/* 내용 */}
        <div className="context">
          <h3>{title}</h3>
          <p>{context}</p>
        </div>

        {/* 화살표 */}
        <div className="arrow-btn">
          <ArrowLeft />
        </div>
      </div>
    </div>
  );
}

export default OperationCard;
