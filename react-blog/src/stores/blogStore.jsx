// stores/blogStore.js
import { create } from 'zustand';

const useBlogStore = create((set) => ({
    posts: [],
    setPosts: (newPosts) => set({ posts: newPosts }),
    addPost: (post) => set((state) => ({ posts: [...state.posts, post] })),

    selectedPost: null,
    setSelectedPost: (post) => set({ selectedPost: post }),

    // 글 검색
    keyword: "",
    setKeyword: (kw) => set({ keyword: kw })

}));

export default useBlogStore;
