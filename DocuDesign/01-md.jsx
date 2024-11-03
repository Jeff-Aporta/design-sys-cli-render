function $FMD(props) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <$F
        {...props}
        className={`content-container root indexed tw-balance padb-100px ${
          props.className ?? ""
        }`}
      />
    </ThemeProvider>
  );
}

function $F({ children, className = "" }) {
  setTimeout(updateIndexes, 1000);

  if (Array.isArray(children)) {
    return (
      <_
        className={className + " " + config_template.clases.text}
        onScroll={updateTopRight}
      >
        {children.map((child) => {
          if (typeof child === "string") {
            return <$F>{child}</$F>;
          }
          return child;
        })}
      </_>
    );
  }

  if (typeof children == "string") {
    const lines = children.split("\n");

    return lines.map((line) => {
      return titles(line);

      function titles(text) {
        if (typeof text != "string") {
          return text;
        }
        for (let h = 0; h < 8; h++) {
          const deep = h + 1;
          const hashs = Array.from({ length: deep }).fill("#").join("") + " ";
          if (text.startsWith(hashs)) {
            text = text.replace(hashs, "");
            return (
              <_
                id={idR()}
                class={`${$variatStr(`h${deep}`)} md titulo indexed`}
              >
                {text.trim()}
              </_>
            );
          }
        }
        return everywhere(text);
      }

      function everywhere(text) {
        text = negrilla(text);
        text = tachado(text);
        text = code(text);
        text = codesimple(text);
        text = links(text);
        return text;
      }

      function links(text) {
        if (typeof text != "string") {
          return text;
        }

        const parts = text.split(/(\[.*?\]\(.*?\))/g);

        if (parts.length == 1) {
          return parts[0];
        }

        return (
          <_>
            {parts.map((part) => {
              const match = part.match(/\[(.*?)\]\((.*?)\)/);
              if (match) {
                const params = match[2].split(",");
                if (params.length > 1) {
                  if (params.length == 3) {
                    return (
                      <span
                        style={{
                          color: `rgb(${params[0]},${params[1]},${params[2]})`,
                        }}
                      >
                        {everywhere(match[1])}
                      </span>
                    );
                  }
                  if (params.length == 4) {
                    return (
                      <span
                        style={{
                          color: `rgba(${params[0]},${params[1]},${params[2]},${params[3]})`,
                        }}
                      >
                        {everywhere(match[1])}
                      </span>
                    );
                  }
                }
                if (params.length == 1) {
                  if (params[0].includes("http")) {
                    return <Link href={match[2]}>{everywhere(match[1])}</Link>;
                  }
                  if (params[0]) {
                    return (
                      <span
                        style={{
                          color: match[2],
                        }}
                      >
                        {everywhere(match[1])}
                      </span>
                    );
                  }
                }
              }
              return everywhere(part); // Retorna el texto sin modificar si no hay coincidencia
            })}
          </_>
        );
      }

      function negrilla(text) {
        if (typeof text != "string") {
          return text;
        }
        const parts = text.split(/(\*\*.*?\*\*)/);
        if (parts.length == 1) {
          return parts[0];
        }
        return (
          <_>
            {parts.map((part) => {
              if (part.startsWith("**") && part.endsWith("**")) {
                return <strong>{everywhere(part.slice(2, -2))}</strong>;
              }
              return everywhere(part);
            })}
          </_>
        );
      }

      function codesimple(text) {
        if (typeof text != "string") {
          return text;
        }
        const parts = text.split(/(`.*?`)/);
        if (parts.length == 1) {
          return parts[0];
        }
        return (
          <_>
            {parts.map((part) => {
              if (part.startsWith("`") && part.endsWith("`")) {
                let content = part.slice(1, -1);
                return <code>{everywhere(content)}</code>;
              }
              return everywhere(part);
            })}
          </_>
        );
      }

      function code(text) {
        if (typeof text != "string") {
          return text;
        }
        const parts = text.split(/(```.*?```)/);
        if (parts.length == 1) {
          return parts[0];
        }
        return (
          <_>
            {parts.map((part) => {
              if (part.startsWith("```") && part.endsWith("```")) {
                let content = part.slice(3, -3);
                if (content.startsWith("url ")) {
                  content = content.replace("url ", "");
                  return (
                    <$Box elevation={0} style={{ color: "hotpink" }}>
                      <code>{content}</code>
                    </$Box>
                  );
                }
                if (content.startsWith("box ")) {
                  content = content.replace("box ", "");
                  return <$Box elevation={0}>{content}</$Box>;
                }
                return <code>{everywhere(content)}</code>;

                function $Box(props) {
                  return (
                    <$Copy>
                      <Card {...props} className="pad-10px mh-10px">
                        {everywhere(props.children)}
                      </Card>
                    </$Copy>
                  );
                }
              }
              return everywhere(part);
            })}
          </_>
        );
      }

      function tachado(text) {
        if (typeof text != "string") {
          return text;
        }
        const parts = text.split(/(~.*?~)/);
        if (parts.length == 1) {
          return parts[0];
        }
        return (
          <_>
            {parts.map((part) => {
              if (part.startsWith("~") && part.endsWith("~")) {
                return <s>{everywhere(part.slice(1, -1))}</s>;
              }
              return everywhere(part);
            })}
          </_>
        );
      }
    });
  }
}
