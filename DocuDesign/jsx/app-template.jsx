window["theme-config-name"] = "dark";

const config_template = {
  clases: {
    text: fluidCSS()
      .lerpX([850, 1200], { fontSize: [13, 16] })
      .end(),
  },
  banner: {
    left: {
      label: "Documentación",
      logo: "static/img/icon.svg",
    },
    right: {
      social: {
        github: {
          label: "Jeff-Aporta",
          url: "https://github.com/Jeff-Aporta",
        },
        youtube: {
          label: "YouTube",
          url: "https://www.youtube.com/@JeffAporta",
        },
        whatsapp: {
          label: "WhatsApp",
          url: "https://wa.link/1tmqmt",
        },
        telegram: {
          label: "Telegram",
          url: "https://t.me/jeffAporta",
        },
      },
    },
  },
  default_id: "intro",
};

const sections = {};

function App() {
  window.addEventListener("scroll", (event) => {
    event.preventDefault();
    window.scrollTo(0, 0);
  });

  return (
    <Main>
      <HeaderMenu />
      <div className="app-content">
        <SideleftMenuResponsive />
        <SideleftMenu />
        <_ className="main-area" style={{ zIndex: "0" }}></_>
        <SiderightMenu />
        <SiderightMenuResponsive />
      </div>
    </Main>
  );

  function Main({ children }) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Paper elevation={0} className={`app ${themename}`}>
          {children}
        </Paper>
      </ThemeProvider>
    );
  }
}
