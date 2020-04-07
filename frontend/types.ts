import { ThunkAction } from 'redux-thunk';

type File = {
  id: string;
  num: number;
  filePath: string;
  ord: number;
  contentType: string;
  url: string;
};

type ProjectOutput = {
  id: string;
  title: string;
  subtitle: string;
  preview: string;
  description: string;
  square: number;
  tenants: number;
  rooms: number;
  urlKey: string;
  isVisible: boolean;
  type: 'render';
  publishedAt: string;
  draftUrl: string;
  imageUrl: string;
  images: string[];
  files: File[];
  ord: number;
  createdAt: string;
  updatedAt: string;
};

type ProjectInput = {
  id?: string;
  title: string;
  subtitle: string;
  preview: string;
  description: string;
  square: number;
  tenants: number;
  rooms: number;
  isVisible: boolean;
  type: 'render';
  publishedAt: string;
  ord: number;
};

type UserOutput = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  about: string;
  description: string;
  image: File[];
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};

type UserInput = {
  email: string;
  firstName: string;
  lastName: string;
};

type ProjectsState = {
  byId: {
    [key: string]: ProjectOutput;
  };
  allIds: string[];
  count: number;
};

type RequestStatus = 'requested' | 'finished' | 'failed' | 'none';
type LogginInState = {
  status: RequestStatus;
  error: string; // TODO: fields
};

type State = {
  projects: ProjectsState;
  projectUpdatingState: RequestStatus;
  projectFetchingState: RequestStatus;
  projectAddingState: RequestStatus;
  loggingInState: LogginInState;
  isLoggedIn: boolean;
  projectShowingState: RequestStatus;
  projectRemovingState: RequestStatus;
  project: ProjectOutput;
  user: UserOutput;
};

interface Action<Payload = {}> {
  type: string;
  payload: Payload;
}

// oneOf
type ProjectAction = {
  type: string;
  payload: {
    projects: ProjectOutput[];
    project: ProjectOutput;
    id: string;
  };
};

type Container<Type> = {
  [key: string]: Type;
};

type Paging = {
  offset: number;
  limit: number;
};

type ActionFunction0 = () => Action;
type ActionFunction<Input = void, Output = {}> = (payload: Input) => Action<Output>;
type ActionFunction1<Data> = (payload: Container<Data>) => Action<Container<Data>>;
type ActionFunction2<Data1, Data2> = (payload: Container<Data1 | Data2>) => Action<Container<Data1 | Data2>>;

type AsyncActionFunction<Input = void, Output = {}> = (input: Input) => ThunkAction<void, State, null, Action<Output>>;
type AsyncActionFunction0<Data> = () => ThunkAction<void, State, null, Action<Container<Data>>>;

type AsyncActionFunctionWithPaging<Data> = (
  paging: Paging
) => ThunkAction<void, State, null, Action<Container<Data | number>>>;

type AsyncActionFunction1<Input, Output> = (
  data: Container<Input>
) => ThunkAction<void, State, null, Action<Container<Output>>>;

type AsyncActionFunction2<Data1, Data2> = (
  data: Container<Data1 | Data2>
) => ThunkAction<void, State, null, Action<Container<Data1 | Data2>>>;

type AsyncActionFunction3<Data1, Data2, Data3> = (
  data: Container<Data1 | Data2 | Data3>
) => ThunkAction<void, State, null, Action<Container<Data1 | Data2 | Data3>>>;

export {
  File,
  ProjectOutput as Project,
  ProjectInput,
  Action,
  ActionFunction,
  ActionFunction0,
  ActionFunction1,
  ActionFunction2,
  AsyncActionFunction,
  AsyncActionFunction0,
  AsyncActionFunctionWithPaging,
  AsyncActionFunction1,
  AsyncActionFunction2,
  AsyncActionFunction3,
  ProjectsState,
  LogginInState,
  State,
  ProjectAction,
  Paging,
  UserInput,
  UserOutput,
};
