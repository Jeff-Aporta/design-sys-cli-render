import fs from "fs";

export {
    crear_carpeta_temp as crear_carpeta,
}

function crear_carpeta_temp(path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
}