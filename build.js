import { build_SASS } from "merger-client-static-jsx";

import build_DocuDesign from './DocuDesign/build.js';

await build_SASS({
    mainSASS: "./comun/scss/abrevs.scss",
    outCSS: "./comun/css/main-sass.css",
});

build_DocuDesign();
