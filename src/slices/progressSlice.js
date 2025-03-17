import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { progressApi, fetchEnrollments } from '../services/api';

const initialState = {
  progress: [],
  loading: false,
  error: null
};

// Fetch User Progress
export const fetchUserProgress = createAsyncThunk(
  'progress/fetchUser',
  async (userId, { rejectWithValue }) => {
    try {
      const enrollmentsResponse = await fetchEnrollments(userId);

      const progressPromises = enrollmentsResponse.map(enrollment =>
        progressApi(enrollment.EnrollmentId)  // Updated to use `progressApi`
      );

      const progressResponses = await Promise.all(progressPromises);

      const combinedData = enrollmentsResponse.map((enrollment, index) => ({
        ...enrollment,
        progress: progressResponses[index]
      }));

      return combinedData;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch progress');
    }
  }
);

// Update Course Progress
export const updateCourseProgress = createAsyncThunk(
  'progress/updateCourseProgress',
  async ({ enrollmentId, percentage }, { rejectWithValue }) => {
    try {
      const response = await progressApi.updateProgress(enrollmentId, { percentage });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update progress');
    }
  }
);

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progress = action.payload;
      })
      .addCase(fetchUserProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCourseProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCourseProgress.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProgress = state.progress.map(p =>
          p.EnrollmentId === action.meta.arg.enrollmentId
            ? { ...p, percentage: action.meta.arg.percentage }
            : p
        );
        state.progress = updatedProgress;
      })
      .addCase(updateCourseProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default progressSlice.reducer;
