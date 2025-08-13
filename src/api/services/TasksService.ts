/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { TaskPatchSchema } from '../models/TaskPatchSchema';
import type { TaskPostSchema } from '../models/TaskPostSchema';
import type { TaskPutSchema } from '../models/TaskPutSchema';
import type { TaskSchema } from '../models/TaskSchema';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class TasksService {
    /**
     * Получить Все Задачи
     * @returns TaskSchema Successful Response
     * @throws ApiError
     */
    public static tasksGet(): CancelablePromise<Array<TaskSchema>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tasks/',
        });
    }
    /**
     * Создать Задачу
     * @param requestBody
     * @returns TaskSchema Successful Response
     * @throws ApiError
     */
    public static tasksPost(
        requestBody: TaskPostSchema,
    ): CancelablePromise<TaskSchema> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/tasks/',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Поиск Задач
     * @param isDone
     * @param title
     * @returns any Successful Response
     * @throws ApiError
     */
    public static tasksSearchGet(
        isDone?: (boolean | null),
        title?: (string | null),
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tasks/search',
            query: {
                'is_done': isDone,
                'title': title,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Получить Задачу По Id
     * @param id
     * @returns TaskSchema Successful Response
     * @throws ApiError
     */
    public static idTasksIdGet(
        id: number,
    ): CancelablePromise<TaskSchema> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/tasks/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Удалить Задачу По Id
     * @param id
     * @returns TaskSchema Successful Response
     * @throws ApiError
     */
    public static idTasksIdDelete(
        id: number,
    ): CancelablePromise<TaskSchema> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/tasks/{id}',
            path: {
                'id': id,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Обновить Задачу По Id
     * @param id
     * @param requestBody
     * @returns TaskSchema Successful Response
     * @throws ApiError
     */
    public static idTasksIdPut(
        id: number,
        requestBody: TaskPutSchema,
    ): CancelablePromise<TaskSchema> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/tasks/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Частично Обновить Задачу По Id
     * @param id
     * @param requestBody
     * @returns TaskSchema Successful Response
     * @throws ApiError
     */
    public static idTasksIdPatch(
        id: number,
        requestBody: TaskPatchSchema,
    ): CancelablePromise<TaskSchema> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/tasks/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
