function $CardDef(props) {
  let { title, children } = props;
  delete props.title;
  delete props.children;
  if (typeof title == "string") {
    title = (
      <_>
        <$enfasis>{title}</$enfasis>
        <br />
      </_>
    );
  }
  return (
    <Card {...props} className="mh-20px pad-10px">
      {title}
      <$F>{children}</$F>
    </Card>
  );
}

function $CardF(props) {
  return (
    <Card
      {...props}
      className={`${props.className ?? ""} pad-10px`}
      children={<$F>{props.children}</$F>}
    />
  );
}

function $index(props) {
  return (
    <$ {...props} id={idR()} className={`${props.className} indexed md`} />
  );
}

function $enfasis({ children }) {
  return <strong className="c-skyblue">{children}</strong>;
}

function $secundario({ children }) {
  return <span style={{ color: "steelblue" }}>{children}</span>;
}

function _$Bienvenido({ name_app, children, img_url }) {
  return (
    <_>
      <$index label="Bienvenido" variant="h1" className="nowrap">
        {name_app}
      </$index>
      <$$h />
      <div
        className={fluidCSS()
          .ltX(1050, { flexDirection: "column" })
          .end("d-flex jc-sb gap-30px")}
      >
        <img
          src={img_url}
          alt=""
          className={fluidCSS()
            .ltX(1050, { display: "none" })
            .lerpX([1050, 1200], { width: [250, 270], height: [250, 270] })
            .end("br-30px")}
        />
        <$F>{children}</$F>
        <center>
          <img
            src={img_url}
            alt=""
            className={fluidCSS()
              .btwX([500, 1050], { display: ["", "none"] })
              .lerpX([600, 1050], { width: [250, 300], height: [250, 300] })
              .end("br-30px")}
          />
        </center>
      </div>
    </_>
  );
}


function _$Instalación({ url_cdn, npm_pack }) {
  return (
    <$index label="Instalación">
      <$CardF className="pad-10px">
        # Instalación
        <$hr />
        <$ variant="h4">CDN</$>
        <$h />
        Para usarlo en tu proyecto, puedes integrarlo de forma sencilla mediante
        la URL en tu código HTML.
        <$BasicTabs
          onIndexChange={(e, i) => i == 1 && setTimeout(PR.prettyPrint)}
          style={{ border: "1px solid rgba(128, 128, 128, 0.2)" }}
          children={{
            DEPENDENCIAS: (
              <$CardCopy
                elevation={0}
                style={{
                  padding: "40px 10px 40px 10px",
                  color: "hotpink",
                }}
              >
                {url_cdn}
              </$CardCopy>
            ),
            HTML: (
              <$PR elevation={0} lang="html">
                {[
                  `\u003Cscript type="text/javascript"`,
                  `  src="${url_cdn}"`,
                  `>\u003C/script>`,
                ].join("\n")}
              </$PR>
            ),
          }}
        />
        <_npm />
      </$CardF>
    </$index>
  );

  function _npm() {
    if (!npm_pack) {
      return;
    }
    return (
      <_>
        <$h />
        <$ variant="h4">npm</$>
        <p>
          Ejecuta el siguiente comando para agregar ASCII Map Loader en su
          proyecto:
        </p>
        <$CardCopy elevation={0} className="pad-20px">
          <span className="c-yellow">npm</span> install{" "}
          <strong>{npm_pack}</strong>
        </$CardCopy>
      </_>
    );
  }
}

