import{i as e}from"./preload-helper-Cs4UwXAW.js";import{t}from"./jsx-runtime-C1HxNEhm.js";import{f as n,t as r}from"./src-BP2o4dlZ.js";var i,a,o,s,c,l,u;e((()=>{r(),i=t(),a={title:`Molecules/Login Form`,component:n,decorators:[e=>(0,i.jsx)(`div`,{style:{padding:`2rem`},children:(0,i.jsx)(e,{})})]},o={args:{onSubmit:(e,t)=>{console.log(`Inloggen als: ${e} ${t}`)}}},s={args:{onSubmit:(e,t)=>{console.log(`Inloggen als: ${e} ${t}`)},takenEmojis:[`🦊`,`🐼`,`🦁`,`🐸`,`🦋`,`🐙`]}},c={args:{error:`Deze emoji is al in gebruik. Kies een andere emoji.`,onSubmit:()=>{}}},l={args:{loading:!0,onSubmit:()=>{}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    onSubmit: (name, emoji) => {
      console.log(\`Inloggen als: \${name} \${emoji}\`);
    }
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    onSubmit: (name, emoji) => {
      console.log(\`Inloggen als: \${name} \${emoji}\`);
    },
    takenEmojis: ['🦊', '🐼', '🦁', '🐸', '🦋', '🐙']
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    error: 'Deze emoji is al in gebruik. Kies een andere emoji.',
    onSubmit: () => {}
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    loading: true,
    onSubmit: () => {}
  }
}`,...l.parameters?.docs?.source}}},u=[`Default`,`WithTakenEmojis`,`WithError`,`Loading`]}))();export{o as Default,l as Loading,c as WithError,s as WithTakenEmojis,u as __namedExportsOrder,a as default};