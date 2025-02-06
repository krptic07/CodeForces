import React, { useEffect, useState } from "react";
import styles from "../styles/Card.module.css";
import socket from "../socket";

const Card: React.FC<{
  color?: string;
  cardKey: number;
  handleClick?: any;
  isSpymaster: boolean;
  image: string;
}> = ({ color = "red", handleClick, isSpymaster, image, cardKey }) => {
  const [flipped, setFlipped] = useState<boolean>(false);
  // const [flippedPosition, setFlippedPosition] = useState<number | undefined>(
  //   undefined
  // );

  useEffect(() => {
    // setFlipped(false);
    socket.on("updateFlippedPosition", (position: number) => {
      if (position === cardKey) {
        console.log("positionFL", position);
        console.log("positionFLis", position === cardKey);
        console.log(cardKey);
        setFlipped(true);
      }
    });
    socket.on("showCardFront", (unflip: boolean) => {
      console.log("s");
      if (unflip) {
        setFlipped(false);
      }
    });
  }, []);

  // useEffect(() => {
  //   console.log(flippedPosition);
  //   console.log(cardKey);
  //   if (flippedPosition && flippedPosition === cardKey) {
  //     console.log("setFlipped", flippedPosition);
  //     setFlipped(true);
  //   }
  // }, [flippedPosition, cardKey]);

  return (
    <>
      {/*front side*/}
      <div
        onClick={() => handleClick(cardKey)}
        className={`${styles.Card} ${flipped ? styles.flipped : ""}`}
      >
        <div className={styles.inner}>
          <div
            style={
              {
                backgroundImage: `url(${image})`,
                // backgroundSize: "cover",
                // backgroundPosition: "center",
                "--triangle-color": isSpymaster ? color : "transparent",
              } as React.CSSProperties
            }
            className={styles.front}
            // onClick={handleClick}
          />
          <div
            style={{ "--back-color": color } as React.CSSProperties}
            className={styles.back}
          />
        </div>
      </div>
    </>
  );
};

export default Card;
