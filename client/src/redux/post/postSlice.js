import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';



// Async action creator to fetch posts
export const fetchPosts = createAsyncThunk(
    'post/fetchPosts',
    async () => {
        const response = await axios.get("/api/posts/all", {
            headers: {
                'Cache-Control': 'no-cache'
            }
        });
        return response.data;
    }
);

export const createPostWithImage = createAsyncThunk(
    'post/createPostWithImage',
    async (formDataWithUserInput) => {
        const response = await axios.post('/api/posts/create-post', formDataWithUserInput);
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
            console.log(action.payload)
        },
        createPostSuccess(state, action) {
            state.posts.unshift(action.payload);
        },
        deletePost(state, action) {
            state.posts = state.posts.filter(post => post._id !== action.payload);
        },
        updatePostSuccess(state, action) {
            const updatedPost = action.payload;
            state.posts.data = state.posts.data.map(post => {
                if (post._id === updatedPost._id) {
                    return updatedPost;
                }
                return post;
            });
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
            .addCase(fetchPosts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
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
            .addCase(postComment.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const comment = action.payload;
                const post = state.posts.data.find(post => post._id === comment.postId);
                if (post) {
                    post.comments.push(comment);
                }
            })            
            .addCase(postComment.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const { postId, comments } = action.payload;
                const post = state.posts.data.find(post => post._id === postId);
                if (post) {
                    post.comments = comments;
                }
                console.log('Redux State after fetching comments:', JSON.parse(JSON.stringify(state)));
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});



// Export action creators
export const { getPosts, createPostSuccess, updatePostSuccess, likePost, unlikePost } = postSlice.actions;

export default postSlice.reducer;