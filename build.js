import { merger, build_SASS, cssMerger } from "merger-client-static-jsx";

// await build_SASS({
//   mainSASS: "./DocuDesign/scss/abrevs.scss",
//   outCSS: "./DocuDesign/css/main-sass.css",
// });

await cssMerger({ folderCSS: "./DocuDesign/css", outfile: "./DocuDesign/static/all.styles.min.css" })

// merger({
//   folderRoot: "./DocuDesign",
//   output: "./DocuDesign/static/all.templates.min.js",
// });
