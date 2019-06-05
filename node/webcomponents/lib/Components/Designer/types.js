var events = {
    "Designer.Load": function (data) { return { type: "Designer.Load", data: data }; },
    "Designer.Intercept.Select": function (data) { return { type: "Designer.Intercept.Select", data: data }; }
};
export { events };
