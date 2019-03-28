const Test = function inject (app:any) {
	return class extends app.services.UI.Component
	{
		render () {
			if (Array.isArray(this.props.children) && this.props.children.length == 1 && typeof this.props.children[0] === 'string') return super.render(this.props.children[0]);
			return super.render(this.props.children);
		}
	};
};

const Transform = function transform(obj:any) {
    return ["div", obj[1], obj[2]];
}

const TransformOwn = function transform(obj:any) {
    obj[1] = obj[1] || {};
    return   [ "a"
             , obj[1]
             , [ ["span", {"area-hidden": "true", "key": 1}], ["span", {"area-hidden": "true", "key": 2}]] 
             ];
}


export { Test, Transform, TransformOwn}