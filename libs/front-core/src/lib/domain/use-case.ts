import { Action } from 'redux';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { Observable } from 'rxjs';
import { Dependencies } from '../redux/dependencies';

export interface UseCase<S, T extends Action> {
  execute(action$: ActionsObservable<T>,
          state$: StateObservable<S>, dependencies: Dependencies): Observable<T>;
}
