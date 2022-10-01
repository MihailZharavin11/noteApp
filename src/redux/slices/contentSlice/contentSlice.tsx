import {
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
  Update,
} from "@reduxjs/toolkit";
import api from "../../../api";
import { AppDispatch, RootState } from "../../store/store";
import axios from "axios";
import { AxiosError } from "axios";

const contentAdapter = createEntityAdapter<INote>();

enum LoadingStatus {
  IDLE = "idle",
  LOADING = "loading",
  ERROR = "error",
}

type TContentSliceState = {
  filterURL: string;
  filterNotes: string;
  loadingStatusContent: LoadingStatus;
  title: string;
  errorContent:
    | null
    | TypeError
    | RangeError
    | EvalError
    | string
    | AxiosError
    | any;
};

export interface INote {
  id: string;
  title: string;
  text: string;
  direction: string;
  date: string;
}

interface ToUpdate {
  direction: string;
}

const initialState = contentAdapter.getInitialState<TContentSliceState>({
  filterURL: "",
  filterNotes: "Old first",
  loadingStatusContent: LoadingStatus.IDLE,
  title: "",
  errorContent: null,
});

export const fetchContent = createAsyncThunk<
  void | string,
  void,
  {
    dispatch: AppDispatch;
    rejectValue: TypeError | RangeError | EvalError | string | AxiosError | any;
  }
>("contentSlice/fetchContent", async (_, { dispatch, rejectWithValue }) => {
  try {
    const allNotes: INote[] = await api.getAllNotes();
    dispatch(addAllNote(allNotes));
  } catch (e) {
    if (e instanceof TypeError) {
      rejectWithValue(e);
    } else if (e instanceof RangeError) {
      rejectWithValue(e);
    } else if (e instanceof EvalError) {
      rejectWithValue(e);
    } else if (typeof e === "string") {
      rejectWithValue(e);
    } else if (axios.isAxiosError(e)) {
      rejectWithValue(e);
    } else {
      rejectWithValue(e);
    }
  }
});

export const createNote = createAsyncThunk<
  void,
  { text: string; title: string; path: string },
  { dispatch: AppDispatch }
>("contentSlice/createNote", async ({ text, title, path }, { dispatch }) => {
  api.createNote(title, text, path).then((newNote) => {
    dispatch(addNote(newNote));
  });
});

export const deleteNote = createAsyncThunk<
  void,
  string,
  { dispatch: AppDispatch }
>("contentSlice/deleteNote", async (id, { dispatch }) => {
  api.deleteNote(id).then(() => {
    dispatch(removeNote(id));
  });
});

export const changeNote = createAsyncThunk<
  void,
  { id: string; title: string; text: string; direction: string; date: string },
  { dispatch: AppDispatch }
>(
  "contentSlice/changeNote",
  async ({ id, title, text, direction, date }, { dispatch }) => {
    api.changeNote(id, title, text, direction, date).then((newChangesNote) => {
      dispatch(updateNote({ id, changes: newChangesNote }));
    });
  }
);

const handlePandingStatus = (state: TContentSliceState) => {
  state.loadingStatusContent = LoadingStatus.LOADING;
  state.errorContent = null;
};

const handeFullfilledStatus = (state: TContentSliceState) => {
  state.loadingStatusContent = LoadingStatus.IDLE;
};

const handleRejectedStatus = (
  state: TContentSliceState,
  action: PayloadAction<
    TypeError | RangeError | EvalError | string | AxiosError | any
  >
) => {
  state.loadingStatusContent = LoadingStatus.ERROR;
  state.errorContent = action.payload;
};

const contentSlice = createSlice({
  name: "noteSlice",
  initialState,
  reducers: {
    addAllNote: (state, action: PayloadAction<INote[]>) => {
      contentAdapter.setAll(state, action.payload);
    },
    addNote: (state, action: PayloadAction<INote>) => {
      contentAdapter.addOne(state, action.payload);
    },
    addFilterURL: (state, action: PayloadAction<string>) => {
      state.filterURL = action.payload;
    },
    updateNote: (state, action: PayloadAction<Update<INote>>) => {
      contentAdapter.updateOne(state, action.payload);
    },
    removeNote: (state, action: PayloadAction<string>) => {
      contentAdapter.removeOne(state, action.payload);
    },
    updateNotes: (state, action: PayloadAction<Update<ToUpdate>[]>) => {
      contentAdapter.updateMany(state, action.payload);
    },
    setNameTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    addFilterNotes: (state, action: PayloadAction<string>) => {
      state.filterNotes = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, handlePandingStatus)
      .addCase(fetchContent.fulfilled, handeFullfilledStatus)
      .addCase(fetchContent.rejected, handleRejectedStatus)
      .addCase(createNote.pending, handlePandingStatus)
      .addCase(createNote.fulfilled, handeFullfilledStatus)
      .addCase(createNote.rejected, handleRejectedStatus)
      .addCase(deleteNote.pending, handlePandingStatus)
      .addCase(deleteNote.fulfilled, handeFullfilledStatus)
      .addCase(deleteNote.rejected, handleRejectedStatus)
      .addCase(changeNote.pending, handlePandingStatus)
      .addCase(changeNote.fulfilled, handeFullfilledStatus)
      .addCase(changeNote.rejected, handleRejectedStatus)

      .addDefaultCase(() => {});
  },
});

export const { selectAll } = contentAdapter.getSelectors(
  (state: RootState) => state.contentSlice
);

const filterByValue = (notes: INote[], filter: string) => {
  switch (filter) {
    case "A-Z":
      return notes.sort((a, b) =>
        a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
      );
    case "Z-A":
      return notes.sort((a, b) =>
        a.title.toLowerCase() > b.title.toLowerCase() ? -1 : 1
      );
    case "New first":
      return notes.sort((a, b) => (Number(a.date) - Number(b.date) ? 1 : -1));
    case "Old first":
      return notes.sort((a, b) => (Number(a.date) - Number(b.date) ? -1 : 1));
    default:
      return notes;
  }
};

export const selector = createSelector(
  (state: RootState) => state.contentSlice.filterURL,
  (state: RootState) => state.contentSlice.filterNotes,
  selectAll,
  (filterURL: string, filterNotes: string, notes: INote[]) => {
    if (filterURL === "allnotes" || !filterURL) {
      return filterByValue(notes, filterNotes);
    } else {
      let notesByDirection = notes.filter(
        (item) => item.direction === filterURL
      );
      return filterByValue(notesByDirection, filterNotes);
    }
  }
);

const { reducer, actions } = contentSlice;

export default reducer;

export const {
  addNote,
  addFilterURL,
  updateNote,
  removeNote,
  updateNotes,
  setNameTitle,
  addFilterNotes,
  addAllNote,
} = actions;
