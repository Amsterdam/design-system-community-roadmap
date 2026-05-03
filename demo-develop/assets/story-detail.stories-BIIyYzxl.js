import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{S as n}from"./iframe-hLC8TWeu.js";import{t as r}from"./jsx-runtime-BGU0mfus.js";import{_ as i,b as a,c as o,g as s,l as c,m as l,t as u,v as d,x as f}from"./src-jC_3LBZo.js";import{a as p,i as m,l as h,o as g,t as _,u as v}from"./actions-reactions-u99nH9V9.js";var y,b=t((()=>{y={"story-detail__details":`_story-detail__details_1r95y_1`,"story-detail__header":`_story-detail__header_1r95y_14`}}));function x({title:e,content:t,currentUserDocumentId:n,endDate:r,featureDocumentId:u,isLiked:f,parentFeature:p,reactions:m,startDate:h,voteCount:b}){let x=v(),[w,T]=(0,S.useState)(!1),[E,D]=(0,S.useState)();return(0,C.jsxs)(s,{gapVertical:`large`,children:[(0,C.jsxs)(s.Cell,{className:`ams-prose`,span:{narrow:4,medium:8,wide:7},children:[(0,C.jsxs)(`div`,{className:y[`story-detail__header`],children:[(0,C.jsx)(i,{level:1,size:`level-2`,children:e}),(0,C.jsx)(l,{count:b,isLiked:f,onToggle:async e=>{if(!n){x.push(`/inloggen`);return}if((await g(u,e)).needsLogin){x.push(`/inloggen`);return}x.refresh()},size:`large`})]}),(0,C.jsx)(d,{children:t})]}),(0,C.jsxs)(s.Cell,{className:`ams-prose`,span:{narrow:4,medium:8,wide:5},children:[p&&(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(i,{level:2,size:`level-4`,children:`Feature`}),(0,C.jsx)(a,{href:`/features/${p.documentId}`,children:p.title})]}),(0,C.jsx)(i,{level:2,size:`level-4`,children:`Details`}),(0,C.jsxs)(`dl`,{className:y[`story-detail__details`],children:[(0,C.jsx)(`dt`,{children:(0,C.jsx)(`strong`,{children:`Startdatum`})}),(0,C.jsx)(`dd`,{children:h?new Date(h).toLocaleDateString(`nl-NL`):`Onbekend`}),r&&(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(`dt`,{children:(0,C.jsx)(`strong`,{children:`Einddatum`})}),(0,C.jsx)(`dd`,{children:new Date(r).toLocaleDateString(`nl-NL`)})]})]}),(0,C.jsx)(i,{level:2,size:`level-4`,children:`Reacties`}),(0,C.jsx)(o,{compact:!0,reactions:m}),(0,C.jsx)(c,{error:E,isLoggedIn:!!n,loading:w,onSubmit:async e=>{T(!0),D(void 0);let t=await _(u,e);if(T(!1),t.needsLogin){x.push(`/inloggen`);return}if(t.error){D(t.error);return}t.success&&x.refresh()}})]})]})}var S,C,w=t((()=>{f(),u(),h(),S=e(n()),p(),m(),b(),C=r(),x.__docgenInfo={description:``,methods:[],displayName:`StoryDetail`,props:{content:{required:!0,tsType:{name:`string`},description:``},currentUserDocumentId:{required:!1,tsType:{name:`string`},description:``},endDate:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:``},featureDocumentId:{required:!0,tsType:{name:`string`},description:``},isLiked:{required:!0,tsType:{name:`boolean`},description:``},parentFeature:{required:!1,tsType:{name:`union`,raw:`ParentFeature | null`,elements:[{name:`signature`,type:`object`,raw:`{
  documentId: string
  title: string
}`,signature:{properties:[{key:`documentId`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}}]}},{name:`null`}]},description:``},reactions:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  author?: { isTeam?: boolean; name: string } | null
  content: string
  id: number
}`,signature:{properties:[{key:`author`,value:{name:`union`,raw:`{ isTeam?: boolean; name: string } | null`,elements:[{name:`signature`,type:`object`,raw:`{ isTeam?: boolean; name: string }`,signature:{properties:[{key:`isTeam`,value:{name:`boolean`,required:!1}},{key:`name`,value:{name:`string`,required:!0}}]}},{name:`null`}],required:!1}},{key:`content`,value:{name:`string`,required:!0}},{key:`id`,value:{name:`number`,required:!0}}]}}],raw:`ReactionItem[]`},description:``},startDate:{required:!1,tsType:{name:`string`},description:``},title:{required:!0,tsType:{name:`string`},description:``},voteCount:{required:!0,tsType:{name:`number`},description:``}}}})),T,E,D,O,k,A,j,M;t((()=>{w(),T=r(),E=[{author:{name:`Emma Bakker`},content:`Wanneer is dit beschikbaar in de npm package?`,id:1},{author:{name:`Joost van Dam`},content:`De Figma-bestanden zijn al bijgewerkt, top!`,id:2},{author:{isTeam:!0,name:`Amsterdam Design System Team`},content:`We verwachten dit eind Q2 te releasen. Bedankt voor jullie geduld!`,id:3}],D={title:`Pages/Story Detail`,component:x,decorators:[e=>(0,T.jsx)(`div`,{style:{padding:`2rem`},children:(0,T.jsx)(e,{})})],parameters:{layout:`fullscreen`}},O={args:{title:`[Design] Achtergrond-kleur voor interne applicaties`,content:`Interne applicaties van de gemeente Amsterdam hebben specifieke eisen voor achtergrondkleuren die afwijken van de publiek-gerichte applicaties. In deze story worden de designkeuzes voor achtergrondkleuren vastgesteld en gedocumenteerd in het design system.`,endDate:null,featureDocumentId:`feature-layout-001`,isLiked:!1,parentFeature:{title:`Applicatie-layout`,documentId:`feature-layout-001`},reactions:E,startDate:`2025-03-01`,voteCount:14}},k={args:{...O.args,title:`[Code] Geneste items en actieve weergave Menu`,content:`De Menu component wordt uitgebreid met ondersteuning voor geneste menu-items en een actieve weergave. Hiermee kunnen navigatiestructuren worden weergegeven met meerdere niveaus diep, waarbij het actieve pad visueel wordt gemarkeerd.`,endDate:`2025-05-31`,isLiked:!0,startDate:`2025-04-17`,voteCount:27}},A={args:{...O.args,title:`Rich Text editor onderzoek`,content:`Onderzoek naar bestaande open-source rich text editors die voldoen aan de toegankelijkheidseisen van de gemeente Amsterdam. Het doel is een onderbouwde aanbeveling te doen voor de keuze van een editor die goed integreert met het design system.`,endDate:null,parentFeature:null,reactions:[],startDate:`2025-06-01`,voteCount:9}},j={args:{...O.args,title:`[Design] Tabel varianten`,content:`Ontwerpen van de verschillende varianten van de Data Tabel component: standaard, compact en zebra-streepen. Inclusief states voor geselecteerde rijen, hover en focus.`,reactions:[],voteCount:5}},O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
}`,...O.parameters?.docs?.source}}},k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    title: '[Code] Geneste items en actieve weergave Menu',
    content: 'De Menu component wordt uitgebreid met ondersteuning voor geneste menu-items en een actieve weergave. Hiermee kunnen navigatiestructuren worden weergegeven met meerdere niveaus diep, waarbij het actieve pad visueel wordt gemarkeerd.',
    endDate: '2025-05-31',
    isLiked: true,
    startDate: '2025-04-17',
    voteCount: 27
  }
}`,...k.parameters?.docs?.source}}},A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
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
}`,...A.parameters?.docs?.source}}},j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    title: '[Design] Tabel varianten',
    content: 'Ontwerpen van de verschillende varianten van de Data Tabel component: standaard, compact en zebra-streepen. Inclusief states voor geselecteerde rijen, hover en focus.',
    reactions: [],
    voteCount: 5
  }
}`,...j.parameters?.docs?.source}}},M=[`Default`,`WithEndDate`,`WithoutParentFeature`,`Empty`]}))();export{O as Default,j as Empty,k as WithEndDate,A as WithoutParentFeature,M as __namedExportsOrder,D as default};