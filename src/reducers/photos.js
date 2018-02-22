import c from '../constants/actionTypes';

const initialState = {
    photos: [],
    filteredPhotos: [],
    noPhotos: true,
    error: null,
};

export const photosReducer = (state=initialState, action) => {

    switch (action.type) {

        case c.FETCH_PHOTOS_FULFILLED: {
            const photos = action.payload;
            const noPhotos = !photos.length;
            const filteredPhotos = [...photos];
            return {
                ...state,
                photos,
                filteredPhotos,
                noPhotos
            }
        }

        case c.FETCH_PHOTOS_REJECTED: {
            return { ...state, error: action.payload }
        }

        case c.FILTER_PHOTOS: {

            const searchText = action.payload.toLowerCase();
        
            if(!searchText) return {...state, filteredPhotos: [...state.photos]};
        
            const filteredPhotos = state.photos
                .filter(photo => photo.titulo.toLowerCase().includes(searchText));

            const noPhotos = !filteredPhotos.length;
            console.log('noPhotos', noPhotos);
            return { ...state, filteredPhotos, noPhotos };
        }

        case c.PHOTO_DELETED_FULFILED: {
            const id = action.payload;
            const photos = state.photos.filter(photo => photo._id !== id);
            const filteredPhotos = state.filteredPhotos.filter(photo => photo._id !== id);
            return { ...state, photos, filteredPhotos }
        }

        default:
            return state;
    }
}
