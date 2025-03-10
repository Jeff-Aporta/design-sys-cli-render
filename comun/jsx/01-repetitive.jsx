function idR(prefix = "idR") {
  return Math.random()
    .toString(36)
    .replace("0.", prefix + "-");
}

function $code(props) {
  const { children } = props;
  const p = { ...props };
  delete p.children;
  return (
    <$CardCopy {...p} style={{ overflow: "auto", ...(p.style ?? {}) }}>
      <pre>
        <code>{children}</code>
      </pre>
    </$CardCopy>
  );
}

function $PR(props) {
  let { children, lang, src, src_params } = props;
  const p = { ...props };
  delete p.children;
  delete p.lang;
  delete p.src;
  delete p.src_params;
  children ??= (() => {
    try {
      let str = loadStringsSync(src);
      if (src_params) {
        Object.entries(src_params).forEach(([key, value]) => {
          str = str.replaceAll(`$${key}$`, value);
        });
      }
      return str;
    } catch (error) {
      console.error(error);
      return "Error not found: " + src;
    }
  })();
  setTimeout(() => {
    try {
      PR.prettyPrint();
    } catch (error) {}
  });
  return (
    <$CardCopy {...p}>
      <pre className="prettyprint">
        <code className={`lang-${lang}`}>{children}</code>
      </pre>
    </$CardCopy>
  );
}

function $CardCopy(props) {
  return (
    <$Copy>
      <Card {...props} className={`${props.className ?? ""} pad-10px`} />
    </$Copy>
  );
}

function $$h() {
  return <$h l={2} />;
}

function $h({ l = 1 }) {
  return <_ style={{ height: l * 10 + "px" }} />;
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
            navigator.clipboard.writeText(text).catch((err) => {
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

function $BasicTabs(props) {
  const [value, setValue] = React.useState(0);
  const _idtabpanel = idR("simple-tabpanel");
  const _idtab = _idtabpanel.replace("tabpanel", "tab");

  const { children, elevation = 0, fullWidth } = props;

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`${_idtabpanel}-${index}`}
        aria-labelledby={`${_idtab}-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </div>
    );
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (props.onIndexChange) {
      props.onIndexChange(event, newValue);
    }
  };

  const p = { ...props };
  delete p.elevation;
  delete p.children;
  delete p.fullWidth;

  if (typeof children != "object") {
    return <h1>children need be object</h1>;
  }

  return (
    <Box {...p}>
      <Paper
        elevation={elevation}
        sx={{
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          variant={fullWidth ? "fullWidth" : ""}
        >
          {Object.keys(children).map((key, index) => (
            <Tab label={key} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Paper>
      {Object.values(children).map((content, index) => (
        <CustomTabPanel value={value} index={index} children={content} />
      ))}
    </Box>
  );

  function a11yProps(index) {
    return {
      id: `${_idtab}-${index}`,
      "aria-controls": `${_idtabpanel}-${index}`,
    };
  }
}
