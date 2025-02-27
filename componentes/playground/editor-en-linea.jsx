let index_code_mirror = 0;

function Editor_en_linea(props) {
  let {
    JS,
    JSX,
    CSS,
    HTML,
    files = {},
    index = -1,
    src_HTML,
    plantilla_HTML,
    nombre_proyecto,

    auto_ejecutar = true,
    extra_js = "",

    playground_extra_clases = "estilo-fila-mini",

    ocultar_pestañas = false,

    ocultar_pestaña_HTML = false,
    ocultar_pestaña_CSS = false,
    ocultar_pestaña_JS = false,
    ocultar_pestaña_JSX = false,
  } = props;

  if (!plantilla_HTML && !src_HTML) {
    return <h1 className="c-red">No hay plantilla HTML disponible.</h1>;
  }

  switch (CSS) {
    case "#basic-console":
      CSS = `
        body{
          background: linear-gradient(to right, #000000, #121236);
          color: white;
          font-family: sans-serif;
        }
        
        div.body{
          position: fixed;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `;
      break;
  }

  switch (HTML) {
    case "#basic-console":
      HTML = `
        <div class='body'>
          <img 
            src="https://jeff-aporta.github.io/design-sys-cli-render/componentes/playground/basic-console.svg"
            width="50%"
            height="50%"
            style="object-fit: contain;"
          />
        </div>
      `;
      break;
  }

  const [openDialogDownload, setOpenDialogDownload] = React.useState(false);

  const abrirAlertaDescarga = () => {
    setOpenDialogDownload(true);
  };

  const cerrarAlerta = () => {
    setOpenDialogDownload(false);
  };

  let init = false;

  let editorHTML, editorCSS, editorJS, editorJSX;
  const printWidth = 60;
  const transformar_columna = 1000;

  const textoHTML = React.useRef(HTML ?? "");
  const textoCSS = React.useRef(CSS ?? "");
  const textoJS = React.useRef(JS ?? "");
  const textoJSX = React.useRef(JSX ?? "");
  const timerWindowResize = React.useRef(Date.now());
  const idR = React.useRef(Math.random().toString(30).replace("0.", ""));

  const ref = React.useRef(null);
  const refIframe = React.useRef(null);

  React.useEffect(() => {
    cargarPlantillaHTML();

    function cargarPlantillaHTML() {
      if (!refIframe.current) {
        return setTimeout(cargarPlantillaHTML, 1000);
      }
      if (plantilla_HTML) {
        const iframe = refIframe.current;
        const docIframe =
          iframe.contentDocument || iframe.contentWindow.document;
        docIframe.open();
        docIframe.write(plantilla_HTML);
        docIframe.close();
        cargarArchivos();
      }
    }

    async function cargarArchivos() {
      if (index != -1 && index <= index_code_mirror) {
        const _html = await procesarArreglo(files.HTML);
        const _css = await procesarArreglo(files.CSS);
        const _js = await procesarArreglo(files.JS);
        const _jsx = await procesarArreglo(files.JSX);
        textoHTML.current = HTML ?? _html ?? "";
        textoCSS.current = CSS ?? _css ?? "";
        textoJS.current = JS ?? _js ?? "";
        textoJSX.current = JSX ?? _jsx ?? "";
        formatearCodigo();
        if (auto_ejecutar) {
          ejecutarCodigo();
        }
        setTimeout(() => {
          index_code_mirror++;
        }, 50);
        return;
      }
      setTimeout(cargarArchivos, 200);
    }

    async function procesarArreglo(arr) {
      let loadText = [];
      if (!arr) return;
      if (!Array.isArray(arr)) {
        arr = [arr];
      }
      for (const file of arr) {
        loadText.push(await cargar(file));
      }
      return loadText.join("\n\n");

      async function cargar(ruta) {
        try {
          const response = await fetch(ruta);
          if (!response.ok) {
            throw new Error(
              "Error al obtener el archivo: " + response.statusText
            );
          }
          const texto = await response.text();
          return texto;
        } catch (error) {}
        return "";
      }
    }
  }, []);

  return <ComponenteRetorno />;

  function ComponenteRetorno() {
    const [windowWidth, updateWindowWidth] = React.useState(window.innerWidth);

    React.useEffect(() => {
      function handleResize() {
        if (Date.now() - timerWindowResize.current < 1500) {
          return;
        }
        timerWindowResize.current = Date.now();
        setTimeout(updateWindowWidth(window.innerWidth), 5000 * Math.random());
      }
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }, []);

    React.useLayoutEffect(() => {
      formatearCodigo();
      if (auto_ejecutar) {
        ejecutarCodigo();
      }
      if (init) {
        crearEditores();
        return;
      }
      init = true;
    }, [windowWidth]);

    const wp = 45;

    return (
      <div
        ref={ref}
        className={`
          codemirror-instance 
          ${playground_extra_clases} 
          ${isThemeDark ? "" : "light"}
          d-flex
          jc-center
          ai-stretch
        `}
        style={{
          flexWrap: "wrap",
          flexDirection: "column-reverse",
        }}
      >
        <PestañasVerticales className="fullWidth" />
        <Paper elevation={6} className="contenedor-iframe fullWidth">
          <iframe ref={refIframe} src={src_HTML} id={`output`}></iframe>
        </Paper>
        <ConfirmarDescarga
          titulo={`Descargar ${nombre_proyecto}.zip`}
          mensaje="Continuar con la descarga"
        />
      </div>
    );

    function PestañasVerticales({ className }) {
      const [valor, setValor] = React.useState(
        (() => {
          return Math.max(
            0,
            [
              ocultar_pestaña_HTML,
              ocultar_pestaña_CSS,
              ocultar_pestaña_JS,
              ocultar_pestaña_JSX,
            ]
              .map((x) => !x)
              .indexOf(true)
          );
        })()
      );

      const manejarCambio = (evento, nuevoValor) => {
        setValor(nuevoValor);
      };

      React.useLayoutEffect(() => {
        crearEditores();
        formatearCodigo();
      }, [valor]);

      const classEditor = "editor-container";

      const editor_html = (
        <div id="editor-html" className={classEditor}>
          <textarea id={`html-code`}>{textoHTML.current}</textarea>
        </div>
      );

      const editor_css = (
        <div id="editor-css" className={classEditor}>
          <textarea id={`css-code`}>{textoCSS.current}</textarea>
        </div>
      );

      const editor_js = (
        <div id="editor-js" className={classEditor}>
          <textarea id={`js-code`}>{textoJS.current}</textarea>
        </div>
      );

      const editor_jsx = (
        <div id="editor-jsx" className={classEditor}>
          <textarea id={`jsx-code`}>{textoJSX.current}</textarea>
        </div>
      );

      let i = 0;
      let j = 0;

      const brk_prestañas = 850;

      return (
        <Box
          className={className}
          sx={{
            bgcolor: "background.paper",
            display: "flex",
            ...(() => {
              const retorno = {};
              if (windowWidth < brk_prestañas) {
                retorno.flexDirection = "column";
              }
              return retorno;
            })(),
          }}
        >
          <Tabs
            orientation={
              windowWidth < brk_prestañas ? "horizontal" : "vertical"
            }
            value={valor}
            onChange={manejarCambio}
            className="tabs"
            sx={{
              borderRight: 1,
              borderColor: "divider",
              ...(() => {
                const retorno = {};
                if (ocultar_pestañas) {
                  retorno.display = "none";
                }
                if (windowWidth > brk_prestañas) {
                  retorno.width = "100px";
                }
                return retorno;
              })(),
            }}
          >
            {
              <Tab
                style={{
                  display: ocultar_pestaña_HTML ? "none" : "block",
                }}
                label={
                  <BotonPestaña icon={<i class="fa-solid fa-code"></i>}>
                    HTML
                  </BotonPestaña>
                }
                {...propAccesibilidad(i++)}
              />
            }
            {
              <Tab
                style={{
                  display: ocultar_pestaña_CSS ? "none" : "block",
                }}
                label={
                  <BotonPestaña icon={<i class="fa-brands fa-css"></i>}>
                    CSS
                  </BotonPestaña>
                }
                {...propAccesibilidad(i++)}
              />
            }
            {
              <Tab
                style={{
                  display: ocultar_pestaña_JS ? "none" : "block",
                }}
                label={
                  <BotonPestaña icon={<i class="fa-brands fa-square-js"></i>}>
                    JS
                  </BotonPestaña>
                }
                {...propAccesibilidad(i++)}
              />
            }
            {
              <Tab
                style={{
                  display: ocultar_pestaña_JSX ? "none" : "block",
                }}
                label={
                  <BotonPestaña icon={<i class="fa-brands fa-react"></i>}>
                    JSX
                  </BotonPestaña>
                }
                {...propAccesibilidad(i++)}
              />
            }
          </Tabs>
          {
            <TabPanel
              style={{
                display: ocultar_pestaña_HTML ? "none" : "block",
              }}
              valor={valor}
              index={j++}
            >
              {editor_html}
            </TabPanel>
          }
          {
            <TabPanel
              style={{
                display: ocultar_pestaña_CSS ? "none" : "block",
              }}
              valor={valor}
              index={j++}
            >
              {editor_css}
            </TabPanel>
          }
          {
            <TabPanel
              style={{
                display: ocultar_pestaña_JS ? "none" : "block",
              }}
              valor={valor}
              index={j++}
            >
              {editor_js}
            </TabPanel>
          }
          {
            <TabPanel
              style={{
                display: ocultar_pestaña_JSX ? "none" : "block",
              }}
              valor={valor}
              index={j++}
            >
              {editor_jsx}
            </TabPanel>
          }
          <div className="d-none">
            {editor_html}
            {editor_css}
            {editor_js}
            {editor_jsx}
          </div>
          <div id="botones-control">
            <Tooltip title="Ejecutar código" placement="right">
              <IconButton
                variant="contained"
                color="contrast"
                onClick={ejecutarCodigo}
                className="boton ejecutar codigo"
              >
                <i className="fa fa-play" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Descargar" placement="right">
              <IconButton
                variant="contained"
                color="contrast"
                onClick={abrirAlertaDescarga}
                className="boton ejecutar descarga"
              >
                <i className="fa fa-download" />
              </IconButton>
            </Tooltip>
          </div>
        </Box>
      );

      function BotonPestaña({ icon, children }) {
        return (
          <big
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              width: "100%",
              paddingRight: "10px",
            }}
          >
            {icon}
            <b>{children}</b>
          </big>
        );
      }

      function TabPanel(props) {
        const { children, valor, index, ...otros } = props;

        return (
          <div
            role="tabpanel"
            hidden={valor !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...otros}
          >
            {valor === index && (
              <Box sx={{ p: 3 }}>
                <Typography>{children}</Typography>
              </Box>
            )}
          </div>
        );
      }

      function propAccesibilidad(index) {
        return {
          id: `vertical-tab-${index}`,
          "aria-controls": `vertical-tabpanel-${index}`,
        };
      }
    }
  }

  function crearEditores() {
    const idEditores = ["html-code", "css-code", "js-code", "jsx-code"];
    if (!ref.current) {
      return setTimeout(crearEditores, 50);
    }
    editorHTML = CodeMirror.fromTextArea(
      ref.current.querySelector("#" + idEditores[0]),
      {
        mode: "htmlmixed",
        lineNumbers: true,
        theme: asciiMap.CLI.codemirror_theme_name(),
      }
    );

    editorHTML.on("change", function (instancia, objetoCambio) {
      textoHTML.current = instancia.getValue();
    });
    editorHTML.on("keydown", capturarComando);

    editorCSS = CodeMirror.fromTextArea(
      ref.current.querySelector("#" + idEditores[1]),
      {
        mode: "text/x-scss",
        lineNumbers: true,
        theme: asciiMap.CLI.codemirror_theme_name(),
      }
    );

    editorCSS.on("change", function (instancia, objetoCambio) {
      textoCSS.current = instancia.getValue();
    });
    editorCSS.on("keydown", capturarComando);

    editorJS = CodeMirror.fromTextArea(
      ref.current.querySelector("#" + idEditores[2]),
      {
        mode: "javascript",
        lineNumbers: true,
        theme: asciiMap.CLI.codemirror_theme_name(),
      }
    );

    editorJS.on("change", function (instancia, objetoCambio) {
      textoJS.current = instancia.getValue();
    });
    editorJS.on("keydown", capturarComando);

    editorJSX = CodeMirror.fromTextArea(
      ref.current.querySelector("#" + idEditores[3]),
      {
        mode: "javascript",
        lineNumbers: true,
        theme: asciiMap.CLI.codemirror_theme_name(),
      }
    );

    editorJSX.on("change", function (instancia, objetoCambio) {
      textoJSX.current = instancia.getValue();
    });
    editorJSX.on("keydown", capturarComando);

    function capturarComando(cm, evento) {
      if (evento.altKey && evento.shiftKey && evento.key === "F") {
        formatearCodigo();
      }
    }
  }

  function ConfirmarDescarga({
    textoConfirmar = "Descargar",
    textoCancelar = "Cancelar",
    titulo = "Descargar el ejercicio",
    mensaje = "¿Estás seguro de querer descargar el ejercicio?",
  }) {
    return (
      <Dialog
        open={openDialogDownload}
        onClose={cerrarAlerta}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{titulo}</DialogTitle>
        <DialogContent>
          <DialogContentText>{mensaje}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              cerrarAlerta();
            }}
          >
            {textoCancelar}
          </Button>
          <Button
            onClick={() => {
              cerrarAlerta();
              descargarCodigo({
                archivos: {
                  "index.html": prettier.format(
                    `
                    <!DOCTYPE html>
                    <html lang="es">
                      <head>
                        <title>${nombre_proyecto}</title>
  
                        <script
                          type="text/javascript"
                          src="https://jeff-aporta.github.io/ascii-maploader/static/js/index.all.min.js"
                        ></script>
                
                        <script>
                          asciiMap.CLI.react_mui_fa();
                          asciiMap.CLI.fluidCSS();
                          asciiMap.CLI.JS2CSS();
                        </script>
  
                        <script type="text/babel">
                          if (typeof window != "undefined" && window["MaterialUI"]) {
                            Object.assign(window, window["MaterialUI"]);
                          }
                        </script>
  
                        ${
                          textoCSS
                            ? `<link rel="stylesheet" href="styles.css" />`
                            : ""
                        }
                        ${
                          textoJS
                            ? `<script src="script.js" defer></script>`
                            : ""
                        }
                        ${
                          textoJSX
                            ? `<script type="text/babel" src="script.jsx"></script>`
                            : ""
                        }
                      </head>
                      <body>
                        ${textoHTML.current}
                      </body>
                    </html>
                    `,
                    {
                      parser: "html",
                      plugins: prettierPlugins,
                    }
                  ),
                  ...(() => {
                    const retorno = {};
                    if (textoCSS) {
                      retorno["styles.css"] = textoCSS;
                    }
                    if (textoJS) {
                      retorno["script.js"] = textoJS;
                    }
                    if (textoJSX) {
                      retorno["script.jsx"] = textoJSX;
                    }
                    return retorno;
                  })(),
                },
                nombre_proyecto: nombre_proyecto,
              });
            }}
            autoFocus
          >
            {textoConfirmar}
          </Button>
        </DialogActions>
      </Dialog>
    );

    function descargarCodigo({ archivos }) {
      if (!archivos) {
        console.error("No hay archivos para descargar");
      }

      const zip = new JSZip();

      const carpeta = zip.folder(nombre_proyecto ?? "Proyecto");

      Object.entries(archivos).forEach(([nombre, contenido]) => {
        carpeta.file(nombre, contenido);
      });

      zip.generateAsync({ type: "blob" }).then(function (content) {
        saveAs(content, nombre_proyecto + ".zip");
      });
    }
  }

  function extra_js_str() {
    return `\n${
      typeof extra_js === "string"
        ? extra_js
        : `setTimeout(${extra_js.toString()});`
    }`;
  }

  function ejecutarCodigo() {
    const iframe = refIframe.current;
    const docIframe = iframe.contentDocument || iframe.contentWindow.document;
    if (!docIframe.querySelector("#contenido-html-playground")) {
      return setTimeout(ejecutarCodigo, 100);
    }
    if (src_HTML) {
      iframe.contentWindow.location.reload();
      iframe.onload = recalcular;
    } else {
      recalcular();
    }
    function recalcular() {
      if (plantilla_HTML) {
        docIframe.open();
        docIframe.write("");
        const t = plantilla_HTML
          .replace("// Run JS", textoJSExec())
          .replace("// Run JSX", textoJSX.current);
        docIframe.write(t);
        docIframe.close();
      }
      modContenedor(
        docIframe.querySelector("#contenido-html-playground"),
        textoHTML.current
      );
      modContenedor(
        docIframe.querySelector("#contenido-css-playground"),
        textoCSS.current
      );
      modContenedor(
        docIframe.querySelector("#contenido-js-playground"),
        textoJSExec()
      );
      modContenedor(
        docIframe.querySelector("#contenido-jsx-playground"),
        textoJSX.current
      );

      function modContenedor(contenedor, contenido) {
        if (contenedor == null || contenido == null) {
          return;
        }
        contenedor.innerHTML = contenido;
      }
    }
  }

  function textoJSExec() {
    return `
      var user_executed = false;
      function userexecute(){
        if(user_executed){
          return;
        }
        user_executed = true;
        ${textoJS.current}
        ${extra_js_str()}
      }
      function testinit(){
        if(!window["abrir_consola"]){
          return setTimeout(testinit, 100);
        }
        userexecute();
      }

      setTimeout(testinit, 100);
    `;
  }

  // Función para formatear el código usando Prettier
  function formatearCodigo() {
    if (!editorHTML || !editorCSS || !editorJS || !editorJSX) {
      return setTimeout(formatearCodigo, 500);
    }
    try {
      var contenidoHTML = textoHTML.current;
      var contenidoCSS = textoCSS.current;
      var contenidoJS = textoJS.current;
      var contenidoJSX = textoJSX.current;

      let htmlFormateado = prettier.format(contenidoHTML, {
        parser: "html",
        plugins: prettierPlugins,
        printWidth,
      });
      let cssFormateado = prettier.format(contenidoCSS, {
        parser: "css",
        plugins: prettierPlugins,
        printWidth,
      });
      let jsFormateado = prettier.format(contenidoJS, {
        parser: "babel",
        plugins: prettierPlugins,
        printWidth,
      });

      let jsxFormateado = prettier.format(contenidoJSX, {
        parser: "babel",
        plugins: prettierPlugins,
        printWidth,
      });

      editorHTML.setValue(htmlFormateado);
      editorCSS.setValue(cssFormateado);
      editorJS.setValue(jsFormateado);
      editorJSX.setValue(jsxFormateado);

      textoHTML.current = htmlFormateado;
      textoCSS.current = cssFormateado;
      textoJS.current = jsFormateado;
      textoJSX.current = jsxFormateado;
    } catch (error) {
      alert("Error al formatear el código: " + error.message);
    }
  }
}
