import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{C as n}from"./iframe-yIDwsOjP.js";import{t as r}from"./jsx-runtime-CaZkqeYb.js";import{E as i,f as a,m as o,t as s}from"./src-ewdy3BWc.js";import{C as c,S as l,_ as u,a as d,b as f,c as p,g as m,h,l as g,m as _,n as v,p as y,t as b,u as x,v as S,y as C}from"./StrapiImageBlock-BjPDlGgB.js";var w,T=e((()=>{w={"story-detail__title-row":`_story-detail__title-row_uidby_1`}}));function E({title:e,content:t,currentUserDocumentId:n,currentUserIsTeam:r=!1,endDate:s,images:c,isLiked:g,parentFeature:_,reactions:v,startDate:x,storyDocumentId:T,voteCount:E}){let k=h(),[A,j]=(0,D.useState)(!1),[M,N]=(0,D.useState)(),P=v.find(e=>e.author?.isTeam),F=P?v.filter(e=>e.id!==P.id):v,I=async e=>{if(!n){k.push(`/inloggen`);return}if((await y(T,e)).needsLogin){k.push(`/inloggen`);return}k.refresh()},L=async e=>{j(!0),N(void 0);let t=await p(T,e);if(j(!1),t.needsLogin){k.push(`/inloggen`);return}if(t.error){N(t.error);return}t.success&&k.refresh()};return(0,O.jsxs)(S,{gapVertical:`large`,children:[(0,O.jsxs)(S.Cell,{className:`ams-prose`,span:{narrow:4,medium:8,wide:7},children:[(0,O.jsxs)(`div`,{className:w[`story-detail__title-row`],children:[(0,O.jsx)(C,{level:1,size:`level-2`,children:e}),(0,O.jsx)(i,{count:E,isLiked:g,onToggle:I,size:`large`})]}),(0,O.jsx)(f,{children:t}),(0,O.jsx)(b,{fallbackAlt:e,images:c})]}),(0,O.jsxs)(S.Cell,{className:`ams-prose`,span:{narrow:4,medium:8,wide:5},children:[(0,O.jsx)(C,{level:2,size:`level-3`,children:`Details`}),(0,O.jsxs)(u,{children:[(0,O.jsx)(u.Term,{children:`Status`}),(0,O.jsx)(u.Description,{children:(0,O.jsx)(m,{color:s&&new Date(s)<new Date?`lime`:`azure`,label:s&&new Date(s)<new Date?`Voltooid`:`In uitvoering`})}),(0,O.jsx)(u.Term,{children:`Startdatum`}),(0,O.jsx)(u.Description,{children:x?new Date(x).toLocaleDateString(`nl-NL`):`Onbekend`}),s&&(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(u.Term,{children:`Einddatum`}),(0,O.jsx)(u.Description,{children:new Date(s).toLocaleDateString(`nl-NL`)})]}),_&&(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(u.Term,{children:`Onderdeel van`}),(0,O.jsx)(u.Description,{children:(0,O.jsx)(l,{href:`/features/${_.documentId}`,children:_.title})})]})]}),P&&(0,O.jsx)(a,{onDeleteReaction:r?L:void 0,reactions:[P]}),(0,O.jsx)(C,{level:2,size:`level-3`,children:`Reacties`}),(0,O.jsx)(a,{compact:!0,onDeleteReaction:r?L:void 0,reactions:F}),(0,O.jsx)(o,{error:M,isLoggedIn:!!n,loading:A,onSubmit:async e=>{j(!0),N(void 0);let t=await d(T,e);if(j(!1),t.needsLogin){k.push(`/inloggen`);return}if(t.error){N(t.error);return}t.success&&k.refresh()}})]})]})}var D,O,k=e((()=>{c(),s(),_(),D=t(n()),x(),g(),T(),v(),O=r(),E.__docgenInfo={description:``,methods:[],displayName:`StoryDetail`,props:{content:{required:!0,tsType:{name:`string`},description:``},currentUserDocumentId:{required:!1,tsType:{name:`string`},description:``},currentUserIsTeam:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},endDate:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:``},images:{required:!1,tsType:{name:`union`,raw:`StrapiImage[] | null`,elements:[{name:`Array`,elements:[{name:`StrapiImage`}],raw:`StrapiImage[]`},{name:`null`}]},description:``},isLiked:{required:!0,tsType:{name:`boolean`},description:``},parentFeature:{required:!1,tsType:{name:`union`,raw:`ParentFeature | null`,elements:[{name:`signature`,type:`object`,raw:`{
  documentId: string
  title: string
}`,signature:{properties:[{key:`documentId`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}}]}},{name:`null`}]},description:``},reactions:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  author?: { isTeam?: boolean; name: string } | null
  content: string
  id: number
}`,signature:{properties:[{key:`author`,value:{name:`union`,raw:`{ isTeam?: boolean; name: string } | null`,elements:[{name:`signature`,type:`object`,raw:`{ isTeam?: boolean; name: string }`,signature:{properties:[{key:`isTeam`,value:{name:`boolean`,required:!1}},{key:`name`,value:{name:`string`,required:!0}}]}},{name:`null`}],required:!1}},{key:`content`,value:{name:`string`,required:!0}},{key:`id`,value:{name:`number`,required:!0}}]}}],raw:`ReactionItem[]`},description:``},startDate:{required:!1,tsType:{name:`string`},description:``},storyDocumentId:{required:!0,tsType:{name:`string`},description:``},title:{required:!0,tsType:{name:`string`},description:``},voteCount:{required:!0,tsType:{name:`number`},description:``}}}})),A,j,M,N,P,F,I,L;e((()=>{k(),A=r(),j=[{author:{name:`Emma`},content:`Wanneer is dit beschikbaar in de npm package?`,id:1},{author:{name:`Joost`},content:`De Figma-bestanden zijn al bijgewerkt, top!`,id:2},{author:{isTeam:!0,name:`Evi`},content:`We verwachten dit eind Q2 te releasen. Bedankt voor jullie geduld!`,id:3}],M={title:`Pages/Story Detail`,component:E,decorators:[e=>(0,A.jsx)(`div`,{style:{padding:`2rem`},children:(0,A.jsx)(e,{})})],parameters:{layout:`fullscreen`}},N={args:{title:`[Design] Achtergrond-kleur voor interne applicaties`,content:`Interne applicaties van de gemeente Amsterdam hebben specifieke eisen voor achtergrondkleuren die afwijken van de publiek-gerichte applicaties. In deze story worden de designkeuzes voor achtergrondkleuren vastgesteld en gedocumenteerd in het design system.`,endDate:null,isLiked:!1,parentFeature:{title:`Donkere Modus Ondersteuning`,documentId:`feature-layout-001`},reactions:j,startDate:`2025-03-01`,storyDocumentId:`feature-layout-001`,voteCount:14}},P={args:{...N.args,title:`[Code] Geneste items en actieve weergave Menu`,content:`De Menu component wordt uitgebreid met ondersteuning voor geneste menu-items en een actieve weergave. Hiermee kunnen navigatiestructuren worden weergegeven met meerdere niveaus diep, waarbij het actieve pad visueel wordt gemarkeerd.`,endDate:`2025-05-31`,isLiked:!0,startDate:`2025-04-17`,voteCount:27}},F={args:{...N.args,title:`Rich Text editor onderzoek`,content:`Onderzoek naar bestaande open-source rich text editors die voldoen aan de toegankelijkheidseisen van de gemeente Amsterdam. Het doel is een onderbouwde aanbeveling te doen voor de keuze van een editor die goed integreert met het design system.`,endDate:null,parentFeature:null,reactions:[],startDate:`2025-06-01`,voteCount:9}},I={args:{...N.args,title:`[Design] Tabel varianten`,content:`Ontwerpen van de verschillende varianten van de Data Tabel component: standaard, compact en zebra-streepen. Inclusief states voor geselecteerde rijen, hover en focus.`,reactions:[],voteCount:5}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
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
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    title: '[Code] Geneste items en actieve weergave Menu',
    content: 'De Menu component wordt uitgebreid met ondersteuning voor geneste menu-items en een actieve weergave. Hiermee kunnen navigatiestructuren worden weergegeven met meerdere niveaus diep, waarbij het actieve pad visueel wordt gemarkeerd.',
    endDate: '2025-05-31',
    isLiked: true,
    startDate: '2025-04-17',
    voteCount: 27
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
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
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    title: '[Design] Tabel varianten',
    content: 'Ontwerpen van de verschillende varianten van de Data Tabel component: standaard, compact en zebra-streepen. Inclusief states voor geselecteerde rijen, hover en focus.',
    reactions: [],
    voteCount: 5
  }
}`,...I.parameters?.docs?.source}}},L=[`Default`,`WithEndDate`,`WithoutParentFeature`,`Empty`]}))();export{N as Default,I as Empty,P as WithEndDate,F as WithoutParentFeature,L as __namedExportsOrder,M as default};