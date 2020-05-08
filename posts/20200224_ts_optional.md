---
title: TypeScript の戻り値を nullable にする
date: "2020-02-24"
tags: TypeScript
---
## プロパティ、引数は `?` で簡単に存在しないかもしれない値にできる

```ts
declare const obj: {
    id: number,
    name?: string
};

console.log(obj.name);
```
```ts
function f(id: number, name?: string) {
    if (name) {
        console.log(name);
    } else {
        console.log('name is undefined');
    }
}
```

## 戻り値では `?` が使えないのでユニオンタイプでいちいち指定する必要がある

```ts
function getName(obj: { name?: string }): string | undefined {
    return obj.name;
}
```

## 変数のアノテーションにも `?` が使えないのでユニオンタイプ

```ts
const name: string | undefined = obj.name;
```

## `T | undefined` はちょっと ~~ださい~~ 面倒なので型定義しよう

```ts
type Optional<T> = T | undefined;

function getName(obj: { name?: string }): Optional<string> {
    return obj.name;
}

const name: Optional<string> = getName({});

if (name) {
    // Optional はただの型エイリアスなのでもちろんタイプガードが有効
    console.log(name.toUpperCase());
}
```

## `null` はどうするの？

`undefined` ばかり扱ってきましたが、値がないことを表す値には `null` もあります。

存在のチェックをするときに `undefined == null` が `true` になるのか `false` になるのか考えないといけなかったりして面倒なので `null` を `Optional` に含めたくはないところですが、TypeScript には JSON という相棒がいるので JSON のことを考慮しなければなりません。

ここで JSON を返すサーバーサイドに思いを馳せてみましょう。

```php
function toJson($user) {
    return json_encode([
        'id' => $user->id,
        // もし name を undefined にしようと思ったら $user->name が null かどうかで分岐しないといけない
        'name' => $user->name,
    ]);
}
```

JSON には `undefined` リテラルは存在しないので、値がないことを示すには

- `null` を渡す
- `undefined` にしたい値を記載しない

のどちらかにするしかありません。
どうやら値を `undefined` にしようと思うと、無駄な分岐やチェックが発生してしまいそうですね。

ということで、  JSON を扱わないといけない場合には `null` も `Optional` に含めておいたほうが、値がないことを表現しやすくなって良さそうです。

```ts
type Optional<T> = T | undefined | null;

const user: {
    id: number,
    name: Optional<string>
} = await api.getUser();
```
