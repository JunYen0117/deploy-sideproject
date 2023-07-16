(self["webpackChunkmy_sideproject"]=self["webpackChunkmy_sideproject"]||[]).push([[221],{7972:function(e,t,s){
/*!
  * Bootstrap modal.js v5.2.3 (https://getbootstrap.com/)
  * Copyright 2011-2022 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
(function(t,i){e.exports=i(s(1437),s(4130),s(7317),s(7547),s(1884),s(632),s(5160),s(9069))})(0,(function(e,t,s,i,o,l,n,a){"use strict";const r=e=>e&&"object"===typeof e&&"default"in e?e:{default:e},d=r(t),c=r(s),u=r(i),h=r(o),_=r(l),m=r(n),f="modal",g="bs.modal",p=`.${g}`,b=".data-api",v="Escape",w=`hide${p}`,y=`hidePrevented${p}`,k=`hidden${p}`,T=`show${p}`,$=`shown${p}`,L=`resize${p}`,P=`click.dismiss${p}`,S=`mousedown.dismiss${p}`,D=`keydown.dismiss${p}`,A=`click${p}${b}`,C="modal-open",x="fade",E="show",I="modal-static",q=".modal.show",B=".modal-dialog",H=".modal-body",U='[data-bs-toggle="modal"]',j={backdrop:!0,focus:!0,keyboard:!0},J={backdrop:"(boolean|string)",focus:"boolean",keyboard:"boolean"};class M extends h.default{constructor(e,t){super(e,t),this._dialog=c.default.findOne(B,this._element),this._backdrop=this._initializeBackDrop(),this._focustrap=this._initializeFocusTrap(),this._isShown=!1,this._isTransitioning=!1,this._scrollBar=new u.default,this._addEventListeners()}static get Default(){return j}static get DefaultType(){return J}static get NAME(){return f}toggle(e){return this._isShown?this.hide():this.show(e)}show(e){if(this._isShown||this._isTransitioning)return;const t=d.default.trigger(this._element,T,{relatedTarget:e});t.defaultPrevented||(this._isShown=!0,this._isTransitioning=!0,this._scrollBar.hide(),document.body.classList.add(C),this._adjustDialog(),this._backdrop.show((()=>this._showElement(e))))}hide(){if(!this._isShown||this._isTransitioning)return;const e=d.default.trigger(this._element,w);e.defaultPrevented||(this._isShown=!1,this._isTransitioning=!0,this._focustrap.deactivate(),this._element.classList.remove(E),this._queueCallback((()=>this._hideModal()),this._element,this._isAnimated()))}dispose(){for(const e of[window,this._dialog])d.default.off(e,p);this._backdrop.dispose(),this._focustrap.deactivate(),super.dispose()}handleUpdate(){this._adjustDialog()}_initializeBackDrop(){return new _.default({isVisible:Boolean(this._config.backdrop),isAnimated:this._isAnimated()})}_initializeFocusTrap(){return new m.default({trapElement:this._element})}_showElement(t){document.body.contains(this._element)||document.body.append(this._element),this._element.style.display="block",this._element.removeAttribute("aria-hidden"),this._element.setAttribute("aria-modal",!0),this._element.setAttribute("role","dialog"),this._element.scrollTop=0;const s=c.default.findOne(H,this._dialog);s&&(s.scrollTop=0),e.reflow(this._element),this._element.classList.add(E);const i=()=>{this._config.focus&&this._focustrap.activate(),this._isTransitioning=!1,d.default.trigger(this._element,$,{relatedTarget:t})};this._queueCallback(i,this._dialog,this._isAnimated())}_addEventListeners(){d.default.on(this._element,D,(e=>{if(e.key===v)return this._config.keyboard?(e.preventDefault(),void this.hide()):void this._triggerBackdropTransition()})),d.default.on(window,L,(()=>{this._isShown&&!this._isTransitioning&&this._adjustDialog()})),d.default.on(this._element,S,(e=>{d.default.one(this._element,P,(t=>{this._element===e.target&&this._element===t.target&&("static"!==this._config.backdrop?this._config.backdrop&&this.hide():this._triggerBackdropTransition())}))}))}_hideModal(){this._element.style.display="none",this._element.setAttribute("aria-hidden",!0),this._element.removeAttribute("aria-modal"),this._element.removeAttribute("role"),this._isTransitioning=!1,this._backdrop.hide((()=>{document.body.classList.remove(C),this._resetAdjustments(),this._scrollBar.reset(),d.default.trigger(this._element,k)}))}_isAnimated(){return this._element.classList.contains(x)}_triggerBackdropTransition(){const e=d.default.trigger(this._element,y);if(e.defaultPrevented)return;const t=this._element.scrollHeight>document.documentElement.clientHeight,s=this._element.style.overflowY;"hidden"===s||this._element.classList.contains(I)||(t||(this._element.style.overflowY="hidden"),this._element.classList.add(I),this._queueCallback((()=>{this._element.classList.remove(I),this._queueCallback((()=>{this._element.style.overflowY=s}),this._dialog)}),this._dialog),this._element.focus())}_adjustDialog(){const t=this._element.scrollHeight>document.documentElement.clientHeight,s=this._scrollBar.getWidth(),i=s>0;if(i&&!t){const t=e.isRTL()?"paddingLeft":"paddingRight";this._element.style[t]=`${s}px`}if(!i&&t){const t=e.isRTL()?"paddingRight":"paddingLeft";this._element.style[t]=`${s}px`}}_resetAdjustments(){this._element.style.paddingLeft="",this._element.style.paddingRight=""}static jQueryInterface(e,t){return this.each((function(){const s=M.getOrCreateInstance(this,e);if("string"===typeof e){if("undefined"===typeof s[e])throw new TypeError(`No method named "${e}"`);s[e](t)}}))}}return d.default.on(document,A,U,(function(t){const s=e.getElementFromSelector(this);["A","AREA"].includes(this.tagName)&&t.preventDefault(),d.default.one(s,T,(t=>{t.defaultPrevented||d.default.one(s,k,(()=>{e.isVisible(this)&&this.focus()}))}));const i=c.default.findOne(q);i&&M.getInstance(i).hide();const o=M.getOrCreateInstance(s);o.toggle(this)})),a.enableDismissTrigger(M),e.defineJQueryPlugin(M),M}))},7348:function(e,t,s){"use strict";s.d(t,{P:function(){return a}});s(7658);var i=s(2578),o=s(1362),l=s(36),n=s(4870);const a=(0,i.Q_)("allProducts",(()=>{const{db:e}=(0,o.r)(),t=(0,n.qj)([]);return async function(){await(0,l.cf)((0,l.hJ)(e,"products"),(e=>{t.length=0,e.forEach((e=>{t.push(e.data())}))}))}(),{allProducts:t}}))},3221:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return V}});var i=s(3396),o=s(4870),l=s(7139),n=s(2578),a=s(7348);const r=(0,n.Q_)("oneProduct",(()=>{const e=(0,o.iH)({});return{oneProduct:e}}));var d=s(1362),c=s(36),u=s(1294),h=s(7972),_=s.n(h);const m={class:"modal fade",id:"exampleModal",tabindex:"-1","aria-labelledby":"exampleModalLabel","aria-hidden":"true"},f={class:"modal-dialog"},g={class:"modal-content"},p=(0,i._)("div",{class:"modal-header"},[(0,i._)("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),b={class:"modal-body"},v=(0,i._)("label",{class:"form-label"},"id",-1),w=["value"],y=(0,i._)("label",{class:"form-label"},"名稱",-1),k=["value"],T=(0,i._)("label",{class:"form-label"},"價格",-1),$=["value"],L=(0,i._)("label",{class:"form-label"},"種類",-1),P=["value"],S=(0,i._)("label",{class:"form-label"},"詳情",-1),D=["value"],A=(0,i._)("label",{class:"form-label"},"上傳圖片",-1),C=(0,i._)("input",{type:"file",class:"form-control file"},null,-1);var x={__name:"EditProduct",setup(e,{expose:t}){const{db:s,storage:l}=(0,d.r)(),a=r(),{oneProduct:h}=(0,n.Jk)(a);let x="",E="";const I=()=>{x.show()},q=()=>{x.hide()};t({showModal:I,hideModal:q});const B=async()=>{const e={newId:h.value.newId,name:document.querySelector(".inputName").value,price:document.querySelector(".inputPrice").value,category:document.querySelector(".inputCategory").value,description:document.querySelector(".inputDescription").value,imgUrl:h.value.imgUrl};if(E.files[0]){console.log("i have new img");const t=(0,o.iH)(""),n=(0,i.Fl)((()=>`products_img/${e.newId}`)),a=(0,u.iH)(l,`${n.value}`);function r(){const e=(0,u.iH)(l,`${n.value}/${t.value}`);(0,u.oq)(e).then((()=>{console.log("刪除原圖片 成功")})).then((()=>{d()}))}function d(){const t=E.files[0].name,s=(0,i.Fl)((()=>`products_img/${e.newId}/${t}`)),o=(0,u.iH)(l,s.value);(0,u.KV)(o,E.files[0]).then((()=>{console.log("上傳圖片成功")})).catch((()=>{console.log("上傳圖片失敗了：")})).then((()=>{_(o)}))}function _(t){const s=t;(0,u.Jt)(s).then((t=>{e.imgUrl=t,console.log(e),console.log("取得圖片路徑成功")})).catch((()=>{console.log("取得圖片路徑失敗")})).then((()=>{m()}))}function m(){(0,c.r7)((0,c.JU)(s,"products",e.newId),e)}(0,u.aF)(a).then((e=>{e.items.forEach((e=>{t.value=e.name}))})).then((()=>{r()}))}else console.log("沒有新圖片"),(0,c.r7)((0,c.JU)(s,"products",e.newId),e);await x.hide()};return(0,i.bv)((()=>{x=new(_())(document.querySelector("#exampleModal")),E=document.querySelector(".file")})),(e,t)=>((0,i.wg)(),(0,i.iD)("div",m,[(0,i._)("div",f,[(0,i._)("div",g,[p,(0,i._)("div",b,[(0,i._)("form",null,[v,(0,i._)("input",{value:(0,o.SU)(h).newId,type:"text",class:"form-control",disabled:""},null,8,w),y,(0,i._)("input",{ref:"itemName",value:(0,o.SU)(h).name,type:"text",class:"form-control inputName"},null,8,k),T,(0,i._)("input",{ref:"itemPrice",value:(0,o.SU)(h).price,type:"text",class:"form-control inputPrice"},null,8,$),L,(0,i._)("input",{ref:"itemCategory",value:(0,o.SU)(h).category,type:"text",class:"form-control inputCategory"},null,8,P),S,(0,i._)("textarea",{ref:"itemDescription",value:(0,o.SU)(h).description,class:"form-control text_area inputDescription",style:{height:"100px"}},null,8,D),A,C])]),(0,i._)("div",{class:"modal-footer"},[(0,i._)("button",{type:"button",class:"btn btn-dark d-block mt-3 fw-bold",onClick:B},"儲存更改")])])])]))}};const E=x;var I=E;const q={class:"container-fluid row"},B={class:"col-md-3"},H={class:"col-12 col-md-9"},U=(0,i.uE)('<table class="dashboard_productList_tableA"><tr class="dashboard_productList_title row"><th class="col-5">名稱</th><th class="col-2">單價</th><th class="col-2">種類</th><th class="col-1">編輯</th><th class="col-1">刪除</th></tr></table>',1),j={class:"dashboard_productList_tableB"},J={class:"col-5"},M={class:"col-2 td_product_price"},z={class:"col-2 td_product_category"},N={class:"col-1 td_product_btn"},F=["onClick"],R={class:"col-1 td_product_btn"},O=["onClick"];var Y={__name:"DashBoard",setup(e){const{db:t,storage:s}=(0,d.r)(),h=(0,a.P)(),{allProducts:_}=(0,n.Jk)(h),m=r(),{oneProduct:f}=(0,n.Jk)(m),g=(0,o.iH)(null),p=e=>{f.value=e,console.log(e)},b=e=>{console.log(e.newId),(0,c.oe)((0,c.JU)(t,"products",e.newId)).then((()=>{console.log("刪除資料庫文件成功")}));const i=(0,u.iH)(s,`products_img/${e.newId}/`);(0,u.oq)(i).then((()=>{console.log("刪除檔案資料夾成功")}))};function v(){}return v(),(e,t)=>{const s=(0,i.up)("NavBar");return(0,i.wg)(),(0,i.iD)(i.HY,null,[(0,i._)("div",q,[(0,i._)("div",B,[(0,i.Wm)(s)]),(0,i._)("div",H,[U,(0,i._)("table",j,[((0,i.wg)(!0),(0,i.iD)(i.HY,null,(0,i.Ko)((0,o.SU)(_),((e,t)=>((0,i.wg)(),(0,i.iD)("tr",{class:"dashboard_productList_product row",key:t},[(0,i._)("td",J,(0,l.zw)(e.name),1),(0,i._)("td",M,(0,l.zw)(e.price),1),(0,i._)("td",z,(0,l.zw)(e.category),1),(0,i._)("td",N,[(0,i._)("button",{class:"btn btn-dark",onClick:t=>{g.value.showModal(),p(e)}},"修改",8,F)]),(0,i._)("td",R,[(0,i._)("button",{class:"btn btn-danger",onClick:t=>b(e)},"刪除",8,O)])])))),128))])])]),(0,i.Wm)(I,{ref_key:"editProduct",ref:g},null,512)],64)}}};const Q=Y;var V=Q}}]);
//# sourceMappingURL=221.738630e3.js.map