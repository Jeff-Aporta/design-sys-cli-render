function initApp() {
  setup();
  burn_template();
  ready();

  function setup() {
    Object.assign(config_template, {
      banner: {
        left: {
          label: "Documentación",
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
      default_id: "sect1",
      mapSite: _mapSite(),
      repo: {
        name: "ASCII Map Loader",
        url: "https://github.com/Jeff-Aporta/ascii-maploader",
      },
    });
  }

  function burn_template() {
    ReactDOM.render(<App />, document.getElementById("root"));
  }

  function ready() {
    changeContent({ id: get_id_param() });
  }

  function _mapSite() {
    return [
      {
        lbl: " ",
      },
      {
        component: () => (
          <center>
            <Button
              color="darkprimary"
              variant="contained"
              startIcon={<i className="fa fa-globe" />}
              target="_blank"
              href="https://jeff-aporta.github.io/portafolio/"
            >
              Más en mi portafolio
            </Button>
          </center>
        ),
      },
      {
        lbl: " - ",
      },
      {
        lbl: "title 1",
      },
      {
        lbl: "Página 1",
        id: "sect1",
        content: () => <_sect1 />,
        i: "fa-regular fa-file-lines",
      },
      {
        lbl: "Página 2",
        id: "sect2",
        i: "fa-solid fa-chalkboard-user",
      },
      {
        lbl: " ",
      },
      {
        lbl: "title 2",
      },
      {
        lbl: "Página 3",
        id: "sect3",
        i: "fa-solid fa-code",
      },
      {
        lbl: "Página 4",
        id: "sect4",
        i: "fa-solid fa-code",
      },
      {
        lbl: "Acordeón 1",
        childs: [
          {
            lbl: "Sub acordeon 1",
            id: "sub1",
          },
          {
            lbl: "Sub acordeon 1",
            id: "sub2",
          },
        ],
      },
      {
        lbl: "  ",
      },
    ];
  }
}
