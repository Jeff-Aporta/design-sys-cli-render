const themename = (() => {
  const ls = localStorage.getItem("theme");
  const w = window["theme-config-name"];
  return ls ?? w ?? "dark";
})();

const isThemeDark = themename === "dark";

if (typeof window != "undefined" && window["MaterialUI"]) {
  Object.assign(window, window["MaterialUI"]);
}

function _(props) {
  if (Object.keys(props).length == 1 && props.children) {
    return <React.Fragment {...props} />;
  }
  return <div {...props} />;
}

let palette = (() => {
  const white = {
    main: "#fff",
    contrastText: "#000",
  };
  const black = {
    main: "#000",
    contrastText: "#fff",
  };
  const contrastText = isThemeDark ? "#fff" : "#000";
  const uncontrastText = isThemeDark ? "#000" : "#fff";
  return {
    primary: {
      main: "#1E90FF",
      contrastText,
    },
    darkprimary: {
      main: "#003366",
      contrastText,
    },
    secondary: {
      main: isThemeDark ? "#387FC7" : "#ccccff",
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
    contrast: isThemeDark ? white : black,
    uncontrast: isThemeDark ? black : white,
  };
})();

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
        // Aplica estos estilos solo si el Paper está dentro de un Accordion
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

const theme = responsiveFontSizes(
  isThemeDark
    ? createTheme({
        typography,
        components,
        palette: {
          mode: "dark",
          background: {
            default: "#03030f",
            paper: "#05051f",
          },
          ...palette,
        },
      })
    : createTheme({
        typography,
        components,
        palette: {
          mode: "light",
          ...palette,
        },
      })
);
