import { InMemoryCache, makeVar, ReactiveVar } from '@apollo/client/core';
import { Message, Messages } from '../../../social-network-core/src/domain/message';
import { Timeline } from './timeline';

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        timeline: {
          read() {
            return timelineVar;
          }
        },
        messages: {
          read() {
            return messagesVar();
          }
        }
      }
    }
  }
});
const initTimeline: Timeline = {
  messages: [],
  publishErrors: ''
};

export const timelineVar: ReactiveVar<Timeline> = makeVar<Timeline>(
  initTimeline
);

const msgInitialValue: Messages = [
  {
    id: '1',
    content: 'Use Apollo Client 3',
    user: {
      id: 'user1'
    }
  }
];


export const messagesVar: ReactiveVar<Messages> = makeVar<Messages>(
  msgInitialValue
);


export interface SocialNetworkState {
  messagesVar: ReactiveVar<Messages>,
  timelineVar: ReactiveVar<Timeline>
}

export class SocialNetworkStateReactive implements SocialNetworkState {
  messagesVar = messagesVar;
  timelineVar = timelineVar;
}
