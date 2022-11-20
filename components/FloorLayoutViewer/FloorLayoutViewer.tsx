import Image from 'next/image';
import layoutImg from 'public/images/layout.webp'
import styles from './FloorLayoutViewer.module.css'
import {useMemo, useState} from "react";
import useResizeObserver from "use-resize-observer";
import {FLOOR_LAYOUT} from "../../constants/floorLayout";

export default function FloorLayoutViewer() {


    const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
    const {width = 1, height = 1} = useResizeObserver<HTMLImageElement>({ref: imageRef});

    const mappedPolygons = useMemo(() =>
        Object.keys(FLOOR_LAYOUT).map(pos_on_floor =>
            FLOOR_LAYOUT[pos_on_floor].map(([x, y]:number[]) => [Math.round(x * width), Math.round(y * height)])), [width, height]);

    const ImageLoadingCompleteHandler = (imageRef: HTMLImageElement) => {
        setImageRef(imageRef);
    }

    return (
        <>
            <Image onLoadingComplete={ImageLoadingCompleteHandler} className={styles.image}
                   fill
                   src={layoutImg}
                   alt="floor layout"/>
            <svg height={height} width={width} className={styles.polygonMap}>
                {mappedPolygons.map((polygonData, index) => {
                    const points = polygonData.reduce((a:string, [x, y]:number[]) => a + `${x},${y} `, '');
                    return <polygon key={index} points={points}/>
                })}
            </svg>
        </>
    )
}
