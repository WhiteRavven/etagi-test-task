import Image from "next/image";
import layoutImg from "public/images/layout.webp";
import styles from "./FloorLayoutViewer.module.css";
import React, { useEffect, useState } from "react";
import useResizeObserver from "use-resize-observer";
import { FLOOR_LAYOUT } from "../../constants/floorLayout";
import { Flat } from "../../types/Flat";
import { Box, Popover } from "@mui/material";
import FlatCard from "../FlatCard/FlatCard";
import { useRouter } from "next/router";

export default function FloorLayoutViewer({ flats }: { flats: Flat[] }) {
  const router = useRouter();

  const [hoveredFlat, setHoveredFlat] = useState<Flat | null>(null);
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
  const { width = 1, height = 1 } = useResizeObserver<HTMLImageElement>({
    ref: imageRef,
  });

  const [anchorEl, setAnchorEl] = useState<null | SVGPolygonElement>(null);
  const isPopoverOpen = Boolean(anchorEl);

  const popoverOpenHandler = (
    event: React.MouseEvent<SVGPolygonElement>,
    flat: Flat
  ) => {
    setAnchorEl(event.currentTarget);
    setHoveredFlat(flat);
  };

  const popoverCloseHandler = () => {
    setAnchorEl(null);
    setHoveredFlat(null);
  };

  const ImageLoadingCompleteHandler = (imageRef: HTMLImageElement) => {
    setImageRef(imageRef);
  };

  const flatOpenHandler = (id: number) => {
    router.push(`/flats/${id}`);
  };

  const translateAbsoluteToRelative = ([x, y]: number[]) => [
    Math.round(x * width),
    Math.round(y * height),
  ];

  if (!flats?.length) {
    return null;
  }

  return (
    <>
      {isPopoverOpen && hoveredFlat ? (
        <Popover
          sx={{
            pointerEvents: "none",
          }}
          open={isPopoverOpen}
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          onClose={popoverCloseHandler}
          disableRestoreFocus
        >
          <FlatCard flat={hoveredFlat} />
        </Popover>
      ) : null}
      <Box overflow="scroll">
        <Image
          onLoadingComplete={ImageLoadingCompleteHandler}
          className={styles.image}
          fill
          src={layoutImg}
          alt="floor layout"
        />
        <svg height={height} width={width} className={styles.polygonMap}>
          {flats.map((flat: Flat) => {
            const points = FLOOR_LAYOUT[flat.pos_on_floor]
              .map(translateAbsoluteToRelative)
              .reduce((a: string, [x, y]: number[]) => a + `${x},${y} `, "");
            return (
              <polygon
                key={flat.id}
                points={points}
                onMouseEnter={(e) => popoverOpenHandler(e, flat)}
                onMouseLeave={popoverCloseHandler}
                onClick={() => flatOpenHandler(flat.id)}
              />
            );
          })}
        </svg>
      </Box>
    </>
  );
}
