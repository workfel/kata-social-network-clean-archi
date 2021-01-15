import { Observable } from 'rxjs';

export interface TimelineGateway {
  publishMessage(message: string): Observable<string>;
}
