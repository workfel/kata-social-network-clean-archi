export interface UseCase<IRequest, IResponse> {
  execute(command: IRequest): Promise<IResponse>;
}
