window["original_console_log"] ??= console.log;
window["original_console_error"] ??= console.error;

function reescribirConsolas() {
  console.log = evento_consola("log", window["original_console_log"]);
  console.error = evento_consola("error", window["original_console_error"]);
  // console.warn = evento_consola("warn");

  function evento_consola(clase = "log", original) {
    return function (...args) {
      setTimeout(() => {
        const output = args
          .map((arg) =>
            typeof arg === "object" ? JSON.stringify(arg, null, 2) : String(arg)
          )
          .join(" ");

        const _console_ = document.getElementById(
          "contenido-console-playground"
        );
        _console_.appendChild(
          (() => {
            const renglon = document.createElement("pre");
            renglon.classList.add(clase);
            renglon.textContent = output;
            return renglon;
          })()
        );
        while (_console_.childElementCount > 100) {
          _console_.removeChild(_console_.firstChild);
        }
      });
      if (original) {
        // original.apply(console, args);
      }
    };
  }
}

function sin_consola(){
  document.querySelector(".toggle-console").style.display = "none";
}

function abrir_consola() {
  const toggleinput = document.getElementById("toggle-console-checkbox");
  toggleinput.checked = true;
}

function bloquear_consola() {
  setTimeout(() => {
    const toggleinput = document.getElementById("toggle-console-checkbox");
    toggleinput.disabled = true;
  });
}

function cerrar_consola() {
  const toggleinput = document.getElementById("toggle-console-checkbox");
  toggleinput.checked = false;
}

reescribirConsolas();
