(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["layout-partials-app-layout-navbar-embed-vue~d2ad28dd","layout-partials-app-layout-navbar-item-vue~4f4f69f2"],{"33d2":function(t,e,a){"use strict";a("db9d")},"40e3":function(t,e,a){},"64c1":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-layout-navbar-embed"},[a("div",{staticClass:"app-layout-navbar-embed-left"},[a("div",{staticClass:"app-layout-navbar-embed-left-list"},[t._l(t.sidebar_body,(function(e){return[a("layout-navbar-item",{key:e.key,attrs:{item:e,"is-active":t.setActive(e)}})]}))],2)]),a("div",{staticClass:"app-layout-navbar-embed-right"},[a("a-tooltip",{attrs:{placement:"topLeft"}},[a("template",{slot:"title"},[a("span",[t._v("Live Chat")])]),a("a",{staticClass:"app-navbar-footer-item",on:{click:t.onToggleChat}},[a("vue-svg-icon",{attrs:{icon:"helpcenter"}})],1)],2),a("a-tooltip",{attrs:{placement:"top"}},[a("template",{slot:"title"},[a("span",[t._v("Help Document")])]),a("a",{staticClass:"app-navbar-footer-item",attrs:{href:t.sidebar_footer.help_center_link,target:"_blank"}},[a("vue-svg-icon",{attrs:{icon:"chat"}})],1)],2)],1)])},s=[],o=(a("7f7f"),a("7c928")),n={name:"AppLayoutNavbarEmbed",components:{LayoutNavbarItem:o["default"]},props:{options:{type:Object}},data:function(){return{}},computed:{sidebar_body:function(){return this.options&&this.options["data"]?this.options["data"]:[]},sidebar_modules:function(){return this.options&&this.options["modules"]?this.options["modules"]:[]},sidebar_footer:function(){return this.options&&this.options["footer"]?this.options["footer"]:[]}},methods:{setActive:function(t){return"router-link"==t.type&&(this.sidebar_modules[t.route]&&this.sidebar_modules[t.route].indexOf(this.$route.name)>=0)}}},r=n,l=(a("af81"),a("2877")),u=Object(l["a"])(r,i,s,!1,null,null,null);e["default"]=u.exports},"7c928":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"navbar-item",class:{"is-active":t.isActive}},["router-link"==t.item.type?[a("router-link",{staticClass:"navbar-item-wrap",attrs:{to:{name:t.item.route}}},[a("div",{staticClass:"navbar-item-text"},[t._v(" "+t._s(t.item.text)+" ")])])]:t._e()],2)},s=[],o={name:"LayoutNavbarItem",props:{item:{type:Object},isActive:{type:Boolean}}},n=o,r=(a("33d2"),a("2877")),l=Object(r["a"])(n,i,s,!1,null,"7721feea",null);e["default"]=l.exports},af81:function(t,e,a){"use strict";a("40e3")},db9d:function(t,e,a){}}]);