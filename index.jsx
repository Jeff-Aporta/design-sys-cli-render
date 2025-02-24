function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="contenido-principal">
        <Typography variant="h2" className="titulo-principal">
          <b>Bienvenido</b> al sistema de diseños para sitios estáticos de{" "}
          <b className="c-skyblue">Jeff Aporta</b>
        </Typography>
        <hr />
        <div className="contenedor-temas mh-30px">
          <CartaTema
            titulo="DocuDesign"
            imagen="src/img/DocuDesign-prev_1000x471.png"
            descripcion="Documenta de forma atractiva"
            href="DocuDesign"
          />
          <CartaTema
            titulo="Playground"
            imagen="src/img/Playground-prev_1000x273.png"
            descripcion="Ejecución de código desde el navegador"
            href="componentes/playground"
          />
        </div>
      </div>
    </ThemeProvider>
  );

  function CartaTema({
    titulo,
    imagen,
    descripcion,
    href,
    texto_boton = "Quiero aprender",
  }) {
    return (
      <Card className="tema d-block">
        <div className="diseño min-h-100px overflow-hidden">
          <img
            className="absolute-expand of-cover filtered"
            style={{ "--blur": "2px" }}
            src={imagen}
          />
          <img className="absolute-expand of-contain" src={imagen} />
          <div className="capa sombra"></div>
          <div className="capa centrar pad-30px"></div>
        </div>
        <hr />
        <div className="card-body m-10px">
          <CardContent>
            <Typography variant="h3">{titulo}</Typography>
            <br />
            <Typography variant="body2" color="textSecondary">
              {descripcion}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="large"
              variant="contained"
              href={href}
              fullWidth
            >
              <div className="d-flex jc-space-between ai-center fullWidth fs-140p">
                <span>{texto_boton}</span>
                <i className="fa-solid fa-graduation-cap"></i>
              </div>
            </Button>
          </CardActions>
        </div>
      </Card>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
