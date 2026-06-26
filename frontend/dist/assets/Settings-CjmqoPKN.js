import{c as t,k as d,l as h,j as e}from"./index-BFng0-o6.js";import{P as m}from"./PageHeader-3m2v9VyW.js";import{C as p}from"./cpu-D28YHkch.js";/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=t("BellRing",[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0",key:"vwvbt9"}],["path",{d:"M22 8c0-2.3-.8-4.3-2-6",key:"5bb3ad"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",key:"11g9vi"}],["path",{d:"M4 2C2.8 3.7 2 5.7 2 8",key:"tap9e0"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=t("Palette",[["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",key:"12rzf8"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=t("Settings2",[["path",{d:"M20 7h-9",key:"3s1dr2"}],["path",{d:"M14 17H5",key:"gfn3mx"}],["circle",{cx:"17",cy:"17",r:"3",key:"18b49y"}],["circle",{cx:"7",cy:"7",r:"3",key:"dfmy0x"}]]);/**
 * @license lucide-react v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=t("UserCog",[["circle",{cx:"18",cy:"15",r:"3",key:"gjjjvw"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M10 15H6a4 4 0 0 0-4 4v2",key:"1nfge6"}],["path",{d:"m21.7 16.4-.9-.3",key:"12j9ji"}],["path",{d:"m15.2 13.9-.9-.3",key:"1fdjdi"}],["path",{d:"m16.6 18.7.3-.9",key:"heedtr"}],["path",{d:"m19.1 12.2.3-.9",key:"1af3ki"}],["path",{d:"m19.6 18.7-.4-1",key:"1x9vze"}],["path",{d:"m16.8 12.3-.4-1",key:"vqeiwj"}],["path",{d:"m14.3 16.6 1-.4",key:"1qlj63"}],["path",{d:"m20.7 13.8 1-.4",key:"1v5t8k"}]]),j=[{title:"Theme Settings",icon:g,items:["Dark futuristic mode","Neon green accents","Reduce motion option"]},{title:"Notification Settings",icon:y,items:["Critical alert push","Warning digest","Email report"]},{title:"Sensor Settings",icon:p,items:["Temperature threshold","Humidity threshold","Gas calibration"]},{title:"User Settings",icon:x,items:["Profile","Role permissions","Demo workspace"]},{title:"System Settings",icon:k,items:["API fallback","Offline mode","Data export"]}];function v(){const{logout:r,user:s}=d(),{theme:n,toggleTheme:a}=h();return e.jsxs("div",{className:"page-stack",children:[e.jsx(m,{eyebrow:"Settings",title:"Workspace Configuration",description:"Theme, notifications, sensors, user and system settings for the AgroTwin AI prototype.",action:e.jsx("button",{className:"ghost-btn",onClick:r,children:"Logout"})}),e.jsx("section",{className:"settings-grid",children:j.map(({title:i,icon:o,items:l})=>e.jsxs("article",{className:"glass-card",children:[e.jsxs("div",{className:"card-head",children:[e.jsxs("div",{children:[e.jsx("h2",{children:i}),e.jsx("p",{children:i==="User Settings"?s==null?void 0:s.email:"Investor demo ready controls"})]}),e.jsx(o,{size:22})]}),e.jsx("div",{className:"setting-list",children:l.map(c=>e.jsxs("label",{children:[e.jsx("span",{children:c}),e.jsx("input",{type:"checkbox",defaultChecked:!0})]},c))})]},i))}),e.jsx("section",{className:"glass-card",children:e.jsxs("div",{className:"card-head",children:[e.jsxs("div",{children:[e.jsx("h2",{children:"Theme Toggle"}),e.jsxs("p",{children:["Current theme: ",n]})]}),e.jsx("button",{className:"primary-btn",onClick:a,children:"Switch theme"})]})})]})}export{v as Settings};
