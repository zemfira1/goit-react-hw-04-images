import { useState, useEffect} from 'react';
import { Container } from './App.styled';
import { Searchbar } from 'components/Searchbar';
import { ImageGallery } from 'components/ImageGallery';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader';
import { getPhoto } from 'components/Api';
import Notiflix from 'notiflix';

export const App = () => {
  const [tag, setTag] = useState('');
  const [images, setImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isButton, setIsButton] = useState(false);
  const [isError, setIsError] = useState(false);

  const formSubmit = data => {
    if (data.tag === tag) {
      alert('This request is already active!');
      return;
    }

    setTag(data.tag);
    setImages([]);
    setCurrentPage(1);
  }

  useEffect(() => {
    if (!tag) return;
    
    setIsLoading(true);

    getPhoto(tag, currentPage)
      .then(r => {  
        if (r.hits.length === 0) {
          Notiflix.Notify.failure('Sorry, there are no images matching your search query.');
          return;
        }
        setImages(prevState => [...prevState, ...r.hits]);
        setIsButton(currentPage < Math.ceil(r.totalHits / 12));
        }   
      )
      .catch(error => setIsError( error ))
      .finally(() => setIsLoading( false ));
  }, [tag, currentPage])

  const loadMoreImages = () => {
    setCurrentPage(prevState => prevState + 1);
  }

  const arrayLength = images.length; 

  return (
    <Container>        
      <Searchbar onSubmit={formSubmit} />
      {isLoading && <Loader />}
      {arrayLength !== 0 && <ImageGallery images={images} />}        
      {isButton && <Button onClick={loadMoreImages } />}
      {isError && alert('Sorry, something is wrong!')}
    </Container>
  );
};
