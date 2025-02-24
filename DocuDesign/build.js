import { merger, build_SASS, copiar_archivos_a_otra_carpeta, cssMerger } from "merger-client-static-jsx";

import fs from "fs";

import { crear_carpeta } from "../build-tools.js";

export default async () => {
    const temp = fs.mkdtempSync("./temp")
    crear_carpeta(`./${temp}/css`)
    crear_carpeta(`./${temp}/jsx`)

    copiar_archivos_a_otra_carpeta({
        folderInput: "./DocuDesign/css",
        folderOutput: `./${temp}/css`,
        extension: ".css"
    })

    copiar_archivos_a_otra_carpeta({
        folderInput: "./comun/css",
        folderOutput: `./${temp}/css`,
        extension: ".css"
    })

    copiar_archivos_a_otra_carpeta({
        folderInput: "./DocuDesign/jsx",
        folderOutput: `./${temp}/jsx`,
        extension: ".jsx"
    })

    copiar_archivos_a_otra_carpeta({
        folderInput: "./comun/jsx",
        folderOutput: `./${temp}/jsx`,
        extension: ".jsx"
    })

    cssMerger({
        folderCSS: `./${temp}/css`,
        outfile: "./DocuDesign/static/all.styles.min.css",
    })

    await merger({
        folderRoot: `./${temp}/jsx`,
        output: "./DocuDesign/static/all.templates.min.js",
    });

    if (fs.existsSync(temp)) {
        await new Promise(resolve => setTimeout(() => {
            fs.rmSync(temp, { recursive: true, force: true });
            resolve();
        }, 100));
    }
}