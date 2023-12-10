import { Component } from 'react';
import css from './Searchbar.module.css';


export class Searchbar extends Component {
    state = {
        q: '',
    }
    onSearchChange = ({ target: { value } }) => {
        this.setState({ q: value });
    }

    onSubmit = (evt) => {
        evt.preventDefault();
        this.props.onSubmit(this.state.q);
    }

    render() {
        return (
    <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.onSubmit}>
            <button type="submit" className={css.searchFormButton}>
                <span className={ css.searchFormButtonLabel }></span>  
            </button>
                    <input
                        onChange={this.onSearchChange}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        name="search"
                        className={css.searchFormInput}
                     />                   
        </form>
    </header>
        )
    }

}

// export const Searchbar = ({onSubmitSearchBar}) => (
//     <header className={css.searchbar}>
//         <form className={css.searchForm} onSubmit={onSubmitSearchBar}>
//             <button type="submit" className={css.searchFormButton}>
//                 <span className={ css.searchFormButtonLabel }></span>  
//             </button>
//             <input
//                 type="text"
//                 autoComplete="off"
//                 autoFocus
//                 placeholder="Search images and photos"
//                 className={css.searchFormInput}
//             />
                   
//         </form>
//     </header>
        
// )
