import { BaseResponse, Website } from "../../types";
import Base from "../base";

export declare interface WebsitesResponse extends BaseResponse {
    payload: Array<Website>;
}

export declare interface WebsiteResponse extends BaseResponse {
    payload: Website | null;
}

const resource = "website";
/**
 * Websites resource
 * @class
 * @extends Base
 * @param {Config} config An instance of {@link Config} to configure the SDK
 */

export default class Websites extends Base {
    /**
     * Create a new instance of the Websites resource
     * @param config
     * @constructor
     * @example
     * const client = new Client({
     *  apiKey: "API_KEY,"
     *  baseUrl: "https://my-f19-instance.com"
     *  })
     *
     */

    /**
     * Get all websites
     * @async
     * @return {Promise<WebsitesResponse>} A promise that returns a {@link WebsitesResponse}
     * @example
     * const websites = await client.websites.getAll()
     */
    async getAll(): Promise<WebsitesResponse> {
        const response = await this.get(`/${resource}`);
        return await response.json();
    }

    /**
     * Get a website by alias
     * @param alias
     * @async
     * @return {Promise<WebsiteResponse>} A promise that returns a {@link WebsiteResponse}
     * @example
     * const website = awaits client.websites.getByAlias("my-website")
     */
    async getByAlias(alias: string): Promise<WebsiteResponse> {
        if (!alias || alias === "") {
            throw new Error("No alias provided");
        }

        const response = await this.get(`/${resource}/alias/${alias}`);
        return await response.json();
    }

    /**
     * Get current website
     * @async
     * @return {Promise<WebsiteResponse>} A promise that returns a {@link WebsiteResponse}
     * @example
     * const website = awaits client.websites.getCurrent()
     */
    async getCurrent(): Promise<WebsitesResponse> {
        const response = await this.get(`/${resource}/current`);
        return await response.json();
    }
}
