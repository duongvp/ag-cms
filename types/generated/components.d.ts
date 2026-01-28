import type { Schema, Struct } from '@strapi/strapi';

export interface SharedStatItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_stat_items';
  info: {
    displayName: 'stat_item';
    icon: 'apps';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface SharedTestimonial extends Struct.ComponentSchema {
  collectionName: 'components_shared_testimonials';
  info: {
    displayName: 'testimonial';
  };
  attributes: {
    author_avatar: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    author_name: Schema.Attribute.String;
    author_role: Schema.Attribute.String;
    quote: Schema.Attribute.Text;
    stats: Schema.Attribute.Component<'shared.stat-item', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.stat-item': SharedStatItem;
      'shared.testimonial': SharedTestimonial;
    }
  }
}
