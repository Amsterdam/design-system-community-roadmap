import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{C as n}from"./iframe-yIDwsOjP.js";import{t as r}from"./jsx-runtime-CaZkqeYb.js";import{E as i,f as a,m as o,t as s}from"./src-ewdy3BWc.js";import{C as c,S as l,_ as u,b as d,d as f,g as p,h as m,l as h,m as g,n as _,o as v,r as y,t as b,u as x,v as S,x as C,y as w}from"./StrapiImageBlock-BjPDlGgB.js";import{n as T,r as E,t as D}from"./date-DDhTkvwE.js";var O,k=e((()=>{O={"feature-detail__title-row":`_feature-detail__title-row_lj86p_1`,"feature-detail__story-content":`_feature-detail__story-content_lj86p_8`}}));function A({title:e,content:t,currentUserDocumentId:n,currentUserIsTeam:r=!1,endDate:s,featureDocumentId:c,images:h,isLiked:g,reactions:_,startDate:x,stories:E,voteCount:k}){let A=m(),[N,P]=(0,j.useState)(!1),[F,I]=(0,j.useState)(),L=_.find(e=>e.author?.isTeam),R=L?_.filter(e=>e.id!==L.id):_,z=[...E].sort((e,t)=>!e.startDate&&!t.startDate?0:e.startDate?t.startDate?new Date(e.startDate).getTime()-new Date(t.startDate).getTime():-1:1),B=async e=>{if(!n){A.push(`/inloggen`);return}if((await f(c,e)).needsLogin){A.push(`/inloggen`);return}A.refresh()},V=async e=>{(await v(c,e)).success&&A.refresh()};return(0,M.jsxs)(S,{gapVertical:`large`,children:[(0,M.jsxs)(S.Cell,{className:`ams-prose`,span:{narrow:4,medium:8,wide:7},children:[(0,M.jsxs)(`div`,{className:O[`feature-detail__title-row`],children:[(0,M.jsx)(w,{level:1,size:`level-2`,children:e}),(0,M.jsx)(i,{count:k,isLiked:g,onToggle:B,size:`large`})]}),(0,M.jsx)(d,{children:t}),(0,M.jsx)(b,{fallbackAlt:e,images:h}),E.length>0&&(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(w,{level:2,size:`level-3`,children:`Stories`}),(0,M.jsx)(C,{headingLevel:3,children:z.map(e=>(0,M.jsx)(C.Step,{heading:e.title,status:T(e.startDate,e.endDate),children:(0,M.jsxs)(`div`,{className:O[`feature-detail__story-content`],children:[(0,M.jsx)(p,{label:D(e.startDate,e.endDate)}),(0,M.jsx)(l,{href:`/stories/${e.documentId}`,children:`Bekijk details`})]})},e.documentId))})]})]}),(0,M.jsxs)(S.Cell,{className:`ams-prose`,span:{narrow:4,medium:8,wide:5},children:[(0,M.jsx)(w,{level:2,size:`level-3`,children:`Details`}),(0,M.jsxs)(u,{children:[(0,M.jsx)(u.Term,{children:`Status`}),(0,M.jsx)(u.Description,{children:(0,M.jsx)(p,{color:s&&new Date(s)<new Date?`lime`:`azure`,label:s&&new Date(s)<new Date?`Voltooid`:`In uitvoering`})}),(0,M.jsx)(u.Term,{children:`Startdatum`}),(0,M.jsx)(u.Description,{children:x?new Date(x).toLocaleDateString(`nl-NL`):`Onbekend`}),s&&(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(u.Term,{children:`Einddatum`}),(0,M.jsx)(u.Description,{children:new Date(s).toLocaleDateString(`nl-NL`)})]})]}),L&&(0,M.jsx)(a,{onDeleteReaction:r?V:void 0,reactions:[L]}),(0,M.jsx)(w,{level:2,size:`level-3`,children:`Reacties`}),(0,M.jsx)(a,{compact:!0,onDeleteReaction:r?V:void 0,reactions:R}),(0,M.jsx)(o,{error:F,isLoggedIn:!!n,loading:N,onSubmit:async e=>{P(!0),I(void 0);let t=await y(c,e);if(P(!1),t.needsLogin){A.push(`/inloggen`);return}if(t.error){I(t.error);return}t.success&&A.refresh()}})]})]})}var j,M,N=e((()=>{c(),s(),g(),j=t(n()),x(),h(),E(),k(),_(),M=r(),A.__docgenInfo={description:``,methods:[],displayName:`FeatureDetail`,props:{content:{required:!0,tsType:{name:`string`},description:``},currentUserDocumentId:{required:!1,tsType:{name:`string`},description:``},currentUserIsTeam:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},endDate:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:``},featureDocumentId:{required:!0,tsType:{name:`string`},description:``},images:{required:!1,tsType:{name:`union`,raw:`StrapiImage[] | null`,elements:[{name:`Array`,elements:[{name:`StrapiImage`}],raw:`StrapiImage[]`},{name:`null`}]},description:``},isLiked:{required:!0,tsType:{name:`boolean`},description:``},reactions:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  author?: { isTeam?: boolean; name: string } | null
  content: string
  id: number
}`,signature:{properties:[{key:`author`,value:{name:`union`,raw:`{ isTeam?: boolean; name: string } | null`,elements:[{name:`signature`,type:`object`,raw:`{ isTeam?: boolean; name: string }`,signature:{properties:[{key:`isTeam`,value:{name:`boolean`,required:!1}},{key:`name`,value:{name:`string`,required:!0}}]}},{name:`null`}],required:!1}},{key:`content`,value:{name:`string`,required:!0}},{key:`id`,value:{name:`number`,required:!0}}]}}],raw:`ReactionItem[]`},description:``},startDate:{required:!1,tsType:{name:`string`},description:``},stories:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  documentId: string
  endDate?: string | null
  startDate?: string
  title: string
}`,signature:{properties:[{key:`documentId`,value:{name:`string`,required:!0}},{key:`endDate`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1}},{key:`startDate`,value:{name:`string`,required:!1}},{key:`title`,value:{name:`string`,required:!0}}]}}],raw:`ConnectedStory[]`},description:``},title:{required:!0,tsType:{name:`string`},description:``},voteCount:{required:!0,tsType:{name:`number`},description:``}}}})),P,F,I,L,R,z,B,V;e((()=>{N(),P=r(),F=[{author:{name:`Lieke`},content:`Fijn om te zien dat dit op de planning staat. Wij wachten hier al lang op.`,id:1},{author:{name:`Bart`},content:`Zijn er al Figma-bestanden beschikbaar voor de nieuwe tabelopmaak?`,id:2},{author:{isTeam:!0,name:`Evi`},content:`De designfase is gestart. We delen de Figma-link zodra de eerste versie klaar is.`,id:3}],I=[{title:`[Design] Tabel varianten`,documentId:`story-dt-001`,endDate:`2025-05-10`,startDate:`2025-04-15`},{title:`[Code] Sorteerbare kolommen`,documentId:`story-dt-002`,endDate:`2025-06-20`,startDate:`2025-05-12`},{title:`[Code] Paginering integratie`,documentId:`story-dt-003`,endDate:null,startDate:`2025-06-23`}],L={title:`Pages/Feature Detail`,component:A,decorators:[e=>(0,P.jsx)(`div`,{style:{padding:`2rem`},children:(0,P.jsx)(e,{})})],parameters:{layout:`fullscreen`}},R={args:{title:`Data Tabel`,content:`Een volledig uitgewerkte Data Tabel component voor het weergeven van gestructureerde gegevens. De component ondersteunt sorteerbare kolommen, paginering, selectie van rijen en is volledig toegankelijk volgens WCAG 2.2 AA. Ontworpen voor zowel eenvoudige als complexe datatoepassingen binnen gemeente-applicaties.`,endDate:null,featureDocumentId:`feature-dt-main`,isLiked:!1,reactions:F,startDate:`2025-04-15`,stories:I,voteCount:53}},z={args:{title:`Applicatie-layout`,content:`De Applicatie-layout feature biedt een standaard paginastructuur voor interne gemeente-applicaties. Inclusief navigatiebalk, zijpaneel en hoofdinhoud-zone. De layout is responsief en past zich aan op zowel desktop als tablet.`,endDate:`2025-03-28`,featureDocumentId:`feature-layout-main`,isLiked:!0,reactions:F.slice(0,2),startDate:`2025-01-10`,stories:[{title:`[Design] Achtergrond-kleur voor interne applicaties`,documentId:`story-layout-001`,endDate:`2025-01-31`,startDate:`2025-01-10`},{title:`[Code] Geneste items en actieve weergave Menu`,documentId:`story-layout-002`,endDate:`2025-03-28`,startDate:`2025-02-03`}],voteCount:38}},B={args:{title:`Patronen`,content:`Documentatie en voorbeelden van veelgebruikte UI-patronen zoals lege states, foutmeldingen, laadstatussen en bevestigingsdialogen. De patronen worden beschreven als herbruikbare combinaties van bestaande componenten, zodat teams consistent gedrag kunnen implementeren.`,endDate:null,featureDocumentId:`feature-patterns-main`,isLiked:!1,reactions:[],startDate:`2025-05-20`,stories:[],voteCount:22}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
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
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
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
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
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
}`,...B.parameters?.docs?.source}}},V=[`InProgress`,`Completed`,`NoStories`]}))();export{z as Completed,R as InProgress,B as NoStories,V as __namedExportsOrder,L as default};