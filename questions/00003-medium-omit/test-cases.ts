import type { Equal, Expect } from '@type-challenges/utils'

type ReadonlyKeys<T> = { [p in keyof T]-?: 
    (<U>() => U extends { [r in p]: T[r] } ? 1 : 2) extends (<U>() => U extends { -readonly [r in p]: T[r] } ? 1 : 2) ? never : p
  }[keyof T]

type MutableKeys<T> = Exclude<keyof T, ReadonlyKeys<T>>

type MyOmit<T, K extends keyof T> =
  ( Exclude<ReadonlyKeys<T>, K> extends never ? {} : { readonly [p in Exclude<ReadonlyKeys<T>, K>]: T[p] } )
  &  
  ( Exclude<MutableKeys<T>, K> extends never ? {} : { [p in Exclude<MutableKeys<T>, K>]: T[p]} )

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, 'description'>>>,
  Expect<Equal<Expected2, MyOmit<Todo, 'description' | 'completed'>>>,
  Expect<Equal<Expected3, MyOmit<Todo1, 'description' | 'completed'>>>,
]

// @ts-expect-error
type error = MyOmit<Todo, 'description' | 'invalid'>

interface Todo {
  title: string
  description: string
  completed: boolean
}

interface Todo1 {
  readonly title: string
  description: string
  completed: boolean
}

interface Expected1 {
  title: string
  completed: boolean
}

interface Expected2 {
  title: string
}

interface Expected3 {
  readonly title: string
}
