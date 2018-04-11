import React, { Component } from 'react';
import { connect } from 'react-redux';

import CollectionCard from '../../components/CollectionCard';

import { getRandomCollections, clearHomeCollections } from '../../store/actions';

import './style.css';

class Home extends Component {

  componentWillMount() {
    const { loggedUser, getRandomCollections, history } = this.props;

    if (loggedUser) history.push(`/users/${loggedUser}`);
    getRandomCollections();
  }

  componentWillUnmount() {
    const { clearHomeCollections } = this.props;
    clearHomeCollections();
  }

  render() {
    const { chosenCollections } = this.props;

    return (
      <main className="home">
        <div className="home-logo-wrapper">
          <img src="/img/logo-horizontal.png" alt="Collectors Hut Logo" />
        </div>

        {
          chosenCollections && chosenCollections[0] &&
          chosenCollections.map(currentCollection => {
            return <CollectionCard
              key={currentCollection.collection._id}
              collection={currentCollection.collection}
              user={currentCollection.user}
            />
          })
        }
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  const { loggedUser, chosenCollections } = state;

  return {
    loggedUser,
    chosenCollections,
  }
};

const mapDispatchToProps = (dispatch) => ({
  getRandomCollections: () => dispatch(getRandomCollections()),
  clearHomeCollections: () => dispatch(clearHomeCollections()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
