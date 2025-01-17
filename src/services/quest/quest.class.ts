// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#database-services
import type { Params } from '@feathersjs/feathers'
import { MongoDBService } from '@feathersjs/mongodb'
import type { MongoDBAdapterParams, MongoDBAdapterOptions } from '@feathersjs/mongodb'

import type { Application } from '../../declarations'
import type { Quest, QuestData, QuestPatch, QuestQuery } from './quest.schema'

export type { Quest, QuestData, QuestPatch, QuestQuery }

export interface QuestParams extends MongoDBAdapterParams<QuestQuery> {}

// By default calls the standard MongoDB adapter service methods but can be customized with your own functionality.
export class QuestService<ServiceParams extends Params = QuestParams> extends MongoDBService<
  Quest,
  QuestData,
  QuestParams,
  QuestPatch
> {}

export const getOptions = (app: Application): MongoDBAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('mongodbClient').then((db) => db.collection('quest'))
  }
}
