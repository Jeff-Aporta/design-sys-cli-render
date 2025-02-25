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
