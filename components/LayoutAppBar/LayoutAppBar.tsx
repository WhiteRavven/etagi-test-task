import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export default function LayoutAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Тестовое задание</Typography>
          <Box marginLeft="12px">
            <Link href="/flats" style={{ textDecoration: "none" }}>
              <Typography color="white" variant="h6">
                Квартиры
              </Typography>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
