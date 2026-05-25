import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{C as n}from"./iframe-CTnbhS4N.js";import{t as r}from"./jsx-runtime-CaZkqeYb.js";import{E as i,f as a,m as o,t as s}from"./src-Tq0C3gdV.js";import{a as c,d as l,f as u,g as d,h as f,m as p,n as m,o as h,p as g,s as _,t as v,u as y,v as b,y as x}from"./StrapiImageBlock-BJhMFZ-J.js";var S,C=e((()=>{S={"story-detail__details":`_story-detail__details_1r95y_1`,"story-detail__header":`_story-detail__header_1r95y_14`}}));function w({title:e,content:t,currentUserDocumentId:n,endDate:r,images:s,isLiked:l,parentFeature:m,reactions:h,startDate:_,storyDocumentId:x,voteCount:C}){let w=u(),[D,O]=(0,T.useState)(!1),[k,A]=(0,T.useState)();return(0,E.jsxs)(p,{gapVertical:`large`,children:[(0,E.jsxs)(p.Cell,{className:`ams-prose`,span:{narrow:4,medium:8,wide:7},children:[(0,E.jsxs)(`div`,{className:S[`story-detail__header`],children:[(0,E.jsx)(f,{level:1,size:`level-2`,children:e}),(0,E.jsx)(i,{count:C,isLiked:l,onToggle:async e=>{if(!n){w.push(`/inloggen`);return}if((await y(x,e)).needsLogin){w.push(`/inloggen`);return}w.refresh()},size:`large`})]}),(0,E.jsx)(d,{children:t}),(0,E.jsx)(v,{fallbackAlt:e,images:s})]}),(0,E.jsxs)(p.Cell,{className:`ams-prose`,span:{narrow:4,medium:8,wide:5},children:[(0,E.jsx)(f,{level:2,size:`level-4`,children:`Details`}),(0,E.jsxs)(`dl`,{className:S[`story-detail__details`],children:[(0,E.jsx)(`dt`,{children:(0,E.jsx)(`strong`,{children:`Status`})}),(0,E.jsx)(`dd`,{children:(0,E.jsx)(g,{color:r&&new Date(r)<new Date?`lime`:`azure`,label:r&&new Date(r)<new Date?`Voltooid`:`In uitvoering`})}),(0,E.jsx)(`dt`,{children:(0,E.jsx)(`strong`,{children:`Startdatum`})}),(0,E.jsx)(`dd`,{children:_?new Date(_).toLocaleDateString(`nl-NL`):`Onbekend`}),r&&(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(`dt`,{children:(0,E.jsx)(`strong`,{children:`Einddatum`})}),(0,E.jsx)(`dd`,{children:new Date(r).toLocaleDateString(`nl-NL`)})]}),m&&(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(`dt`,{children:(0,E.jsx)(`strong`,{children:`Onderdeel van`})}),(0,E.jsx)(`dd`,{children:(0,E.jsx)(b,{href:`/features/${m.documentId}`,children:m.title})})]})]}),(0,E.jsx)(f,{level:2,size:`level-4`,children:`Reacties`}),(0,E.jsx)(a,{compact:!0,reactions:h}),(0,E.jsx)(o,{error:k,isLoggedIn:!!n,loading:D,onSubmit:async e=>{O(!0),A(void 0);let t=await c(x,e);if(O(!1),t.needsLogin){w.push(`/inloggen`);return}if(t.error){A(t.error);return}t.success&&w.refresh()}})]})]})}var T,E,D=e((()=>{x(),s(),l(),T=t(n()),_(),h(),C(),m(),E=r(),w.__docgenInfo={description:``,methods:[],displayName:`StoryDetail`,props:{content:{required:!0,tsType:{name:`string`},description:``},currentUserDocumentId:{required:!1,tsType:{name:`string`},description:``},endDate:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:``},images:{required:!1,tsType:{name:`union`,raw:`StrapiImage[] | null`,elements:[{name:`Array`,elements:[{name:`StrapiImage`}],raw:`StrapiImage[]`},{name:`null`}]},description:``},isLiked:{required:!0,tsType:{name:`boolean`},description:``},parentFeature:{required:!1,tsType:{name:`union`,raw:`ParentFeature | null`,elements:[{name:`signature`,type:`object`,raw:`{
  documentId: string
  title: string
}`,signature:{properties:[{key:`documentId`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}}]}},{name:`null`}]},description:``},reactions:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  author?: { isTeam?: boolean; name: string } | null
  content: string
  id: number
}`,signature:{properties:[{key:`author`,value:{name:`union`,raw:`{ isTeam?: boolean; name: string } | null`,elements:[{name:`signature`,type:`object`,raw:`{ isTeam?: boolean; name: string }`,signature:{properties:[{key:`isTeam`,value:{name:`boolean`,required:!1}},{key:`name`,value:{name:`string`,required:!0}}]}},{name:`null`}],required:!1}},{key:`content`,value:{name:`string`,required:!0}},{key:`id`,value:{name:`number`,required:!0}}]}}],raw:`ReactionItem[]`},description:``},startDate:{required:!1,tsType:{name:`string`},description:``},storyDocumentId:{required:!0,tsType:{name:`string`},description:``},title:{required:!0,tsType:{name:`string`},description:``},voteCount:{required:!0,tsType:{name:`number`},description:``}}}})),O,k,A,j,M,N,P,F;e((()=>{D(),O=r(),k=[{author:{name:`Emma Bakker`},content:`Wanneer is dit beschikbaar in de npm package?`,id:1},{author:{name:`Joost van Dam`},content:`De Figma-bestanden zijn al bijgewerkt, top!`,id:2},{author:{isTeam:!0,name:`Amsterdam Design System Team`},content:`We verwachten dit eind Q2 te releasen. Bedankt voor jullie geduld!`,id:3}],A={title:`Pages/Story Detail`,component:w,decorators:[e=>(0,O.jsx)(`div`,{style:{padding:`2rem`},children:(0,O.jsx)(e,{})})],parameters:{layout:`fullscreen`}},j={args:{title:`[Design] Achtergrond-kleur voor interne applicaties`,content:`Interne applicaties van de gemeente Amsterdam hebben specifieke eisen voor achtergrondkleuren die afwijken van de publiek-gerichte applicaties. In deze story worden de designkeuzes voor achtergrondkleuren vastgesteld en gedocumenteerd in het design system.`,endDate:null,isLiked:!1,parentFeature:{title:`Donkere Modus Ondersteuning`,documentId:`feature-layout-001`},reactions:k,startDate:`2025-03-01`,storyDocumentId:`feature-layout-001`,voteCount:14}},M={args:{...j.args,title:`[Code] Geneste items en actieve weergave Menu`,content:`De Menu component wordt uitgebreid met ondersteuning voor geneste menu-items en een actieve weergave. Hiermee kunnen navigatiestructuren worden weergegeven met meerdere niveaus diep, waarbij het actieve pad visueel wordt gemarkeerd.`,endDate:`2025-05-31`,isLiked:!0,startDate:`2025-04-17`,voteCount:27}},N={args:{...j.args,title:`Rich Text editor onderzoek`,content:`Onderzoek naar bestaande open-source rich text editors die voldoen aan de toegankelijkheidseisen van de gemeente Amsterdam. Het doel is een onderbouwde aanbeveling te doen voor de keuze van een editor die goed integreert met het design system.`,endDate:null,parentFeature:null,reactions:[],startDate:`2025-06-01`,voteCount:9}},P={args:{...j.args,title:`[Design] Tabel varianten`,content:`Ontwerpen van de verschillende varianten van de Data Tabel component: standaard, compact en zebra-streepen. Inclusief states voor geselecteerde rijen, hover en focus.`,reactions:[],voteCount:5}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    title: '[Design] Achtergrond-kleur voor interne applicaties',
    content: 'Interne applicaties van de gemeente Amsterdam hebben specifieke eisen voor achtergrondkleuren die afwijken van de publiek-gerichte applicaties. In deze story worden de designkeuzes voor achtergrondkleuren vastgesteld en gedocumenteerd in het design system.',
    endDate: null,
    isLiked: false,
    parentFeature: {
      title: 'Donkere Modus Ondersteuning',
      documentId: 'feature-layout-001'
    },
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
    parentFeature: null,
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