// stores/blogStore.js
import { create } from 'zustand';

const useBlogStore = create((set) => ({
    posts: [],
    setPosts: (newPosts) => set({ posts: newPosts }),
    addPost: (post) => set((state) => ({ posts: [...state.posts, post] }))
}));

export default useBlogStore;
