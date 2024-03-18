// Nest
import { HttpStatus } from '@nestjs/common'

// Swagger
import { ApiProperty } from '@nestjs/swagger'

export type ApiResponse<T> = {
  statusCode: HttpStatus
  message: string
  data: T | T[]
  timestamp?: Date
}

export type ApiPromiseResponse<T> = Promise<ApiResponse<T>>

export class ApiResponseClass<T> {
  @ApiProperty({
    type: Number,
  })
  statusCode: HttpStatus

  @ApiProperty({
    type: String,
  })
  message: string

  @ApiProperty({
    type: () => Object as T,
  })
  data: T | T[]

  @ApiProperty({
    type: Date,
    required: false,
  })
  timestamp?: Date
}

export interface ApiResponseInterface<T> {
  status: HttpStatus
  message: string
  data: T | T[]
  timestamp?: Date
}
