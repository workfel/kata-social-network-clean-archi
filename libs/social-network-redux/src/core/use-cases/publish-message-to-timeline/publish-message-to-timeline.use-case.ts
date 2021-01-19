import { ActionsObservable, ofType, StateObservable } from 'redux-observable';
import * as actionCreators from './publish-message-to-timeline.actions';
import { TimelineState } from '../../../redux/timeline.state';
import { TimelineDependencies } from '../../../redux/timeline.dependencies';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { UserProps } from '@poc-clean-archi-state-management/social-network-core';

export interface PublishMessageToTimelineUseCaseRequest {
  message: string;
  user: UserProps;
}

export class PublishMessageToTimelineUseCase {
  execute(action$: ActionsObservable<actionCreators.Actions>,
          state$: StateObservable<TimelineState>,
          { timelineGateway }: TimelineDependencies): Observable<actionCreators.Actions> {
    return action$.pipe(
      ofType<actionCreators.Actions,
        ReturnType<typeof actionCreators.Actions.publishMessage>>(actionCreators.PUBLISH_TIMELINE_MESSAGE),
      switchMap(({ payload }) => {
        if (payload.publishMessage === '') {
          return of(actionCreators.Actions.cannotPublishMessage('Message cannot be empty'));
        } else {
          return timelineGateway.publishMessage(payload.publishMessage).pipe(
            map(message => actionCreators.Actions.publishedMessage(message))
          );
        }
      }));
  }
}
