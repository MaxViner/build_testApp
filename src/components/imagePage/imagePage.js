import axios from 'axios';
import { useEffect , useState} from 'react';


const ImagePage = ({ image, imageId }) => {
    const [comments, setComments] = useState([]);
  
    useEffect(() => {
      async function fetchComments() {
        try {
          const response = await axios.get(`https://api.unsplash.com/photos/${imageId}/comments`, {
            params: {
                client_id: 'v-owjXlI8UdIMLtTT0JtwDlIKIGSEv8SfwgIvrgb-Rc',
            }
          });
          setComments(response.data);
        } catch (error) {
          console.error(error);
        }
      }
      fetchComments();
    }, [imageId]);
  
    return (
      <div>
        <img src={image.url} alt={image.description} />
        <h2>{image.description}</h2>
        <p>Автор: {image.author}</p>
        <div>
          <h3>Комментарии:</h3>
          {comments.map(comment => (
            <div key={comment.id}>
              <p>{comment.user.username}: {comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  export default ImagePage