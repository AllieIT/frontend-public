/**
 * This file contains exports for wrapper functions used to communicate with external API.
 * Use these request wrappers instead of making regular axios / fetch requests
 */
export * as userCalls from './users';
export * as opinionCalls from './opinions';
export * as teacherCalls from './teachers';
export * as studentCalls from './students';
export * as classCalls from './classes';
export * as enrollCalls from './enrolls';