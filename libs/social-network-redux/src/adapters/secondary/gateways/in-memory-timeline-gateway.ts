import { TimelineGateway } from '../../../core/gateways/timeline-gateway';
import { of, Observable } from 'rxjs';

export class InMemoryTimelineGateway implements TimelineGateway {
  publishMessage(message: string): Observable<string> {
    return of(message);
  }

}
