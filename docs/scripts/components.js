function _extend(obj, props) {
    if (obj == undefined) obj = {};
    for (var i in props) 
        obj[i] = typeof obj[i] == "object" && typeof props[i] == "object" ? _extend(obj[i], props[i]) : obj[i] || props[i];
    return obj;
}

// bulma
var Navbar = function transform(a, c) {
    a = a || {};
    return  [ "div"
            , _extend({"className": "navbar "+(a.className||""), role: "navigation", "area-label": "main navigation"},a)
            , c];
};

var NavbarBurger = function transform(a, c) {
    a = a || {};
    return   [ "a"
             , _extend({ "className": "navbar-burger "+(a.className||""), "role": "button", "aria-label": "menu", "aria-expanded":"true"}, a)
             , [ ["span", {"areahidden": "true"}], ["span", {"areahidden": "true"}], ["span", {"areahidden": "true"}] ] 
             ];
};

var NavbarMenu = function transform(a, c) {
    a = a || {};
    return   [ "div"
             , _extend({ "className": "navbar-menu "+(a.className||"")}, a)
             , c 
             ];
};

var NavbarStart = function transform(a, c) {
    a = a || {};
    return   [ "div"
             , _extend({ "className": "navbar-start "+(a.className||"")}, a)
             , c 
             ];
};

var NavbarEnd = function transform(a, c) {
    a = a || {};
    return   [ "div"
             , _extend({ "className": "navbar-end "+(a.className||"")}, a)
             , c 
             ];
};

var NavbarItem = function transform(a, c) {
    a = a || {};
    return   [ "div"
             , _extend({ "className": "navbar-item has-dropdown is-hoverable "+(a.className||"")}, a)
             , c 
             ];
};

var NavbarItemLink = function transform(a, c) {
    a = a || {};
    return   [ "a"
             , _extend({ "className": "navbar-item has-dropdown is-hoverable "(a.className||"")}, a)
             , c 
             ];
};

var NavbarLink = function transform(a, c) {
    a = a || {};
    return   [ "div"
             , _extend({ "className": "navbar-link "+(a.className||"")}, a)
             , c 
             ];
};

var NavbarDropdown = function transform(a, c) {
    a = a || {};
    return   [ "div"
             , _extend({ "className": "navbar-dropdown "+(a.className||"")}, a)
             , c 
             ];
};

define(['../pages/sitemap.json'], function(menus) {
    var Bulma = { Navbar: Navbar, NavbarBurger: NavbarBurger, NavbarMenu: NavbarMenu, NavbarStart: NavbarStart, NavbarEnd: NavbarEnd, NavbarItem: NavbarItem, NavbarItemLink: NavbarItemLink, NavbarDropdown: NavbarDropdown, NavbarLink: NavbarLink };
    var Menus = function transform() {
    var app = this;
        return  [ "Bulma.Navbar",
                { "className": "is-transparent", "style": { "margin": "auto", "background": "gray" }, "aria-label": "main navigation" },
                [["div",
                        { className: "navbar-brand" },
                        [["a", { className: "navbar-item", style: { font: "16pt Times New Roman"}, onClick: function () { navigate('/');  } }, [["i", { style: { "color": "#DFDFDF" } }, "app"], ["i", { style: { "color": "#FFDF00" } }, "f"], ["i", { style: { "color": "#DFDFDF" } }, "ibre"]]],
                            ["Bulma.NavbarBurger", { "className": /*this.state.burgerActive ?*/ false ? 'is-active' : '', onClick: this.burgerClick }],
                            ["Bulma.NavbarMenu", { id: "navbarMain", "className": /*this.state.burgerActive*/ false ? ' is-active' : '' },
                                [["Bulma.NavbarStart", {},
                                        menus.default.filter(function (x) { return x.name; }).map(function (x,i) { 
                                            return x.children && x.children.length > 0 
                                            ?   [ "Bulma.NavbarItem"
                                                , { className: ((location.pathname == x.path) ? " is-active" : "") }
                                                , [["a", { className: "navbar-link", href: x.path }, [[location.pathname == x.path ? "em" : "span", {}, x.name]]],
                                                    ["Bulma.NavbarDropdown", { "className": "is-boxed"}, x.children.map(function (y) { return ["a", { className: "navbar-item", onClick: function () { debugger; return navigate(y.path); } }, [[location.pathname == x.path ? "em" : "span", {}, y.name]]]; })
                                                ]]
                                                ]
                                            :   ["Navigation.a"
                                                , { className: "navbar-item" + ((location.pathname == x.path) ? " is-active" : ""), href: x.path/*, onClick: function () { debugger; alert(app); return navigate(x.path); }*/ },
                                                [[location.pathname == x.path ? "em" : "span", {}, x.name]]
                                                ]; 
                                        })
                                ]/*,
                                    ["Bulma.NavbarEnd",
                                        {},
                                        [["Bulma.NavbarItem",
                                                {},
                                                [["Bulma.NavbarLink", {}, [["Label", {}, "Language"]]],
                                                    ["Bulma.NavbarDropdown", {}, languages.map(function (y) { return ["a", { className: "navbar-item " + (Context.state.lang === y.id ? "is-active" : ""), onClick: function () { return Context.setState({ "lang": y.id }); } }, [["Label", {}, y.name]]]; })]
                                                ]
                                            ]
                                        ]
                                    ]*/
                                ]
                            ]
                        ]
                    ]]
            ];
        
    };

    return { Menus: Menus, Bulma: Bulma };
});