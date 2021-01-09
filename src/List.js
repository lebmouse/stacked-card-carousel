import React, { useRef, useState } from "react";
import { motion, AnimateSharedLayout } from "framer-motion";
import styled from "styled-components";
import { v4 } from "uuid";
import src1 from "./img/Rectangle 870.png";
import src2 from "./img/Rectangle 870 (1).png";
import src3 from "./img/Rectangle 870 (2).png";
import src4 from "./img/Rectangle 870 (3).png";
import src5 from "./img/Group 3313 (1).png";
import src6 from "./img/Group 3313.png";
import src7 from "./img/Group 3314 (1).png";
import src8 from "./img/Group 3314.png";

const swipeConfidenceThreshold = 100;

const ImageCardListWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
`;

const DargBox = styled(motion.div)`
  position: absolute;
  top: -50px;
  left: 0;
  right: 0;
  margin: auto;
  background: blue;
  width: 180%;
  height: 120%;
  z-index: 100;
`;

const ImaCardList = styled(motion.ul)`
  display: flex;
  align-items: center;
  background: salmon;
  margin: auto;
  position: relative;
  width: 425px;
  height: 425px;
`;

const ImgCard = styled(motion.img)`
  position: absolute;
`;

const srcs = [src1, src2, src3, src4, src5, src6, src7, src8];
const ids = srcs.map(() => v4());
const animateList = srcs.map((_, idx) => ({
  zIndex: srcs.length - idx,
  scale: 1.5 - idx * 0.1,
  x: 50 * idx
  // width: `${100 - 5 * idx}%`
}));

export default function List() {
  const [page, setPage] = useState(0);
  const nextPage = () =>
    setPage((prev) => {
      if (prev < srcs.length - 1) {
        return Math.abs((prev + 1) % srcs.length);
      } else {
        return prev;
      }
    });

  const prevPage = () =>
    setPage((prev) => {
      if (prev > 0) {
        return Math.abs((prev - 1) % srcs.length);
      } else {
        return prev;
      }
    });

  const countdown = () => {};

  console.log(page, "-------");
  return (
    <AnimateSharedLayout>
      <div style={{ textAlign: "center" }}>
        <button onClick={() => prevPage()}>{"<"}</button>
        <button onClick={() => nextPage()}>{">"}</button>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {srcs.map((_, idx) => (
          <div
            key={idx}
            style={{
              width: "30px",
              height: "30px",
              margin: "4px",
              background: page === idx ? "#fff" : "grey",
              borderRadius: "100%"
            }}
            onClick={() => setPage(idx)}
          />
        ))}
      </div>
      <ImageCardListWrapper>
        <ImaCardList>
          {srcs.map((src, idx) => {
            // const width = 100 - Math.abs(page - idx) * 5;
            const animate = {
              zIndex: srcs.length - Math.abs(page - idx),
              x: 50 * (idx - page),
              scale: 1.5 - Math.abs(page - idx) * 0.1
            };
            console.log(animate);
            return (
              <ImgCard
                drag={page === idx && "x"}
                key={ids[idx]}
                dragConstraints={{ right: 0, top: 0, left: 0, bottom: 0 }}
                dragElastic={0.25}
                layoutId={ids[idx]}
                transition={{
                  type: "tween"
                }}
                initial={animateList[idx]}
                animate={animate}
                src={src}
                alt={src}
                onDragEnd={(e, { offset, velocity }) => {
                  console.log(offset.x);
                  if (offset.x < -swipeConfidenceThreshold) {
                    nextPage();
                  } else if (offset.x > swipeConfidenceThreshold) {
                    prevPage();
                  }
                }}
              />
            );
          })}
          {/* <DargBox
            drag="x"
            dragConstraints={{ right: 0, top: 0, left: 0, bottom: 0 }}
            onDragEnd={(e, { offset, velocity }) => {
              console.log(offset.x, velocity.x);
            }}
          /> */}
        </ImaCardList>
      </ImageCardListWrapper>
    </AnimateSharedLayout>
  );
}
