export { default as FaqsServerComponent } from "./server/FaqsServerComponent";
export { fetchFaqs } from "./server/FaqsServerComponent";
export { default as FeaturesServerComponent } from "./server/FeaturesServerComponent";
export { fetchFeatures } from "./server/FeaturesServerComponent";
export type { FaqItem, FaqsServerComponentProps } from "./server/FaqsServerComponent";
export type { FeatureItem, FeaturesServerComponentProps } from "./server/FeaturesServerComponent";

// AdminFast wrapper components (simplified API)
export { default as AdminFastFaqsServerComponent } from "./server/AdminFastFaqsServerComponent";
export { fetchFaqsFromUrl } from "./server/AdminFastFaqsServerComponent";
export { default as AdminFastFeaturesServerComponent } from "./server/AdminFastFeaturesServerComponent";
export { fetchFeaturesFromUrl } from "./server/AdminFastFeaturesServerComponent";
export type { AdminFastFaqsServerComponentProps } from "./server/AdminFastFaqsServerComponent";
export type { AdminFastFeaturesServerComponentProps } from "./server/AdminFastFeaturesServerComponent";
