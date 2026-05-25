import{i as e,s as t}from"./preload-helper-xPQekRTU.js";import{C as n}from"./iframe-CTnbhS4N.js";import{t as r}from"./jsx-runtime-CaZkqeYb.js";import{E as i,f as a,m as o,t as s}from"./src-Tq0C3gdV.js";import{_ as c,c as l,d as u,f as d,g as f,h as p,m,n as h,o as g,p as _,r as v,s as y,t as b,v as x,y as S}from"./StrapiImageBlock-BJhMFZ-J.js";import{n as C,r as w,t as T}from"./date-DDhTkvwE.js";var E,D=e((()=>{E={"feature-detail__stories-container":`_feature-detail__stories-container_cbgs1_1`,"feature-detail__stories":`_feature-detail__stories_cbgs1_1`,"feature-detail__story-content":`_feature-detail__story-content_cbgs1_9`,"feature-detail__story-date":`_feature-detail__story-date_cbgs1_16`,"feature-detail__details":`_feature-detail__details_cbgs1_20`,"feature-detail__header":`_feature-detail__header_cbgs1_33`}}));function O({title:e,content:t,currentUserDocumentId:n,endDate:r,featureDocumentId:s,images:u,isLiked:h,reactions:g,startDate:y,stories:S,voteCount:w}){let D=d(),[O,j]=(0,k.useState)(!1),[M,N]=(0,k.useState)(),P=[...S].sort((e,t)=>!e.startDate&&!t.startDate?0:e.startDate?t.startDate?new Date(e.startDate).getTime()-new Date(t.startDate).getTime():-1:1);return(0,A.jsxs)(m,{gapVertical:`large`,children:[(0,A.jsxs)(m.Cell,{className:`ams-prose`,span:{narrow:4,medium:8,wide:7},children:[(0,A.jsxs)(`div`,{className:E[`feature-detail__header`],children:[(0,A.jsx)(p,{level:1,size:`level-2`,children:e}),(0,A.jsx)(i,{count:w,isLiked:h,onToggle:async e=>{if(!n){D.push(`/inloggen`);return}if((await l(s,e)).needsLogin){D.push(`/inloggen`);return}D.refresh()},size:`large`})]}),(0,A.jsx)(f,{children:t}),(0,A.jsx)(b,{fallbackAlt:e,images:u}),S.length>0&&(0,A.jsxs)(`div`,{className:E[`feature-detail__stories-container`],children:[(0,A.jsx)(p,{level:2,size:`level-4`,children:`Stories`}),(0,A.jsx)(`div`,{className:E[`feature-detail__stories`],children:(0,A.jsx)(c,{headingLevel:3,children:P.map(e=>(0,A.jsx)(c.Step,{heading:e.title,status:C(e.startDate,e.endDate),children:(0,A.jsxs)(`div`,{className:E[`feature-detail__story-content`],children:[(0,A.jsx)(`div`,{className:E[`feature-detail__story-date`],children:(0,A.jsx)(_,{label:T(e.startDate,e.endDate)})}),(0,A.jsx)(x,{href:`/stories/${e.documentId}`,children:`Bekijk details`})]})},e.documentId))})})]})]}),(0,A.jsxs)(m.Cell,{className:`ams-prose`,span:{narrow:4,medium:8,wide:5},children:[(0,A.jsx)(p,{level:2,size:`level-4`,children:`Details`}),(0,A.jsxs)(`dl`,{className:E[`feature-detail__details`],children:[(0,A.jsx)(`dt`,{children:(0,A.jsx)(`strong`,{children:`Status`})}),(0,A.jsx)(`dd`,{children:(0,A.jsx)(_,{color:r&&new Date(r)<new Date?`lime`:`azure`,label:r&&new Date(r)<new Date?`Voltooid`:`In uitvoering`})}),(0,A.jsx)(`dt`,{children:(0,A.jsx)(`strong`,{children:`Startdatum`})}),(0,A.jsx)(`dd`,{children:y?new Date(y).toLocaleDateString(`nl-NL`):`Onbekend`}),r&&(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(`dt`,{children:(0,A.jsx)(`strong`,{children:`Einddatum`})}),(0,A.jsx)(`dd`,{children:new Date(r).toLocaleDateString(`nl-NL`)})]})]}),(0,A.jsx)(p,{level:2,size:`level-4`,children:`Reacties`}),(0,A.jsx)(a,{compact:!0,reactions:g}),(0,A.jsx)(o,{error:M,isLoggedIn:!!n,loading:O,onSubmit:async e=>{j(!0),N(void 0);let t=await v(s,e);if(j(!1),t.needsLogin){D.push(`/inloggen`);return}if(t.error){N(t.error);return}t.success&&D.refresh()}})]})]})}var k,A,j=e((()=>{S(),s(),u(),k=t(n()),y(),g(),w(),D(),h(),A=r(),O.__docgenInfo={description:``,methods:[],displayName:`FeatureDetail`,props:{content:{required:!0,tsType:{name:`string`},description:``},currentUserDocumentId:{required:!1,tsType:{name:`string`},description:``},endDate:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:``},featureDocumentId:{required:!0,tsType:{name:`string`},description:``},images:{required:!1,tsType:{name:`union`,raw:`StrapiImage[] | null`,elements:[{name:`Array`,elements:[{name:`StrapiImage`}],raw:`StrapiImage[]`},{name:`null`}]},description:``},isLiked:{required:!0,tsType:{name:`boolean`},description:``},reactions:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  author?: { isTeam?: boolean; name: string } | null
  content: string
  id: number
}`,signature:{properties:[{key:`author`,value:{name:`union`,raw:`{ isTeam?: boolean; name: string } | null`,elements:[{name:`signature`,type:`object`,raw:`{ isTeam?: boolean; name: string }`,signature:{properties:[{key:`isTeam`,value:{name:`boolean`,required:!1}},{key:`name`,value:{name:`string`,required:!0}}]}},{name:`null`}],required:!1}},{key:`content`,value:{name:`string`,required:!0}},{key:`id`,value:{name:`number`,required:!0}}]}}],raw:`ReactionItem[]`},description:``},startDate:{required:!1,tsType:{name:`string`},description:``},stories:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  documentId: string
  endDate?: string | null
  startDate?: string
  title: string
}`,signature:{properties:[{key:`documentId`,value:{name:`string`,required:!0}},{key:`endDate`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1}},{key:`startDate`,value:{name:`string`,required:!1}},{key:`title`,value:{name:`string`,required:!0}}]}}],raw:`ConnectedStory[]`},description:``},title:{required:!0,tsType:{name:`string`},description:``},voteCount:{required:!0,tsType:{name:`number`},description:``}}}})),M,N,P,F,I,L,R,z;e((()=>{j(),M=r(),N=[{author:{name:`Lieke Smit`},content:`Fijn om te zien dat dit op de planning staat. Wij wachten hier al lang op.`,id:1},{author:{name:`Bart Hendriks`},content:`Zijn er al Figma-bestanden beschikbaar voor de nieuwe tabelopmaak?`,id:2},{author:{isTeam:!0,name:`Amsterdam Design System Team`},content:`De designfase is gestart. We delen de Figma-link zodra de eerste versie klaar is.`,id:3}],P=[{title:`[Design] Tabel varianten`,documentId:`story-dt-001`,endDate:`2025-05-10`,startDate:`2025-04-15`},{title:`[Code] Sorteerbare kolommen`,documentId:`story-dt-002`,endDate:`2025-06-20`,startDate:`2025-05-12`},{title:`[Code] Paginering integratie`,documentId:`story-dt-003`,endDate:null,startDate:`2025-06-23`}],F={title:`Pages/Feature Detail`,component:O,decorators:[e=>(0,M.jsx)(`div`,{style:{padding:`2rem`},children:(0,M.jsx)(e,{})})],parameters:{layout:`fullscreen`}},I={args:{title:`Data Tabel`,content:`Een volledig uitgewerkte Data Tabel component voor het weergeven van gestructureerde gegevens. De component ondersteunt sorteerbare kolommen, paginering, selectie van rijen en is volledig toegankelijk volgens WCAG 2.2 AA. Ontworpen voor zowel eenvoudige als complexe datatoepassingen binnen gemeente-applicaties.`,endDate:null,featureDocumentId:`feature-dt-main`,isLiked:!1,reactions:N,startDate:`2025-04-15`,stories:P,voteCount:53}},L={args:{title:`Applicatie-layout`,content:`De Applicatie-layout feature biedt een standaard paginastructuur voor interne gemeente-applicaties. Inclusief navigatiebalk, zijpaneel en hoofdinhoud-zone. De layout is responsief en past zich aan op zowel desktop als tablet.`,endDate:`2025-03-28`,featureDocumentId:`feature-layout-main`,isLiked:!0,reactions:N.slice(0,2),startDate:`2025-01-10`,stories:[{title:`[Design] Achtergrond-kleur voor interne applicaties`,documentId:`story-layout-001`,endDate:`2025-01-31`,startDate:`2025-01-10`},{title:`[Code] Geneste items en actieve weergave Menu`,documentId:`story-layout-002`,endDate:`2025-03-28`,startDate:`2025-02-03`}],voteCount:38}},R={args:{title:`Patronen`,content:`Documentatie en voorbeelden van veelgebruikte UI-patronen zoals lege states, foutmeldingen, laadstatussen en bevestigingsdialogen. De patronen worden beschreven als herbruikbare combinaties van bestaande componenten, zodat teams consistent gedrag kunnen implementeren.`,endDate:null,featureDocumentId:`feature-patterns-main`,isLiked:!1,reactions:[],startDate:`2025-05-20`,stories:[],voteCount:22}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
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
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
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
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
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
}`,...R.parameters?.docs?.source}}},z=[`InProgress`,`Completed`,`NoStories`]}))();export{L as Completed,I as InProgress,R as NoStories,z as __namedExportsOrder,F as default};