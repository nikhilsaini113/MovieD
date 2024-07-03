import { createTheme } from "@mui/material/styles";
import { colors } from "@mui/material";
export const themeModes = {
  dark: "dark",
  light: "light",
};
const themeConfigs = {
  custom: ({ mode }) => {
    const customPallete =
      mode === themeModes.dark
        ? {
            primary: {
              main: "#274c77",
              contrastText: "#e7ecef",
            },
            secondary: {
              main: "#6096ba",
              contrastText: "#ffffff",
            },
            background: {
              default: "#000000",
              paper: "#131313",
            },
          }
        : {
            primary: {
              main: "#274c77",
            },
            secondary: {
              main: "#6096ba",
            },
            background: {
              default: colors.grey["100"],
            },
          };
    return createTheme({
      palette: {
        mode,
        ...customPallete,
      },
      components: {
        MuiButton: {
          defaultProps: { disableElevation: true },
        },
      },
    });
  },
};
export default themeConfigs;
