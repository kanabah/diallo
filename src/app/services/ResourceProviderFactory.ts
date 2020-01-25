import { ResourcesService } from './resources.service';

export function ResourceProviderFactory( provider: ResourcesService ) {
    return () => provider.loadResources();
  }