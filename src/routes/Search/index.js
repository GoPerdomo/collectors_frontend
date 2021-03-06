import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import qs from 'qs';

import UserCard from '../../components/SearchCards/UserCard';
import CollectionCard from '../../components/SearchCards/CollectionCard';
import Loading from '../../components/Loading';

import { search } from '../../store/actions';
import bp from '../../helpers/breakpoints';


// ========== Styled Components ==========
const SearchWrapper = styled.main`
  width: 65%;
  max-width: ${bp.breakTwo};
  margin: 0 auto auto;
  text-align: center;

  @media (max-width: ${bp.breakOne}) {
    width: 70%;
  }
  @media (max-width: ${bp.breakTwo}) {
    width: 75%;
  }
  @media (max-width: ${bp.breakThree}) {
    width: 80%;
  }
  @media (max-width: ${bp.breakSix}) {
    width: 92%;
  }
`


// ============== Component ==============
class Search extends Component {

  componentDidMount() {
    const { history, search } = this.props;
    const query = history.location.search;
    const { searchType, searchTerms } = this.getSearchInfo();

    window.scrollTo(0, 0);
    if (!query) return history.push('/');
    search(searchTerms.toLocaleLowerCase(), searchType);
  }

  componentDidUpdate(prevProps, prevState) {
    const { search } = this.props;
    const { searchType, searchTerms } = this.getSearchInfo();

    if (prevProps.location.search === this.props.location.search) return;
    search(searchTerms.toLocaleLowerCase(), searchType);
  }

  getSearchInfo = () => {
    const { history } = this.props;
    const query = history.location.search;
    const queryObj = qs.parse(query.slice(1));    
    const searchType = Object.keys(queryObj)[0];
    const searchTerms = Object.values(queryObj)[0];

    return { searchType, searchTerms };
  }

  displayResults = () => {
    const { props } = this;
    const { results, searchType, loggedUser } = props;

    if (results.length === 0) {
      return <h2>No {searchType}s found</h2>
    }

    if (searchType === "user") {
      return results.map(({ user }) => (
        <UserCard key={user._id} user={user} loggedUser={loggedUser} />
      ));
    }

    if (searchType === "collection") {
      return results.map(({ user, collection }) => (
        <CollectionCard key={collection._id} collection={collection} user={user} />
      ));
    }
  }

  render() {
    const { results } = this.props;
    const { searchType } = this.getSearchInfo();


    return (
      <SearchWrapper>
        {
          searchType === "user" || searchType === "collection"
            ? results
              ? this.displayResults()
              : <Loading />
            : <h2>Nothing found</h2>
        }
      </SearchWrapper>
    )
  }
};

const mapStateToProps = (state) => {
  let newState = { ...state };
  const { loggedUser, searchType, results } = newState;

  if (results) {
    // Removes logged user from results
    const newResults = results.filter(result => result.user._id !== loggedUser);

    newResults.map(result => {
      const { collection, user } = result;

      // Populate collections with items
      if (searchType === "collection" && state[user._id]) {
        const stateCollections = state[user._id].collections;

        for (const stateCollection of stateCollections) {
          if (collection._id === stateCollection._id) {
            collection.items = stateCollection.items
          }
        }
      }

      return result;
    });

    newState = { ...newState, results: newResults }
  }


  return (
    {
      ...newState,
    }
  )
};

const mapDispatchToProps = dispatch => ({
  search: (searchTerms, searchType) => dispatch(search(searchTerms, searchType))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
