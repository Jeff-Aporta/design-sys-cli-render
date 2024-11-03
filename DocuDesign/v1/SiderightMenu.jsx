const style_right_menu_item = {
  maxWidth: "250px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
  width: "200px",
};

function SiderightMenuResponsive() {
  return (
    <_
      className={fluidCSS()
        .gtX(950, { display: "none" })
        .end("container-right-responsive togle-input")}
    >
      <input
        type="checkbox"
        defaultChecked={false}
        id="togle-menu-right-responsive"
      />
      <Backdrop />
      <Contenido />
    </_>
  );

  function Contenido() {
    return (
      <_ className="options">
        <EstadoEnVerdadero />
        <EstadoEnFalso />
      </_>
    );

    function EstadoEnVerdadero() {
      return (
        <Card
          onClick={() => {
            document.getElementById(
              "togle-menu-right-responsive"
            ).checked = false;
          }}
          elevation={6}
          className="sidebar right-responsive pad-20px true"
          style={{
            borderRadius: "15px",
          }}
        />
      );
    }

    function EstadoEnFalso() {
      return (
        <Fab
          color="primary false"
          onClick={() => {
            document.getElementById(
              "togle-menu-right-responsive"
            ).checked = true;
          }}
        >
          <i
            class="fa-solid fa-list-ul"
            style={{
              fontSize: "24px",
            }}
          />
        </Fab>
      );
    }
  }

  function Backdrop() {
    return (
      <label
        htmlFor="togle-menu-right-responsive"
        className="backdrop-right-menu"
      />
    );
  }
}

function updateTopRight() {
  const parent = document.querySelector(".root");
  const scrollparent = parent.scrollTop;
  const elementosIndexados = [...document.querySelectorAll(".indexed")].filter(
    (e) => !e.classList.contains("root")
  );
  document
    .querySelectorAll(".topest")
    .forEach((e) => e.classList.remove("topest"));
  const calcT = (e) => {
    const top = e.offsetTop;
    return top - scrollparent;
  };
  const distancias = elementosIndexados
    .sort((a, b) => {
      a = Math.abs(calcT(a));
      b = Math.abs(calcT(b));
      return a - b;
    })
    .filter((a) => calcT(a) < window.innerHeight);
  const topest = distancias[0];
  if (!topest) {
    return;
  }
  const indextop = document.getElementById(topest.id + "-index");
  if (indextop) {
    indextop.classList.add("topest");
  }
}

function SiderightMenu() {
  return (
    <Card
      variant="nofill"
      className={fluidCSS()
        .ltX(950, { display: "none" })
        .end("sidebar right pad-10px")}
    />
  );
}

function buscar_idR(query, tree = {}) {
  [...document.querySelectorAll(query)].forEach((e) => {
    if (e.id.startsWith("idR-")) {
      tree[e.id] ??= {};
      const query_idR = `#${e.id} > *`;
      buscar_idR(query_idR, tree[e.id]);
    }
  });
  return tree;
}

function onHash(id) {
  const parent = document.querySelector(".root");
  const topparent = parent.getBoundingClientRect().top;
  parent.scrollTo({
    top: document.getElementById(id).offsetTop - topparent - 50,
    behavior: "smooth",
  });
}

function generateIndex(tree) {
  return (
    <ul className="c-deepskyblue">
      {Object.entries(tree).map((t) => {
        if (!Object.keys(t[1]).length) {
          return (
            <li>
              <Link
                id={`${t[0]}-index`}
                color="inherit"
                underline="none"
                className="c-pointer link-index"
                onClick={() => onHash(t[0])}
                style={style_right_menu_item}
              >
                {(() => {
                  let elementT = document.getElementById(t[0]);
                  if (!elementT.className.includes("md")) {
                    elementT = elementT.querySelector(".titulo");
                  }
                  return elementT?.getAttribute("label") ?? elementT?.innerText;
                })()}
              </Link>
            </li>
          );
        } else {
          return (
            <li>
              <Link
                id={`${t[0]}-index`}
                color="inherit"
                underline="none"
                className="c-pointer link-index"
                onClick={() => onHash(t[0])}
                style={style_right_menu_item}
              >
                {(() => {
                  const elementT = document.getElementById(t[0]);
                  if (!elementT.className.includes("md")) {
                    elementT = elementT.querySelector(".titulo");
                  }
                  return elementT?.getAttribute("label") ?? elementT?.innerText;
                })()}
              </Link>
              {generateIndex(t[1], t[0])}
            </li>
          );
        }
      })}
    </ul>
  );
}

function updateIndexes() {
  loadIndexes();
  loadIndexes(true);

  function loadIndexes(inResponsive = false) {
    const r = inResponsive ? "-responsive" : "";
    ReactDOM.render(
      <_ style={style_right_menu_item}>
        <strong>
          <big>{config_template.selected.lbl}</big>
        </strong>
        <hr />
        {generateIndex(buscar_idR(".main-area .root > *"))}
      </_>,
      document.querySelector(".sidebar.right" + r)
    );
  }
}
