(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{15:function(e,n,t){e.exports=t(39)},38:function(e,n,t){},39:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),c=t(13),o=t.n(c),u=t(14),i=t(2),l=function(e){var n=e.person,t=e.deleteHandler;return r.a.createElement("div",null,n.name," ",n.number," ",r.a.createElement("button",{onClick:t},"delete"))},m=function(e){return r.a.createElement("input",{onChange:e.onChange,value:e.text})},s=t(3),f=t.n(s),d="/app/persons",p=function(){return f.a.get(d).then((function(e){return e.data}))},h=function(e){return f.a.post(d,e).then((function(e){return e.data}))},b=function(e){return f.a.delete("".concat(d,"/").concat(e))},v=function(e){return f.a.put("".concat(d,"/").concat(e.id),e).then((function(e){return e.data}))},E=(t(38),function(e){var n=e.addPerson,t=e.inputChangeName,a=e.inputChangeNum,c=e.newName,o=e.newNumber;return r.a.createElement("form",{onSubmit:n},r.a.createElement("div",null,"name: ",r.a.createElement("input",{onChange:t,value:c})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{onChange:a,value:o})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add")))}),g=function(e){var n=e.filter,t=e.persons,a=e.deleteHandler,c=(""===n?t:t.filter((function(e){return-1!==e.name.toLowerCase().indexOf(n.toLowerCase())}))).map((function(e){return r.a.createElement(l,{key:e.name,person:e,deleteHandler:function(){return a(e)}})}));return r.a.createElement("div",null,c)},w=function(e){var n=e.message;return null===n?null:"error"===n.type?r.a.createElement("div",{className:"error"},n.message):r.a.createElement("div",{className:"notification"},n.message)},C=function(){var e=Object(a.useState)([]),n=Object(i.a)(e,2),t=n[0],c=n[1],o=Object(a.useState)(""),l=Object(i.a)(o,2),s=l[0],f=l[1],d=Object(a.useState)(""),C=Object(i.a)(d,2),O=C[0],j=C[1],N=Object(a.useState)(""),y=Object(i.a)(N,2),k=y[0],L=y[1],S=Object(a.useState)(null),H=Object(i.a)(S,2),x=H[0],P=H[1];Object(a.useEffect)((function(){p().then((function(e){return c(e)}))}),[]);var A=function(e){P(e),setTimeout((function(){P(null)}),4e3)};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(w,{message:x}),r.a.createElement(m,{onChange:function(e){return L(e.target.value)},text:k}),r.a.createElement("h3",null,"Add new"),r.a.createElement(E,{addPerson:function(e){if(e.preventDefault(),t.some((function(e){return e.name.toLowerCase()===s.toLowerCase()}))){if(window.confirm("".concat(s," is already added to phonebook, replace the old number with a new one?"))){var n=t.find((function(e){return e.name.toLowerCase()===s.toLocaleLowerCase()})),a=Object(u.a)({},n,{number:O});v(a).then((function(e){c(t.map((function(n){return n.id===e.id?e:n}))),A({message:"Updated ".concat(e.name),type:"success"})})).catch((function(e){A({message:"Information of ".concat(a.name," has already been removed from server"),type:"error"}),c(t.filter((function(e){return e.id!==n.id})))}))}}else{var r={name:s,number:O};h(r).then((function(e){c(t.concat(e)),A({message:"Added ".concat(e.name),type:"success"})})).catch((function(e){return alert("Henkil\xf6n ".concat(r.name," lis\xe4\xe4minen palvelimelle ep\xe4onnistui: ").concat(e))})),f(""),j("")}},inputChangeName:function(e){return f(e.target.value)},inputChangeNum:function(e){return j(e.target.value)},newName:s,newNumber:O}),r.a.createElement("h3",null,"Numbers"),r.a.createElement(g,{filter:k,persons:t,deleteHandler:function(e){window.confirm("Delete ".concat(e.name,"?"))&&b(e.id).then((function(n){A({message:"".concat(e.name," removed"),type:"success"}),c(t.filter((function(n){return n.id!==e.id})))})).catch((function(e){return console.log("Removal failed: ".concat(e))}))}}))};o.a.render(r.a.createElement(C,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.506e1d74.chunk.js.map