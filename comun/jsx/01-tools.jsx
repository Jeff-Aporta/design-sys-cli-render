function loadStringsSync(url) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, false);
  xhr.send(null);

  if (xhr.status === 200) {
    return xhr.responseText;
  } else {
    console.log(xhr);
    console.error("Error al cargar el archivo:", xhr.status);
  }
}

function force_extension(filename, extension) {
  if (!filename.endsWith("." + extension)) {
    return filename + "." + extension;
  }
  return filename;
}

function pathjoin(...paths) {
  const retorno = paths.join("/").replace(/\/+/g, "/");
  return retorno;
}

function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}