function _sect1() {
  return (
    <$FMD>
      ## Bienvenido
      <$h />
      #### Template DocuDesign
      <$h />
      ###### Pensado para documentaciones
      <$$h />
      <_$testing
        src_params_iife={{
          url: "test-url.js",
          name: "name_test",
          comment: "comment test OK",
        }}
        src_params_module={{
          url: "test-url.js",
          name: "name_test",
          comment: "comment test OK",
        }}
      />
      <$CardDef title="Detalles Técnicos de Implementación">
        <$ul>
          <$li>
            La función `JS2CSS` transforma el objeto `objJs` en texto CSS,
            manejando correctamente las reglas anidadas y eliminando caracteres
            superfluos, como comillas o saltos de línea adicionales.
          </$li>
          <$li>
            `insertStyle` utiliza `JS2CSS` para generar el CSS formateado y lo
            inyecta en el elemento `style.innerHTML`, ya sea en un
            `&lt;style&gt;` nuevo o en uno ya existente, según lo especificado
            en `props`.
          </$li>
        </$ul>
      </$CardDef>
      (ej. `props = &#123; style: styleDOM, ... &#125;`).
      <$index>
        <h1>Hola</h1>
      </$index>
      Framework de diseño y desarrollo para documentaciones web. crea documentos
      profesionales y fácilmente mantenibles.
      <$$h />
      <$$h />
      <_$Bienvenido
        label="abc"
        name_app="Fluid CSS"
        img_url="https://jeff-aporta.github.io/fluid-css/static/img/app.svg"
      >
        Sistema avanzado de manejo y manipulación de estilos CSS dinámicos,
        basado en comandos personalizados.
        <p>
          Diseñado para ajustar y personalizar estilos en función de condiciones
          específicas, Fluid CSS permite definir reglas CSS que responden a
          parámetros como el tamaño de la pantalla, mediante comandos de estilo
          encapsulados.
        </p>
      </_$Bienvenido>
      <Button variant="contained" href="../../">
        Ir a la raíz.
      </Button>
      <_$Instalación
        url_cdn="https://jeff-aporta.github.io/fluid-css/static/js/index.all.min.js"
        npm_pack="fluid-css-lng"
      />
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
