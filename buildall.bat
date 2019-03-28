:init
@rem rd rollup-plugin-jst\node_modules\@appfibre\jst\dist
@rem rd tests\node_modules\@appfibre\jst\dist
@rem rd webpack-plugin-jst\node_modules\@appfibre\jst\dist
@rem rd tests\node_modules\@appfibre\rollup-plugin-jst\dist
@rem rd tests\node_modules\@appfibre\webpack-plugin-jst\dist
@rem rd tests\node_modules\@appfibre\jst-preact\dist
@rem rd tests\node_modules\@appfibre\jst-react\dist
@rem rd examples\app\node_modules\@appfibre\jst\dist
@rem rd examples\ts\node_modules\@appfibre\jst\dist
@rem rd examples\ts\node_modules\@appfibre\jst-react\dist
@rem rd examples\ts\node_modules\@appfibre\webpack-plugin-jst\dist
@rem rd examples\app\cdn

cmd /c "cd /d jst && npm run build"
@rem mklink /d rollup-plugin-jst\node_modules\@appfibre\jst\dist ..\..\..\..\jst\dist
@rem mklink /d webpack-plugin-jst\node_modules\@appfibre\jst\dist ..\..\..\..\jst\dist
@rem mklink /d tests\node_modules\@appfibre\jst\dist ..\..\..\..\jst\dist
@rem mklink /d examples\app\node_modules\@appfibre\jst\dist ..\..\..\..\..\jst\dist
@rem mklink /d examples\app\cdn ..\..\local-cdn
@rem mklink /d examples\ts\node_modules\@appfibre\jst\dist ..\..\..\..\..\jst\dist
@rem mklink /d examples\ts\node_modules\@appfibre\jst-react\dist ..\..\..\..\..\jst-react\dist
@rem mklink /d examples\ts\node_modules\@appfibre\webpack-plugin-jst\dist ..\..\..\..\..\webpack-plugin-jst\dist

cmd /c "cd /d jst-preact && npm run build"
@rem mklink /d tests\node_modules\@appfibre\jst-preact\dist ..\..\..\..\jst-preact\dist
cmd /c "cd /d jst-react && npm run build"
@rem mklink /d tests\node_modules\@appfibre\jst-react\dist ..\..\..\..\jst-react\dist

cmd /c "cd /d webpack-plugin-jst && npm run build"
@rem mklink /d tests\node_modules\@appfibre\webpack-plugin-jst\dist ..\..\..\..\webpack-plugin-jst\dist

cmd /c "cd /d rollup-plugin-jst && npm run build"
@rem mklink /d tests\node_modules\@appfibre\rollup-plugin-jst\dist ..\..\..\..\rollup-plugin-jst\dist

cmd /c "cd /d examples\app && npm run build"
cmd /c "cd /d tests && npm run test"