import Base from "../base";
import { BaseResponse, Block, ChannelResource } from "../../types";

export declare interface ChartTags {}

export type Chart = {
    multiChannelResources: Array<ChannelResource>;
    id: string;
    text: string;
    type: string;
    blocks: Array<Block>;
    multiChannelTags: Array<ChartTags>;
    events: Array<Event>;
};

export declare interface ChartResponse extends BaseResponse {
    payload: Chart | null;
}

export declare interface ChartsResponse extends BaseResponse {
    payload: Array<Chart>;
}

const resource = "chart";

/**
 * Charts resource
 * @class Charts
 */
export default class Charts extends Base {
    /**
     * Get all charts by project id
     * @param {string} projectId - The project ID.
     * @param {RequestInit} options - Optional Fetch options to be passed to the request
     * @returns {Promise<ChartsResponse>} A Promise that resolves to a ChartsResponse.
     */
    async getAll(
        projectId: string,
        options?: RequestInit
    ): Promise<ChartsResponse> {
        const response = await this.get(
            `/${resource}/project/${projectId}`,
            options || {}
        );
        return await response.json();
    }

    /**
     * Get chart by id
     * @param {string} chartId - The chart ID.
     * @param options
     * @returns {Promise<ChartResponse>} A Promise that resolves to a ChartResponse.
     */
    async getById(
        chartId: string,
        options?: RequestInit
    ): Promise<ChartResponse> {
        if (!chartId || chartId === "") {
            throw new Error("No chart id provided");
        }

        const response = await this.get(
            `/${resource}/id/${chartId}`,
            options || {}
        );
        return await response.json();
    }
}
