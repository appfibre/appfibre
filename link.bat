:init
@echo off
rd rollup-plugin-jst\node_modules\@appfibre\jst\dist
rd webpack-plugin-jst\node_modules\@appfibre\jst\dist
rd tests\node_modules\@appfibre\rollup-plugin-jst\dist
rd tests\node_modules\@appfibre\webpack-plugin-jst\dist
rd tests\node_modules\@appfibre\jst-preact\dist
rd tests\node_modules\@appfibre\jst-react\dist
rd examples\app\node_modules\@appfibre\jst\dist
rd examples\pwa\node_modules\@appfibre\jst\dist
rd examples\pwa\node_modules\@appfibre\jst-react\dist
rd examples\pwa\node_modules\@appfibre\webpack-plugin-jst\dist
rd examples\app\cdn
rd docs\cdn
rd tests\node_modules\@appfibre\jst\dist
rd local-cdn\jst
rd local-cdn\rollup-plugin-jst
rd local-cdn\systemjs
rd local-cdn\react\cjs
rd local-cdn\react-dom\umd
rd local-cdn\react-dom\cjs
rd local-cdn\react\umd
rd local-cdn\preact
rd local-cdn\es-module-loader

mklink /d rollup-plugin-jst\node_modules\@appfibre\jst\dist ..\..\..\..\jst\dist
mklink /d webpack-plugin-jst\node_modules\@appfibre\jst\dist ..\..\..\..\jst\dist
mklink /d tests\node_modules\@appfibre\jst\dist ..\..\..\..\jst\dist
mklink /d examples\app\node_modules\@appfibre\jst\dist ..\..\..\..\..\jst\dist
mklink /d examples\app\cdn ..\..\local-cdn
mklink /d examples\pwa\node_modules\@appfibre\jst\dist ..\..\..\..\..\jst\dist
mklink /d examples\pwa\node_modules\@appfibre\jst-react\dist ..\..\..\..\..\jst-react\dist
mklink /d examples\pwa\node_modules\@appfibre\webpack-plugin-jst\dist ..\..\..\..\..\webpack-plugin-jst\dist
mklink /d docs\cdn ..\local-cdn
mklink /d tests\node_modules\@appfibre\jst-preact\dist ..\..\..\..\jst-preact\dist
mklink /d tests\node_modules\@appfibre\jst-react\dist ..\..\..\..\jst-react\dist
mklink /d tests\node_modules\@appfibre\webpack-plugin-jst\dist ..\..\..\..\webpack-plugin-jst\dist
mklink /d tests\node_modules\@appfibre\rollup-plugin-jst\dist ..\..\..\..\rollup-plugin-jst\dist
mklink /d local-cdn\jst ..\jst\dist
mklink /d local-cdn\rollup-plugin-jst ..\rollup-plugin-jst\dist
mklink /d local-cdn\systemjs ..\local-cdn\node_modules\systemjs\dist
mklink /d local-cdn\react\cjs ..\..\local-cdn\node_modules\react\cjs
mklink /d local-cdn\react\umd ..\..\local-cdn\node_modules\react\umd
mklink /d local-cdn\react-dom\cjs ..\..\local-cdn\node_modules\react-dom\cjs
mklink /d local-cdn\react-dom\umd ..\..\local-cdn\node_modules\react-dom\umd
mklink /d local-cdn\preact ..\local-cdn\node_modules\preact\dist
mklink /d local-cdn\es-module-loader ..\local-cdn\node_modules\es-module-loader\core