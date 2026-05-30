import{c as e,i as t}from"./preload-helper-usAeo7Bx.js";import{C as n}from"./iframe-DrmWCdT-.js";import{t as r}from"./jsx-runtime-O9QVJvLM.js";import{O as i,f as a,m as o,t as s,w as c}from"./src-CFw03op6.js";import{A as l,C as u,E as d,F as f,I as p,L as m,M as h,O as g,P as _,R as v,S as y,T as b,_ as x,a as S,b as ee,c as te,g as C,j as w,k as T,l as E,n as D,p as O,t as k,u as A,w as j,x as M}from"./StrapiImageBlock-OT5j22iw.js";function N({title:e,content:t,currentUserDocumentId:n,currentUserIsTeam:r=!1,endDate:s,images:u,isLiked:p,parentFeature:v,reactions:x,startDate:E,storyDocumentId:D,voteCount:A}){let M=y(),[N,L]=(0,F.useState)(!1),[R,z]=(0,F.useState)(),[B,V]=(0,F.useState)(!1),[H,U]=(0,F.useState)(),[W,G]=(0,F.useState)(),[K,q]=(0,F.useState)(!1),[J,Y]=(0,F.useState)(),X=`edit-modal-story-${D}`,Z=async()=>{q(!0),Y(void 0);let e=await C(D);return q(!1),e.needsLogin?(M.push(`/inloggen`),!1):e.error?(Y(e.error),!1):e.success?(M.push(`/roadmap`),!0):!1},ne=async e=>{V(!0),U(void 0),G(void 0);let t=await ee(D,{title:e.title,content:e.content,endDate:e.endDate??``,startDate:e.startDate??``});return V(!1),t.needsLogin?(M.push(`/inloggen`),!1):t.error?(U(t.error),!1):t.fieldErrors?(G(t.fieldErrors),!1):t.success?(M.refresh(),!0):!1},Q=x.find(e=>e.author?.isTeam),re=Q?x.filter(e=>e.id!==Q.id):x,ie=async e=>{if(!n){M.push(`/inloggen`);return}(await O(D,e)).needsLogin&&M.push(`/inloggen`)},$=async e=>{L(!0),z(void 0);let t=await te(D,e);if(L(!1),t.needsLogin){M.push(`/inloggen`);return}if(t.error){z(t.error);return}t.success&&M.refresh()};return(0,I.jsxs)(l,{gapVertical:`large`,children:[(0,I.jsx)(l.Cell,{span:`all`,children:(0,I.jsxs)(_,{align:`between`,alignVertical:`center`,wrap:!0,children:[(0,I.jsx)(w,{level:1,size:`level-2`,children:e}),(0,I.jsxs)(j,{children:[(0,I.jsx)(i,{count:A,isLiked:p,onToggle:ie}),r&&(0,I.jsx)(d,{icon:m,iconBefore:!0,onClick:()=>T.open(`#${X}`),type:`button`,variant:`secondary`,children:`Bewerken`})]})]})}),(0,I.jsxs)(l.Cell,{className:`ams-prose`,span:{narrow:4,medium:8,wide:7},children:[(0,I.jsx)(h,{children:t}),(0,I.jsx)(k,{fallbackAlt:e,images:u})]}),(0,I.jsxs)(l.Cell,{className:`ams-prose`,span:{narrow:4,medium:8,wide:5},children:[(0,I.jsx)(w,{level:2,size:`level-3`,children:`Details`}),(0,I.jsxs)(g,{children:[(0,I.jsx)(g.Term,{children:`Status`}),(0,I.jsx)(g.Description,{children:(0,I.jsx)(b,{color:s&&new Date(s)<new Date?`lime`:`azure`,label:s&&new Date(s)<new Date?`Voltooid`:`In uitvoering`})}),(0,I.jsx)(g.Term,{children:`Startdatum`}),(0,I.jsx)(g.Description,{children:E?new Date(E).toLocaleDateString(`nl-NL`):`Onbekend`}),s&&(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(g.Term,{children:`Einddatum`}),(0,I.jsx)(g.Description,{children:new Date(s).toLocaleDateString(`nl-NL`)})]}),v&&(0,I.jsxs)(I.Fragment,{children:[(0,I.jsx)(g.Term,{children:`Onderdeel van`}),(0,I.jsx)(g.Description,{children:(0,I.jsx)(P.default,{href:`/features/${v.documentId}`,legacyBehavior:!0,passHref:!0,children:(0,I.jsx)(f,{children:v.title})})})]})]}),Q&&(0,I.jsx)(a,{onDeleteReaction:r?$:void 0,reactions:[Q]}),(0,I.jsx)(w,{level:2,size:`level-3`,children:`Reacties`}),(0,I.jsx)(a,{compact:!0,onDeleteReaction:r?$:void 0,reactions:re}),(0,I.jsx)(o,{error:R,isLoggedIn:!!n,loading:N,onSubmit:async e=>{L(!0),z(void 0);let t=await S(D,e);if(L(!1),t.needsLogin){M.push(`/inloggen`);return}if(t.error){z(t.error);return}t.success&&M.refresh()}})]}),r&&(0,I.jsx)(c,{deleteError:J,deleteLoading:K,error:H,fieldErrors:W,id:X,initialValues:{title:e,content:t,endDate:s??``,startDate:E??``},loading:B,onClose:()=>{U(void 0),G(void 0),Y(void 0)},onDelete:Z,onSubmit:ne,type:`story`})]})}var P,F,I,L=t((()=>{p(),v(),s(),P=e(u()),M(),F=e(n()),x(),A(),E(),D(),I=r(),N.__docgenInfo={description:``,methods:[],displayName:`StoryDetail`,props:{content:{required:!0,tsType:{name:`string`},description:``},currentUserDocumentId:{required:!1,tsType:{name:`string`},description:``},currentUserIsTeam:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},endDate:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:``},images:{required:!1,tsType:{name:`union`,raw:`StrapiImage[] | null`,elements:[{name:`Array`,elements:[{name:`StrapiImage`}],raw:`StrapiImage[]`},{name:`null`}]},description:``},isLiked:{required:!0,tsType:{name:`boolean`},description:``},parentFeature:{required:!1,tsType:{name:`union`,raw:`ParentFeature | null`,elements:[{name:`signature`,type:`object`,raw:`{
  documentId: string
  title: string
}`,signature:{properties:[{key:`documentId`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}}]}},{name:`null`}]},description:``},reactions:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  author?: { isTeam?: boolean; name: string } | null
  content: string
  id: number
}`,signature:{properties:[{key:`author`,value:{name:`union`,raw:`{ isTeam?: boolean; name: string } | null`,elements:[{name:`signature`,type:`object`,raw:`{ isTeam?: boolean; name: string }`,signature:{properties:[{key:`isTeam`,value:{name:`boolean`,required:!1}},{key:`name`,value:{name:`string`,required:!0}}]}},{name:`null`}],required:!1}},{key:`content`,value:{name:`string`,required:!0}},{key:`id`,value:{name:`number`,required:!0}}]}}],raw:`ReactionItem[]`},description:``},startDate:{required:!1,tsType:{name:`string`},description:``},storyDocumentId:{required:!0,tsType:{name:`string`},description:``},title:{required:!0,tsType:{name:`string`},description:``},voteCount:{required:!0,tsType:{name:`number`},description:``}}}})),R,z,B,V,H,U,W,G;t((()=>{L(),R=r(),z=[{author:{name:`Emma`},content:`Wanneer is dit beschikbaar in de npm package?`,id:1},{author:{name:`Joost`},content:`De Figma-bestanden zijn al bijgewerkt, top!`,id:2},{author:{isTeam:!0,name:`Evi`},content:`We verwachten dit eind Q2 te releasen. Bedankt voor jullie geduld!`,id:3}],B={title:`Pages/Story Detail`,component:N,decorators:[e=>(0,R.jsx)(`div`,{style:{padding:`2rem`},children:(0,R.jsx)(e,{})})],parameters:{layout:`fullscreen`}},V={args:{title:`[Design] Achtergrond-kleur voor interne applicaties`,content:`Interne applicaties van de gemeente Amsterdam hebben specifieke eisen voor achtergrondkleuren die afwijken van de publiek-gerichte applicaties. In deze story worden de designkeuzes voor achtergrondkleuren vastgesteld en gedocumenteerd in het design system.`,endDate:null,isLiked:!1,parentFeature:{title:`Donkere Modus Ondersteuning`,documentId:`feature-layout-001`},reactions:z,startDate:`2025-03-01`,storyDocumentId:`feature-layout-001`,voteCount:14}},H={args:{...V.args,title:`[Code] Geneste items en actieve weergave Menu`,content:`De Menu component wordt uitgebreid met ondersteuning voor geneste menu-items en een actieve weergave. Hiermee kunnen navigatiestructuren worden weergegeven met meerdere niveaus diep, waarbij het actieve pad visueel wordt gemarkeerd.`,endDate:`2025-05-31`,isLiked:!0,startDate:`2025-04-17`,voteCount:27}},U={args:{...V.args,title:`Rich Text editor onderzoek`,content:`Onderzoek naar bestaande open-source rich text editors die voldoen aan de toegankelijkheidseisen van de gemeente Amsterdam. Het doel is een onderbouwde aanbeveling te doen voor de keuze van een editor die goed integreert met het design system.`,endDate:null,parentFeature:null,reactions:[],startDate:`2025-06-01`,voteCount:9}},W={args:{...V.args,title:`[Design] Tabel varianten`,content:`Ontwerpen van de verschillende varianten van de Data Tabel component: standaard, compact en zebra-streepen. Inclusief states voor geselecteerde rijen, hover en focus.`,reactions:[],voteCount:5}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
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