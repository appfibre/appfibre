const Test = function inject(app:any) {
	return class extends app.services.UI.Component
	{
		render () {
			return app.services.UI.processElement(["div", null, this.props.children]);
		}

	};

};

const Transform = function transform(t: string, a:object, c:any) {
    return ["div", a, c];
}

const Children = function transform(c:any) {
    return c;
}

const TransformOwn = function transform(a:object, c:any[]) {
    a = a || {};
    return   [ "a"
             , a
             , [ ["span", {"area-hidden": "true", "key": 1}], ["span", {"area-hidden": "true", "key": 2}]] 
             ];
}


export { Test, Transform, TransformOwn, Children}