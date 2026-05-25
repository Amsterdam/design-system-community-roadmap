import{i as e}from"./preload-helper-xPQekRTU.js";import{t,v as n}from"./src-CMKyD0Jp.js";var r,i,a,o,s,c;e((()=>{t(),r=new Date(`2026-05-19T12:00:00Z`).getTime(),i=e=>new Date(r-e*6e4).toISOString(),a={title:`Organisms/Notification Menu`,component:n},o={args:{notifications:[]}},s={args:{notifications:[{createdAt:i(3),documentId:`n1`,href:`/ideeen/abc`,id:1,message:`Sara reageerde op jouw idee 'Donkere Modus'.`,read:!1,type:`comment_on_idea`},{createdAt:i(45),documentId:`n2`,href:`/features/xyz`,id:2,message:`Daan reageerde op de feature 'Donkere Modus Ondersteuning' die je leuk vindt.`,read:!1,type:`comment_on_feature`},{createdAt:i(300),documentId:`n3`,href:`/stories/qrs`,id:3,message:`De story 'Onderzoek kleurenpallet' is afgerond.`,read:!0,type:`story_completed`}],onMarkAllRead:()=>{},onSelect:()=>{}}},o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    notifications: []
  }
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    notifications: [{
      createdAt: minutesAgo(3),
      documentId: 'n1',
      href: '/ideeen/abc',
      id: 1,
      message: "Sara reageerde op jouw idee 'Donkere Modus'.",
      read: false,
      type: 'comment_on_idea'
    }, {
      createdAt: minutesAgo(45),
      documentId: 'n2',
      href: '/features/xyz',
      id: 2,
      message: "Daan reageerde op de feature 'Donkere Modus Ondersteuning' die je leuk vindt.",
      read: false,
      type: 'comment_on_feature'
    }, {
      createdAt: minutesAgo(60 * 5),
      documentId: 'n3',
      href: '/stories/qrs',
      id: 3,
      message: "De story 'Onderzoek kleurenpallet' is afgerond.",
      read: true,
      type: 'story_completed'
    }],
    onMarkAllRead: () => {},
    onSelect: () => {}
  }
}`,...s.parameters?.docs?.source}}},c=[`Empty`,`WithUnread`]}))();export{o as Empty,s as WithUnread,c as __namedExportsOrder,a as default};