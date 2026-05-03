import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{S as n}from"./iframe-hLC8TWeu.js";import{t as r}from"./jsx-runtime-BGU0mfus.js";import{_ as i,b as a,c as o,g as s,h as c,l,m as u,t as d,v as f,x as p,y as m}from"./src-jC_3LBZo.js";import{a as h,c as g,i as _,l as v,r as y,u as b}from"./actions-reactions-u99nH9V9.js";import{n as x,t as S}from"./date-DtjJm0-X.js";var C,w=t((()=>{C={"feature-detail__stories-container":`_feature-detail__stories-container_cbgs1_1`,"feature-detail__stories":`_feature-detail__stories_cbgs1_1`,"feature-detail__story-content":`_feature-detail__story-content_cbgs1_9`,"feature-detail__story-date":`_feature-detail__story-date_cbgs1_16`,"feature-detail__details":`_feature-detail__details_cbgs1_20`,"feature-detail__header":`_feature-detail__header_cbgs1_33`}}));function T({title:e,content:t,currentUserDocumentId:n,endDate:r,isLiked:d,reactions:p,startDate:h,stories:_,storyDocumentId:v,voteCount:x}){let w=b(),[T,O]=(0,E.useState)(!1),[k,A]=(0,E.useState)(),j=[..._].sort((e,t)=>!e.startDate&&!t.startDate?0:e.startDate?t.startDate?new Date(e.startDate).getTime()-new Date(t.startDate).getTime():-1:1);return(0,D.jsxs)(s,{gapVertical:`large`,children:[(0,D.jsxs)(s.Cell,{className:`ams-prose`,span:{narrow:4,medium:8,wide:7},children:[(0,D.jsxs)(`div`,{className:C[`feature-detail__header`],children:[(0,D.jsx)(i,{level:1,size:`level-2`,children:e}),(0,D.jsx)(u,{count:x,isLiked:d,onToggle:async e=>{if(!n){w.push(`/inloggen`);return}if((await g(v,e)).needsLogin){w.push(`/inloggen`);return}w.refresh()},size:`large`})]}),(0,D.jsx)(f,{children:t}),_.length>0&&(0,D.jsxs)(`div`,{className:C[`feature-detail__stories-container`],children:[(0,D.jsx)(i,{level:2,size:`level-4`,children:`Stories`}),(0,D.jsx)(`div`,{className:C[`feature-detail__stories`],children:(0,D.jsx)(m,{headingLevel:3,children:j.map(e=>(0,D.jsx)(m.Step,{heading:e.title,children:(0,D.jsxs)(`div`,{className:C[`feature-detail__story-content`],children:[(0,D.jsx)(`div`,{className:C[`feature-detail__story-date`],children:(0,D.jsx)(c,{label:S(e.startDate,e.endDate)})}),(0,D.jsx)(a,{href:`/stories/${e.documentId}`,children:`Bekijk details`})]})},e.documentId))})})]})]}),(0,D.jsxs)(s.Cell,{className:`ams-prose`,span:{narrow:4,medium:8,wide:5},children:[(0,D.jsx)(i,{level:2,size:`level-4`,children:`Details`}),(0,D.jsxs)(`dl`,{className:C[`feature-detail__details`],children:[(0,D.jsx)(`dt`,{children:(0,D.jsx)(`strong`,{children:`Status`})}),(0,D.jsx)(`dd`,{children:(0,D.jsx)(c,{color:r&&new Date(r)<new Date?`lime`:`azure`,label:r&&new Date(r)<new Date?`Voltooid`:`In uitvoering`})}),(0,D.jsx)(`dt`,{children:(0,D.jsx)(`strong`,{children:`Startdatum`})}),(0,D.jsx)(`dd`,{children:h?new Date(h).toLocaleDateString(`nl-NL`):`Onbekend`}),r&&(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(`dt`,{children:(0,D.jsx)(`strong`,{children:`Einddatum`})}),(0,D.jsx)(`dd`,{children:new Date(r).toLocaleDateString(`nl-NL`)})]})]}),(0,D.jsx)(i,{level:2,size:`level-4`,children:`Reacties`}),(0,D.jsx)(o,{compact:!0,reactions:p}),(0,D.jsx)(l,{error:k,isLoggedIn:!!n,loading:T,onSubmit:async e=>{O(!0),A(void 0);let t=await y(v,e);if(O(!1),t.needsLogin){w.push(`/inloggen`);return}if(t.error){A(t.error);return}t.success&&w.refresh()}})]})]})}var E,D,O=t((()=>{p(),d(),v(),E=e(n()),h(),_(),x(),w(),D=r(),T.__docgenInfo={description:``,methods:[],displayName:`FeatureDetail`,props:{content:{required:!0,tsType:{name:`string`},description:``},currentUserDocumentId:{required:!1,tsType:{name:`string`},description:``},endDate:{required:!1,tsType:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}]},description:``},isLiked:{required:!0,tsType:{name:`boolean`},description:``},reactions:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  author?: { isTeam?: boolean; name: string } | null
  content: string
  id: number
}`,signature:{properties:[{key:`author`,value:{name:`union`,raw:`{ isTeam?: boolean; name: string } | null`,elements:[{name:`signature`,type:`object`,raw:`{ isTeam?: boolean; name: string }`,signature:{properties:[{key:`isTeam`,value:{name:`boolean`,required:!1}},{key:`name`,value:{name:`string`,required:!0}}]}},{name:`null`}],required:!1}},{key:`content`,value:{name:`string`,required:!0}},{key:`id`,value:{name:`number`,required:!0}}]}}],raw:`ReactionItem[]`},description:``},startDate:{required:!1,tsType:{name:`string`},description:``},stories:{required:!0,tsType:{name:`Array`,elements:[{name:`signature`,type:`object`,raw:`{
  documentId: string
  endDate?: string | null
  startDate?: string
  title: string
}`,signature:{properties:[{key:`documentId`,value:{name:`string`,required:!0}},{key:`endDate`,value:{name:`union`,raw:`string | null`,elements:[{name:`string`},{name:`null`}],required:!1}},{key:`startDate`,value:{name:`string`,required:!1}},{key:`title`,value:{name:`string`,required:!0}}]}}],raw:`NestedStory[]`},description:``},storyDocumentId:{required:!0,tsType:{name:`string`},description:``},title:{required:!0,tsType:{name:`string`},description:``},voteCount:{required:!0,tsType:{name:`number`},description:``}}}})),k,A,j,M,N,P,F,I;t((()=>{O(),k=r(),A=[{author:{name:`Lieke Smit`},content:`Fijn om te zien dat dit op de planning staat. Wij wachten hier al lang op.`,id:1},{author:{name:`Bart Hendriks`},content:`Zijn er al Figma-bestanden beschikbaar voor de nieuwe tabelopmaak?`,id:2},{author:{isTeam:!0,name:`Amsterdam Design System Team`},content:`De designfase is gestart. We delen de Figma-link zodra de eerste versie klaar is.`,id:3}],j=[{title:`[Design] Tabel varianten`,documentId:`story-dt-001`,endDate:`2025-05-10`,startDate:`2025-04-15`},{title:`[Code] Sorteerbare kolommen`,documentId:`story-dt-002`,endDate:`2025-06-20`,startDate:`2025-05-12`},{title:`[Code] Paginering integratie`,documentId:`story-dt-003`,endDate:null,startDate:`2025-06-23`}],M={title:`Pages/Feature Detail`,component:T,decorators:[e=>(0,k.jsx)(`div`,{style:{padding:`2rem`},children:(0,k.jsx)(e,{})})],parameters:{layout:`fullscreen`}},N={args:{title:`Data Tabel`,content:`Een volledig uitgewerkte Data Tabel component voor het weergeven van gestructureerde gegevens. De component ondersteunt sorteerbare kolommen, paginering, selectie van rijen en is volledig toegankelijk volgens WCAG 2.2 AA. Ontworpen voor zowel eenvoudige als complexe datatoepassingen binnen gemeente-applicaties.`,endDate:null,isLiked:!1,reactions:A,startDate:`2025-04-15`,stories:j,storyDocumentId:`feature-dt-main`,voteCount:53}},P={args:{title:`Applicatie-layout`,content:`De Applicatie-layout feature biedt een standaard paginastructuur voor interne gemeente-applicaties. Inclusief navigatiebalk, zijpaneel en hoofdinhoud-zone. De layout is responsief en past zich aan op zowel desktop als tablet.`,endDate:`2025-03-28`,isLiked:!0,reactions:A.slice(0,2),startDate:`2025-01-10`,stories:[{title:`[Design] Achtergrond-kleur voor interne applicaties`,documentId:`story-layout-001`,endDate:`2025-01-31`,startDate:`2025-01-10`},{title:`[Code] Geneste items en actieve weergave Menu`,documentId:`story-layout-002`,endDate:`2025-03-28`,startDate:`2025-02-03`}],storyDocumentId:`feature-layout-main`,voteCount:38}},F={args:{title:`Patronen`,content:`Documentatie en voorbeelden van veelgebruikte UI-patronen zoals lege states, foutmeldingen, laadstatussen en bevestigingsdialogen. De patronen worden beschreven als herbruikbare combinaties van bestaande componenten, zodat teams consistent gedrag kunnen implementeren.`,endDate:null,isLiked:!1,reactions:[],startDate:`2025-05-20`,stories:[],storyDocumentId:`feature-patterns-main`,voteCount:22}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Data Tabel',
    content: 'Een volledig uitgewerkte Data Tabel component voor het weergeven van gestructureerde gegevens. De component ondersteunt sorteerbare kolommen, paginering, selectie van rijen en is volledig toegankelijk volgens WCAG 2.2 AA. Ontworpen voor zowel eenvoudige als complexe datatoepassingen binnen gemeente-applicaties.',
    endDate: null,
    isLiked: false,
    reactions: mockReactions,
    startDate: '2025-04-15',
    stories: mockStories,
    storyDocumentId: 'feature-dt-main',
    voteCount: 53
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Applicatie-layout',
    content: 'De Applicatie-layout feature biedt een standaard paginastructuur voor interne gemeente-applicaties. Inclusief navigatiebalk, zijpaneel en hoofdinhoud-zone. De layout is responsief en past zich aan op zowel desktop als tablet.',
    endDate: '2025-03-28',
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
    storyDocumentId: 'feature-layout-main',
    voteCount: 38
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    title: 'Patronen',
    content: 'Documentatie en voorbeelden van veelgebruikte UI-patronen zoals lege states, foutmeldingen, laadstatussen en bevestigingsdialogen. De patronen worden beschreven als herbruikbare combinaties van bestaande componenten, zodat teams consistent gedrag kunnen implementeren.',
    endDate: null,
    isLiked: false,
    reactions: [],
    startDate: '2025-05-20',
    stories: [],
    storyDocumentId: 'feature-patterns-main',
    voteCount: 22
  }
}`,...F.parameters?.docs?.source}}},I=[`InProgress`,`Completed`,`NoStories`]}))();export{P as Completed,N as InProgress,F as NoStories,I as __namedExportsOrder,M as default};