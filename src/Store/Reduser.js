import { FETCH_IMAGES, TOGGLE_LIKE, REMOVE_CARD, SHOW_LIKED, SET_CURRENT_PAGE, SET_IMAGES_PER_PAGE,SET_IMAGES_TO_FETCH } from './Action';


const initialState = {
  images: [],
  liked: [],
  currentPage: 1,
  imagesPerPage: 10,
  imagesToFetch: 25, 
};

const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_IMAGES:
      return {
        ...state,
        images: action.images,
      };
    case TOGGLE_LIKE:
      const images = state.images.map((img) => {
        if (img.id === action.id) {
          return {
            ...img,
            liked: !img.liked,
          };
        }
        return img;
      });
      const likedImages = images.filter((img) => img.liked);
      return {
        ...state,
        images,
        likedImages,
      };
      case SET_IMAGES_TO_FETCH:
  return {
    ...state,
    imagesToFetch: action.count,
  };
    case REMOVE_CARD:
      const newImages = state.images.filter((img) => img.id !== action.id);
      const newLikedImages = state.likedImages.filter((img) => img.id !== action.id);
      return {
        ...state,
        images: newImages,
        likedImages: newLikedImages,
      };
    case SHOW_LIKED:
      return {
        ...state,
        showLiked: !state.showLiked,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.page,
      };
    case SET_IMAGES_PER_PAGE:
      return {
        ...state,
        imagesPerPage: action.count,
      };
    default:
      return state;
  }
};

export default Reducer;