function _sect1() {
  setTimeout(PR.prettyPrint);
  return (
    <$FMD>
      ## Bienvenido
      <$h />
      #### Template DocuDesign
      <$h />
      ###### Pensado para documentaciones
      <$$h />
      <$index>
        <h1>Hola</h1>
      </$index>
      Framework de diseño y desarrollo para documentaciones web. crea documentos
      profesionales y fácilmente mantenibles.
      <$$h />
      <$$h />
      <Button variant="contained" href="../../">
        Ir a la raíz.
      </Button>
      <$Copy>
        <$PR lang="html" className="pad-10px mh-20px">{`
        <html>
          <head>
            <title>Web Ejemplo</title>
            ...
            <script
              type="text/javascript"
              src="https://jeff-aporta.github.io/ascii-maploader/static/js/index.all.min.js"
            ></script>
            <script>
              asciiMap
                .tre()
                .subDir("name-branch", (branch) => {
                  branch.css("styles").js("script").jsx("App");
                })
                .writehtml();
            </script>
            ...
          </head>
          <body>
            ...Contenido del body
          </body>
        </html>
      `}</$PR>
      </$Copy>
    </$FMD>
  );
}
