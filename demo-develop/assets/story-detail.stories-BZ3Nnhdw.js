import{c as e,i as t}from"./preload-helper-usAeo7Bx.js";import{C as n}from"./iframe-aHsvr3GC.js";import{t as r}from"./jsx-runtime-O9QVJvLM.js";import{O as i,f as a,m as o,t as s,w as c}from"./src-BtIQTyEN.js";import{A as l,C as u,D as d,E as f,F as p,I as m,L as h,N as g,O as _,P as v,S as y,T as ee,_ as b,a as x,b as S,c as C,g as w,j as T,k as E,l as D,n as O,p as k,t as A,u as j,w as M,x as N}from"./StrapiImageBlock-CmGEefXU.js";function P({title:e,content:t,currentUserDocumentId:n,currentUserIsTeam:r=!1,endDate:s,images:u,isLiked:p,parentFeature:h,reactions:b,startDate:D,storyDocumentId:O,voteCount:j}){let N=y(),[P,R]=(0,I.useState)(!1),[z,B]=(0,I.useState)(),[V,H]=(0,I.useState)(!1),[U,W]=(0,I.useState)(),[G,K]=(0,I.useState)(),[q,J]=(0,I.useState)(!1),[Y,X]=(0,I.useState)(),Z=`edit-modal-story-${O}`,te=async()=>{J(!0),X(void 0);let e=await w(O);return J(!1),e.needsLogin?(N.push(`/inloggen`),!1):e.error?(X(e.error),!1):e.success?(N.push(`/roadmap`),!0):!1},ne=async e=>{H(!0),W(void 0),K(void 0);let t=await S(O,{title:e.title,content:e.content,endDate:e.endDate??``,startDate:e.startDate??``});return H(!1),t.needsLogin?(N.push(`/inloggen`),!1):t.error?(W(t.error),!1):t.fieldErrors?(K(t.fieldErrors),!1):t.success?(N.refresh(),!0):!1},Q=b.find(e=>e.author?.isTeam),re=Q?b.filter(e=>e.id!==Q.id):b,ie=async e=>{if(!n){N.push(`/inloggen`);return}if((await k(O,e)).needsLogin){N.push(`/inloggen`);return}N.refresh()},$=async e=>{R(!0),B(void 0);let t=await C(O,e);if(R(!1),t.needsLogin){N.push(`/inloggen`);return}if(t.error){B(t.error);return}t.success&&N.refresh()};return(0,L.jsxs)(_,{gapVertical:`large`,children:[(0,L.jsxs)(_.Cell,{className:`ams-prose`,span:{narrow:4,medium:8,wide:7},children:[(0,L.jsxs)(g,{align:`between`,alignVertical:`center`,wrap:!0,children:[(0,L.jsx)(E,{level:1,size:`level-2`,children:e}),(0,L.jsxs)(M,{children:[(0,L.jsx)(i,{count:j,isLiked:p,onToggle:ie,size:`large`}),r&&(0,L.jsx)(l,{label:`Story bewerken`,onClick:()=>d.open(`#${Z}`),svg:m,type:`button`})]})]}),(0,L.jsx)(T,{children:t}),(0,L.jsx)(A,{fallbackAlt:e,images:u})]}),(0,L.jsxs)(_.Cell,{className:`ams-prose`,span:{narrow:4,medium:8,wide:5},children:[(0,L.jsx)(E,{level:2,size:`level-3`,children:`Details`}),(0,L.jsxs)(f,{children:[(0,L.jsx)(f.Term,{children:`Status`}),(0,L.jsx)(f.Description,{children:(0,L.jsx)(ee,{color:s&&new Date(s)<new Date?`lime`:`azure`,label:s&&new Date(s)<new Date?`Voltooid`:`In uitvoering`})}),(0,L.jsx)(f.Term,{children:`Startdatum`}),(0,L.jsx)(f.Description,{children:D?new Date(D).toLocaleDateString(`nl-NL`):`Onbekend`}),s&&(0,L.jsxs)(L.Fragment,{children:[(0,L.jsx)(f.Term,{children:`Einddatum`}),(0,L.jsx)(f.Description,{children:new Date(s).toLocaleDateString(`nl-NL`)})]}),h&&(0,L.jsxs)(L.Fragment,{children:[(0,L.jsx)(f.Term,{children:`Onderdeel van`}),(0,L.jsx)(f.Description,{children:(0,L.jsx)(F.default,{href:`/features/${h.documentId}`,legacyBehavior:!0,passHref:!0,children:(0,L.jsx)(v,{children:h.title})})})]})]}),Q&&(0,L.jsx)(a,{onDeleteReaction:r?$:void 0,reactions:[Q]}),(0,L.jsx)(E,{level:2,size:`level-3`,children:`Reacties`}),(0,L.jsx)(a,{compact:!0,onDeleteReaction:r?$:void 0,reactions:re}),(0,L.jsx)(o,{error:z,isLoggedIn:!!n,loading:P,onSubmit:async e=>{R(!0),B(void 0);let t=await x(O,e);if(R(!1),t.needsLogin){N.push(`/inloggen`);return}if(t.error){B(t.error);return}t.success&&N.refresh()}})]}),r&&(0,L.jsx)(c,{deleteError:Y,deleteLoading:q,error:U,fieldErrors:G,id:Z,initialValues:{title:e,content:t,endDate:s??``,startDate:D??``},loading:V,onClose:()=>{W(void 0),K(void 0),X(void 0)},onDelete:te,onSubmit:ne,type:`story`})]})}var F,I,L,R=t((()=>{p(),h(),s(),F=e(u()),N(),I=e(n()),b(),j(),D(),O(),L=r(),P.__docgenInfo={description:``,methods:[],displayName:`StoryDetail`,props:{content:{required:!0,tsType:{name:`string`},description:``},currentUserDocumentId:{required:!1,tsType:{name:`string`},description:``},currentUserIsTeam:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},endDate:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:``},images:{required:!1,tsType:{name:`union`,raw:`StrapiImage[] | null`,elements:[{name:`Array`,elements:[{name:`StrapiImage`}],raw:`StrapiImage[]`},{name:`null`}]},description:``},isLiked:{required:!0,tsType:{name:`boolean`},description:``},parentFeature:{required:!1,tsType:{name:`union`,raw:`ParentFeature | null`,elements:[{name:`signature`,type:`object`,raw:`{
  documentId: string
  title: string
}`,signature:{properties:[{key:`documentId`,value:{name:`string`,required:!0}},{key:`title`,value:{name:`string`,required:!0}}]}},{name:`null`}]},description:``},reactions:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  author?: { isTeam?: boolean; name: string } | null
  content: string
  id: number
}`,signature:{properties:[{key:`author`,value:{name:`union`,raw:`{ isTeam?: boolean; name: string } | null`,elements:[{name:`signature`,type:`object`,raw:`{ isTeam?: boolean; name: string }`,signature:{properties:[{key:`isTeam`,value:{name:`boolean`,required:!1}},{key:`name`,value:{name:`string`,required:!0}}]}},{name:`null`}],required:!1}},{key:`content`,value:{name:`string`,required:!0}},{key:`id`,value:{name:`number`,required:!0}}]}}],raw:`ReactionItem[]`},description:``},startDate:{required:!1,tsType:{name:`string`},description:``},storyDocumentId:{required:!0,tsType:{name:`string`},description:``},title:{required:!0,tsType:{name:`string`},description:``},voteCount:{required:!0,tsType:{name:`number`},description:``}}}})),z,B,V,H,U,W,G,K;t((()=>{R(),z=r(),B=[{author:{name:`Emma`},content:`Wanneer is dit beschikbaar in de npm package?`,id:1},{author:{name:`Joost`},content:`De Figma-bestanden zijn al bijgewerkt, top!`,id:2},{author:{isTeam:!0,name:`Evi`},content:`We verwachten dit eind Q2 te releasen. Bedankt voor jullie geduld!`,id:3}],V={title:`Pages/Story Detail`,component:P,decorators:[e=>(0,z.jsx)(`div`,{style:{padding:`2rem`},children:(0,z.jsx)(e,{})})],parameters:{layout:`fullscreen`}},H={args:{title:`[Design] Achtergrond-kleur voor interne applicaties`,content:`Interne applicaties van de gemeente Amsterdam hebben specifieke eisen voor achtergrondkleuren die afwijken van de publiek-gerichte applicaties. In deze story worden de designkeuzes voor achtergrondkleuren vastgesteld en gedocumenteerd in het design system.`,endDate:null,isLiked:!1,parentFeature:{title:`Donkere Modus Ondersteuning`,documentId:`feature-layout-001`},reactions:B,startDate:`2025-03-01`,storyDocumentId:`feature-layout-001`,voteCount:14}},U={args:{...H.args,title:`[Code] Geneste items en actieve weergave Menu`,content:`De Menu component wordt uitgebreid met ondersteuning voor geneste menu-items en een actieve weergave. Hiermee kunnen navigatiestructuren worden weergegeven met meerdere niveaus diep, waarbij het actieve pad visueel wordt gemarkeerd.`,endDate:`2025-05-31`,isLiked:!0,startDate:`2025-04-17`,voteCount:27}},W={args:{...H.args,title:`Rich Text editor onderzoek`,content:`Onderzoek naar bestaande open-source rich text editors die voldoen aan de toegankelijkheidseisen van de gemeente Amsterdam. Het doel is een onderbouwde aanbeveling te doen voor de keuze van een editor die goed integreert met het design system.`,endDate:null,parentFeature:null,reactions:[],startDate:`2025-06-01`,voteCount:9}},G={args:{...H.args,title:`[Design] Tabel varianten`,content:`Ontwerpen van de verschillende varianten van de Data Tabel component: standaard, compact en zebra-streepen. Inclusief states voor geselecteerde rijen, hover en focus.`,reactions:[],voteCount:5}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
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
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    title: '[Code] Geneste items en actieve weergave Menu',
    content: 'De Menu component wordt uitgebreid met ondersteuning voor geneste menu-items en een actieve weergave. Hiermee kunnen navigatiestructuren worden weergegeven met meerdere niveaus diep, waarbij het actieve pad visueel wordt gemarkeerd.',
    endDate: '2025-05-31',
    isLiked: true,
    startDate: '2025-04-17',
    voteCount: 27
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
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
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    title: '[Design] Tabel varianten',
    content: 'Ontwerpen van de verschillende varianten van de Data Tabel component: standaard, compact en zebra-streepen. Inclusief states voor geselecteerde rijen, hover en focus.',
    reactions: [],
    voteCount: 5
  }
}`,...G.parameters?.docs?.source}}},K=[`Default`,`WithEndDate`,`WithoutParentFeature`,`Empty`]}))();export{H as Default,G as Empty,U as WithEndDate,W as WithoutParentFeature,K as __namedExportsOrder,V as default};