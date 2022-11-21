import {Grid, useMediaQuery} from "@mui/material";
import {ReactNode} from "react";
import AppBar from "../LayoutAppBar/LayoutAppBar";

export default function AppLayout({children}: { children: ReactNode }) {
    const matches720 = useMediaQuery('(min-width:720px)');

    return <div id="app_layout_root">
        <AppBar/>
        <Grid bgcolor="#E7EBF0" minHeight="calc(100vh - 64px)" container>
            <Grid padding="12px 0" margin="0 auto" item xs={matches720 ? 9 : 11}>
                {children}
            </Grid>
        </Grid>
    </div>
}
