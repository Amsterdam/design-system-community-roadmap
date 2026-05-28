import{c as e,i as t}from"./preload-helper-usAeo7Bx.js";import{C as n}from"./iframe-0fGqZQsv.js";import{t as r}from"./jsx-runtime-O9QVJvLM.js";import{O as i,f as a,m as o,t as s,w as c}from"./src-Bo3VPAYs.js";import{A as l,C as u,D as d,E as f,M as p,O as m,S as h,T as g,b as _,d as v,h as y,j as b,k as x,l as S,m as C,n as w,o as T,r as E,t as D,u as O,v as k,w as A,x as j,y as M}from"./StrapiImageBlock-BQ72ugDB.js";import{n as N,r as P,t as F}from"./date-C-MtJFbq.js";var I,L=t((()=>{I={"feature-detail__title-row":`_feature-detail__title-row_lj86p_1`,"feature-detail__story-content":`_feature-detail__story-content_lj86p_8`}}));function R({title:e,content:t,currentUserDocumentId:n,currentUserIsTeam:r=!1,endDate:s,featureDocumentId:l,images:p,isLiked:S,reactions:C,startDate:w,stories:O,voteCount:k}){let P=M(),[L,R]=(0,z.useState)(!1),[V,H]=(0,z.useState)(),[U,W]=(0,z.useState)(!1),[G,K]=(0,z.useState)(),[q,J]=(0,z.useState)(),Y=`edit-modal-feature-${l}`,X=async e=>{W(!0),K(void 0),J(void 0);let t=await y(l,{title:e.title,content:e.content,endDate:e.endDate??null,startDate:e.startDate??``});return W(!1),t.needsLogin?(P.push(`/inloggen`),!1):t.error?(K(t.error),!1):t.fieldErrors?(J(t.fieldErrors),!1):t.success?(P.refresh(),!0):!1},Z=C.find(e=>e.author?.isTeam),Q=Z?C.filter(e=>e.id!==Z.id):C,ee=[...O].sort((e,t)=>!e.startDate&&!t.startDate?0:e.startDate?t.startDate?new Date(e.startDate).getTime()-new Date(t.startDate).getTime():-1:1),te=async e=>{if(!n){P.push(`/inloggen`);return}if((await v(l,e)).needsLogin){P.push(`/inloggen`);return}P.refresh()},$=async e=>{(await T(l,e)).success&&P.refresh()};return(0,B.jsxs)(A,{gapVertical:`large`,children:[(0,B.jsxs)(A.Cell,{className:`ams-prose`,span:{narrow:4,medium:8,wide:7},children:[(0,B.jsxs)(`div`,{className:I[`feature-detail__title-row`],children:[(0,B.jsx)(g,{level:1,size:`level-2`,children:e}),(0,B.jsxs)(_,{children:[(0,B.jsx)(i,{count:k,isLiked:S,onToggle:te,size:`large`}),r&&(0,B.jsx)(f,{label:`Feature bewerken`,onClick:()=>u.open(`#${Y}`),svg:b,type:`button`})]})]}),(0,B.jsx)(d,{children:t}),(0,B.jsx)(D,{fallbackAlt:e,images:p}),O.length>0&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(g,{level:2,size:`level-3`,children:`Stories`}),(0,B.jsx)(m,{headingLevel:3,children:ee.map(e=>(0,B.jsx)(m.Step,{heading:e.title,status:N(e.startDate,e.endDate),children:(0,B.jsxs)(`div`,{className:I[`feature-detail__story-content`],children:[(0,B.jsx)(j,{label:F(e.startDate,e.endDate)}),(0,B.jsx)(x,{href:`/stories/${e.documentId}`,children:`Bekijk details`})]})},e.documentId))})]})]}),(0,B.jsxs)(A.Cell,{className:`ams-prose`,span:{narrow:4,medium:8,wide:5},children:[(0,B.jsx)(g,{level:2,size:`level-3`,children:`Details`}),(0,B.jsxs)(h,{children:[(0,B.jsx)(h.Term,{children:`Status`}),(0,B.jsx)(h.Description,{children:(0,B.jsx)(j,{color:s&&new Date(s)<new Date?`lime`:`azure`,label:s&&new Date(s)<new Date?`Voltooid`:`In uitvoering`})}),(0,B.jsx)(h.Term,{children:`Startdatum`}),(0,B.jsx)(h.Description,{children:w?new Date(w).toLocaleDateString(`nl-NL`):`Onbekend`}),s&&(0,B.jsxs)(B.Fragment,{children:[(0,B.jsx)(h.Term,{children:`Einddatum`}),(0,B.jsx)(h.Description,{children:new Date(s).toLocaleDateString(`nl-NL`)})]})]}),Z&&(0,B.jsx)(a,{onDeleteReaction:r?$:void 0,reactions:[Z]}),(0,B.jsx)(g,{level:2,size:`level-3`,children:`Reacties`}),(0,B.jsx)(a,{compact:!0,onDeleteReaction:r?$:void 0,reactions:Q}),(0,B.jsx)(o,{error:V,isLoggedIn:!!n,loading:L,onSubmit:async e=>{R(!0),H(void 0);let t=await E(l,e);if(R(!1),t.needsLogin){P.push(`/inloggen`);return}if(t.error){H(t.error);return}t.success&&P.refresh()}})]}),(0,B.jsx)(c,{error:G,fieldErrors:q,id:Y,initialValues:{title:e,content:t,endDate:s??``,startDate:w??``},loading:U,onClose:()=>{K(void 0),J(void 0)},onSubmit:X,type:`feature`})]})}var z,B,V=t((()=>{l(),p(),s(),k(),z=e(n()),C(),O(),S(),P(),L(),w(),B=r(),R.__docgenInfo={description:``,methods:[],displayName:`FeatureDetail`,props:{content:{required:!0,tsType:{name:`string`},description:``},currentUserDocumentId:{required:!1,tsType:{name:`string`},description:``},currentUserIsTeam:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},endDate:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:``},featureDocumentId:{required:!0,tsType:{name:`string`},description:``},images:{required:!1,tsType:{name:`union`,raw:`StrapiImage[] | null`,elements:[{name:`Array`,elements:[{name:`StrapiImage`}],raw:`StrapiImage[]`},{name:`null`}]},description:``},isLiked:{required:!0,tsType:{name:`boolean`},description:``},reactions:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  author?: { isTeam?: boolean; name: string } | null
  content: string
  id: number
}`,signature:{properties:[{key:`author`,value:{name:`union`,raw:`{ isTeam?: boolean; name: string } | null`,elements:[{name:`signature`,type:`object`,raw:`{ isTeam?: boolean; name: string }`,signature:{properties:[{key:`isTeam`,value:{name:`boolean`,required:!1}},{key:`name`,value:{name:`string`,required:!0}}]}},{name:`null`}],required:!1}},{key:`content`,value:{name:`string`,required:!0}},{key:`id`,value:{name:`number`,required:!0}}]}}],raw:`ReactionItem[]`},description:``},startDate:{required:!1,tsType:{name:`string`},description:``},stories:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  documentId: string
  endDate?: string | null
  startDate?: string
  title: string
}`,signature:{properties:[{key:`documentId`,value:{name:`string`,required:!0}},{key:`endDate`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1}},{key:`startDate`,value:{name:`string`,required:!1}},{key:`title`,value:{name:`string`,required:!0}}]}}],raw:`ConnectedStory[]`},description:``},title:{required:!0,tsType:{name:`string`},description:``},voteCount:{required:!0,tsType:{name:`number`},description:``}}}})),H,U,W,G,K,q,J,Y;t((()=>{V(),H=r(),U=[{author:{name:`Lieke`},content:`Fijn om te zien dat dit op de planning staat. Wij wachten hier al lang op.`,id:1},{author:{name:`Bart`},content:`Zijn er al Figma-bestanden beschikbaar voor de nieuwe tabelopmaak?`,id:2},{author:{isTeam:!0,name:`Evi`},content:`De designfase is gestart. We delen de Figma-link zodra de eerste versie klaar is.`,id:3}],W=[{title:`[Design] Tabel varianten`,documentId:`story-dt-001`,endDate:`2025-05-10`,startDate:`2025-04-15`},{title:`[Code] Sorteerbare kolommen`,documentId:`story-dt-002`,endDate:`2025-06-20`,startDate:`2025-05-12`},{title:`[Code] Paginering integratie`,documentId:`story-dt-003`,endDate:null,startDate:`2025-06-23`}],G={title:`Pages/Feature Detail`,component:R,decorators:[e=>(0,H.jsx)(`div`,{style:{padding:`2rem`},children:(0,H.jsx)(e,{})})],parameters:{layout:`fullscreen`}},K={args:{title:`Data Tabel`,content:`Een volledig uitgewerkte Data Tabel component voor het weergeven van gestructureerde gegevens. De component ondersteunt sorteerbare kolommen, paginering, selectie van rijen en is volledig toegankelijk volgens WCAG 2.2 AA. Ontworpen voor zowel eenvoudige als complexe datatoepassingen binnen gemeente-applicaties.`,endDate:null,featureDocumentId:`feature-dt-main`,isLiked:!1,reactions:U,startDate:`2025-04-15`,stories:W,voteCount:53}},q={args:{title:`Applicatie-layout`,content:`De Applicatie-layout feature biedt een standaard paginastructuur voor interne gemeente-applicaties. Inclusief navigatiebalk, zijpaneel en hoofdinhoud-zone. De layout is responsief en past zich aan op zowel desktop als tablet.`,endDate:`2025-03-28`,featureDocumentId:`feature-layout-main`,isLiked:!0,reactions:U.slice(0,2),startDate:`2025-01-10`,stories:[{title:`[Design] Achtergrond-kleur voor interne applicaties`,documentId:`story-layout-001`,endDate:`2025-01-31`,startDate:`2025-01-10`},{title:`[Code] Geneste items en actieve weergave Menu`,documentId:`story-layout-002`,endDate:`2025-03-28`,startDate:`2025-02-03`}],voteCount:38}},J={args:{title:`Patronen`,content:`Documentatie en voorbeelden van veelgebruikte UI-patronen zoals lege states, foutmeldingen, laadstatussen en bevestigingsdialogen. De patronen worden beschreven als herbruikbare combinaties van bestaande componenten, zodat teams consistent gedrag kunnen implementeren.`,endDate:null,featureDocumentId:`feature-patterns-main`,isLiked:!1,reactions:[],startDate:`2025-05-20`,stories:[],voteCount:22}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Data Tabel',
    content: 'Een volledig uitgewerkte Data Tabel component voor het weergeven van gestructureerde gegevens. De component ondersteunt sorteerbare kolommen, paginering, selectie van rijen en is volledig toegankelijk volgens WCAG 2.2 AA. Ontworpen voor zowel eenvoudige als complexe datatoepassingen binnen gemeente-applicaties.',
    endDate: null,
    featureDocumentId: 'feature-dt-main',
    isLiked: false,
    reactions: mockReactions,
    startDate: '2025-04-15',
    stories: mockStories,
    voteCount: 53
  }
}`,...K.parameters?.docs?.source}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Applicatie-layout',
    content: 'De Applicatie-layout feature biedt een standaard paginastructuur voor interne gemeente-applicaties. Inclusief navigatiebalk, zijpaneel en hoofdinhoud-zone. De layout is responsief en past zich aan op zowel desktop als tablet.',
    endDate: '2025-03-28',
    featureDocumentId: 'feature-layout-main',
    isLiked: true,
    reactions: mockReactions.slice(0, 2),
    startDate: '2025-01-10',
    stories: [{
      title: '[Design] Achtergrond-kleur voor interne applicaties',
      documentId: 'story-layout-001',
      endDate: '2025-01-31',
      startDate: '2025-01-10'
    }, {
      title: '[Code] Geneste items en actieve weergave Menu',
      documentId: 'story-layout-002',
      endDate: '2025-03-28',
      startDate: '2025-02-03'
    }],
    voteCount: 38
  }
}`,...q.parameters?.docs?.source}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Patronen',
    content: 'Documentatie en voorbeelden van veelgebruikte UI-patronen zoals lege states, foutmeldingen, laadstatussen en bevestigingsdialogen. De patronen worden beschreven als herbruikbare combinaties van bestaande componenten, zodat teams consistent gedrag kunnen implementeren.',
    endDate: null,
    featureDocumentId: 'feature-patterns-main',
    isLiked: false,
    reactions: [],
    startDate: '2025-05-20',
    stories: [],
    voteCount: 22
  }
}`,...J.parameters?.docs?.source}}},Y=[`InProgress`,`Completed`,`NoStories`]}))();export{q as Completed,K as InProgress,J as NoStories,Y as __namedExportsOrder,G as default};