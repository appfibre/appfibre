define([], function() {

    return {
        navigation: {
            resolveUrl: function inject(app) {
                return new Promise(function(resolve, reject){
                    app.services.moduleSystem.import('./pages/latest/introduction.jst#default').then(function(r) { resolve(r.default), reject});
                });
            }
        },

        resolve: function transform(args) {
            //return new this.services.promise(function(r) { r(["div", {} , "TEST"]);});
            let app = this;
            return new this.services.promise(function(r,f ) { 
                app.services.moduleSystem.import.call(app.services.moduleSystem,'./pages/latest/' + (args[0] || "Introduction") +'.json#default').then(function (o) {
                    //debugger;
                    r(o.default);
                    //return this.services.moduleSystem.import.call(this.services.moduleSystem,'./pages/latest/' + (args[0] || "Introduction") +'.json#default');
                }, f);
            });

        }
    }
});