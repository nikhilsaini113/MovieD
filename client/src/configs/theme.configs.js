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
              main: "#9599FF",
              contrastText: "#ffffff",
            },
            secondary: {
              main: "#5d2f70",
              contrastText: "#ffffff",
            },
            background: {
              default: "#000000",
              paper: "#131313",
            },
          }
        : {
            primary: {
              main: "#641d82",
            },
            secondary: {
              main: "#5d2f70",
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
