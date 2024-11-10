function loadStringsSync(url) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, false);
  xhr.send(null);

  if (xhr.status === 200) {
    return xhr.responseText;
  } else {
    console.error("Error al cargar el archivo:", xhr.status);
  }
}

function IDR(props) {
  return <_ {...props} id={idR()} />;
}

function get_id_param() {
  return (
    new URL(window.location.href).searchParams.get("id") ??
    config_template.default_id
  );
}

function changeContent({
  id,
  save = true,
  notFound = <h1>Referencia no encontrada</h1>,
  noContent = <h1>Sin contenido aún</h1>,
  noMapSite = <h1>Necesitas un mapa de sitio</h1>,
}) {
  const { default_id, mapSite } = config_template;
  id ??= default_id;

  const mainArea = document.querySelector(".main-area");
  const sidebars = [
    document.querySelector(".sidebar.left"),
    document.querySelector(".sidebar.left-responsive .content"),
  ];
  if (!mapSite) {
    ReactDOM.render(noMapSite, mainArea);
  }
  const element = findID(id, mapSite);
  if (!element) {
    ReactDOM.render(notFound, mainArea);
    return;
  }
  config_template.selected = element;
  let content = element.content;
  if (!content) {
    ReactDOM.render(noContent, mainArea);
    return;
  }
  content = content();
  ReactDOM.render(content, mainArea);
  for (const sidebar of sidebars) {
    $muiRender(
      <ContentLeftMenu idSelected={id} def={default_id} mapSite={mapSite} />,
      sidebar
    );
  }
  setTimeout(() => {
    updateIndexes();
    updateTopRight();
  });

  if (save) {
    let url = new URL(window.location.href);
    url.searchParams.set("id", id);
    if (id == default_id) {
      url.searchParams.delete("id");
    }
    window.history.pushState({}, "", url);
  }

  function findID(id, map) {
    if (!id) {
      throw new Error("No hay ID");
    }
    for (const element of map) {
      if (element.id === id) {
        return element;
      }
      if (element.childs) {
        const result = findID(id, element.childs);
        if (result) {
          return result;
        }
      }
    }
  }
}