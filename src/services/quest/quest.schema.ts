// For more information about this file see https://dove.feathersjs.com/guides/cli/service.schemas.html
import { resolve, getValidator, querySyntax } from '@feathersjs/schema'
import { ObjectIdSchema } from '@feathersjs/schema'
import type { FromSchema } from '@feathersjs/schema'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../validators'
import type { QuestService } from './quest.class'

// Main data model schema
export const questSchema = {
  $id: 'Quest',
  type: 'object',
  additionalProperties: false,
  required: ['_id', 'text'],
  properties: {
    _id: ObjectIdSchema(),

    text: { type: 'string', maxLength: 255 },
    description: { type: 'string', maxLength: 255 },
  }
} as const
export type Quest = FromSchema<typeof questSchema>
export const questValidator = getValidator(questSchema, dataValidator)
export const questResolver = resolve<Quest, HookContext<QuestService>>({})

export const questExternalResolver = resolve<Quest, HookContext<QuestService>>({})

// Schema for creating new data
export const questDataSchema = {
  $id: 'QuestData',
  type: 'object',
  additionalProperties: false,
  required: ['text'],
  properties: {
    ...questSchema.properties
  }
} as const
export type QuestData = FromSchema<typeof questDataSchema>
export const questDataValidator = getValidator(questDataSchema, dataValidator)
export const questDataResolver = resolve<QuestData, HookContext<QuestService>>({})

// Schema for updating existing data
export const questPatchSchema = {
  $id: 'QuestPatch',
  type: 'object',
  additionalProperties: false,
  required: [],
  properties: {
    ...questSchema.properties
  }
} as const
export type QuestPatch = FromSchema<typeof questPatchSchema>
export const questPatchValidator = getValidator(questPatchSchema, dataValidator)
export const questPatchResolver = resolve<QuestPatch, HookContext<QuestService>>({})

// Schema for allowed query properties
export const questQuerySchema = {
  $id: 'QuestQuery',
  type: 'object',
  additionalProperties: false,
  properties: {
    ...querySyntax(questSchema.properties)
  }
} as const
export type QuestQuery = FromSchema<typeof questQuerySchema>
export const questQueryValidator = getValidator(questQuerySchema, queryValidator)
export const questQueryResolver = resolve<QuestQuery, HookContext<QuestService>>({})
