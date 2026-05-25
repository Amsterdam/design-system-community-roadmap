import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{C as n}from"./iframe-J-ZW7Ymp.js";import{t as r}from"./jsx-runtime-CaZkqeYb.js";import{E as i,f as a,m as o,t as s}from"./src-CUrb09j9.js";import{S as c,_ as l,a as u,c as d,g as f,h as p,l as m,m as h,n as g,p as _,t as v,u as y,v as b,x,y as S}from"./StrapiImageBlock-D80Ewlho.js";var C,w=e((()=>{C={"story-detail__details":`_story-detail__details_1r95y_1`,"story-detail__header":`_story-detail__header_1r95y_14`}}));function T({title:e,content:t,currentUserDocumentId:n,currentUserIsTeam:r=!1,endDate:s,images:c,isLiked:m,parentFeature:h,reactions:g,startDate:y,storyDocumentId:w,voteCount:T}){let O=p(),[k,A]=(0,E.useState)(!1),[j,M]=(0,E.useState)(),N=g.find(e=>e.author?.isTeam),P=N?g.filter(e=>e.id!==N.id):g,F=async e=>{if(!n){O.push(`/inloggen`);return}if((await _(w,e)).needsLogin){O.push(`/inloggen`);return}O.refresh()},I=async e=>{A(!0),M(void 0);let t=await d(w,e);if(A(!1),t.needsLogin){O.push(`/inloggen`);return}if(t.error){M(t.error);return}t.success&&O.refresh()};return(0,D.jsxs)(l,{gapVertical:`large`,children:[(0,D.jsxs)(l.Cell,{className:`ams-prose`,span:{narrow:4,medium:8,wide:7},children:[(0,D.jsxs)(`div`,{className:C[`story-detail__header`],children:[(0,D.jsx)(b,{level:1,size:`level-2`,children:e}),(0,D.jsx)(i,{count:T,isLiked:m,onToggle:F,size:`large`})]}),(0,D.jsx)(S,{children:t}),(0,D.jsx)(v,{fallbackAlt:e,images:c})]}),(0,D.jsxs)(l.Cell,{className:`ams-prose`,span:{narrow:4,medium:8,wide:5},children:[(0,D.jsx)(b,{level:2,size:`level-4`,children:`Details`}),(0,D.jsxs)(`dl`,{className:C[`story-detail__details`],children:[(0,D.jsx)(`dt`,{children:(0,D.jsx)(`strong`,{children:`Status`})}),(0,D.jsx)(`dd`,{children:(0,D.jsx)(f,{color:s&&new Date(s)<new Date?`lime`:`azure`,label:s&&new Date(s)<new Date?`Voltooid`:`In uitvoering`})}),(0,D.jsx)(`dt`,{children:(0,D.jsx)(`strong`,{children:`Startdatum`})}),(0,D.jsx)(`dd`,{children:y?new Date(y).toLocaleDateString(`nl-NL`):`Onbekend`}),s&&(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(`dt`,{children:(0,D.jsx)(`strong`,{children:`Einddatum`})}),(0,D.jsx)(`dd`,{children:new Date(s).toLocaleDateString(`nl-NL`)})]}),h&&(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(`dt`,{children:(0,D.jsx)(`strong`,{children:`Onderdeel van`})}),(0,D.jsx)(`dd`,{children:(0,D.jsx)(x,{href:`/features/${h.documentId}`,children:h.title})})]})]}),N&&(0,D.jsx)(a,{onDeleteReaction:r?I:void 0,reactions:[N]}),(0,D.jsx)(b,{level:2,size:`level-4`,children:`Reacties`}),(0,D.jsx)(a,{compact:!0,onDeleteReaction:r?I:void 0,reactions:P}),(0,D.jsx)(o,{error:j,isLoggedIn:!!n,loading:k,onSubmit:async e=>{A(!0),M(void 0);let t=await u(w,e);if(A(!1),t.needsLogin){O.push(`/inloggen`);return}if(t.error){M(t.error);return}t.success&&O.refresh()}})]})]})}var E,D,O=e((()=>{c(),s(),h(),E=t(n()),y(),m(),w(),g(),D=r(),T.__docgenInfo={description:``,methods:[],displayName:`StoryDetail`,props:{content:{required:!0,tsType:{name:`string`},description:``},currentUserDocumentId:{required:!1,tsType:{name:`string`},description:``},currentUserIsTeam:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},endDate:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:``},images:{required:!1,tsType:{name:`union`,raw:`StrapiImage[] | null`,elements:[{name:`Array`,elements:[{name:`StrapiImage`}],raw:`StrapiImage[]`},{name:`null`}]},description:``},isLiked:{required:!0,tsType:{name:`boolean`},description:``},parentFeature:{required:!1,tsType:{name:`union`,raw:`ParentFeature | null`,elements:[{name:`signature`,type:`object`,raw:`{
  documentId: string
  title: string
}`,signature:{properties:[{key:`documentId`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}}]}},{name:`null`}]},description:``},reactions:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  author?: { isTeam?: boolean; name: string } | null
  content: string
  id: number
}`,signature:{properties:[{key:`author`,value:{name:`union`,raw:`{ isTeam?: boolean; name: string } | null`,elements:[{name:`signature`,type:`object`,raw:`{ isTeam?: boolean; name: string }`,signature:{properties:[{key:`isTeam`,value:{name:`boolean`,required:!1}},{key:`name`,value:{name:`string`,required:!0}}]}},{name:`null`}],required:!1}},{key:`content`,value:{name:`string`,required:!0}},{key:`id`,value:{name:`number`,required:!0}}]}}],raw:`ReactionItem[]`},description:``},startDate:{required:!1,tsType:{name:`string`},description:``},storyDocumentId:{required:!0,tsType:{name:`string`},description:``},title:{required:!0,tsType:{name:`string`},description:``},voteCount:{required:!0,tsType:{name:`number`},description:``}}}})),k,A,j,M,N,P,F,I;e((()=>{O(),k=r(),A=[{author:{name:`Emma Bakker`},content:`Wanneer is dit beschikbaar in de npm package?`,id:1},{author:{name:`Joost van Dam`},content:`De Figma-bestanden zijn al bijgewerkt, top!`,id:2},{author:{isTeam:!0,name:`Amsterdam Design System Team`},content:`We verwachten dit eind Q2 te releasen. Bedankt voor jullie geduld!`,id:3}],j={title:`Pages/Story Detail`,component:T,decorators:[e=>(0,k.jsx)(`div`,{style:{padding:`2rem`},children:(0,k.jsx)(e,{})})],parameters:{layout:`fullscreen`}},M={args:{title:`[Design] Achtergrond-kleur voor interne applicaties`,content:`Interne applicaties van de gemeente Amsterdam hebben specifieke eisen voor achtergrondkleuren die afwijken van de publiek-gerichte applicaties. In deze story worden de designkeuzes voor achtergrondkleuren vastgesteld en gedocumenteerd in het design system.`,endDate:null,isLiked:!1,parentFeature:{title:`Donkere Modus Ondersteuning`,documentId:`feature-layout-001`},reactions:A,startDate:`2025-03-01`,storyDocumentId:`feature-layout-001`,voteCount:14}},N={args:{...M.args,title:`[Code] Geneste items en actieve weergave Menu`,content:`De Menu component wordt uitgebreid met ondersteuning voor geneste menu-items en een actieve weergave. Hiermee kunnen navigatiestructuren worden weergegeven met meerdere niveaus diep, waarbij het actieve pad visueel wordt gemarkeerd.`,endDate:`2025-05-31`,isLiked:!0,startDate:`2025-04-17`,voteCount:27}},P={args:{...M.args,title:`Rich Text editor onderzoek`,content:`Onderzoek naar bestaande open-source rich text editors die voldoen aan de toegankelijkheidseisen van de gemeente Amsterdam. Het doel is een onderbouwde aanbeveling te doen voor de keuze van een editor die goed integreert met het design system.`,endDate:null,parentFeature:null,reactions:[],startDate:`2025-06-01`,voteCount:9}},F={args:{...M.args,title:`[Design] Tabel varianten`,content:`Ontwerpen van de verschillende varianten van de Data Tabel component: standaard, compact en zebra-streepen. Inclusief states voor geselecteerde rijen, hover en focus.`,reactions:[],voteCount:5}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
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
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    title: '[Code] Geneste items en actieve weergave Menu',
    content: 'De Menu component wordt uitgebreid met ondersteuning voor geneste menu-items en een actieve weergave. Hiermee kunnen navigatiestructuren worden weergegeven met meerdere niveaus diep, waarbij het actieve pad visueel wordt gemarkeerd.',
    endDate: '2025-05-31',
    isLiked: true,
    startDate: '2025-04-17',
    voteCount: 27
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
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
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    title: '[Design] Tabel varianten',
    content: 'Ontwerpen van de verschillende varianten van de Data Tabel component: standaard, compact en zebra-streepen. Inclusief states voor geselecteerde rijen, hover en focus.',
    reactions: [],
    voteCount: 5
  }
}`,...F.parameters?.docs?.source}}},I=[`Default`,`WithEndDate`,`WithoutParentFeature`,`Empty`]}))();export{M as Default,F as Empty,N as WithEndDate,P as WithoutParentFeature,I as __namedExportsOrder,j as default};