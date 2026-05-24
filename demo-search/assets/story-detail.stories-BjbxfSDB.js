import{i as e,s as t}from"./preload-helper-Cs4UwXAW.js";import{S as n}from"./iframe-r1Go0VGr.js";import{t as r}from"./jsx-runtime-C1HxNEhm.js";import{C as i,S as a,_ as o,b as s,c,g as l,l as u,m as d,t as f}from"./src-DlXIIoOW.js";import{c as p,d as m,f as h,n as g,o as _,r as v,s as y,t as b}from"./StrapiImageBlock-hQV2HyIU.js";var x,S=e((()=>{x={"story-detail__details":`_story-detail__details_1r95y_1`,"story-detail__header":`_story-detail__header_1r95y_14`}}));function C({title:e,content:t,currentUserDocumentId:n,endDate:r,featureDocumentId:i,images:f,isLiked:m,parentFeature:g,reactions:_,startDate:y,voteCount:S}){let C=h(),[E,D]=(0,w.useState)(!1),[O,k]=(0,w.useState)();return(0,T.jsxs)(l,{gapVertical:`large`,children:[(0,T.jsxs)(l.Cell,{className:`ams-prose`,span:{narrow:4,medium:8,wide:7},children:[(0,T.jsxs)(`div`,{className:x[`story-detail__header`],children:[(0,T.jsx)(o,{level:1,size:`level-2`,children:e}),(0,T.jsx)(d,{count:S,isLiked:m,onToggle:async e=>{if(!n){C.push(`/inloggen`);return}if((await p(i,e)).needsLogin){C.push(`/inloggen`);return}C.refresh()},size:`large`})]}),(0,T.jsx)(s,{children:t}),(0,T.jsx)(b,{fallbackAlt:e,images:f})]}),(0,T.jsxs)(l.Cell,{className:`ams-prose`,span:{narrow:4,medium:8,wide:5},children:[g&&(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(o,{level:2,size:`level-4`,children:`Feature`}),(0,T.jsx)(a,{href:`/features/${g.documentId}`,children:g.title})]}),(0,T.jsx)(o,{level:2,size:`level-4`,children:`Details`}),(0,T.jsxs)(`dl`,{className:x[`story-detail__details`],children:[(0,T.jsx)(`dt`,{children:(0,T.jsx)(`strong`,{children:`Startdatum`})}),(0,T.jsx)(`dd`,{children:y?new Date(y).toLocaleDateString(`nl-NL`):`Onbekend`}),r&&(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(`dt`,{children:(0,T.jsx)(`strong`,{children:`Einddatum`})}),(0,T.jsx)(`dd`,{children:new Date(r).toLocaleDateString(`nl-NL`)})]})]}),(0,T.jsx)(o,{level:2,size:`level-4`,children:`Reacties`}),(0,T.jsx)(c,{compact:!0,reactions:_}),(0,T.jsx)(u,{error:O,isLoggedIn:!!n,loading:E,onSubmit:async e=>{D(!0),k(void 0);let t=await v(i,e);if(D(!1),t.needsLogin){C.push(`/inloggen`);return}if(t.error){k(t.error);return}t.success&&C.refresh()}})]})]})}var w,T,E=e((()=>{i(),f(),m(),w=t(n()),y(),_(),S(),g(),T=r(),C.__docgenInfo={description:``,methods:[],displayName:`StoryDetail`,props:{content:{required:!0,tsType:{name:`string`},description:``},currentUserDocumentId:{required:!1,tsType:{name:`string`},description:``},endDate:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:``},featureDocumentId:{required:!0,tsType:{name:`string`},description:``},images:{required:!1,tsType:{name:`union`,raw:`StrapiImage[] | null`,elements:[{name:`Array`,elements:[{name:`StrapiImage`}],raw:`StrapiImage[]`},{name:`null`}]},description:``},isLiked:{required:!0,tsType:{name:`boolean`},description:``},parentFeature:{required:!1,tsType:{name:`union`,raw:`ParentFeature | null`,elements:[{name:`signature`,type:`object`,raw:`{
  documentId: string
  title: string
}`,signature:{properties:[{key:`documentId`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}}]}},{name:`null`}]},description:``},reactions:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  author?: { isTeam?: boolean; name: string } | null
  content: string
  id: number
}`,signature:{properties:[{key:`author`,value:{name:`union`,raw:`{ isTeam?: boolean; name: string } | null`,elements:[{name:`signature`,type:`object`,raw:`{ isTeam?: boolean; name: string }`,signature:{properties:[{key:`isTeam`,value:{name:`boolean`,required:!1}},{key:`name`,value:{name:`string`,required:!0}}]}},{name:`null`}],required:!1}},{key:`content`,value:{name:`string`,required:!0}},{key:`id`,value:{name:`number`,required:!0}}]}}],raw:`ReactionItem[]`},description:``},startDate:{required:!1,tsType:{name:`string`},description:``},title:{required:!0,tsType:{name:`string`},description:``},voteCount:{required:!0,tsType:{name:`number`},description:``}}}})),D,O,k,A,j,M,N,P;e((()=>{E(),D=r(),O=[{author:{name:`Emma Bakker`},content:`Wanneer is dit beschikbaar in de npm package?`,id:1},{author:{name:`Joost van Dam`},content:`De Figma-bestanden zijn al bijgewerkt, top!`,id:2},{author:{isTeam:!0,name:`Amsterdam Design System Team`},content:`We verwachten dit eind Q2 te releasen. Bedankt voor jullie geduld!`,id:3}],k={title:`Pages/Story Detail`,component:C,decorators:[e=>(0,D.jsx)(`div`,{style:{padding:`2rem`},children:(0,D.jsx)(e,{})})],parameters:{layout:`fullscreen`}},A={args:{title:`[Design] Achtergrond-kleur voor interne applicaties`,content:`Interne applicaties van de gemeente Amsterdam hebben specifieke eisen voor achtergrondkleuren die afwijken van de publiek-gerichte applicaties. In deze story worden de designkeuzes voor achtergrondkleuren vastgesteld en gedocumenteerd in het design system.`,endDate:null,featureDocumentId:`feature-layout-001`,isLiked:!1,parentFeature:{title:`Applicatie-layout`,documentId:`feature-layout-001`},reactions:O,startDate:`2025-03-01`,voteCount:14}},j={args:{...A.args,title:`[Code] Geneste items en actieve weergave Menu`,content:`De Menu component wordt uitgebreid met ondersteuning voor geneste menu-items en een actieve weergave. Hiermee kunnen navigatiestructuren worden weergegeven met meerdere niveaus diep, waarbij het actieve pad visueel wordt gemarkeerd.`,endDate:`2025-05-31`,isLiked:!0,startDate:`2025-04-17`,voteCount:27}},M={args:{...A.args,title:`Rich Text editor onderzoek`,content:`Onderzoek naar bestaande open-source rich text editors die voldoen aan de toegankelijkheidseisen van de gemeente Amsterdam. Het doel is een onderbouwde aanbeveling te doen voor de keuze van een editor die goed integreert met het design system.`,endDate:null,parentFeature:null,reactions:[],startDate:`2025-06-01`,voteCount:9}},N={args:{...A.args,title:`[Design] Tabel varianten`,content:`Ontwerpen van de verschillende varianten van de Data Tabel component: standaard, compact en zebra-streepen. Inclusief states voor geselecteerde rijen, hover en focus.`,reactions:[],voteCount:5}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    title: '[Design] Achtergrond-kleur voor interne applicaties',
    content: 'Interne applicaties van de gemeente Amsterdam hebben specifieke eisen voor achtergrondkleuren die afwijken van de publiek-gerichte applicaties. In deze story worden de designkeuzes voor achtergrondkleuren vastgesteld en gedocumenteerd in het design system.',
    endDate: null,
    featureDocumentId: 'feature-layout-001',
    isLiked: false,
    parentFeature: {
      title: 'Applicatie-layout',
      documentId: 'feature-layout-001'
    },
    reactions: mockReactions,
    startDate: '2025-03-01',
    voteCount: 14
  }
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    title: '[Code] Geneste items en actieve weergave Menu',
    content: 'De Menu component wordt uitgebreid met ondersteuning voor geneste menu-items en een actieve weergave. Hiermee kunnen navigatiestructuren worden weergegeven met meerdere niveaus diep, waarbij het actieve pad visueel wordt gemarkeerd.',
    endDate: '2025-05-31',
    isLiked: true,
    startDate: '2025-04-17',
    voteCount: 27
  }
}`,...j.parameters?.docs?.source}}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    title: 'Rich Text editor onderzoek',
    content: 'Onderzoek naar bestaande open-source rich text editors die voldoen aan de toegankelijkheidseisen van de gemeente Amsterdam. Het doel is een onderbouwde aanbeveling te doen voor de keuze van een editor die goed integreert met het design system.',
    endDate: null,
    parentFeature: null,
    reactions: [],
    startDate: '2025-06-01',
    voteCount: 9
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    title: '[Design] Tabel varianten',
    content: 'Ontwerpen van de verschillende varianten van de Data Tabel component: standaard, compact en zebra-streepen. Inclusief states voor geselecteerde rijen, hover en focus.',
    reactions: [],
    voteCount: 5
  }
}`,...N.parameters?.docs?.source}}},P=[`Default`,`WithEndDate`,`WithoutParentFeature`,`Empty`]}))();export{A as Default,N as Empty,j as WithEndDate,M as WithoutParentFeature,P as __namedExportsOrder,k as default};