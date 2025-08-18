# eslint-plugin-nestjs-graphql

> **Note**  
> This fork of `eslint-plugin-nestjs-graphql` extends the original functionality
> by adding support for some [`graphql-scalars`](https://www.npmjs.com/package/graphql-scalars)
types as needed.  
> Also adds support for `@typescript-eslint` v8  
> Introduced new rule: `args-nullable-optional`

[![npm](https://img.shields.io/npm/v/eslint-plugin-nestjs-graphql.svg)](https://www.npmjs.com/package/eslint-plugin-nestjs-graphql)

This plugin intends to prevent issues with returning the wrong type from NestJS GraphQL resolvers. Relevant to [Code first](https://docs.nestjs.com/graphql/quick-start#code-first) approach.

## Rules

The plugin supports rules:

`matching-return-type`
`matching-resolve-field-parent-type`
`args-nullable-optional`

## Motivation

### matching-return-type

When Code first approach is used, NestJS generates schema based on the decorators such as `ResolveField`, `Query`, or `Mutation` which define the type of the returned value. However, the type of the returned value is not checked by TypeScript compiler. 

A query defined as:

```typescript
  @Query(returns => Author)
  async author(@Args('id', { type: () => Int }) id: number) {
    return this.authorsService.findOneById(id);
  }
```

can be implemented to return any type of value, e.g. `Promise<string>`. This will not be caught by TypeScript compiler, but will result in runtime error when the GraphQL schema is generated.

This rule aims to solve this issue by checking the type of the returned value.

*Valid*

```typescript
  @Query(returns => Author)
  async author(@Args('id', { type: () => Int }) id: number): Author {
    return this.authorsService.findOneById(id);
  }
```

```typescript
  @Query(returns => Author)
  async author(@Args('id', { type: () => Int }) id: number): Promise<Author> {
    return this.authorsService.findOneById(id);
  }
```

```typescript
  @Query(returns => [Author])
  async author(@Args('id', { type: () => Int }) id: number): Promise<Author[]> {
    return this.authorsService.findOneById(id);
  }
```

```typescript
  @Query(returns => [Author], { nullable: true })
  async author(@Args('id', { type: () => Int }) id: number): Promise<Author[] | null> {
    return this.authorsService.findOneById(id);
  }
```

*Invalid*

```typescript
  @Query(returns => Author)
  async author(@Args('id', { type: () => Int }) id: number): string {
    return this.authorsService.findOneById(id);
  }
```

```typescript
  @Query(returns => Author)
  async author(@Args('id', { type: () => Int }) id: number): Promise<Author | null> {
    return this.authorsService.findOneById(id);
  }
```

```typescript
  @Query(returns => Author)
  async author(@Args('id', { type: () => Int }) id: number): Promise<Author[]> {
    return this.authorsService.findOneById(id);
  }
```

### matching-resolve-field-parent-type

When resolving a field, the `@Parent()` decorator's type can mismatch the type returned from the `@Resolver()` decorator of the class. This may result in runtime error or unexpected behavior.

This rule aims to solve this issue by checking the type of the `@Parent` against `@Resolver()`.

*Valid*

```typescript
  @Resolver(() => Author)
  class AuthorResolver {
    @ResolveField(() => [Book])
    async books(@Parent() author: Author): Promise<Book[]> {
      return this.booksService.findAllByAuthorId(author.id);
    }
  }
```

```typescript
  @Resolver(Author)
  class AuthorResolver {
    @ResolveField(returns => [Book])
    async books(@Parent() author: Author): Promise<Book[]> {
      return this.booksService.findAllByAuthorId(author.id);
    }
  }
```

*Invalid*

```typescript
  @Resolver()
  class AuthorResolver {
    @ResolveField(returns => [Book])
    async books(@Parent() author: Author): Promise<Book[]> {
      return this.booksService.findAllByAuthorId(author.id);
    }
  }
```

```typescript
  @Resolver(Author)
  class AuthorResolver {
    @ResolveField(returns => [Book])
    async books(@Parent() author: Book): Promise<Book[]> {
      return this.booksService.findAllByAuthorId(author.id);
    }
  }
```

### args-nullable-optional

When using the `@Args` decorator in NestJS GraphQL resolvers, there's a common mismatch between the `nullable` property in the decorator options and the optionality of the parameter in TypeScript. If an argument is marked as `nullable: true` in GraphQL, it should be optional in TypeScript (using `?`), and vice versa.

This rule ensures consistency between GraphQL schema nullability and TypeScript parameter optionality to prevent runtime errors and improve type safety.

*Valid*

```typescript
  // Correct: nullable args with optional parameter
  async locations(
    @BusinessId() businessId: string, 
    @Args('input', { nullable: true }) input?: LocationsQueryInput
  ): Promise<LocationModel[]> {
    return this.locationsService.getAllLocationsForBusiness(businessId, input)
  }
```

```typescript
  // Correct: required args with non-optional parameter
  async locations(
    @BusinessId() businessId: string, 
    @Args('input') input: LocationsQueryInput
  ): Promise<LocationModel[]> {
    return this.locationsService.getAllLocationsForBusiness(businessId, input)
  }
```

```typescript
  // Correct: explicitly non-nullable args with non-optional parameter
  async locations(
    @BusinessId() businessId: string, 
    @Args('input', { nullable: false }) input: LocationsQueryInput
  ): Promise<LocationModel[]> {
    return this.locationsService.getAllLocationsForBusiness(businessId, input)
  }
```

*Invalid*

```typescript
  // Invalid: nullable args but parameter is not optional
  async locations(
    @BusinessId() businessId: string, 
    @Args('input', { nullable: true }) input: LocationsQueryInput
  ): Promise<LocationModel[]> {
    return this.locationsService.getAllLocationsForBusiness(businessId, input)
  }
```

```typescript
  // Invalid: optional parameter but args is not nullable
  async locations(
    @BusinessId() businessId: string, 
    @Args('input') input?: LocationsQueryInput
  ): Promise<LocationModel[]> {
    return this.locationsService.getAllLocationsForBusiness(businessId, input)
  }
```

## Installation

```sh
# inside your project's working tree
npm i eslint-plugin-nestjs-graphql --save-dev
```

The rules are off by default. To turn them on, add the following to your `.eslintrc` file:

```json
{
  "plugins": ["nestjs-graphql"],
  "rules": {
    "nestjs-graphql/matching-return-type": "error", // `error` level is recommended
    "nestjs-graphql/matching-resolve-field-parent-type": "error", // `error` level is recommended
    "nestjs-graphql/args-nullable-optional": "error" // `error` level is recommended
  }
}
```
