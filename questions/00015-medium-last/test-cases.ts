import type { Equal, Expect } from '@type-challenges/utils'

type Last<T extends any[]> = T extends [] ? never : T['length'] extends 1 ? T[0] : T extends [infer _, ...infer Rest] ? Last<Rest> : never

type Last2<T extends any[]> = T extends [...infer _, infer R] ? R : never

type cases = [
  Expect<Equal<Last<[]>, never>>,
  Expect<Equal<Last<[2]>, 2>>,
  Expect<Equal<Last<[3, 2, 1]>, 1>>,
  Expect<Equal<Last<[() => 123, { a: string }]>, { a: string }>>,
]
