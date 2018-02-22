const initialState = {
    photos: [],
    photo: {
        _id: '',
        titulo: '', 
        url: '',
        descricao: ''
    },
    filteredPhotos: [],
    noPhotos: true,
    error: null,
};

export const photosReducer = (state=initialState, action) => {

    switch (action.type) {

        case 'FETCH_PHOTOS_FULFILLED': {
            return {
                ...state,
                photos: action.payload,
                filteredPhotos: [...action.payload]
            }
        }

        case 'FETCH_PHOTOS_REJECTED': {
            return { ...state, error: action.payload }
        }

        case 'FILTER_PHOTOS': {

            const searchText = action.payload.toLowerCase();
        
            if(!searchText) return {...state, filteredPhotos: [...state.photos]};
        
            const filteredPhotos = state.photos
                .filter(photo => photo.titulo.toLowerCase().includes(searchText));

            const noPhotos = !!state.filteredPhotos;
                        
            return { ...state, filteredPhotos, noPhotos };
        }

        case 'PHOTO_DELETED_FULFILED': {
            const id = action.payload;
            const photos = state.photos.filter(photo => photo._id !== id);
            const filteredPhotos = state.filteredPhotos.filter(photo => photo._id !== id);
            return { ...state, photos, filteredPhotos }
        }

        case 'FETCH_PHOTO_BY_ID_FULLFILED': {

            const photo = action.payload;
            return { ...state, photo };
        }

        case 'EMPTY_PHOTO_OBJECT': {
            
            const photo = {
                _id: '',
                titulo: '', 
                url: '',
                descricao: ''
            };

            return { ...state, photo}
        }

        default:
            return state;
    }
}
