(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["layout-default-vue~700af982"],{"3e14":function(t,e,i){"use strict";i("6736")},6736:function(t,e,i){},"7b3d1":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("transition",{attrs:{name:"fade",mode:"out-in"}},[t.is_loading?i("div",{key:"is-loading",staticClass:"app-layout-master"},[i("div",{staticClass:"app-layout-loading"},[i("a-spin",[i("a-icon",{staticStyle:{"font-size":"24px"},attrs:{slot:"indicator",type:"loading",spin:""},slot:"indicator"})],1)],1)]):i("div",{key:"loaded",staticClass:"app-layout-master",class:{"app-layout-collapsed":t.collapsed,"app-layout-visible-rating":t.visible_rating},attrs:{id:"app-layout-master"}},[t.loading_error?[i("div",[i("vue-error",{attrs:{type:"500"}})],1)]:[i("div",{staticClass:"app-layout-container"},[i("div",{staticClass:"app-layout-content"},[i("transition",{attrs:{name:"fade-in",mode:"out-in"}},[i("router-view")],1)],1)])],i("vue-notification")],2)])},o=[],r=(i("8e6e"),i("ac6a"),i("456d"),i("96cf"),i("1da1")),n=(i("7f7f"),i("6762"),i("2fdb"),i("ade3")),s=i("2f62"),u=i("0a5a"),l=i("9810");function c(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,a)}return i}function p(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?c(Object(i),!0).forEach((function(e){Object(n["a"])(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):c(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var d={name:"DefaultLayout",components:{AppLayoutNavbar:u["a"],AppLayoutToolbar:l["a"]},metaInfo:{titleTemplate:"%s - OneSubscription"},data:function(){return{is_loading:!0,is_loading_error:!1}},computed:p(p({},Object(s["c"])({loading_error:"getLoadingError",collapsed:"getNavbarCollapsed",user:"auth/getUser",shop:"auth/getShop",chat_box_token:"auth/getChatBoxToken",chat_box_data:"auth/getChatBoxData"})),{},{sidebar:function(){return{body:[{id:"sohead-dashboard",key:"Dashboard",text:"Dashboard",route:"Dashboard",type:"router-link",icon:"dashboard",visible:!0},{id:"sohead-subscription",key:"Subscription",text:"Plans",route:"Subscription",type:"router-link",icon:"campaign",visible:!0},{id:"sohead-customer",key:"Customer",text:"Subscriber",route:"Customer",type:"router-link",icon:"audient",visible:!0},{id:"sohead-contract",key:"Contract",text:"Subscriptions Management",route:"Contract",type:"router-link",icon:"retweet",visible:!0},{id:"sohead-setting",key:"Setting",text:"Settings",route:"Setting",type:"router-link",icon:"setting",visible:!0,children:[{id:"sohead-setting-widget",key:"SettingWidget",text:"Subscription Widget",route:"SettingWidget",type:"router-link",icon:"",visible:!0},{id:"sohead-setting-customer-portal",key:"SettingCustomerPortal",text:"Customer Portal",route:"SettingCustomerPortal",type:"router-link",icon:"",visible:!0},{id:"sohead-setting-email",key:"SettingEmail",text:"Email Notification",route:"SettingEmail",type:"router-link",icon:"",visible:!0}]}],footer:{help_center_link:"https://help.socialhead.io/en/category/socialpixel-1lr293q/",app_listing:{title:"Got ideas? Socialhead apps can make it happen",data:["social_shop","social_widget","social_reply","social_publish"]}},modules:{Dashboard:["Dashboard"],Subscription:["Subscription","CreateSubscription","UpdateSubscription"],Customer:["Customer","CustomerDetail"],Contract:["Contract","UpdateContract"],Setting:["Setting","SettingWidget","SettingCustomerPortal","SettingEmail"],SettingWidget:["SettingWidget"],SettingCustomerPortal:["SettingCustomerPortal"],SettingEmail:["SettingEmail","SettingEmailAdmin","SettingEmailCustomer"]}}},visible_rating:function(){return this.getShowRating&&this.getShowRatingRoute.includes(this.$route.name)}}),methods:p(p({},Object(s["b"])({updateCrispSession:"auth/updateCrispSession",updateOnboarding:"auth/updateOnboarding"})),Object(s["d"])({setVisiblePricingWarning:"pricing/setVisiblePricingWarning"})),mounted:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:this.is_loading=!1,this.is_loading_error=!1,this.is_loading_error||this.user;case 3:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),beforeDestroy:function(){}},g=d,b=(i("3e14"),i("2877")),h=Object(b["a"])(g,a,o,!1,null,null,null);e["default"]=h.exports}}]);