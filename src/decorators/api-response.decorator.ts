// Nest
import { HttpStatus, Type, applyDecorators } from '@nestjs/common';

// Swagger
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';

interface ApiDataResponseOptions<DataDto extends Type<unknown>> {
  statusCode: HttpStatus;
  message: string;
  dto?: DataDto;
  options?: {
    array?: boolean;
    error?: boolean;
  };
}

export const ApiGenericResponse = <DataDto extends Type<unknown>>({
  statusCode,
  message,
  dto,
  options,
}: ApiDataResponseOptions<DataDto>) => {
  const objectSchema = {
    $ref: getSchemaPath(dto),
    type: 'object',
  };

  const arraySchema = {
    type: 'array',
    items: {
      $ref: getSchemaPath(dto),
    },
  };

  let error: boolean = true;

  switch (statusCode) {
    case HttpStatus.OK:
    case HttpStatus.CREATED:
      error = false;
      break;
  }

  const structure = {
    description: message,
    schema: {
      allOf: [
        {
          properties: {
            statusCode: {
              type: 'number',
              example: statusCode,
            },
            message: {
              type: 'string',
              example: message,
            },
            data: !error ? (options?.array ? arraySchema : objectSchema) : null,
          },
        },
      ],
    },
  };

  const decoratorMap = {
    [HttpStatus.OK]: ApiOkResponse, // 200, default
    [HttpStatus.CREATED]: ApiCreatedResponse, // 201
    [HttpStatus.BAD_REQUEST]: ApiBadRequestResponse, // 400
    [HttpStatus.UNAUTHORIZED]: ApiUnauthorizedResponse, // 401
    [HttpStatus.FORBIDDEN]: ApiForbiddenResponse, // 403
    [HttpStatus.NOT_FOUND]: ApiNotFoundResponse, // 404
    [HttpStatus.INTERNAL_SERVER_ERROR]: ApiInternalServerErrorResponse, // 500
  };

  const responseDecorator = decoratorMap[statusCode];

  if (!responseDecorator) {
    throw new Error('Invalid status code');
  }

  if (error || !dto) {
    return applyDecorators(responseDecorator(structure));
  }

  return applyDecorators(ApiExtraModels(dto), responseDecorator(structure));
};
