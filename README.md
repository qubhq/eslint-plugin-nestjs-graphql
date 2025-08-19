# @qubhq/eslint-plugin-nestjs-graphql

> **Note**  
> This fork of [`eslint-plugin-nestjs-graphql`](https://github.com/Hatko/eslint-plugin-nestjs-graphql) extends the
> original functionality by adding support for selected [`graphql-scalars`](https://www.npmjs.com/package/graphql-scalars)
> types. 
> 
> Right now the following scalars are supported: `GraphQLUUID`. If you want more, open an issue or make a PR.
> 
> Also adds support for `@typescript-eslint` v8  
> Introduced new rule: `args-nullable-optional`

[![NPM Version](https://img.shields.io/npm/v/%40qubhq%2Feslint-plugin-nestjs-graphql?style=for-the-badge)](https://www.npmjs.com/package/@qubhq/eslint-plugin-nestjs-graphql)
![NPM License](https://img.shields.io/npm/l/%40qubhq%2Feslint-plugin-nestjs-graphql?style=for-the-badge)
![NPM Downloads](https://img.shields.io/npm/dw/%40qubhq%2Feslint-plugin-nestjs-graphql?style=for-the-badge)
![NPM Type Definitions](https://img.shields.io/npm/types/%40qubhq%2Feslint-plugin-nestjs-graphql?style=for-the-badge)
[![QubHQ](https://img.shields.io/badge/backed%20by-QubHQ-orange?style=for-the-badge&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHZpZXdCb3g9IjAgMCAyNDAwIDI0MDAiPjxwYXRoIGQ9Ik0xNTk4IDgwMkgwdjE1OTdoMTU5OFY4MDJaIiBmaWxsPSIjRkVGN0YxIi8%2BPHBhdGggZD0iTTI0MDAgMHYxNTk4TDE1OTggMjQwMFY4MDJMMjQwMCAwWk0xMzkwIDIxMDZ2LTM4MGwtMTUgMTdhMjMxIDIzMSAwIDAxLTE4MCA4MmMtNzAgMC0xMzAtMjgtMTgwLTgyLTQ3LTUzLTcwLTExNi03MC0xODcgMC03MiAyMy0xMzUgNzAtMTg4YTIzMSAyMzEgMCAwMSAxODAtODIgMjMxIDIzMSAwIDAxIDE5NSAxMDB2LTg4aDgydjgwOEgxMzkwWm0tNTItNjgyYTE3MCAxNzAgMCAwMC0xMzAtNTYgMTcwIDE3MCAwIDAwLTEzMCA1NiAxOTIgMTkyIDAgMDAgMCAyNjMgMTcwIDE3MCAwIDAwIDEzMCA1NiAxNzAgMTcwIDAgMDAgMTMwLTU2IDE5MiAxOTIgMCAwMCAwLTI2M1oiIGZpbGw9IiNFQjZEMDAiLz48bWFzayBpZD0iYSIgd2lkdGg9IjQ0MCIgaGVpZ2h0PSIxMzEwIiB4PSIxNjkwIiB5PSI3NjAiIG1hc2tVbml0cz0idXNlclNwYWNlT25Vc2UiIHN0eWxlPSJtYXNrLXR5cGU6bHVtaW5hbmNlIj48cGF0aCBkPSJtMjEyNiA3NjgtNDMwIDQzMHY4NjRsNDMwLTQzMFY3NjhaIiBmaWxsPSIjZmZmIi8%2BPC9tYXNrPjxnIGZpbGw9IiNGRUY3RjEiIG1hc2s9InVybCgjYSkiPjxwYXRoIGQ9Ik0xNzU0IDIwMDR2LTIxMmMwLTcwIDgtMTMyIDI1LTE4NmE0MjQgNDI0IDAgMDEgOTgtMTYxYzI0LTI1IDQwLTI5IDUxLTE3IDEwIDEzIDE3IDM2IDE3IDY4djMxN2w1Ny01N3YtMzE3YzAtNTgtMTItOTQtMzMtMTA5LTExLTctMjQtOC00MC0zYTE5MCAxOTAgMCAwMC02MiA0NiAzODEgMzgxIDAgMDAtNjcgOTcgNjEwIDYxMCAwIDAwLTQ2IDExNFYxMTQwbC01NyA1N1YyMDYwbDU3LTU3WiIvPjxwYXRoIGQ9Ik0xNzU0IDIwMDR2MTJsMTAtOXYtMTJsLTEwIDlabTI1LTM5OGgtNyA3Wm0zOC04NCA0IDctNC03Wm0xMjggMjkxLTEwIDEwdjEybDEwLTEwdi0xMlptNTctNTd2MTNsOS0xMHYtMTJsLTEwIDlabS0zMy00MjYgNy0xNS03IDE1Wm0tNDAtMyA0LTE1LTQgMTVaTTE4MDAgMTQ3MGw2IDUtNS01Wm0tNDUgMTE0LTEwIDEwdjQ4bDE4LTYwLTggMlptMC00NDQgMTAtMTB2LTEybC0xMCA5djEzWm0tNTcgNTd2LTEzbC0xMCAxMHYxMmwxMC0xMFptMCA4NjQtMTAgOXYxMmwxMC05di0xMlptNjYtNjZ2LTIxMmwtMTggMTh2MjEybDE4LTE4Wm0wLTIxMmMwLTcwIDgtMTI4IDI0LTE3N2gtMTVhNjM4IDYzOCAwIDAwLTI3IDE5NWwxOC0xOFptMjQtMTc3YTQxMCA0MTAgMCAwMSAzNC03N2wtOS0xNGMtMTYgMjktMzAgNTgtNDAgOTJsMTUtMVptMzQtNzhjMTMtMjIgMzItNDcgNTUtNzB2LTI2YTM4NSAzODUgMCAwMC02NCA4M2wxMCAxM1ptNTUtNzBjMjItMjIgMzYtMjUgNDUtMTVsMTUtMzBjLTEzLTE0LTMzLTgtNjAgMjB2MjVabTQ1LTE1YzEwIDExIDE1IDMyIDE1IDYybDE4LTE4YzAtMzQtNi02MC0xOC03M2wtMTUgMzBabTE1IDYydjMxN2wxOC0xOHYtMzE3bC0xOCAxOFptOSAzMjAgNTctNTZ2LTI2bC01NyA1N3YyNlptNjYtNzhWMTQzMGwtMTggMTh2MzE3bDE4LTE4Wm0wLTMxN2MwLTYwLTEyLTEwMC0zNS0xMTVsLTE0IDMwYzIwIDE0IDMwIDQ3IDMwIDEwM2wxOS0xOFptLTM1LTExNWMtMTItOC0yNi04LTQzLTNsLTggMzBjMTUtNCAyNy0zIDM3IDNsMTQtMzBabS00My0zYTIwMCAyMDAgMCAwMC02NiA0OHYyNmMyNS0yNCA0NC0zOCA1OC00M2w4LTMwWm0tNjYgNDhhNDEwIDQxMCAwIDAwLTcyIDEwNGwxMCAxMWMxOC0zNSAzOC02NSA2Mi04OVYxMzYwWm0tNzIgMTA0Yy0yMCAzOC0zNyA4MC00OSAxMjJsMTYtM2E1NzAgNTcwIDAgMDEgNDMtMTA4bC0xMC0xMVptLTMyIDExMXYtNDQ0bC0xOCAxOHY0NDRsMTgtMThabS0xMC00NDgtNTYgNTd2MjZsNTctNTd2LTI2Wm0tNjUgNzlWMjA3MGwxOC0xOHYtODY0bC0xOCAxOFptOSA4NjcgNTctNTd2LTI1bC01NyA1N3YyNVoiLz48cGF0aCBkPSJNMjA3NyAxMDAwYzAgMzItOCA3MC0yNCAxMTAtMTYgNDAtMzYgNzMtNjAgOTYtMjQgMjQtNDQgMzItNjAgMjQtMTYtOC0yNC0zMC0yNC02MiAwLTMzIDgtNzAgMjQtMTEwIDE2LTQxIDM2LTczIDYwLTk3IDI0LTI0IDQ0LTMxIDYwLTIzIDE2IDggMjQgMzAgMjQgNjFabTM4IDMyMnYtNTMwbC0zOCAzOHY2MGMtMi0zLTQtNC03LTUtMjItMTMtNTAtNC04MyAyOWE0MTAgNDEwIDAgMDAtODMgMTM3IDQ0MCA0NDAgMCAwMC0zMyAxNTZjMCA0NyAxMCA3NyAzMyA5MCAyMiAxMyA1MCAzIDgzLTMwYTM5MCAzOTAgMCAwMCA5MC0xNTV2MjUwbDM4LTM5WiIvPjxwYXRoIGQ9Im0yMDUzIDExMTAtNy0zIDcgM1ptLTEyMCAxMjAgNy0xNi03IDE2Wm0xODIgOTJ2MTNsMTAtOXYtMTNsLTEwIDEwWm0wLTUzMCAxMC05di0xMmwtMTAgOXYxMlptLTM4IDM4di0xMmwtOSA5djEybDEwLTlabTAgNTktNyAxNCAxNiAyMFY4ODBsLTkgOVptLTctNSA3LTE1LTcgMTVaTTE5MDQgMTA1MGwtNy0yIDcgMlptMTY2IDgwLTYtMyA2IDJabTctMjAgMTAtOHYtNDNsLTE3IDUyaDdabTAgMjUwLTkgMTB2MTJsMTAtOVYxMzYwWm0tOS0zNTJjMCAzMC03IDYzLTIyIDEwMGwxMyA0YTMzMCAzMzAgMCAwMCAyNy0xMjJsLTE4IDE4Wm0tMjIgMTAwYTI1MSAyNTEgMCAwMS01MyA4NnYyNWMyNi0yNiA0OS02MiA2Ny0xMDdsLTE0LTRabS01MyA4NmMtMjEgMjAtMzkgMjgtNTMgMjBsLTE0IDMxYzE4IDEwIDQwIDAgNjctMjZ2LTI1Wm0tNTQgMjBjLTE0LTYtMjAtMjUtMjAtNTVsLTE5IDE4YzAgMzYgOCA2MCAyNiA2OGwxMy0zMFptLTIwLTU1YzAtMzAgNi02MiAyMC0xMDBsLTEzLTNhMzMyIDMzMiAwIDAwLTI2IDEyMGwxOC0xN1ptMjAtMTAwYzE1LTM2IDMzLTY0IDU0LTg2di0yNWEzMTcgMzE3IDAgMDAtNjcgMTA4bDE0IDRabTU0LTg2YzIxLTIwIDM5LTI3IDUzLTIwbDE0LTMwYy0xOC0xMC00MC0xLTY3IDI1djI1Wm01My0yMGMxNSA4IDIyIDI2IDIyIDU1bDE4LTE4YzAtMzUtOS01OC0yNi02OGwtMTQgMzFabTc4IDM2MHYtNTMwbC0xOCAxOHY1MzBsMTgtMThabS05LTUzMy0zOCAzOHYyNWwzOC0zOFY3ODBabS00NyA2MHY1OGwxOC0xOHYtNjBsLTE4IDE4Wm0xNyAzNGEyMCAyMCAwIDAwLTQtM2wtNC0yLTE0IDMwIDQgMiAzIDIgMTUtMjlabS04LTZjLTI0LTEzLTU0LTMtOTAgMzJ2MjZjMzAtMzAgNTUtMzkgNzctMjdsMTMtMzBabS05MCAzMmE0MzAgNDMwIDAgMDAtOTAgMTQ4bDEzIDRjMjItNTQgNDctOTYgNzctMTI2VjkwMFptLTkwIDE0OWMtMjMgNjAtMzUgMTE2LTM1IDE2NmwxOC0xOGMwLTQ0IDEwLTkyIDMwLTE0NWwtMTMtM1ptLTM1IDE2NmMwIDUwIDEyIDgzIDM1IDk2bDEzLTMwYy0yMC0xMi0zMC00MC0zMC04NGwtMTggMThabTM1IDk2YzI0IDE1IDU0IDQgOTAtMzJ2LTI2Yy0zMCAzMC01NSA0MC03NyAyOGwtMTMgMzBabTkwLTMyYzM2LTM1IDY2LTg1IDkwLTE0OGwtMTMtM2EzNTcgMzU3IDAgMDEtNzcgMTI1djI2Wm05MC0xNDcgOC0yMi0xNSAxLTYgMTYgMTMgNVptLTktMTJ2MjUwbDE4LTE5di0yNTBsLTE4IDE5Wm0xMCAyNTMgMzctMzhWMTMxMGwtMzggMzh2MjZaIi8%2BPC9nPjwvc3ZnPgo%3D)](https://qubhq.com)

This plugin intends to prevent issues with returning the wrong type from NestJS GraphQL resolvers. Relevant
to [Code first](https://docs.nestjs.com/graphql/quick-start#code-first) approach.

## Rules

The plugin supports rules:

`matching-return-type`
`matching-resolve-field-parent-type`
`args-nullable-optional`

## Motivation

### matching-return-type

When Code first approach is used, NestJS generates schema based on the decorators such as `ResolveField`, `Query`, or
`Mutation` which define the type of the returned value. However, the type of the returned value is not checked by
TypeScript compiler.

A query defined as:

```typescript
  @Query(returns => Author)
async
author(@Args('id', { type: () => Int })
id: number
)
{
  return this.authorsService.findOneById(id);
}
```

can be implemented to return any type of value, e.g. `Promise<string>`. This will not be caught by TypeScript compiler,
but will result in runtime error when the GraphQL schema is generated.

This rule aims to solve this issue by checking the type of the returned value.

*Valid*

```typescript
  @Query(returns => Author)
async
author(@Args('id', { type: () => Int })
id: number
):
Author
{
  return this.authorsService.findOneById(id);
}
```

```typescript
  @Query(returns => Author)
async
author(@Args('id', { type: () => Int })
id: number
):
Promise < Author > {
  return this.authorsService.findOneById(id);
}
```

```typescript
  @Query(returns => [Author])
async
author(@Args('id', { type: () => Int })
id: number
):
Promise < Author[] > {
  return this.authorsService.findOneById(id);
}
```

```typescript
  @Query(returns => [Author], { nullable: true })
async
author(@Args('id', { type: () => Int })
id: number
):
Promise < Author[] | null > {
  return this.authorsService.findOneById(id);
}
```

*Invalid*

```typescript
  @Query(returns => Author)
async
author(@Args('id', { type: () => Int })
id: number
):
string
{
  return this.authorsService.findOneById(id);
}
```

```typescript
  @Query(returns => Author)
async
author(@Args('id', { type: () => Int })
id: number
):
Promise < Author | null > {
  return this.authorsService.findOneById(id);
}
```

```typescript
  @Query(returns => Author)
async
author(@Args('id', { type: () => Int })
id: number
):
Promise < Author[] > {
  return this.authorsService.findOneById(id);
}
```

### matching-resolve-field-parent-type

When resolving a field, the `@Parent()` decorator's type can mismatch the type returned from the `@Resolver()` decorator
of the class. This may result in runtime error or unexpected behavior.

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

When using the `@Args` decorator in NestJS GraphQL resolvers, there's a common mismatch between the `nullable` property
in the decorator options and the optionality of the parameter in TypeScript. If an argument is marked as`nullable: true`
in GraphQL, it should be optional in TypeScript (using `?`), and vice versa.

This rule ensures consistency between GraphQL schema nullability and TypeScript parameter optionality to prevent runtime
errors and improve type safety.

*Valid*

```typescript
  // Correct: nullable args with optional parameter
async
locations(
  @BusinessId()
businessId: string,
@Args('input', { nullable: true })
input ? : LocationsQueryInput
):
Promise < LocationModel[] > {
  return this.locationsService.getAllLocationsForBusiness(businessId, input)
}
```

```typescript
  // Correct: required args with non-optional parameter
async
locations(
  @BusinessId()
businessId: string,
@Args('input')
input: LocationsQueryInput
):
Promise < LocationModel[] > {
  return this.locationsService.getAllLocationsForBusiness(businessId, input)
}
```

```typescript
  // Correct: explicitly non-nullable args with non-optional parameter
async
locations(
  @BusinessId()
businessId: string,
@Args('input', { nullable: false })
input: LocationsQueryInput
):
Promise < LocationModel[] > {
  return this.locationsService.getAllLocationsForBusiness(businessId, input)
}
```

*Invalid*

```typescript
  // Invalid: nullable args but parameter is not optional
async
locations(
  @BusinessId()
businessId: string,
@Args('input', { nullable: true })
input: LocationsQueryInput
):
Promise < LocationModel[] > {
  return this.locationsService.getAllLocationsForBusiness(businessId, input)
}
```

```typescript
  // Invalid: optional parameter but args is not nullable
async
locations(
  @BusinessId()
businessId: string,
@Args('input')
input ? : LocationsQueryInput
):
Promise < LocationModel[] > {
  return this.locationsService.getAllLocationsForBusiness(businessId, input)
}
```

## Installation

```sh
# inside your project's working tree
npm i @qubhq/eslint-plugin-nestjs-graphql --save-dev
```

The rules are off by default. To turn them on, add the following to your `.eslintrc` file:

```json
{
  "plugins": [
    "@qubhq/nestjs-graphql"
  ],
  "rules": {
    "@qubhq/nestjs-graphql/matching-return-type": "error",
    // `error` level is recommended
    "@qubhq/nestjs-graphql/matching-resolve-field-parent-type": "error",
    // `error` level is recommended
    "@qubhq/nestjs-graphql/args-nullable-optional": "error"
    // `error` level is recommended
  }
}
```
