import { config } from "@/config";
import { Event } from "@/types";
import { handleError } from "../common/handle-error";
import { ErrorTreatmentOpts } from "../common/treat-http-error";
import { treatResponse } from "../common/treat-response";
import { BasePaginationApiResponse, BasePaginationRequest, Result } from "../types";
import { asQueryParams } from "../utils/asQueryParams";

export interface GetAllEventsApiResponse extends BasePaginationApiResponse {
  data: Event[];
}

export const getAllEvents = async (
  params: BasePaginationRequest,
  errorTreatmentOpts: ErrorTreatmentOpts = {
    baseErrorMessage: 'Houve um erro ao buscar os eventos. Por favor, tente novamente mais tarde.',
  },
): Result<GetAllEventsApiResponse> => {
  try {
    let url = `${config.API_BASE_URL}/events`;

    const queryString = asQueryParams(params as Record<string, unknown>);
    url += `?${queryString}`;

    const response = await fetch(url, {
      method: 'GET',
    });

    return await treatResponse(response, 'JSON', errorTreatmentOpts);
  } catch (err) {
    return handleError(err, errorTreatmentOpts.baseErrorMessage);
  }
};

export const subscribeToEvent = async (
  id: string,
  errorTreatmentOpts: ErrorTreatmentOpts = {
    baseErrorMessage: 'Houve um erro ao atualizar o evento. Por favor, tente novamente mais tarde.',
  },
): Result<Event> => {
  try {
    const response = await fetch(`${config.API_BASE_URL}/events/${id}/subscribe`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });

    return await treatResponse<Event>(response, 'JSON', errorTreatmentOpts);
  } catch (err) {
    return handleError(err, errorTreatmentOpts.baseErrorMessage);
  }
};
