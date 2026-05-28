import{c as e,i as t}from"./preload-helper-usAeo7Bx.js";import{C as n}from"./iframe-ChMBZwlG.js";import{t as r}from"./jsx-runtime-O9QVJvLM.js";import{O as i,f as a,m as o,t as s,w as c}from"./src-Dl0THF0s.js";import{A as l,C as u,D as d,E as f,M as p,S as m,T as h,_ as g,a as _,b as v,c as y,j as b,k as x,l as S,m as C,n as w,p as T,t as E,u as D,v as O,w as k,x as A,y as j}from"./StrapiImageBlock-i8xdIJ03.js";var M,N=t((()=>{M={"story-detail__title-row":`_story-detail__title-row_uidby_1`}}));function P({title:e,content:t,currentUserDocumentId:n,currentUserIsTeam:r=!1,endDate:s,images:l,isLiked:p,parentFeature:S,reactions:C,startDate:w,storyDocumentId:D,voteCount:O}){let N=j(),[P,L]=(0,F.useState)(!1),[R,z]=(0,F.useState)(),[B,V]=(0,F.useState)(!1),[H,U]=(0,F.useState)(),[W,G]=(0,F.useState)(),K=`edit-modal-story-${D}`,q=async e=>{V(!0),U(void 0),G(void 0);let t=await g(D,{title:e.title,content:e.content,endDate:e.endDate??``,startDate:e.startDate??``});return V(!1),t.needsLogin?(N.push(`/inloggen`),!1):t.error?(U(t.error),!1):t.fieldErrors?(G(t.fieldErrors),!1):t.success?(N.refresh(),!0):!1},J=C.find(e=>e.author?.isTeam),Y=J?C.filter(e=>e.id!==J.id):C,X=async e=>{if(!n){N.push(`/inloggen`);return}if((await T(D,e)).needsLogin){N.push(`/inloggen`);return}N.refresh()},Z=async e=>{L(!0),z(void 0);let t=await y(D,e);if(L(!1),t.needsLogin){N.push(`/inloggen`);return}if(t.error){z(t.error);return}t.success&&N.refresh()};return(0,I.jsxs)(k,{gapVertical:`large`,children:[(0,I.jsxs)(k.Cell,{className:`ams-prose`,span:{narrow:4,medium:8,wide:7},children:[(0,I.jsxs)(`div`,{className:M[`story-detail__title-row`],children:[(0,I.jsx)(h,{level:1,size:`level-2`,children:e}),(0,I.jsxs)(v,{children:[(0,I.jsx)(i,{count:O,isLiked:p,onToggle:X,size:`large`}),r&&(0,I.jsx)(f,{label:`Story bewerken`,onClick:()=>u.open(`#${K}`),svg:b,type:`button`})]})]}),(0,I.jsx)(d,{children:t}),(0,I.jsx)(E,{fallbackAlt:e,images:l})]}),(0,I.jsxs)(k.Cell,{className:`ams-prose`,span:{narrow:4,medium:8,wide:5},children:[(0,I.jsx)(h,{level:2,size:`level-3`,children:`Details`}),(0,I.jsxs)(m,{children:[(0,I.jsx)(m.Term,{children:`Status`}),(0,I.jsx)(m.Description,{children:(0,I.jsx)(A,{color:s&&new Date(s)<new Date?`lime`:`azure`,label:s&&new Date(s)<new Date?`Voltooid`:`In uitvoering`})}),(0,I.jsx)(m.Term,{children:`Startdatum`}),(0,I.jsx)(m.Description,{children:w?new Date(w).toLocaleDateString(`nl-NL`):`Onbekend`}),s&&(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(m.Term,{children:`Einddatum`}),(0,I.jsx)(m.Description,{children:new Date(s).toLocaleDateString(`nl-NL`)})]}),S&&(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(m.Term,{children:`Onderdeel van`}),(0,I.jsx)(m.Description,{children:(0,I.jsx)(x,{href:`/features/${S.documentId}`,children:S.title})})]})]}),J&&(0,I.jsx)(a,{onDeleteReaction:r?Z:void 0,reactions:[J]}),(0,I.jsx)(h,{level:2,size:`level-3`,children:`Reacties`}),(0,I.jsx)(a,{compact:!0,onDeleteReaction:r?Z:void 0,reactions:Y}),(0,I.jsx)(o,{error:R,isLoggedIn:!!n,loading:P,onSubmit:async e=>{L(!0),z(void 0);let t=await _(D,e);if(L(!1),t.needsLogin){N.push(`/inloggen`);return}if(t.error){z(t.error);return}t.success&&N.refresh()}})]}),(0,I.jsx)(c,{error:H,fieldErrors:W,id:K,initialValues:{title:e,content:t,endDate:s??``,startDate:w??``},loading:B,onClose:()=>{U(void 0),G(void 0)},onSubmit:q,type:`story`})]})}var F,I,L=t((()=>{l(),p(),s(),O(),F=e(n()),C(),D(),S(),N(),w(),I=r(),P.__docgenInfo={description:``,methods:[],displayName:`StoryDetail`,props:{content:{required:!0,tsType:{name:`string`},description:``},currentUserDocumentId:{required:!1,tsType:{name:`string`},description:``},currentUserIsTeam:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},endDate:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:``},images:{required:!1,tsType:{name:`union`,raw:`StrapiImage[] | null`,elements:[{name:`Array`,elements:[{name:`StrapiImage`}],raw:`StrapiImage[]`},{name:`null`}]},description:``},isLiked:{required:!0,tsType:{name:`boolean`},description:``},parentFeature:{required:!1,tsType:{name:`union`,raw:`ParentFeature | null`,elements:[{name:`signature`,type:`object`,raw:`{
  documentId: string
  title: string
}`,signature:{properties:[{key:`documentId`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}}]}},{name:`null`}]},description:``},reactions:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  author?: { isTeam?: boolean; name: string } | null
  content: string
  id: number
}`,signature:{properties:[{key:`author`,value:{name:`union`,raw:`{ isTeam?: boolean; name: string } | null`,elements:[{name:`signature`,type:`object`,raw:`{ isTeam?: boolean; name: string }`,signature:{properties:[{key:`isTeam`,value:{name:`boolean`,required:!1}},{key:`name`,value:{name:`string`,required:!0}}]}},{name:`null`}],required:!1}},{key:`content`,value:{name:`string`,required:!0}},{key:`id`,value:{name:`number`,required:!0}}]}}],raw:`ReactionItem[]`},description:``},startDate:{required:!1,tsType:{name:`string`},description:``},storyDocumentId:{required:!0,tsType:{name:`string`},description:``},title:{required:!0,tsType:{name:`string`},description:``},voteCount:{required:!0,tsType:{name:`number`},description:``}}}})),R,z,B,V,H,U,W,G;t((()=>{L(),R=r(),z=[{author:{name:`Emma`},content:`Wanneer is dit beschikbaar in de npm package?`,id:1},{author:{name:`Joost`},content:`De Figma-bestanden zijn al bijgewerkt, top!`,id:2},{author:{isTeam:!0,name:`Evi`},content:`We verwachten dit eind Q2 te releasen. Bedankt voor jullie geduld!`,id:3}],B={title:`Pages/Story Detail`,component:P,decorators:[e=>(0,R.jsx)(`div`,{style:{padding:`2rem`},children:(0,R.jsx)(e,{})})],parameters:{layout:`fullscreen`}},V={args:{title:`[Design] Achtergrond-kleur voor interne applicaties`,content:`Interne applicaties van de gemeente Amsterdam hebben specifieke eisen voor achtergrondkleuren die afwijken van de publiek-gerichte applicaties. In deze story worden de designkeuzes voor achtergrondkleuren vastgesteld en gedocumenteerd in het design system.`,endDate:null,isLiked:!1,parentFeature:{title:`Donkere Modus Ondersteuning`,documentId:`feature-layout-001`},reactions:z,startDate:`2025-03-01`,storyDocumentId:`feature-layout-001`,voteCount:14}},H={args:{...V.args,title:`[Code] Geneste items en actieve weergave Menu`,content:`De Menu component wordt uitgebreid met ondersteuning voor geneste menu-items en een actieve weergave. Hiermee kunnen navigatiestructuren worden weergegeven met meerdere niveaus diep, waarbij het actieve pad visueel wordt gemarkeerd.`,endDate:`2025-05-31`,isLiked:!0,startDate:`2025-04-17`,voteCount:27}},U={args:{...V.args,title:`Rich Text editor onderzoek`,content:`Onderzoek naar bestaande open-source rich text editors die voldoen aan de toegankelijkheidseisen van de gemeente Amsterdam. Het doel is een onderbouwde aanbeveling te doen voor de keuze van een editor die goed integreert met het design system.`,endDate:null,parentFeature:null,reactions:[],startDate:`2025-06-01`,voteCount:9}},W={args:{...V.args,title:`[Design] Tabel varianten`,content:`Ontwerpen van de verschillende varianten van de Data Tabel component: standaard, compact en zebra-streepen. Inclusief states voor geselecteerde rijen, hover en focus.`,reactions:[],voteCount:5}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
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
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    title: '[Code] Geneste items en actieve weergave Menu',
    content: 'De Menu component wordt uitgebreid met ondersteuning voor geneste menu-items en een actieve weergave. Hiermee kunnen navigatiestructuren worden weergegeven met meerdere niveaus diep, waarbij het actieve pad visueel wordt gemarkeerd.',
    endDate: '2025-05-31',
    isLiked: true,
    startDate: '2025-04-17',
    voteCount: 27
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
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
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    title: '[Design] Tabel varianten',
    content: 'Ontwerpen van de verschillende varianten van de Data Tabel component: standaard, compact en zebra-streepen. Inclusief states voor geselecteerde rijen, hover en focus.',
    reactions: [],
    voteCount: 5
  }
}`,...W.parameters?.docs?.source}}},G=[`Default`,`WithEndDate`,`WithoutParentFeature`,`Empty`]}))();export{V as Default,W as Empty,H as WithEndDate,U as WithoutParentFeature,G as __namedExportsOrder,B as default};