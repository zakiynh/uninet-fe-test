import { collection, addDoc, getDocs } from 'firebase/firestore';
import { CREATE_POST, GET_POSTS } from "./actionType";
import showError from "../../helpers/swal";
import { firestore } from "../../helpers/firebase";

export const createPost = (post) => async (dispatch) => {
    try {
        const postRef = await addDoc(collection(firestore, 'blogPost'), post);
        dispatch({ type: CREATE_POST, payload: postRef });
        showError('success', 'Post created successfully');
    } catch (error) {
        console.log(error);
        showError('error', error.message);
    }
};

export const getPosts = () => async (dispatch) => {
    try {
        const querySnapshot = await getDocs(collection(firestore, 'blogPost'));
        const posts = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        posts.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
        dispatch({ type: GET_POSTS, payload: posts });
    } catch (error) {
        console.log(error);
        showError('error', error.message);
    }
}