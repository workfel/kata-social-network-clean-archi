import { Messages } from './messages';
import { Message } from './message';


export interface TimelineProps {
  messages: Messages;
  publishErrors: string;
  loading: boolean;
}

export class Timeline {

  constructor(private readonly props: TimelineProps) {

  }


  isMessageValid(message: string): boolean {
    return message !== '';
  }

  getMessageError(message: string) {
    if (!this.isMessageValid(message)) {
      return 'msg_empty';
    }
    return '';
  }

  addMessage(message: Message) {
    this.props.messages.push(message);
  }

  getMessages(): Messages {
    return this.props.messages;
  }
}
