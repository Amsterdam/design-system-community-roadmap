import{i as e}from"./preload-helper-Cs4UwXAW.js";import{m as t,t as n}from"./src-BP2o4dlZ.js";var r,i,a,o,s;e((()=>{n(),r={title:`Molecules/Card`,component:t,argTypes:{isLiked:{control:`boolean`},variant:{control:`select`,options:[`big`,`small`]},voteCount:{control:{min:0,type:`number`}}}},i={args:{title:`Multi Select`,description:`In een component wil ik meerdere opties tegelijkertijd kunnen selecteren.`,isLiked:!1,variant:`big`,voteCount:25}},a={args:{title:`Loading UI`,description:`Hoe laat ik zien dat data nog wordt opgehaald in mijn applicatie?`,isLiked:!1,variant:`small`,voteCount:7}},o={args:{title:`Status Badge`,description:`Een badge om zelf een status te kunnen opzeggen van iets.`,isLiked:!0,variant:`big`,voteCount:24}},i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Multi Select',
    description: 'In een component wil ik meerdere opties tegelijkertijd kunnen selecteren.',
    isLiked: false,
    variant: 'big',
    voteCount: 25
  }
}`,...i.parameters?.docs?.source}}},a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Loading UI',
    description: 'Hoe laat ik zien dat data nog wordt opgehaald in mijn applicatie?',
    isLiked: false,
    variant: 'small',
    voteCount: 7
  }
}`,...a.parameters?.docs?.source}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Status Badge',
    description: 'Een badge om zelf een status te kunnen opzeggen van iets.',
    isLiked: true,
    variant: 'big',
    voteCount: 24
  }
}`,...o.parameters?.docs?.source}}},s=[`Big`,`Small`,`PreLiked`]}))();export{i as Big,o as PreLiked,a as Small,s as __namedExportsOrder,r as default};