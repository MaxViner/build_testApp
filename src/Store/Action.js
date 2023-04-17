import axios from 'axios';
export const FETCH_IMAGES = 'FETCH_IMAGES';
export const TOGGLE_LIKE = 'TOGGLE_LIKE';
export const REMOVE_CARD = 'REMOVE_CARD';
export const SHOW_LIKED = 'SHOW_LIKED';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SET_IMAGES_PER_PAGE = 'SET_IMAGES_PER_PAGE';
export const SET_IMAGES_TO_FETCH = 'SET_IMAGES_TO_FETCH';

export const setImagesToFetch = (count) => ({
  type: SET_IMAGES_TO_FETCH,
  count,
});

const fetchImagesSuccess = (images) => ({
  type: FETCH_IMAGES,
  images,
});

export const fetchImages = () => {
  return async (dispatch, getState) => {
    const { imagesToFetch } = getState();
    const response = await axios.get('https://api.unsplash.com/photos/random', {
      params: {
        count: imagesToFetch,
        client_id: 'v-owjXlI8UdIMLtTT0JtwDlIKIGSEv8SfwgIvrgb-Rc',
        height: 400,
      },
    });
    
    const images = response.data
      .filter((img) => img.height >=400) // фильтруем только те изображения, которые имеют высоту не меньше 200
      .map((img) => ({
        id: img.id,
        url: img.urls.regular,
        alt: img.alt_description,
        user: img.user.name,
      }));
    dispatch(fetchImagesSuccess(images));
    dispatch(setCurrentPage(1)); // установка текущей страницы
  };
};

export const toggleLike = (id) => ({
  type: TOGGLE_LIKE,
  id,
});

export const removeCard = (id) => ({
  type: REMOVE_CARD,
  id,
});

export const showLiked = () => ({
  type: SHOW_LIKED,
});

export const setCurrentPage = (page) => ({ // установка текущей страницы
  type: SET_CURRENT_PAGE,
  page,
});

export const setImagesPerPage = (count) => ({ // установка количества картинок на странице
  type: SET_IMAGES_PER_PAGE,
  count,
});