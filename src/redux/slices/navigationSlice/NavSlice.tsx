import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
  PayloadAction,
  Update,
} from '@reduxjs/toolkit';
import api from '../../../api';
import { removeNote, selectAll as getAllNotes, updateNotes } from '../contentSlice/contentSlice';
import { AppDispatch, RootState } from '../../store/store';
import { INote } from '../contentSlice/contentSlice';
import axios from 'axios';
import { AxiosError } from 'axios';

enum LoadingStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  ERROR = 'error',
}

export interface IPages {
  titleId: string;
  title: string;
  id: string;
}

interface ToUpdate {
  direction: string;
}

type TNavigationSliceState = {
  loadingStatusNavigation: LoadingStatus;
  errorNavigation: null | string;
};

const navigationAdapter = createEntityAdapter<IPages>();

const initialState = navigationAdapter.getInitialState<TNavigationSliceState>({
  loadingStatusNavigation: LoadingStatus.IDLE,
  errorNavigation: null,
});

export const fetchNavigation = createAsyncThunk<
  void | string,
  void,
  {
    dispatch: AppDispatch;
    rejectValue: TypeError | RangeError | EvalError | string | AxiosError | any;
  }
>('navigationSlice/fetchNavigation', async (_, { rejectWithValue, dispatch }) => {
  try {
    const allFolders: IPages[] = await api.getAllFolders();
    dispatch(addAllFolders(allFolders));
  } catch (e) {
    if (e instanceof TypeError) {
      return rejectWithValue(e);
    } else if (e instanceof RangeError) {
      return rejectWithValue(e);
    } else if (e instanceof EvalError) {
      return rejectWithValue(e);
    } else if (typeof e === 'string') {
      return rejectWithValue(e);
    } else if (axios.isAxiosError(e)) {
      return rejectWithValue(e);
    } else {
      return rejectWithValue(e);
    }
  }
});

export const createFolder = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch; state: RootState }
>('navigationSlice/createFolder', async (title, { dispatch, getState }) => {
  if (title) {
    const navigationList = selectAll(getState());
    let isExist = navigationList.some((element) => {
      return element.title.toLowerCase() === title.toLowerCase();
    });
    if (!isExist) {
      api.createFolder(title).then((newFolder) => {
        dispatch(addPages(newFolder));
      });
    }
  }
});

export const deletesFolder = createAsyncThunk<
  void,
  { title: string; path: string },
  { dispatch: AppDispatch; state: RootState }
>('navigationSlice/deleteFolder', async ({ title, path }, { dispatch, getState }) => {
  const navigationList = selectAll(getState());
  const allNotes: INote[] = getAllNotes(getState());
  const findElementByTitle = navigationList.find((element) => title === element.title);
  if (findElementByTitle) {
    const idElement = findElementByTitle.id;
    api.deleteFolder(idElement).then(() => {
      dispatch(removePages(idElement));
    });
    const findElementByPath = allNotes.find((element) => element.direction === path);
    if (findElementByPath) {
      api.deleteNote(findElementByPath.id).then(() => {
        dispatch(removeNote(findElementByPath.id));
      });
    }
  }
});

export const renameFolder = createAsyncThunk<
  void,
  { inputValue: string; titleId: string; title: string },
  {
    dispatch: AppDispatch;
    state: RootState;
  }
>(
  'navigationSlice/renameFolder',
  async ({ inputValue, titleId, title }, { dispatch, getState }) => {
    let arrayToUpdate: Update<ToUpdate>[] = [];
    const allNotes: INote[] = getAllNotes(getState());
    let inputValueToLower = inputValue.replace(/\s+/g, '').toLowerCase();
    let titleToLower = title.replace(/\s+/g, '').toLowerCase();
    const newTitleName = {
      titleId,
      title: inputValue,
    };
    allNotes.forEach((element) => {
      if (element.direction === titleToLower) {
        let newDirectionElement = { ...element, direction: inputValueToLower };
        arrayToUpdate.push({ id: element.id, changes: { direction: inputValueToLower } });
        api.changeDirectionOnNote(element.id, newDirectionElement);
      }
    });
    api.changeFolderName(titleId, newTitleName).then(() => {
      dispatch(updateNotes(arrayToUpdate));
      dispatch(changePage({ id: titleId, changes: newTitleName }));
    });
  },
);

const handlePandingStatus = (state: TNavigationSliceState) => {
  state.loadingStatusNavigation = LoadingStatus.LOADING;
  state.errorNavigation = null;
};

const handeFullfilledStatus = (state: TNavigationSliceState) => {
  state.loadingStatusNavigation = LoadingStatus.IDLE;
};

const handleRejectedStatus = (
  state: TNavigationSliceState,
  action: PayloadAction<TypeError | RangeError | EvalError | string | AxiosError | any>,
) => {
  state.loadingStatusNavigation = LoadingStatus.ERROR;
  state.errorNavigation = action.payload;
};

const navigationSlice = createSlice({
  name: 'navigationSlice',
  initialState,
  reducers: {
    addAllFolders: (state, action) => {
      navigationAdapter.setAll(state, action.payload);
    },
    addPages: (state, action) => {
      navigationAdapter.addOne(state, action.payload);
    },
    removePages: (state, action) => {
      navigationAdapter.removeOne(state, action.payload);
    },
    changePage: (state, action) => {
      navigationAdapter.updateOne(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNavigation.pending, handlePandingStatus)
      .addCase(fetchNavigation.fulfilled, handeFullfilledStatus)
      .addCase(fetchNavigation.rejected, handleRejectedStatus)
      .addCase(createFolder.pending, handlePandingStatus)
      .addCase(createFolder.fulfilled, handeFullfilledStatus)
      .addCase(createFolder.rejected, handleRejectedStatus)
      .addCase(deletesFolder.pending, handlePandingStatus)
      .addCase(deletesFolder.fulfilled, handeFullfilledStatus)
      .addCase(deletesFolder.rejected, handleRejectedStatus)
      .addCase(renameFolder.pending, handlePandingStatus)
      .addCase(renameFolder.fulfilled, handeFullfilledStatus)
      .addCase(renameFolder.rejected, handleRejectedStatus)
      .addDefaultCase(() => {});
  },
});

const { actions, reducer } = navigationSlice;

export const { selectAll } = navigationAdapter.getSelectors(
  (state: RootState) => state.navigationSlice,
);

export const { addPages, removePages, changePage, addAllFolders } = actions;

export default reducer;
