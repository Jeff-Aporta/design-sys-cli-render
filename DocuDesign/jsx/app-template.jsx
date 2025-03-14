window["theme-config-name"] = "dark";

const zIndexFooter = "2";
const zIndexRightMenuResponsiveTrueBackdrop = "3";
const zIndexRightMenuResponsiveTrue = "4";
const zIndexRightMenuResponsive = "5";
const zIndexMenuLeftResponsiveBackdrop = "6";
const zIndexMenuLeftResponsive = "7";
const zIndexHeader = "8";
const zIndexCursorLight = "9";

const config_template = {
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
        style={{ zIndex: zIndexFooter, position: "relative" }}
      >
        <div
          style={{ fontSize: "60%", width: "100%" }}
          className="pad-10px padt-30px"
        >
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
        <Link
          underline="none"
          color="inherit"
          target="_blank"
          href={url}
          className="flex-1"
        >
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

function hide_menus() {
  hide_menuLeft();
  hide_menuIndexes();
}
function hide_menuIndexes() {
  document.getElementById("togle-menu-right-responsive").checked = false;
}

function hide_menuLeft() {
  document.getElementById("check-menu-responsive").checked = true;
}

function show_menuLeft() {
  document.getElementById("check-menu-responsive").checked = false;
  hide_menuIndexes();
}

function App() {
  let gestureMenuLeft = false;
  let startX = 0;
  let startY = 0;
  let $mouseX = -99999;
  let $mouseY = -99999;
  let isKeyPressed = {};

  document.addEventListener("keydown", (event) => {
    isKeyPressed[event.key] = true;
    setTimeout(updateLightCursor);
  });

  document.addEventListener("keyup", (event) => {
    isKeyPressed[event.key] = false;
    setTimeout(updateLightCursor);
  });

  window.addEventListener("keyup", (evnt) => {
    if (evnt.key === "Escape") {
      hide_menus();
    }
  });

  window.addEventListener("scroll", (event) => {
    event.preventDefault();
    window.scrollTo(0, 0);
  });
  window.addEventListener("touchstart", () => {
    isTouchDevice = true;
  });
  window.addEventListener("resize", () => {
    isTouchDevice = false;
    hide_menus();
  });
  window.document.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    gestureMenuLeft = true;
  });
  document.addEventListener("touchmove", (e) => {
    const touchX = e.touches[0].clientX;
    const touchY = e.touches[0].clientY;
    const deltaX = touchX - startX;
    const deltaY = touchY - startY;

    checkMenuleftGesture();

    function checkMenuleftGesture() {
      const targetElement = e.target.closest(".copy-element-theme");
      if (targetElement) {
        return;
      }
      if (Math.abs(deltaY) > 15) {
        gestureMenuLeft = false;
        return;
      }
      if (!gestureMenuLeft) {
        return;
      }
      if (deltaX > 40) {
        show_menuLeft();
      }
      if (deltaX < -40) {
        hide_menuLeft();
      }
    }
  });
  window.addEventListener("mousemove", (event) => {
    $mouseX = event.clientX;
    $mouseY = event.clientY;
    updateLightCursor();
  });

  function updateLightCursor() {
    const light_off = isKeyPressed["Control"] || isTouchDevice;
    document
      .querySelectorAll(".cursor-effect")
      .forEach(
        (e) =>
          (e.style.left = (light_off ? "-99999" : $mouseX) + "px") &
          (e.style.top = (light_off ? "-99999" : $mouseY) + "px")
      );
  }

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
      <CursorEffect mix="soft-light" opacity="0.3" />
      <CursorEffect mix="soft-light" opacity="0.1" zIndex={zIndexCursorLight} />
      <div className="app-content">
        <SideleftMenuResponsive />
        <SideleftMenu />
        <_ className="main-area" />
        <SiderightMenu />
        <SiderightMenuResponsive />
      </div>
    </Main>
  );

  function CursorEffect({ mix, opacity, zIndex = "0" }) {
    return (
      <div
        className={`cursor-effect no-select minside-win p-fixed transform-centerized ${mix}`}
        data-opacity={opacity}
        style={{
          transition: "opacity 0.2s",
          left: "-99999px",
          top: "-99999px",
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
