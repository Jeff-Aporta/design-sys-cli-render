let theme;
let isThemeDark;

if (typeof window != "undefined" && window["MaterialUI"]) {
  Object.assign(window, window["MaterialUI"]);
}

let themename = (() => {
  const ls = localStorage.getItem("theme");
  const w = window["theme-config-name"];
  return w ?? ls ?? "dark";
})();

selectThemeName(themename);

function selectThemeName(name) {
  themename = name;
  const retorno = (() => {
    switch (themename) {
      case "light":
        return createTheme({
          ...customizePropsMUI(),
          palette: {
            mode: "light",
            ...calculatePalette(false),
          },
        });
      case "dark":
      default:
        return createTheme({
          ...customizePropsMUI(),
          palette: {
            mode: "dark",
            background: {
              default: "#03030f",
              paper: "#05051f",
            },
            ...calculatePalette(true),
          },
        });
    }
  })();

  theme = responsiveFontSizes(retorno);

  return theme;

  function customizePropsMUI() {
    const typography = {
      fontSize: 12,
      button: {
        textTransform: "none",
      },
    };

    const components = {
      MuiAccordionDetails: {
        styleOverrides: {
          root: {
            padding: 0,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            "&.MuiAccordionDetails-root": {
              backgroundColor: "transparent", // Fondo transparente
              boxShadow: "none", // Opcional: elimina la sombra
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            margin: 0,
          },
        },
      },
    };

    return { typography, components };
  }

  function calculatePalette(darkmode) {
    isThemeDark = darkmode;

    const white = {
      main: "#fff",
      contrastText: "#000",
    };
    const black = {
      main: "#000",
      contrastText: "#fff",
    };
    const contrastText = darkmode ? "#fff" : "#000";
    const uncontrastText = darkmode ? "#000" : "#fff";
    return {
      primary: {
        main: isThemeDark ? "#1E90FF" : "#B0E0E6",
        contrastText,
      },
      darkprimary: {
        main: "#003366",
        contrastText,
      },
      secondary: {
        main: darkmode ? "#387FC7" : "#ccccff",
        contrastText,
      },
      success: {
        main: "#32CD32",
        contrastText,
      },
      atentionBlue: {
        main: "#00BFFF",
        contrastText: uncontrastText,
      },
      atentionGreen: {
        main: "#00FA9A",
        contrastText: uncontrastText,
      },
      white,
      black,
      contrast: darkmode ? white : black,
      uncontrast: darkmode ? black : white,
    };
  }
}
