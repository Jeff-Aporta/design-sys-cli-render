function ActivadorMenuIzquierda() {
  return (
    <label
      className={fluidCSS()
        .gtX(650, { display: "none" })
        .end("activator-menuleft c-pointer")}
      htmlFor="check-menu-responsive"
    >
      <big>
        <big>
          <big>
            <i className="fa-solid fa-bars true" />
            <i className="fa-solid fa-times false c-skyblue" />
          </big>
        </big>
      </big>
    </label>
  );
}

function HeaderMenu() {
  return (
    <Paper
      elevation={2}
      className="header d-flex jc-sb pad-10px bb-1px-gray no-select"
    >
      <div className="header_logo d-center gap-20px">
        <ActivadorMenuIzquierda />
        <Link
          className="c-pointer d-center gap-10px bright-hover-1-2"
          color="inherit"
          underline="hover"
          onClick={() => {
            changeContent({ id: config_template.default_id, config_template });
          }}
        >
          {(() => {
            const logo = config_template?.banner?.left?.logo;
            if (logo) {
              return (
                <img
                  alt=""
                  src={logo}
                  style={{ width: "30px", height: "30px" }}
                  className={fluidCSS().ltX(450, { display: "none" }).end()}
                />
              );
            }
          })()}
          <$ variant="h8" className="fw-bolder">
            {config_template?.banner?.left?.label ?? "Doc name not specified"}
          </$>
        </Link>
      </div>
      <div className="header_social d-center gap-10px">
        {(() => {
          const { telegram, whatsapp, youtube, github } =
            config_template?.banner?.right?.social ?? {};
          const arr = [];
          if (telegram) {
            arr.push(
              <IconSocialTop
                brk={telegram.brk}
                lbl={telegram.label ?? "Telegram"}
                url={telegram.url ?? "#link-telegram-no-config"}
                _icon="telegram"
                color="DodgerBlue"
              />
            );
          }
          if (whatsapp) {
            arr.push(
              <IconSocialTop
                brk={whatsapp.brk}
                lbl={whatsapp.label ?? "WhatsApp"}
                url={whatsapp.url ?? "#link-whatsapp-no-config"}
                _icon="whatsapp"
                color="LimeGreen"
              />
            );
          }
          if (youtube) {
            arr.push(
              <IconSocialTop
                brk={youtube.brk}
                lbl={youtube.label ?? "YouTube"}
                url={youtube.url ?? "#link-youtube-no-config"}
                _icon="youtube"
                color="red"
              />
            );
          }
          if (github) {
            arr.push(
              <IconSocialTop
                black
                color="white"
                _icon="github"
                responsive={false}
                brk={github.brk ?? 450}
                lbl={github.label ?? "Github"}
                url={github.url ?? "#link-github-no-config"}
              />
            );
          }
          return arr;
        })()}
      </div>
    </Paper>
  );
}

function IconSocialTop({ lbl, url, _icon, black = false, color, brk = 700 }) {
  const icon = (
    <i
      className={`fa-brands fa-${_icon} icon-social ${black ? "black" : ""}`}
      style={{
        color,
      }}
    />
  );
  const alw = "d-center gap-10px";
  const cls = fluidCSS().ltX(brk, { display: "none" }).end(alw);
  const full = (
    <span className={cls}>
      {icon}
      {lbl}
    </span>
  );
  return (
    <Link target="_blank" href={url} color="inherit" underline="hover">
      <Tooltip
        title={lbl}
        className={fluidCSS().gtX(brk, { display: "none" }).end(alw)}
      >
        {icon}
      </Tooltip>
      {full}
    </Link>
  );
}
