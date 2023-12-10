import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar"
import { fetchImages, onFetchError } from "Pixbay/api";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import Notiflix from "notiflix";



//const perPage = 12;

export class App extends Component {
  state = {
    q: '',
    images: [],
    page: 1,
    loading: false,
    btnLoadMore: false,
    showModal: false,
    error: null,
  }

  componentDidMount() {
    fetchImages();
  }
  

  getImages = async () => {
    const { q, page } = this.state;
    try {

      this.setState({ loading: true, });

      const images = await fetchImages(q, page)
      console.log(images)

      const arrPhotos = images.hits.map(({ id, webformatURL, tags }) => (
          { id, webformatURL, tags }
      ));

      if (page !== 0) {
        this.setState({btnLoadMore: true})
      } else {
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results"); 
        this.setState({ btnLoadMore: false });
      }
      
        this.setState(prevState => ({
          images:[ ...prevState.images , ...arrPhotos],
          btnLoadMore: images.page < Math.ceil(images.totalHits / images.per_page),
        }))
       
      } catch (error) {
      onFetchError();
      
      } finally {
      this.setState({ loading: false});
      }
    }
  
  componentDidUpdate(_, prevState) {
    const { q, page } = this.state;
    
    if (prevState.q !== q || prevState.page !== page) {
      this.getImages()
    }
  }

  onSubmitSearchBar = newQ => {
    this.setState({
      q: newQ,
      images: [],
      page: 1,
      error: null,
    })
   
    // const form = evt.currentTarget;
    // const searchValue = form.q.value
    //   .trim()
    //   .toLowerCase();
    
    // if (searchValue === '') {
    //   Notiflix.Notify.info('Enter your request, please!');
    //   return;
    // }

    // if (searchValue === this.state.q) {
    //   Notiflix.Notify.info('Enter new reguest, please!');
    //   return;
    // }
    // this.setState({
    //   q: searchValue,
    //   page: 1,
    //   images: [],
    // })
    
  }
  onLoadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      }
    })
  }
 
  
  render() {
    const { images, btnLoadMore, loading} = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onSubmitSearchBar} />
        {loading && <Loader />}
        <ImageGallery images={images} />
        {btnLoadMore && <Button onLoadMore={this.onLoadMore} />}
  
    </>)
}
};
