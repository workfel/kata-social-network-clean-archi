import { applyMiddleware, CombinedState, createStore, Reducer } from 'redux';
import { Dependencies } from './dependencies';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';

/**
 *
 * @param dependencies
 * @param combineReducers :
 * ```ts
 * combineReducers<AppState>({
 *    reducer1,
 *    reducer2,
 *     ...
 *   })
 *   ```
 * @param combinedEpics
 */
export function configureStore<S>(dependencies: Dependencies | null, combineReducers: Reducer<CombinedState<S>>,
                                  combinedEpics: any) {

  const epicMiddleware = createEpicMiddleware({ dependencies });
  const store = createStore(combineReducers,
    composeWithDevTools(applyMiddleware(epicMiddleware)),
  );
  const rootEpic = combinedEpics;
  epicMiddleware.run(rootEpic);
  return store;
};
