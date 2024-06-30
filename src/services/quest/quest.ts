// For more information about this file see https://dove.feathersjs.com/guides/cli/service.html
import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  questDataValidator,
  questPatchValidator,
  questQueryValidator,
  questResolver,
  questExternalResolver,
  questDataResolver,
  questPatchResolver,
  questQueryResolver
} from './quest.schema'

import type { Application } from '../../declarations'
import { QuestService, getOptions } from './quest.class'
import { questPath, questMethods } from './quest.shared'

export * from './quest.class'
export * from './quest.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const quest = (app: Application) => {
  // Register our service on the Feathers application
  app.use(questPath, new QuestService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: questMethods,
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service(questPath).hooks({
    around: {
      all: [
        authenticate('jwt'),
        schemaHooks.resolveExternal(questExternalResolver),
        schemaHooks.resolveResult(questResolver)
      ]
    },
    before: {
      all: [schemaHooks.validateQuery(questQueryValidator), schemaHooks.resolveQuery(questQueryResolver)],
      find: [],
      get: [],
      create: [schemaHooks.validateData(questDataValidator), schemaHooks.resolveData(questDataResolver)],
      patch: [schemaHooks.validateData(questPatchValidator), schemaHooks.resolveData(questPatchResolver)],
      remove: []
    },
    after: {
      all: []
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    [questPath]: QuestService
  }
}
