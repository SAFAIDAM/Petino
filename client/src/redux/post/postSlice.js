import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';


// Adjusted fetchPostsB action to accept an optional search query
export const fetchPostsB = createAsyncThunk(
    'post/fetchPostsB',
    async (searchQuery = '') => {
        const response = await axios.get(`/api/posts/blog?search=${encodeURIComponent(searchQuery)}`, {
            headers: {
                'Cache-Control': 'no-cache'
            }
        });
        return response.data;
    }
);

export const fetchUserPosts = createAsyncThunk('posts/fetchUserPosts', async (userId) => {
    const response = await axios.get(`/api/posts/get-user-post/${userId}`);
    return response.data;
});

export const createPostWithImage = createAsyncThunk(
    'post/createPostWithImage',
    async (formDataWithUserInput) => {
        const response = await axios.post('/api/posts/create-post', formDataWithUserInput);
        return response.data;
    }
);

// Async action creator to update a post
export const updatePost = createAsyncThunk(
    'post/updatePost',
    async ({ postId, postData }) => {
        const response = await axios.put(`/api/posts/update-post/${postId}`, postData);
        return response.data;
    }
);


// Async action creator to delete a post
export const deletePost = createAsyncThunk(
    'post/deletePost',
    async (postId) => {
        await axios.delete(`/api/posts/${postId}`);
        return postId;
    }
);

// Async action creator to post a comment
export const postComment = createAsyncThunk(
    'post/postComment',
    async ({ postId, comment }) => {
        const response = await axios.post(`/api/posts/comment/${postId}`, { comment });
        return response.data;
    }
);


export const fetchComments = createAsyncThunk(
    'post/fetchComments',
    async (postId) => {
        const response = await axios.get(`/api/posts/comments/${postId}`);
        return response.data;
    }
);




const initialState = {
    posts: { data: [] },
    status: 'idle',
    error: null, 
};


const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        getPosts(state, action) {
            state.posts = action.payload;
        },
        createPostSuccess(state, action) {
            state.posts.unshift(action.payload);
        },
        deletePost(state, action) {
            state.posts = state.posts.filter(post => post._id !== action.payload);
        },
        likePost(state, action) {
            const postId = action.payload;
            const post = state.posts.data.find(post => post._id === postId);
            if (post) {
                post.likes.push(postId);
            }
        },
        unlikePost(state, action) {
            const postId = action.payload;
            const post = state.posts.data.find(post => post._id === postId);
            if (post) {
                post.likes = post.likes.filter(userId => userId !== postId); 
                post.likesCount = post.likes.length;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostsB.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPostsB.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload;
            })
            .addCase(fetchPostsB.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchUserPosts.fulfilled, (state, action) => {
                state.posts = action.payload;
                state.status = 'succeeded';
            })
            .addCase(fetchUserPosts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createPostWithImage.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createPostWithImage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts.data.push(action.payload.data);
            })
            .addCase(createPostWithImage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deletePost.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts.data = state.posts.data.filter(post => post._id !== action.payload);
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updatePost.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Update the specific post in the state with the updated data
                state.posts.data = state.posts.data.map(post => {
                    if (post._id === action.payload._id) {
                        return { ...post, ...action.payload };
                    }
                    return post;
                });
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(postComment.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const comment = action.payload;
                const post = state.posts.data.find((post) => post._id === comment.postId);
                if (post) {
                    if (!Array.isArray(post.comments)) {
                        post.comments = [];
                    }
                    post.comments.push(comment);
                }
            })
            .addCase(postComment.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    },
});



// Export action creators
export const { getPosts, createPostSuccess, likePost, unlikePost } = postSlice.actions;

export default postSlice.reducer;