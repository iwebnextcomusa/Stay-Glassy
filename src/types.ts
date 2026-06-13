export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  image: string;
  age: string;
  players: string;
  duration: string;
  features: string[];
}

export interface Review {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "gameplay" | "educators" | "shipping" | "sales";
}

export interface CardMockup {
  id: string;
  title: string;
  type: "Logic" | "Consequence" | "Ethics" | "Reflection";
  description: string;
  points: number;
  flavorText?: string;
  color: string;
}

export interface SitemapNode {
  title: string;
  path: string;
  description: string;
  children?: SitemapNode[];
}

export interface WireframeElement {
  sectionName: string;
  description: string;
  priorityElements: string[];
}
