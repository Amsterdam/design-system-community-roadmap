import{c as e,i as t}from"./preload-helper-usAeo7Bx.js";import{C as n}from"./iframe-DeH9QhzF.js";import{t as r}from"./jsx-runtime-O9QVJvLM.js";import{O as i,f as a,m as o,t as s,w as c}from"./src-ReWDlaPl.js";import{A as l,C as u,D as d,E as f,F as p,M as m,N as h,O as g,P as ee,S as te,T as _,_ as v,a as y,b,c as x,g as S,k as C,l as w,n as T,p as E,t as D,u as O,w as k,x as A}from"./StrapiImageBlock-CA-u6XNj.js";var j,M=t((()=>{j={"story-detail__title-row":`_story-detail__title-row_uidby_1`}}));function N({title:e,content:t,currentUserDocumentId:n,currentUserIsTeam:r=!1,endDate:s,images:p,isLiked:h,parentFeature:v,reactions:w,startDate:T,storyDocumentId:O,voteCount:A}){let M=te(),[N,I]=(0,P.useState)(!1),[L,R]=(0,P.useState)(),[z,B]=(0,P.useState)(!1),[V,H]=(0,P.useState)(),[U,W]=(0,P.useState)(),[G,K]=(0,P.useState)(!1),[q,J]=(0,P.useState)(),Y=`edit-modal-story-${O}`,X=async()=>{K(!0),J(void 0);let e=await S(O);return K(!1),e.needsLogin?(M.push(`/inloggen`),!1):e.error?(J(e.error),!1):e.success?(M.push(`/roadmap`),!0):!1},Z=async e=>{B(!0),H(void 0),W(void 0);let t=await b(O,{title:e.title,content:e.content,endDate:e.endDate??``,startDate:e.startDate??``});return B(!1),t.needsLogin?(M.push(`/inloggen`),!1):t.error?(H(t.error),!1):t.fieldErrors?(W(t.fieldErrors),!1):t.success?(M.refresh(),!0):!1},Q=w.find(e=>e.author?.isTeam),ne=Q?w.filter(e=>e.id!==Q.id):w,re=async e=>{if(!n){M.push(`/inloggen`);return}if((await E(O,e)).needsLogin){M.push(`/inloggen`);return}M.refresh()},$=async e=>{I(!0),R(void 0);let t=await x(O,e);if(I(!1),t.needsLogin){M.push(`/inloggen`);return}if(t.error){R(t.error);return}t.success&&M.refresh()};return(0,F.jsxs)(d,{gapVertical:`large`,children:[(0,F.jsxs)(d.Cell,{className:`ams-prose`,span:{narrow:4,medium:8,wide:7},children:[(0,F.jsxs)(`div`,{className:j[`story-detail__title-row`],children:[(0,F.jsx)(g,{level:1,size:`level-2`,children:e}),(0,F.jsxs)(u,{children:[(0,F.jsx)(i,{count:A,isLiked:h,onToggle:re,size:`large`}),r&&(0,F.jsx)(C,{label:`Story bewerken`,onClick:()=>f.open(`#${Y}`),svg:ee,type:`button`})]})]}),(0,F.jsx)(l,{children:t}),(0,F.jsx)(D,{fallbackAlt:e,images:p})]}),(0,F.jsxs)(d.Cell,{className:`ams-prose`,span:{narrow:4,medium:8,wide:5},children:[(0,F.jsx)(g,{level:2,size:`level-3`,children:`Details`}),(0,F.jsxs)(_,{children:[(0,F.jsx)(_.Term,{children:`Status`}),(0,F.jsx)(_.Description,{children:(0,F.jsx)(k,{color:s&&new Date(s)<new Date?`lime`:`azure`,label:s&&new Date(s)<new Date?`Voltooid`:`In uitvoering`})}),(0,F.jsx)(_.Term,{children:`Startdatum`}),(0,F.jsx)(_.Description,{children:T?new Date(T).toLocaleDateString(`nl-NL`):`Onbekend`}),s&&(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(_.Term,{children:`Einddatum`}),(0,F.jsx)(_.Description,{children:new Date(s).toLocaleDateString(`nl-NL`)})]}),v&&(0,F.jsxs)(F.Fragment,{children:[(0,F.jsx)(_.Term,{children:`Onderdeel van`}),(0,F.jsx)(_.Description,{children:(0,F.jsx)(m,{href:`/features/${v.documentId}`,children:v.title})})]})]}),Q&&(0,F.jsx)(a,{onDeleteReaction:r?$:void 0,reactions:[Q]}),(0,F.jsx)(g,{level:2,size:`level-3`,children:`Reacties`}),(0,F.jsx)(a,{compact:!0,onDeleteReaction:r?$:void 0,reactions:ne}),(0,F.jsx)(o,{error:L,isLoggedIn:!!n,loading:N,onSubmit:async e=>{I(!0),R(void 0);let t=await y(O,e);if(I(!1),t.needsLogin){M.push(`/inloggen`);return}if(t.error){R(t.error);return}t.success&&M.refresh()}})]}),r&&(0,F.jsx)(c,{deleteError:q,deleteLoading:G,error:V,fieldErrors:U,id:Y,initialValues:{title:e,content:t,endDate:s??``,startDate:T??``},loading:z,onClose:()=>{H(void 0),W(void 0),J(void 0)},onDelete:X,onSubmit:Z,type:`story`})]})}var P,F,I=t((()=>{h(),p(),s(),A(),P=e(n()),v(),O(),w(),M(),T(),F=r(),N.__docgenInfo={description:``,methods:[],displayName:`StoryDetail`,props:{content:{required:!0,tsType:{name:`string`},description:``},currentUserDocumentId:{required:!1,tsType:{name:`string`},description:``},currentUserIsTeam:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},endDate:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:``},images:{required:!1,tsType:{name:`union`,raw:`StrapiImage[] | null`,elements:[{name:`Array`,elements:[{name:`StrapiImage`}],raw:`StrapiImage[]`},{name:`null`}]},description:``},isLiked:{required:!0,tsType:{name:`boolean`},description:``},parentFeature:{required:!1,tsType:{name:`union`,raw:`ParentFeature | null`,elements:[{name:`signature`,type:`object`,raw:`{
  documentId: string
  title: string
}`,signature:{properties:[{key:`documentId`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}}]}},{name:`null`}]},description:``},reactions:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  author?: { isTeam?: boolean; name: string } | null
  content: string
  id: number
}`,signature:{properties:[{key:`author`,value:{name:`union`,raw:`{ isTeam?: boolean; name: string } | null`,elements:[{name:`signature`,type:`object`,raw:`{ isTeam?: boolean; name: string }`,signature:{properties:[{key:`isTeam`,value:{name:`boolean`,required:!1}},{key:`name`,value:{name:`string`,required:!0}}]}},{name:`null`}],required:!1}},{key:`content`,value:{name:`string`,required:!0}},{key:`id`,value:{name:`number`,required:!0}}]}}],raw:`ReactionItem[]`},description:``},startDate:{required:!1,tsType:{name:`string`},description:``},storyDocumentId:{required:!0,tsType:{name:`string`},description:``},title:{required:!0,tsType:{name:`string`},description:``},voteCount:{required:!0,tsType:{name:`number`},description:``}}}})),L,R,z,B,V,H,U,W;t((()=>{I(),L=r(),R=[{author:{name:`Emma`},content:`Wanneer is dit beschikbaar in de npm package?`,id:1},{author:{name:`Joost`},content:`De Figma-bestanden zijn al bijgewerkt, top!`,id:2},{author:{isTeam:!0,name:`Evi`},content:`We verwachten dit eind Q2 te releasen. Bedankt voor jullie geduld!`,id:3}],z={title:`Pages/Story Detail`,component:N,decorators:[e=>(0,L.jsx)(`div`,{style:{padding:`2rem`},children:(0,L.jsx)(e,{})})],parameters:{layout:`fullscreen`}},B={args:{title:`[Design] Achtergrond-kleur voor interne applicaties`,content:`Interne applicaties van de gemeente Amsterdam hebben specifieke eisen voor achtergrondkleuren die afwijken van de publiek-gerichte applicaties. In deze story worden de designkeuzes voor achtergrondkleuren vastgesteld en gedocumenteerd in het design system.`,endDate:null,isLiked:!1,parentFeature:{title:`Donkere Modus Ondersteuning`,documentId:`feature-layout-001`},reactions:R,startDate:`2025-03-01`,storyDocumentId:`feature-layout-001`,voteCount:14}},V={args:{...B.args,title:`[Code] Geneste items en actieve weergave Menu`,content:`De Menu component wordt uitgebreid met ondersteuning voor geneste menu-items en een actieve weergave. Hiermee kunnen navigatiestructuren worden weergegeven met meerdere niveaus diep, waarbij het actieve pad visueel wordt gemarkeerd.`,endDate:`2025-05-31`,isLiked:!0,startDate:`2025-04-17`,voteCount:27}},H={args:{...B.args,title:`Rich Text editor onderzoek`,content:`Onderzoek naar bestaande open-source rich text editors die voldoen aan de toegankelijkheidseisen van de gemeente Amsterdam. Het doel is een onderbouwde aanbeveling te doen voor de keuze van een editor die goed integreert met het design system.`,endDate:null,parentFeature:null,reactions:[],startDate:`2025-06-01`,voteCount:9}},U={args:{...B.args,title:`[Design] Tabel varianten`,content:`Ontwerpen van de verschillende varianten van de Data Tabel component: standaard, compact en zebra-streepen. Inclusief states voor geselecteerde rijen, hover en focus.`,reactions:[],voteCount:5}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
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
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    title: '[Code] Geneste items en actieve weergave Menu',
    content: 'De Menu component wordt uitgebreid met ondersteuning voor geneste menu-items en een actieve weergave. Hiermee kunnen navigatiestructuren worden weergegeven met meerdere niveaus diep, waarbij het actieve pad visueel wordt gemarkeerd.',
    endDate: '2025-05-31',
    isLiked: true,
    startDate: '2025-04-17',
    voteCount: 27
  }
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
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
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    title: '[Design] Tabel varianten',
    content: 'Ontwerpen van de verschillende varianten van de Data Tabel component: standaard, compact en zebra-streepen. Inclusief states voor geselecteerde rijen, hover en focus.',
    reactions: [],
    voteCount: 5
  }
}`,...U.parameters?.docs?.source}}},W=[`Default`,`WithEndDate`,`WithoutParentFeature`,`Empty`]}))();export{B as Default,U as Empty,V as WithEndDate,H as WithoutParentFeature,W as __namedExportsOrder,z as default};