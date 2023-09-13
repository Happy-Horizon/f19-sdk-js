import Base from "../base";
import { BaseResponse } from "../../index";

export declare type Project = {
    id: string;
    name: string;
    language: string;
    publishDate: string;
};

export declare interface ProjectResponse extends BaseResponse {
    payload: Project | null;
}

export declare interface ProjectsResponse extends BaseResponse {
    payload: Array<Project>;
}

const resource = "project";

export default class Projects extends Base {
    /**
     * Get all projects
     * @returns {Promise<ProjectsResponse>}
     * @example
     * const projects = await client.projects.getAll()
     */
    async getAll(preview: boolean = false): Promise<ProjectsResponse> {
        return this.get(`/${resource}`, preview).then(response => {
            return response.json();
        });
    }

    /**
     * Get a project by id
     * @param id
     * @param preview
     * @returns {Promise<ProjectResponse>}
     * @example
     * const project = awaits client.projects.getById("[PROJECT_ID]]")
     */
    async getById(
        id: string,
        preview: boolean = false
    ): Promise<ProjectResponse> {
        if (!id || id === "") {
            throw new Error("No id provided");
        }

        return this.get(`/${resource}/id/${id}`, preview).then(response => {
            return response.json();
        });
    }
}
