window["theme-config-name"] = "dark";

const config_template = {
  clases: {
    text: fluidCSS()
      .lerpX([850, 1200], { fontSize: [13, 16] })
      .end(),
  },
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
