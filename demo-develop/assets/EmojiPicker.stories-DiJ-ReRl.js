import{c as e,i as t}from"./preload-helper-usAeo7Bx.js";import{C as n}from"./iframe-BFVL0QOm.js";import{t as r}from"./jsx-runtime-O9QVJvLM.js";import{S as i,t as a}from"./src-ByAKSzxa.js";var o,s,c,l,u,d,f,p;t((()=>{a(),o=e(n(),1),s=r(),c={title:`Atoms/Emoji Picker`,component:i,argTypes:{value:{control:`text`}},decorators:[e=>(0,s.jsx)(`div`,{style:{inlineSize:`350px`},children:(0,s.jsx)(e,{})})]},l=e=>{let[t,n]=(0,o.useState)(e.value);return(0,s.jsx)(i,{...e,onChange:n,value:t})},u={args:{onChange:()=>{}},render:e=>(0,s.jsx)(l,{...e})},d={args:{onChange:()=>{},value:`🦊`},render:e=>(0,s.jsx)(l,{...e})},f={args:{onChange:()=>{},takenEmojis:[`🦊`,`🐼`,`🦁`,`🐸`,`🦋`]},render:e=>(0,s.jsx)(l,{...e})},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    onChange: () => {}
  },
  render: args => <ControlledPicker {...args} />
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    onChange: () => {},
    value: '🦊'
  },
  render: args => <ControlledPicker {...args} />
}`,...d.parameters?.docs?.source}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    onChange: () => {},
    takenEmojis: ['🦊', '🐼', '🦁', '🐸', '🦋']
  },
  render: args => <ControlledPicker {...args} />
}`,...f.parameters?.docs?.source}}},p=[`Default`,`WithSelection`,`WithTakenEmojis`]}))();export{u as Default,d as WithSelection,f as WithTakenEmojis,p as __namedExportsOrder,c as default};