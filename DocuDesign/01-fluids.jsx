function $hr(props) {
  return <hr {...props} className={$variatStr("hr", props)} />;
}
function $br(props) {
  return <br {...props} className={$variatStr("br", props)} />;
}

function $Card(props) {
  return (
    <$Copy>
      <Card
        {...props}
        className={`${props.className ?? ""} pad-10px mh-20px`}
      />
    </$Copy>
  );
}

function $$br(props) {
  const br = <br {...props} className={$variatStr("br", props)} />;
  return (
    <_>
      {br}
      {br}
    </_>
  );
}

function $$h({ l = 1 }) {
  return <$h l={2} />;
}

function $h({ l = 1 }) {
  return <_ style={{ height: l * 10 + "px" }} />;
}

function $(props) {
  return (
    <_
      {...props}
      className={$variatStr(props.variant) + " " + props.className}
    />
  );
}

function $index(props) {
  return (
    <$ {...props} id={idR()} className={`${props.className} indexed md`} />
  );
}

function $muiRender(component, element) {
  ReactDOM.render(
    <ThemeProvider theme={theme}>{component}</ThemeProvider>,
    element
  );
}

function $Copy(props) {
  const id = idR("copy");
  return (
    <div className="copy-element-theme" id={id}>
      <Tooltip title="Copiar">
        <IconButton
          className="copy-button"
          color="white"
          size="small"
          onClick={() => {
            const text = document.getElementById(id).innerText;
            navigator.clipboard
              .writeText(text)
              .then(() => {
                console.log("Text copied to clipboard: ", text);
              })
              .catch((err) => {
                console.error("Failed to copy: ", err);
              });
          }}
        >
          <i className="fa fa-copy" />
        </IconButton>
      </Tooltip>
      <div {...props} />
    </div>
  );
}

function $variatStr(variant, props) {
  const { className } = props ?? {};

  switch (variant) {
    case "hr":
      return fluidCSS()
        .ltX(500, { display: "none" })
        .end(props.className ?? "op-30");
    case "br":
      return fluidCSS().ltX(500, { display: "none" }).end(className);
  }
  const fs = 18;
  return (() => {
    const map = {
      h1: 60,
      h2: 55,
      h3: 50,
      h4: 45,
      h5: 40,
      h6: 35,
      h7: 30,
      h8: 25,
      h9: 20,
    };
    const sz = map[variant];
    if (sz) {
      return fluidCSS()
        .lerpX([400, 1000], {
          fontSize: [fs, sz],
        })
        .ltX(600, { fontWeight: "bolder" })
        .end(className);
    }
    return "";
  })();
}
