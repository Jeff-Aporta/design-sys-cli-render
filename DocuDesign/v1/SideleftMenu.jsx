function generateAcordionMenuleft({ element, def, idSelected, mapSite }) {
  const exp = element.childs.some((child) => child.id == idSelected);
  return (
    <Acord_SideLeft title={element.lbl ?? "No label"} defaultExpanded={exp}>
      {element.childs.map((child) => {
        return (
          <Button_SideLeft
            onClick={() => changeContent({ id: child.id, def, mapSite })}
            className={child.id == idSelected ? "selected-sect" : ""}
          >
            {child.lbl ?? "No label"}
          </Button_SideLeft>
        );
      })}
    </Acord_SideLeft>
  );
}

function ContentLeftMenu({ idSelected, def, mapSite }) {
  const maps = mapSite.map((element) => {
    if (element.childs) {
      return generateAcordionMenuleft({ element, idSelected, mapSite });
    }
    if (element.lbl == " ") {
      return <br />;
    }
    if (element.lbl == "  ") {
      return (
        <_>
          <br />
          <$br />
        </_>
      );
    }
    if (element.lbl == "- ") {
      return (
        <_>
          <$hr />
          <$br />
        </_>
      );
    }
    if (element.lbl == " - ") {
      return (
        <_>
          <br />
          <$hr />
          <$br />
        </_>
      );
    }
    if (!element.component && !element.id && element.lbl) {
      return (
        <div className="mb-20px padl-10px c-steelblue fw-bolder">
          {element.lbl}
        </div>
      );
    }
    if (element.component) {
      return element.component();
    }
    const c = element.id == idSelected ? "selected-sect" : "";
    return (
      <div className="mh-10px">
        <Button_SideLeft
          size="small"
          onClick={() => changeContent({ id: element.id, def, mapSite })}
          startIcon={
            <div className="d-center" style={{ width: "40px" }}>
              <i className={element.i} />
            </div>
          }
          className={c}
        >
          {element.lbl ?? "No label"}
        </Button_SideLeft>
      </div>
    );
  });
  return (
    <div className="padb-100px" style={{ maxWidth: "350px" }}>
      <Repositorio />
      {maps}
    </div>
  );

  function Repositorio() {
    if (!config_template.repo) {
      return (
        <Typography variant="h4" className="padw-20px">
          Repositorio no definido
        </Typography>
      );
    }
    return (
      <div className="pad-10px">
        <Button
          color="black"
          className="bright-hover-2 br-10px"
          variant="contained"
          style={{
            border: "1px solid rgba(128, 128, 128, 0.3)",
            background: "rgba(0, 0, 0, 0.4)",
          }}
          startIcon={<i className="fa-brands fa-github" />}
          target="_blank"
          href={config_template.repo.url}
        >
          <div>
            <big>{config_template.repo.name ?? "Repositorio"}</big>
            <br />
            <div
              className="c-gray ellipsis"
              style={{ maxWidth: "200px", fontSize: "smaller" }}
            >
              {config_template.repo.url}
            </div>
          </div>
        </Button>
      </div>
    );
  }
}

function SideleftMenuResponsive() {
  return (
    <_
      className={fluidCSS()
        .gtX(650, { display: "none" })
        .end("sideleft-menu-responsive-container")}
    >
      <label
        htmlFor="check-menu-responsive"
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          backdropFilter: "brightness(0.5) blur(3px)",
        }}
        className="backdrop-responsive"
      />
      <Paper
        variant="nofill"
        className={fluidCSS()
          .gtX(650, { display: "none" })
          .end(`sidebar left-responsive padh-10px padw-10px`)}
        style={{
          position: "absolute",
          height: "100%",
          zIndex: 10,
        }}
      >
        <input
          type="checkbox"
          defaultChecked={true}
          id="check-menu-responsive"
          className="d-none no-select"
        />
        <div className="content" />
      </Paper>
    </_>
  );
}
function SideleftMenu() {
  return (
    <Card
      variant="nofill"
      className={fluidCSS()
        .ltX(650, { display: "none" })
        .end(`sidebar left of-y-auto padh-10px`)}
      style={{ borderRight: "1px solid rgba(128, 128, 128, 0.2)" }}
    />
  );
}

function Button_SideLeft(props) {
  return (
    <Button
      color="white"
      fullWidth
      startIcon={<i className="fa-solid fa-caret-right c-gray" />}
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        paddingLeft: "25px",
        borderBottom: "1px solid rgba(128,128,128,0.3)",
      }}
      {...props}
    />
  );
}
function Acord_SideLeft(props) {
  let { children, title } = props;
  const b = "1px solid rgba(128, 128, 255, 0.5)";
  return (
    <div>
      <Accordion
        sx={{ borderBottom: b, borderTop: b }}
        defaultExpanded={props.defaultExpanded}
      >
        <AccordionSummary expandIcon={<i className="fa-solid fa-caret-down" />}>
          <Typography className="padr-10px">{title}</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ paddingBottom: "10px" }}>
          <Typography>{children}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
