import{i as e}from"./preload-helper-usAeo7Bx.js";import{t}from"./jsx-runtime-O9QVJvLM.js";import{t as n,y as r}from"./src-GGVWosPP.js";var i,a,o,s,c,l;e((()=>{n(),i=t(),a={title:`Molecules/Login Form`,component:r,decorators:[e=>(0,i.jsx)(`div`,{style:{padding:`2rem`},children:(0,i.jsx)(e,{})})]},o={args:{onSubmit:(e,t)=>{console.log(`Inloggen als: ${e} ${t}`)}}},s={args:{error:`Deze emoji is al in gebruik. Kies een andere emoji.`,onSubmit:()=>{}}},c={args:{loading:!0,onSubmit:()=>{}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    onSubmit: (name, emoji) => {
      console.log(\`Inloggen als: \${name} \${emoji}\`);
    }
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    error: 'Deze emoji is al in gebruik. Kies een andere emoji.',
    onSubmit: () => {}
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    loading: true,
    onSubmit: () => {}
  }
}`,...c.parameters?.docs?.source}}},l=[`Default`,`WithError`,`Loading`]}))();export{o as Default,c as Loading,s as WithError,l as __namedExportsOrder,a as default};