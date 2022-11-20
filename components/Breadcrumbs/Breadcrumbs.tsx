import * as React from 'react';
import Typography from '@mui/material/Typography';
import {Breadcrumbs as MuiBreadcrumbs} from '@mui/material';
import useNextRouter from "../../hooks/useNextRouter";
import Link from "next/link";

export default function Breadcrumbs() {
    const {router} = useNextRouter();

    const breadcrumClickHandler = (event:any) => {
        // TODO
    }

    return (
        <div role="presentation">
            <MuiBreadcrumbs>
                <Link href="/flats" >
                    <Typography>Квартиры</Typography>
                </Link>
            </MuiBreadcrumbs>
        </div>
    );
}