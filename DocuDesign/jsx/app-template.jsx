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
          url: "https://wa.link/viwd81",
        },
        telegram: {
          label: "Telegram",
          url: "https://t.me/jeffAporta",
        },
      },
    },
  },
  default_id: "intro",
  footer: () => {
    return (
      <Card
        className={fluidCSS()
          .lerpX([320, 1000], { fontSize: [18, 20] })
          .end("d-flex flex-wrap mt-100px")}
      >
        <div style={{ fontSize: "60%", width: "100%" }} className="pad-10px">
          <big>
            <b>Jeffrey Agudelo</b>
          </big>
          <$h />
          <span className="op-80">
            Desarrollando software de alta calidad con habilidad y dedicación
            para impulsar aplicaciones.
          </span>
          <$h />
          <$hr />
          <$$h />
          <div className="d-flex jc-sb c-skyblue flex-wrap gap-10px">
            <div className={fluidCSS().ltX(550, { width: "100%" }).end()}>
              <big>
                <b>Contacto:</b>
              </big>
            </div>
            <span>jeffrey.alexander.agudelo.espitia@gmail.com</span>
            <span>Teléfono: (+57) 3107257814</span>
          </div>
          <$h />
        </div>
        <Brands social="Github" url="https://github.com/Jeff-Aporta" />
        <Brands social="YouTube" url="https://www.youtube.com/@JeffAporta" />
        <Brands social="Telegram" url="https://t.me/jeffAporta" />
        <Brands social="WhatsApp" url="https://wa.link/viwd81" />
      </Card>
    );

    function Brands({ social, url }) {
      return (
        <Link underline="none" color="inherit" href={url} className="flex-1">
          <Card className="bright-hover-2 d-center gap-10px pad-20px op-70">
            <big>
              <i class={`fa-brands fa-${social.toLowerCase()}`} />
            </big>{" "}
            {social}
          </Card>
        </Link>
      );
    }
  },
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
      <CursorEffect mix="soft-light" opacity="0.4" zIndex="0" />
      <CursorEffect mix="soft-light" opacity="0.15" zIndex="10" />
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
