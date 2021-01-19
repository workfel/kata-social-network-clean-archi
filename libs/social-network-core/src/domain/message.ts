import { UserProps } from '@poc-clean-archi-state-management/social-network-core';


export interface MessageProps {
  id: string;
  content: string;
  user: UserProps;
}

export class Message {


  get id() {
    return this.props.id;
  }

  get content() {
    return this.props.content;
  }

  get user() {
    return this.props.user;
  }


  constructor(private readonly props: MessageProps) {
  }


  static create(user: UserProps, message: string): Message {
    return new Message({
      content: `${user.name} : ${message}`,
      id: Date.now().toString(),
      user
    });
  }

  static toView(message: Message): MessageProps {
    return {
      content: message.content,
      id: message.id,
      user: message.user
    };
  }
}

