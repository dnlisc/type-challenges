import type { Equal, Expect } from '@type-challenges/utils'

type MyReadonly<T> = { readonly [p in keyof T]: T[p] }

type cases = [
  Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>,
]

interface Todo1 {
  title: string
  description: string
  completed: boolean
  meta: {
    author: string
  }
}
