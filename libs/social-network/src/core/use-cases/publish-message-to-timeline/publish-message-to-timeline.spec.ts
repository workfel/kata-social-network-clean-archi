import { PublishMessageToTimelineUseCase } from './publish-message-to-timeline.use-case';
import { User } from '../../domain/user';
import { TimelineGateway } from '../../gateways/timeline-gateway';
import { combineReducers, Store } from 'redux';
import { TimelineState } from '../../../redux/timeline.state';
import { configureStore } from '@poc-clean-archi-state-management/front-core';
import { combineEpics } from 'redux-observable';
import publishMessageToTimelineReducer from './publish-message-to-timeline.reducers';
import { InMemoryTimelineGateway } from '../../../adapters/secondary/gateways/in-memory-timeline-gateway';
import * as actionsCreators from './publish-message-to-timeline.actions';

describe('Publish a message to personnal timeline', () => {
  let store: Store<TimelineState>;
  let timelineGateway: TimelineGateway;
  let initialState: TimelineState;
  let user: User;
  beforeEach(() => {
    user = {
      id: 'user1'
    };
    timelineGateway = new InMemoryTimelineGateway();
    initStore(timelineGateway);
  });

  test('Should publish a message', async () => {
    const message = 'message';
    store.dispatch(actionsCreators.Actions.publishMessage(message));
    expect(store.getState().timeline.messages).toContain('message');
  });


  test('Should not publish a empty message', async () => {
    const message = '';
    store.dispatch(actionsCreators.Actions.publishMessage(message));
    expect(store.getState().timeline.publishError).toBe('Message cannot be empty');
  });

  const initStore = (timelineGateway: TimelineGateway) => {
    store = configureStore({
        timelineGateway
      },
      combineReducers<TimelineState>({
        timeline: publishMessageToTimelineReducer
      }),
      combineEpics<any>(
        new PublishMessageToTimelineUseCase().execute
      )
    );
    initialState = store.getState();
  };
});
