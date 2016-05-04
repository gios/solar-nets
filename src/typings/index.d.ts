declare module "redux-api-middleware" {
  export let apiMiddleware: any;
  export let CALL_API: any;
}

declare module "jointjs" {
  let joint: any;
  export default joint;
}

declare interface ObjectConstructor {
  assign(target: any, ...sources: any[]): any;
}