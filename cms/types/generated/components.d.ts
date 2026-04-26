import type { Schema, Struct } from '@strapi/strapi';

export interface FeedReaction extends Struct.ComponentSchema {
  collectionName: 'components_feed_reactions';
  info: {
    displayName: 'Reaction';
    icon: 'discuss';
  };
  attributes: {
    content: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 2000;
        minLength: 1;
      }>;
    end_user: Schema.Attribute.Relation<'oneToOne', 'api::end-user.end-user'> &
      Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'feed.reaction': FeedReaction;
    }
  }
}
