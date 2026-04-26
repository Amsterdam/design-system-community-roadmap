// Ambient declaration so TypeScript can resolve `import styles from './X.module.scss'`.
// The actual SCSS-to-CSS transform happens in the consumer's bundler (Next.js or Vite).
declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
