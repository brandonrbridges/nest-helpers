# Nest Helpers

Just a small collection of helper functions for working with Nest.js.

## Installation

npm:

```bash
npm install @brandonrbridges/nest-helpers
```

yarn:

```bash
yarn add @brandonrbridges/nest-helpers
```

## Usage

```typescript
import { ApiGenericResponse } from '@brandonrbridges/nest-helpers'

@Post()
@ApiGenericResponse({
  statusCode: 201,
  message: 'Entity created',
  type: Dto
})
```
