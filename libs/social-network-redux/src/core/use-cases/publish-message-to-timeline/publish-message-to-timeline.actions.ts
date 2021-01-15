import { ActionsUnion, createAction } from '@poc-clean-archi-state-management/front-core';

export const PUBLISH_TIMELINE_MESSAGE = 'PUBLISH_TIMELINE_MESSAGE';
export const CANNOT_PUBLISH_TIMELINE_MESSAGE = 'CANNOT_PUBLISH_TIMELINE_MESSAGE';
export const PUBLISHED_TIMELINE_MESSAGE = 'PUBLISHED_TIMELINE_MESSAGE';


export const Actions = {
  publishMessage: (publishMessage: string) =>
    createAction(PUBLISH_TIMELINE_MESSAGE, { publishMessage}),
  cannotPublishMessage: (reason: string) =>
    createAction(CANNOT_PUBLISH_TIMELINE_MESSAGE, {reason} ),
  publishedMessage: (publishMessage: string) =>
    createAction(PUBLISHED_TIMELINE_MESSAGE, { publishMessage })
};

export type Actions = ActionsUnion<typeof Actions>;
