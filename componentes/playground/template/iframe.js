const original_console_log = console.log;

console.log = function (...args) {
  const output = args
    .map((arg) =>
      typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
    )
    .join(" ");

  const _console_ = document.getElementById("contenido-console-playground");
  _console_.appendChild(
    (() => {
      const renglon = document.createElement("pre");
      renglon.textContent = output;
      return renglon;
    })()
  );
  while (_console_.childElementCount > 100) {
    _console_.removeChild(_console_.firstChild);
  }
  // original_console_log.apply(console, args);
};

function abrir_consola() {
    const toggleinput = document.getElementById("toggle-console-checkbox");
    toggleinput.checked = true;
}

function cerrar_consola() {
    const toggleinput = document.getElementById("toggle-console-checkbox");
    toggleinput.checked = false;
}