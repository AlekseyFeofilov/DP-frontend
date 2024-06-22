import { AllGroupsApiResponse } from '@dp/shared/group/data-access';
import { Group, convertDtoToGroup } from '@dp/shared/group/types';

export namespace GroupApiAdapterHelper {
  export function parseAllGroupsApiResponse(
    apiResponse: AllGroupsApiResponse,
  ): ReadonlyArray<Group> {
    return apiResponse.map(convertDtoToGroup);
  }
}
