function $CardDef(props) {
  let { title, children, variant } = props;
  delete props.title;
  delete props.children;
  delete props.variant;
  if (typeof title == "string") {
    title = (
      <_>
        <$enfasis variant={variant}>
          <$F>{title}</$F>
        </$enfasis>
        <$$h />
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

function $ul(props) {
  const p = { ...props };
  const { children } = props;
  p.children = <$F>{children}</$F>;
  return <ul {...p} className={`${props.className ?? ""} theme ul`} />;
}

function $p(props) {
  const p = { ...props };
  const { children } = props;
  p.children = <$F>{children}</$F>;
  return <p {...p} className={`${props.className ?? ""} theme p`} />;
}

function $li(props) {
  const p = { ...props };
  const { children } = props;
  p.children = <$F>{children}</$F>;
  return <li {...p} className={`${props.className ?? ""} theme li`} />;
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
    <$
      {...props}
      id={idR()}
      className={`${props.className ?? ""} indexed md`}
    />
  );
}

function $enfasis({ children, variant = "1" }) {
  const enf = {
    1: {
      className: "c-skyblue",
    },
    2: {
      className: "c-plum",
    },
  };
  return <strong {...enf[variant]}>{children}</strong>;
}

function $secundario({ children }) {
  return <span style={{ color: "steelblue" }}>{children}</span>;
}

function _$Bienvenido({ name_app, children, img_url, label = "Bienvenido" }) {
  return (
    <_>
      <$index label={label} variant="h1" className="nowrap">
        {name_app}
      </$index>
      <$$h />
      <div
        className={fluidCSS()
          .ltX(1050, { flexDirection: "column" })
          .end("d-flex jc-sb gap-30px padb-50px")}
      >
        <img
          src={img_url}
          alt=""
          className={fluidCSS()
            .ltX(1050, { display: "none" })
            .lerpX([1050, 1200], { width: [250, 270], height: [250, 270] })
            .end("br-30px no-select")}
        />
        <$F>{children}</$F>
        <center>
          <img
            src={img_url}
            alt=""
            className={fluidCSS()
              .gtX(1050, { display: "none" })
              .lerpX([600, 1050], { width: [220, 300], height: [220, 300] })
              .end("br-30px")}
          />
        </center>
      </div>
    </_>
  );
}

function _$testing({ src_params_iife, src_params_module, src_params_nodemodule }) {
  if (!src_params_iife && !src_params_module) {
    return;
  }
  const sep = (
    <_>
      <$h />
      <$hr />
      <$h />
    </_>
  );
  return (
    <$index label="Testing">
      <Card className="pad-10px">
        <$h1>Comprobar funcionamiento</$h1>
        {(() => {
          if (src_params_iife) {
            return (
              <_>
                {sep}
                <$h5>IIFE</$h5>
                <$$h />
                <$PR
                  lang="html"
                  elevation={0}
                  src_params={src_params_iife}
                  src="https://jeff-aporta.github.io/design-sys-cli-render/DocuDesign/fragments/test-iife.txt"
                />
              </_>
            );
          }
        })()}
        {(() => {
          if (src_params_nodemodule) {
            return (
              <_>
                {sep}
                <$h5>Module in Node JS</$h5>
                <$$h />
                <$PR
                  lang="html"
                  elevation={0}
                  src_params={src_params_nodemodule}
                  src="https://jeff-aporta.github.io/design-sys-cli-render/DocuDesign/fragments/test-nodemodule.txt"
                />
              </_>
            );
          }
        })()}
        {(() => {
          if (src_params_module) {
            return (
              <_>
                {sep}
                <$h5>Module</$h5>
                <$$h />
                <$PR
                  lang="html"
                  elevation={0}
                  src_params={src_params_module}
                  src="https://jeff-aporta.github.io/design-sys-cli-render/DocuDesign/fragments/test-module.txt"
                />
              </_>
            );
          }
        })()}
      </Card>
    </$index>
  );
}
function _$Instalación({ url_cdn, npm_pack }) {
  return (
    <$index label="Instalación">
      <$CardF className="pad-10px">
        <$ variant="h1">Instalación</$>
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

function _masEnMiPortafolio({
  url = "https://jeff-aporta.github.io/portafolio",
}) {
  return (
    <center>
      <Button
        color="darkprimary"
        variant="contained"
        className="bright-hover-1-5"
        startIcon={<i className="fa fa-globe" />}
        target="_blank"
        href={url}
      >
        Más en mi portafolio
      </Button>
    </center>
  );
}
