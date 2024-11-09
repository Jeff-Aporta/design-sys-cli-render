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

let isTouchDevice = false;

function App() {
  window.addEventListener("scroll", (event) => {
    event.preventDefault();
    window.scrollTo(0, 0);
  });
  window.addEventListener("touchstart", () => {
    isTouchDevice = true;
  });
  window.addEventListener("mousemove", (event) => {
    if (!isTouchDevice) {
      document
        .querySelectorAll(".cursor-effect")
        .forEach(
          (e) =>
            (e.style.left = event.clientX + "px") &
            (e.style.top = event.clientY + "px")
        );
    }
  });
  window.addEventListener("mousedown", (event) => {
    if (!isTouchDevice) {
      document
        .querySelectorAll(".cursor-effect")
        .forEach((e) => (e.style.opacity = "0"));
    }
  });

  window.addEventListener("mouseup", (event) => {
    if (!isTouchDevice) {
      document
        .querySelectorAll(".cursor-effect")
        .forEach((e) => (e.style.opacity = e.dataset.opacity));
    }
  });

  return (
    <Main>
      <HeaderMenu />
      <CursorEffect mix="soft-light" opacity="0.3" zIndex="0" />
      <CursorEffect mix="soft-light" opacity="0.1" zIndex="10" />
      <div className="app-content">
        <SideleftMenuResponsive />
        <SideleftMenu />
        <_ className="main-area" style={{ zIndex: "0" }}></_>
        <SiderightMenu />
        <SiderightMenuResponsive />
      </div>
    </Main>
  );

  function CursorEffect({ mix, opacity, zIndex = 0 }) {
    return (
      <div
        className="cursor-effect no-select"
        data-opacity={opacity}
        style={{
          width: "min(100vw, 100vh)",
          height: "min(100vw, 100vh)",
          position: "absolute",
          transform: "translateX(-50%) translateY(-50%)",
          transition: "opacity 0.2s",
          left: "9999px",
          top: "9999px",
          mixBlendMode: mix,
          zIndex,
          opacity,
          background:
            "radial-gradient(circle at center, cyan 0%, transparent 70%)",
        }}
      />
    );
  }

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
