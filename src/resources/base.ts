import Client from "../";

/**
 * Base class for all resources
 * @class Base
 * @abstract
 * @throws Error
 * @constructor Base
 * @param {Config} config
 * @property {string} apiKey
 * @property {string} baseUrl
 * @method request
 * */

export type RequestTokenPlacement = "HEADER" | "QUERY" | null;
export default abstract class Base {
    private readonly client: Client;
    /**
     * Create a new instance of the base class
     * @param {Client} client
     * @throws Error
     * @constructor Base
     */
    constructor(client: Client) {
        this.client = client;
    }

    /**
     * Make a request to the API using fetch and return the serialized response
     * @param endpoint - The endpoint to make the request to
     * @param method
     * @param [options={}] - Optional Fetch options to be passed to the request
     * @param requestTokenPlacement
     * @returns {Promise<Response>}
     */
    async request(
        endpoint: string,
        method: "GET" | "POST",
        options?: RequestInit,
        requestTokenPlacement: RequestTokenPlacement = "HEADER"
    ): Promise<Response> {
        if (!endpoint || endpoint === "") {
            throw new Error("Endpoint not found");
        }
        const uri = `${this.client.config.apiPath}${endpoint}`;

        let requestToken: string | null = null;

        if (requestTokenPlacement) {
            requestToken = await this.client.getRequestToken(
                uri,
                method,
                options
            );
        }

        const url = `${this.client.config.baseUrl}${uri}${
            requestTokenPlacement === "QUERY" && !!requestToken
                ? `?t=${requestToken}`
                : ""
        }`;

        const fetchOptions: RequestInit = {
            ...(options || {}),
            method,
            headers: {
                ...(options?.headers ?? {}),
                ...(requestTokenPlacement === "HEADER" && !!requestToken
                    ? { "X-F19-RequestToken": requestToken }
                    : {}),
                "Content-Type": "application/json"
            }
        };

        const response = await fetch(url, fetchOptions);

        if (response.status !== 200) {
            const errorMessage = `${
                response?.statusText ?? "Unauthorized"
            }: Call with method ${method} to ${url} at ${Date.now()};`;
            throw new Error(errorMessage);
        }
        return response;
    }

    /**
     * Make a GET request to the API
     * @param endpoint - The endpoint to make the request to
     * @param [options={}] - Optional Fetch options to be passed to the request
     * @param requestTokenPlacement
     * @returns {Promise<Response>}
     */
    async get(
        endpoint: string,
        options?: RequestInit,
        requestTokenPlacement: RequestTokenPlacement = "HEADER"
    ): Promise<Response> {
        return await this.request(
            endpoint,
            "GET",
            {
                ...options
            },
            requestTokenPlacement
        );
    }

    /**
     * Make a POST request to the API
     * @param endpoint - The endpoint to make the request to
     * @param [options={}] - Optional Fetch options to be passed to the request
     * @param requestTokenPlacement
     * @returns {Promise<Response>}
     */
    async post(
        endpoint: string,
        options?: RequestInit,
        requestTokenPlacement: RequestTokenPlacement = "HEADER"
    ): Promise<Response> {
        // Add token as header if provided and method is POST
        return await this.request(
            endpoint,
            "POST",
            {
                ...options
            },
            requestTokenPlacement
        );
    }
}
