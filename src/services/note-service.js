import { instance } from "./token-interceptor";

const getAllNotesByUser = () => {
    return instance.get('notes-userid');
};

export {
    getAllNotesByUser,
}