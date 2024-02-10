import React from "react";
import { Box } from "@mui/system";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";
import { useMediaQuery } from "react-responsive";
import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../components/UI/Navbar";

const RootLayout = () => {
  const [open, setOpen] = React.useState(false);
  const navigation = useNavigation();
  const theme = useTheme();
  const extractedQuery = theme.breakpoints.down("sm").substring(7);
  const isMobile = useMediaQuery({ query: extractedQuery });
  //   const [isLoggedIn, setIsLoggedIn] = React.useState(
  //     localStorage.getItem("isLoggedIn")
  //   );

  //   React.useEffect(() => {
  //     const flag = localStorage.getItem("isLoggedIn");
  //     // console.log(flag);
  //     if (flag === "true") {
  //       setIsLoggedIn(true);
  //     } else {
  //       setIsLoggedIn(false);
  //     }
  //   }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Navbar />
      {navigation.state !== "loading" && 
        <Box
            sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            overflowY: "auto",
            overflowX: "hidden",
            height: "100%",
            position: "relative",
            }}
        >
            <Outlet />
        </Box>
      }
      {navigation.state === "loading" && 
        <Backdrop
            sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            color: "#fff",
            }}
            open={open}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
      }
    </Box>
  );
};

export default RootLayout;
