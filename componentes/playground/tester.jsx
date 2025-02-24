function App() {
  const [_themename_, setThemeMode] = React.useState(themename);

  console.log("Theme Mode:", _themename_, themename);
  themename != _themename_ && selectThemeName(_themename_);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Editor_en_linea
        nombre_proyecto="proyecto-de-prueba-1"
        plantilla_HTML="template/iframe.html"
        extra_js={() => abrir_consola()}
        HTML={Array.from(
          { length: 50 },
          (_, i) => `<h3>Hola desde el encabezado 1</h3>`
        ).join("")}
        JS={`console.log("Hola desde JavaScript")`}
        index={0}
      />
      <div className="p-fixed right-10px bottom-10px">
        <Button
          variant="contained"
          onClick={() => setThemeMode(isThemeDark ? "light" : "dark")}
        >
          {isThemeDark ? "☀️ Modo Claro" : "🌙 Modo Oscuro"}
        </Button>
      </div>
    </ThemeProvider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
