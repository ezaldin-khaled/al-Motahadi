export type JsonField =
  | {
      key: string;
      label: string;
      type: 'text';
      placeholder?: string;
    }
  | {
      key: string;
      label: string;
      type: 'textarea';
      placeholder?: string;
      rows?: number;
    }
  | {
      key: string;
      label: string;
      type: 'image';
    }
  | {
      key: string;
      label: string;
      type: 'array';
      itemFields: JsonField[];
      addButtonLabel?: string;
    };

export type SectionSchema = {
  key: string;
  title: string;
  description?: string;
  fields: JsonField[];
};

function buildDefaultForField(field: JsonField): unknown {
  switch (field.type) {
    case 'text':
      return '';
    case 'textarea':
      return '';
    case 'image':
      return '';
    case 'array':
      return [];
    default: {
      // Exhaustiveness
      const _exhaustive: never = field;
      return _exhaustive;
    }
  }
}

export function buildDefaultJsonForSchema(schema: SectionSchema): Record<string, unknown> {
  const obj: Record<string, unknown> = {};
  for (const field of schema.fields) {
    obj[field.key] = buildDefaultForField(field);
  }
  return obj;
}

export const SECTION_SCHEMAS: Record<string, SectionSchema> = {
  // Home
  home_hero: {
    key: 'home_hero',
    title: 'Home Hero',
    fields: [
      { key: 'brand', label: 'Brand text', type: 'text' },
      { key: 'headlineDark', label: 'Headline (dark)', type: 'text' },
      { key: 'headlineAccent', label: 'Headline (accent)', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea', rows: 4 },
      { key: 'whatsappLabel', label: 'WhatsApp button label', type: 'text' },
      { key: 'trustedLabel', label: 'Trusted label', type: 'text' },
      { key: 'trustedValue', label: 'Trusted value', type: 'text' },
      { key: 'image', label: 'Hero image', type: 'image' },
      { key: 'imageAlt', label: 'Hero image alt', type: 'text' },
    ],
  },
  home_values: {
    key: 'home_values',
    title: 'Home Values',
    fields: [
      { key: 'label', label: 'Section label', type: 'text' },
      { key: 'titleDark', label: 'Title (dark)', type: 'text' },
      { key: 'titleAccent', label: 'Title (accent)', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea', rows: 4 },
      { key: 'imageMain', label: 'Main image', type: 'image' },
      { key: 'imageInset', label: 'Inset image', type: 'image' },
      {
        key: 'features',
        label: 'Features',
        type: 'array',
        addButtonLabel: 'Add feature',
        itemFields: [
          { key: 'title', label: 'Feature title', type: 'text' },
          { key: 'description', label: 'Feature description', type: 'textarea', rows: 3 },
        ],
      },
    ],
  },
  home_services: {
    key: 'home_services',
    title: 'Home Services',
    fields: [
      { key: 'label', label: 'Section label', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea', rows: 4 },
      { key: 'extra', label: 'Extra text', type: 'textarea', rows: 3 },
      { key: 'ctaLabel', label: 'CTA button label', type: 'text' },
      {
        key: 'items',
        label: 'Service cards',
        type: 'array',
        addButtonLabel: 'Add card',
        itemFields: [
          { key: 'img', label: 'Card image', type: 'image' },
          { key: 'title', label: 'Card title', type: 'text' },
          { key: 'desc', label: 'Card description', type: 'textarea', rows: 3 },
          { key: 'alt', label: 'Image alt', type: 'text' },
        ],
      },
    ],
  },
  home_health_tools: {
    key: 'home_health_tools',
    title: 'Health Tools Teaser',
    fields: [
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea', rows: 4 },
      { key: 'ctaLabel', label: 'CTA label', type: 'text' },
    ],
  },

  // About
  about_hero: {
    key: 'about_hero',
    title: 'About Hero',
    fields: [
      { key: 'label', label: 'Section label', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'titleAccent', label: 'Accent part', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea', rows: 4 },
      { key: 'image', label: 'Hero image', type: 'image' },
      { key: 'imageAlt', label: 'Hero image alt', type: 'text' },
    ],
  },
  about_intro: {
    key: 'about_intro',
    title: 'About Intro',
    fields: [
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'body', label: 'Paragraph', type: 'textarea', rows: 4 },
      { key: 'ctaLabel', label: 'CTA label', type: 'text' },
    ],
  },
  about_story: {
    key: 'about_story',
    title: 'About Story',
    fields: [
      { key: 'label', label: 'Section label', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'body', label: 'Paragraph', type: 'textarea', rows: 4 },
      { key: 'image', label: 'Image', type: 'image' },
      { key: 'imageAlt', label: 'Image alt', type: 'text' },
    ],
  },
  about_founder: {
    key: 'about_founder',
    title: 'Founder',
    fields: [
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'body1', label: 'Paragraph 1', type: 'textarea', rows: 3 },
      { key: 'body2', label: 'Paragraph 2', type: 'textarea', rows: 3 },
      { key: 'body3', label: 'Paragraph 3', type: 'textarea', rows: 3 },
      { key: 'image', label: 'Image', type: 'image' },
      { key: 'imageAlt', label: 'Image alt', type: 'text' },
    ],
  },
  about_team: {
    key: 'about_team',
    title: 'Medical Team',
    fields: [
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'body1', label: 'Paragraph 1', type: 'textarea', rows: 3 },
      { key: 'body2', label: 'Paragraph 2', type: 'textarea', rows: 3 },
      { key: 'body3', label: 'Paragraph 3', type: 'textarea', rows: 3 },
      { key: 'ctaLabel', label: 'CTA label', type: 'text' },
      { key: 'image', label: 'Image', type: 'image' },
      { key: 'imageAlt', label: 'Image alt', type: 'text' },
    ],
  },
  about_responsibility: {
    key: 'about_responsibility',
    title: 'Social Responsibility',
    fields: [
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'heading', label: 'Heading', type: 'text' },
      { key: 'body1', label: 'Paragraph 1', type: 'textarea', rows: 3 },
      { key: 'body2', label: 'Paragraph 2', type: 'textarea', rows: 3 },
      { key: 'ctaLabel', label: 'CTA label', type: 'text' },
    ],
  },

  // Services page
  services_hero: {
    key: 'services_hero',
    title: 'Services Hero',
    fields: [
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description1', label: 'Description line 1', type: 'textarea', rows: 3 },
      { key: 'description2', label: 'Description line 2', type: 'textarea', rows: 3 },
    ],
  },
  services_cards: {
    key: 'services_cards',
    title: 'Services Cards',
    fields: [
      {
        key: 'items',
        label: 'Cards',
        type: 'array',
        addButtonLabel: 'Add card',
        itemFields: [
          { key: 'id', label: 'Card ID', type: 'text', placeholder: '1, 2, 3...' },
          { key: 'image', label: 'Card image', type: 'image' },
          { key: 'title', label: 'Card title', type: 'text' },
          { key: 'description', label: 'Card description', type: 'textarea', rows: 3 },
          { key: 'alt', label: 'Image alt', type: 'text' },
        ],
      },
    ],
  },

  // Contact
  contact_hero: {
    key: 'contact_hero',
    title: 'Contact Hero',
    fields: [
      { key: 'label', label: 'Label', type: 'text' },
      { key: 'title', label: 'Title', type: 'text' },
      { key: 'description', label: 'Description', type: 'textarea', rows: 4 },
    ],
  },
  contact_reachout: {
    key: 'contact_reachout',
    title: 'Contact Reachout',
    fields: [
      { key: 'title', label: 'Section title', type: 'text' },
      { key: 'phoneLabel', label: 'Phone label', type: 'text' },
      { key: 'emailLabel', label: 'Email label', type: 'text' },
      { key: 'addressLabel', label: 'Address label', type: 'text' },
      { key: 'hoursLabel', label: 'Hours label', type: 'text' },
    ],
  },
};

