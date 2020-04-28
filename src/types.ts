// Next.js の静的パスの型。なぜかフレームワーク側で定義されていない
export type StaticPaths<P> = {
  params: P;
};
