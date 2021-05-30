import { v4 as uuidv4 } from 'uuid';

export class WorkerCommand<T> {
  public readonly id: string;

  public constructor(public readonly name: 'find-nonce' | 'abord', public data: T) {
    this.id = uuidv4();
  }
}
