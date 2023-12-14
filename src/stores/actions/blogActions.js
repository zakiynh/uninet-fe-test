import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { CREATE_POST, GET_POSTS } from "./actionType";
import showError from "../../helpers/swal";
import { firestore } from "../../helpers/firebase";

export const createPost = (post) => async (dispatch) => {
  try {
    const postRef = await addDoc(collection(firestore, "blogPost"), post);
    dispatch({ type: CREATE_POST, payload: postRef });
    showError("success", "Post created successfully");
  } catch (error) {
    showError("error", error.message);
  }
};

export const getPosts = () => async (dispatch) => {
  try {
    const querySnapshot = await getDocs(collection(firestore, "blogPost"));
    const posts = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    posts.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
    dispatch({ type: GET_POSTS, payload: posts });
  } catch (error) {
    showError("error", error.message);
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    await deleteDoc(doc(firestore, "blogPost", postId));
    dispatch(getPosts());
    showError("success", "Post deleted successfully");
  } catch (error) {
    console.error("Error deleting post:", error);
    showError("error", error.message);
  }
};

export const updatePost = (postId, updatedPost) => async (dispatch) => {
    try {
      await updateDoc(doc(firestore, 'blogPost', postId), updatedPost);
        showError('success', 'Post updated successfully');
      dispatch(getPosts());
    } catch (error) {
      console.error('Error updating post:', error);
        showError('error', error.message);
    }
  };