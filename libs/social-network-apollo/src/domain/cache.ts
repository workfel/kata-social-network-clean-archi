import { InMemoryCache, makeVar, ReactiveVar } from '@apollo/client/core';
import { TimelineProps } from '@poc-clean-archi-state-management/social-network-core';

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        timeline: {
          read() {
            return timelineVar();
          }
        }
      }
    }
  }
});
const initTimeline: TimelineProps = {
  messages: [],
  publishErrors: '',
  loading: false
};

export const timelineVar: ReactiveVar<TimelineProps> = makeVar<TimelineProps>(
  initTimeline
);


export interface SocialNetworkState {
  timelineVar: ReactiveVar<TimelineProps>
}

export class SocialNetworkStateReactive implements SocialNetworkState {
  timelineVar = timelineVar;
}
