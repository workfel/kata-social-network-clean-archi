import { Dependencies } from '@poc-clean-archi-state-management/front-core';
import { TimelineGateway } from '../core/gateways/timeline-gateway';

export interface TimelineDependencies extends Dependencies {
  timelineGateway: TimelineGateway
}
