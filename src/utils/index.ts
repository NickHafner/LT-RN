import renderNode from './renderNode';

export type StringOmit<K extends string> = K | Omit<string, K>;

export {
    renderNode
}