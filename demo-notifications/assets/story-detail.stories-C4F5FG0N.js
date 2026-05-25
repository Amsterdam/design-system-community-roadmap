import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{S as n}from"./iframe-BnCUGt__.js";import{t as r}from"./jsx-runtime-C1HxNEhm.js";import{C as i,_ as a,c as o,g as s,h as c,l,t as u,v as d,w as f,x as p}from"./src-BP2o4dlZ.js";import{a as m,d as h,f as g,n as _,o as v,s as y,t as b,u as x}from"./StrapiImageBlock-N7HibOSa.js";var S,C=e((()=>{S={"story-detail__features-container":`_story-detail__features-container_d1vs3_1`,"story-detail__features":`_story-detail__features_d1vs3_1`,"story-detail__feature-content":`_story-detail__feature-content_d1vs3_9`,"story-detail__feature-date":`_story-detail__feature-date_d1vs3_16`,"story-detail__details":`_story-detail__details_d1vs3_20`,"story-detail__header":`_story-detail__header_d1vs3_33`}}));function w({title:e,content:t,currentUserDocumentId:n,endDate:r,features:u,images:f,isLiked:h,reactions:_,startDate:v,storyDocumentId:y,voteCount:C}){let w=g(),[D,O]=(0,T.useState)(!1),[k,A]=(0,T.useState)(),j=[...u].sort((e,t)=>!e.startDate&&!t.startDate?0:e.startDate?t.startDate?new Date(e.startDate).getTime()-new Date(t.startDate).getTime():-1:1);return(0,E.jsxs)(a,{gapVertical:`large`,children:[(0,E.jsxs)(a.Cell,{className:`ams-prose`,span:{narrow:4,medium:8,wide:7},children:[(0,E.jsxs)(`div`,{className:S[`story-detail__header`],children:[(0,E.jsx)(d,{level:1,size:`level-2`,children:e}),(0,E.jsx)(c,{count:C,isLiked:h,onToggle:async e=>{if(!n){w.push(`/inloggen`);return}if((await x(y,e)).needsLogin){w.push(`/inloggen`);return}w.refresh()},size:`large`})]}),(0,E.jsx)(p,{children:t}),(0,E.jsx)(b,{fallbackAlt:e,images:f}),u.length>0&&(0,E.jsxs)(`div`,{className:S[`story-detail__features-container`],children:[(0,E.jsx)(d,{level:2,size:`level-4`,children:`Features`}),(0,E.jsx)(`div`,{className:S[`story-detail__features`],children:j.map(e=>(0,E.jsx)(`span`,{children:(0,E.jsxs)(`div`,{className:S[`story-detail__feature-content`],children:[(0,E.jsx)(d,{level:4,children:e.title}),(0,E.jsx)(i,{href:`/features/${e.documentId}`,children:`Bekijk details`})]})},e.documentId))})]})]}),(0,E.jsxs)(a.Cell,{className:`ams-prose`,span:{narrow:4,medium:8,wide:5},children:[(0,E.jsx)(d,{level:2,size:`level-4`,children:`Details`}),(0,E.jsxs)(`dl`,{className:S[`story-detail__details`],children:[(0,E.jsx)(`dt`,{children:(0,E.jsx)(`strong`,{children:`Status`})}),(0,E.jsx)(`dd`,{children:(0,E.jsx)(s,{color:r&&new Date(r)<new Date?`lime`:`azure`,label:r&&new Date(r)<new Date?`Voltooid`:`In uitvoering`})}),(0,E.jsx)(`dt`,{children:(0,E.jsx)(`strong`,{children:`Startdatum`})}),(0,E.jsx)(`dd`,{children:v?new Date(v).toLocaleDateString(`nl-NL`):`Onbekend`}),r&&(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(`dt`,{children:(0,E.jsx)(`strong`,{children:`Einddatum`})}),(0,E.jsx)(`dd`,{children:new Date(r).toLocaleDateString(`nl-NL`)})]})]}),(0,E.jsx)(d,{level:2,size:`level-4`,children:`Reacties`}),(0,E.jsx)(o,{compact:!0,reactions:_}),(0,E.jsx)(l,{error:k,isLoggedIn:!!n,loading:D,onSubmit:async e=>{O(!0),A(void 0);let t=await m(y,e);if(O(!1),t.needsLogin){w.push(`/inloggen`);return}if(t.error){A(t.error);return}t.success&&w.refresh()}})]})]})}var T,E,D=e((()=>{f(),u(),h(),T=t(n()),y(),v(),C(),_(),E=r(),w.__docgenInfo={description:``,methods:[],displayName:`StoryDetail`,props:{content:{required:!0,tsType:{name:`string`},description:``},currentUserDocumentId:{required:!1,tsType:{name:`string`},description:``},endDate:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:``},features:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  documentId: string
  endDate?: string | null
  startDate?: string
  title: string
}`,signature:{properties:[{key:`documentId`,value:{name:`string`,required:!0}},{key:`endDate`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1}},{key:`startDate`,value:{name:`string`,required:!1}},{key:`title`,value:{name:`string`,required:!0}}]}}],raw:`ChildFeature[]`},description:``},images:{required:!1,tsType:{name:`union`,raw:`StrapiImage[] | null`,elements:[{name:`Array`,elements:[{name:`StrapiImage`}],raw:`StrapiImage[]`},{name:`null`}]},description:``},isLiked:{required:!0,tsType:{name:`boolean`},description:``},reactions:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  author?: { isTeam?: boolean; name: string } | null
  content: string
  id: number
}`,signature:{properties:[{key:`author`,value:{name:`union`,raw:`{ isTeam?: boolean; name: string } | null`,elements:[{name:`signature`,type:`object`,raw:`{ isTeam?: boolean; name: string }`,signature:{properties:[{key:`isTeam`,value:{name:`boolean`,required:!1}},{key:`name`,value:{name:`string`,required:!0}}]}},{name:`null`}],required:!1}},{key:`content`,value:{name:`string`,required:!0}},{key:`id`,value:{name:`number`,required:!0}}]}}],raw:`ReactionItem[]`},description:``},startDate:{required:!1,tsType:{name:`string`},description:``},storyDocumentId:{required:!0,tsType:{name:`string`},description:``},title:{required:!0,tsType:{name:`string`},description:``},voteCount:{required:!0,tsType:{name:`number`},description:``}}}})),O,k,A,j,M,N,P,F;e((()=>{D(),O=r(),k=[{author:{name:`Emma Bakker`},content:`Wanneer is dit beschikbaar in de npm package?`,id:1},{author:{name:`Joost van Dam`},content:`De Figma-bestanden zijn al bijgewerkt, top!`,id:2},{author:{isTeam:!0,name:`Amsterdam Design System Team`},content:`We verwachten dit eind Q2 te releasen. Bedankt voor jullie geduld!`,id:3}],A={title:`Pages/Story Detail`,component:w,decorators:[e=>(0,O.jsx)(`div`,{style:{padding:`2rem`},children:(0,O.jsx)(e,{})})],parameters:{layout:`fullscreen`}},j={args:{title:`[Design] Achtergrond-kleur voor interne applicaties`,content:`Interne applicaties van de gemeente Amsterdam hebben specifieke eisen voor achtergrondkleuren die afwijken van de publiek-gerichte applicaties. In deze story worden de designkeuzes voor achtergrondkleuren vastgesteld en gedocumenteerd in het design system.`,endDate:null,features:[{title:`Voorbeeld feature`,documentId:`feature-layout-001`}],isLiked:!1,reactions:k,startDate:`2025-03-01`,storyDocumentId:`feature-layout-001`,voteCount:14}},M={args:{...j.args,title:`[Code] Geneste items en actieve weergave Menu`,content:`De Menu component wordt uitgebreid met ondersteuning voor geneste menu-items en een actieve weergave. Hiermee kunnen navigatiestructuren worden weergegeven met meerdere niveaus diep, waarbij het actieve pad visueel wordt gemarkeerd.`,endDate:`2025-05-31`,isLiked:!0,startDate:`2025-04-17`,voteCount:27}},N={args:{...j.args,title:`Rich Text editor onderzoek`,content:`Onderzoek naar bestaande open-source rich text editors die voldoen aan de toegankelijkheidseisen van de gemeente Amsterdam. Het doel is een onderbouwde aanbeveling te doen voor de keuze van een editor die goed integreert met het design system.`,endDate:null,features:[],reactions:[],startDate:`2025-06-01`,voteCount:9}},P={args:{...j.args,title:`[Design] Tabel varianten`,content:`Ontwerpen van de verschillende varianten van de Data Tabel component: standaard, compact en zebra-streepen. Inclusief states voor geselecteerde rijen, hover en focus.`,reactions:[],voteCount:5}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    title: '[Design] Achtergrond-kleur voor interne applicaties',
    content: 'Interne applicaties van de gemeente Amsterdam hebben specifieke eisen voor achtergrondkleuren die afwijken van de publiek-gerichte applicaties. In deze story worden de designkeuzes voor achtergrondkleuren vastgesteld en gedocumenteerd in het design system.',
    endDate: null,
    features: [{
      title: 'Voorbeeld feature',
      documentId: 'feature-layout-001'
    }],
    isLiked: false,
    reactions: mockReactions,
    startDate: '2025-03-01',
    storyDocumentId: 'feature-layout-001',
    voteCount: 14
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    title: '[Code] Geneste items en actieve weergave Menu',
    content: 'De Menu component wordt uitgebreid met ondersteuning voor geneste menu-items en een actieve weergave. Hiermee kunnen navigatiestructuren worden weergegeven met meerdere niveaus diep, waarbij het actieve pad visueel wordt gemarkeerd.',
    endDate: '2025-05-31',
    isLiked: true,
    startDate: '2025-04-17',
    voteCount: 27
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    title: 'Rich Text editor onderzoek',
    content: 'Onderzoek naar bestaande open-source rich text editors die voldoen aan de toegankelijkheidseisen van de gemeente Amsterdam. Het doel is een onderbouwde aanbeveling te doen voor de keuze van een editor die goed integreert met het design system.',
    endDate: null,
    features: [],
    reactions: [],
    startDate: '2025-06-01',
    voteCount: 9
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    title: '[Design] Tabel varianten',
    content: 'Ontwerpen van de verschillende varianten van de Data Tabel component: standaard, compact en zebra-streepen. Inclusief states voor geselecteerde rijen, hover en focus.',
    reactions: [],
    voteCount: 5
  }
}`,...P.parameters?.docs?.source}}},F=[`Default`,`WithEndDate`,`WithoutParentFeature`,`Empty`]}))();export{j as Default,P as Empty,M as WithEndDate,N as WithoutParentFeature,F as __namedExportsOrder,A as default};