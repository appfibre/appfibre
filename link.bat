:init
@rd rollup-plugin-jst\node_modules\@appfibre\jst\dist
@rd webpack-plugin-jst\node_modules\@appfibre\jst\dist
@rd tests\node_modules\@appfibre\rollup-plugin-jst\dist
@rd tests\node_modules\@appfibre\webpack-plugin-jst\dist
@rd tests\node_modules\@appfibre\jst-preact\dist
@rd tests\node_modules\@appfibre\jst-react\dist
@rd examples\app\node_modules\@appfibre\jst\dist
@rd examples\ts\node_modules\@appfibre\jst\dist
@rd examples\ts\node_modules\@appfibre\jst-react\dist
@rd examples\ts\node_modules\@appfibre\webpack-plugin-jst\dist
@rd examples\app\cdn
@rd tests\node_modules\@appfibre\jst\dist


mklink /d rollup-plugin-jst\node_modules\@appfibre\jst\dist ..\..\..\..\jst\dist
mklink /d webpack-plugin-jst\node_modules\@appfibre\jst\dist ..\..\..\..\jst\dist
mklink /d tests\node_modules\@appfibre\jst\dist ..\..\..\..\jst\dist
mklink /d examples\app\node_modules\@appfibre\jst\dist ..\..\..\..\..\jst\dist
mklink /d examples\app\cdn ..\..\local-cdn
mklink /d examples\ts\node_modules\@appfibre\jst\dist ..\..\..\..\..\jst\dist
mklink /d examples\ts\node_modules\@appfibre\jst-react\dist ..\..\..\..\..\jst-react\dist
mklink /d examples\ts\node_modules\@appfibre\webpack-plugin-jst\dist ..\..\..\..\..\webpack-plugin-jst\dist
mklink /d tests\node_modules\@appfibre\jst-preact\dist ..\..\..\..\jst-preact\dist
mklink /d tests\node_modules\@appfibre\jst-react\dist ..\..\..\..\jst-react\dist
mklink /d tests\node_modules\@appfibre\webpack-plugin-jst\dist ..\..\..\..\webpack-plugin-jst\dist
mklink /d tests\node_modules\@appfibre\rollup-plugin-jst\dist ..\..\..\..\rollup-plugin-jst\dist
