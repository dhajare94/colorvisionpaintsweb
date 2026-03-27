import 'react';

export interface Specification {
  icon: string;
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  name: string;
  description: string;
  images: string[];
  specifications: Specification[];
  pdfLink: string;
  adImages?: string[];
}

export interface Project {
  id: string;
  name: string;
  address: string;
  image: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'iconify-icon': any;
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'iconify-icon': any;
    }
  }
}
