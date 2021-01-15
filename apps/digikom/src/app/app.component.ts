import { Component, OnInit } from '@angular/core';
import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client/core';
import {
  InMemoryTimelineGateway,
  PublishMessageToTimelineUseCase,
  SocialNetworkStateReactive,
  Timeline
} from '@poc-clean-archi-state-management/social-network-apollo';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const GET_ALL_MSG = gql`
  query GetAllMessages {
    timeline @client {
      messages  {
        content
      }
      loading
    }
  }
`;


@Component({
  selector: 'poc-clean-archi-state-management-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'digikom';
  socialNetworkState = new SocialNetworkStateReactive();
  timelineGateway = new InMemoryTimelineGateway();
  useCase = new PublishMessageToTimelineUseCase(this.socialNetworkState, this.timelineGateway);
  timeline$: Observable<Timeline>;

  constructor(private apollo: Apollo) {
  }

  ngOnInit(): void {
    this.timeline$ = this.apollo.watchQuery<{ timeline: Timeline }>({
      query: GET_ALL_MSG
    }).valueChanges.pipe((map(result => result.data.timeline)));
  }

  oonSendMsg(message: string) {
    this.useCase.execute({
      message,
      user: {
        id: 'isee'
      }
    });
  }
}
