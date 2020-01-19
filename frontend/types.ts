import { ThunkAction } from 'redux-thunk';

type File = {
  id: string,
  num: number,
  filePath: string,
  ord: number,
  contentType: string,
  url: string,
};

type Project = {
  id: string,
  title: string,
  description: string,
  urlKey: string,
  isVisible: boolean,
  type: 'render',
  publishedAt: string,
  imageId: string,
  imageUrl: string,
  images: string[],
  files: File[],
  ord: number,
  createdAt: string,
  updatedAt: string,
};

type ProjectsState = {
  byId: {
    [key: string]: Project,
  },
  allIds: string[],
  count: number,
};

type State = {
  projects: ProjectsState,
};

interface Action<Payload> {
  type: string,
  payload: Payload | {},
}

// oneOf
type ProjectAction = {
  type: string,
  payload: {
    projects: Project[],
    project: Project,
    id: string,
  },
};

type Container<Type> = {
  [key: string]: Type,
};

type Paging = {
  offset: number,
  limit: number,
};

type ActionFunction0 = () => Action<null>;
type ActionFunction1<Data> = (payload: Container<Data>) => Action<Container<Data>>;
type ActionFunction2<Data1, Data2> = (payload: Container<Data1 | Data2>) => Action<Container<Data1 | Data2>>;

type AsyncActionFunction0<Data> = () => ThunkAction<void, State, null, Action<Container<Data>>>;

type AsyncActionFunctionWithPaging<Data> = (
  paging: Paging
) => ThunkAction<void, State, null, Action<Container<Data | number>>>;

type AsyncActionFunction1<Data> = (
  data: Container<Data>
) => ThunkAction<void, ProjectsState, null, Action<Container<Data>>>;

type AsyncActionFunction2<Data1, Data2> = (
  data: Container<Data1 | Data2>
) => ThunkAction<void, ProjectsState, null, Action<Container<Data1 | Data2>>>;

type AsyncActionFunction3<Data1, Data2, Data3> = (
  data: Container<Data1 | Data2 | Data3>
) => ThunkAction<void, ProjectsState, null, Action<Container<Data1 | Data2 | Data3>>>;

export {
  File,
  Project,
  Action,
  ActionFunction0,
  ActionFunction1,
  ActionFunction2,
  AsyncActionFunction0,
  AsyncActionFunctionWithPaging,
  AsyncActionFunction1,
  AsyncActionFunction2,
  AsyncActionFunction3,
  ProjectsState,
  State,
  ProjectAction,
  Paging,
};
