import { baseUrl } from '../../config';

const createHeaders = (method, body) => ({
  method,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  },
  body: JSON.stringify(body),
});


const theFetcher = actions => {
  const { url, method, body } = actions;

  return fetch(`${baseUrl}${url}`, createHeaders(method, body))
    .then(res => {
      if (res.ok) {
        return res.json()
      } else {
        throw Error(res.statusText)
      }
    })
    .then(data => {
      return data;
    })
    .catch(err => console.error(err));
}


// GET
export const getProfile = (userId) => async (dispatch, getState) => {
  const user = await theFetcher({
    url: `users/${userId}`,
    method: 'GET'
  });
  if (user) {
    dispatch({
      type: "ADD_USER",
      payload: { user }
    });
  }
};

export const getRandomCollections = () => async (dispatch, getState) => {
  const allCollections = await theFetcher({
    url: 'collections',
    method: 'GET'
  });
  const chosen = [];
  const userIdArray = [];
  const maxCollections = 6;

  const randomizeCollections = () => {
    while (chosen.length < maxCollections) {
      const num = Math.floor(Math.random() * allCollections.length);

      if (!chosen.includes(num)) {
        const { userId } = allCollections[num];

        userIdArray.push(userId);
        chosen.push(num);
      }
    }
  }

  const fetchSelectedUsers = async (userIdArray) => {
    for (const userId of userIdArray) {
      const user = await theFetcher({
        url: `users/${userId}`,
        method: 'GET'
      });
      if (user) {
        dispatch({
          type: "ADD_USER",
          payload: { user }
        });
      }
    }
    return getState();

  }

  randomizeCollections();

  fetchSelectedUsers(userIdArray).then(state => {
    const chosenCollections = [];
    if (chosenCollections) {
      for (const num of chosen) {
        const { userId } = allCollections[num];
        const user = state[userId];

        const collectionId = allCollections[num].collection._id;

        const collection = user.collections.find(collection => collection._id === collectionId);
        chosenCollections.push({ collection, user });
      }

      dispatch({
        type: "CHOSEN_COLLECTIONS",
        payload: { chosenCollections },
      });
    }
  });
}

export const search = (searchTerms, searchType) => async (dispatch, getState) => {
  const results = await theFetcher({
    url: `search/?${searchType}=${searchTerms}`,
    method: 'GET'
  });
  if (results) {
    dispatch({
      type: "SEARCH_RESULTS",
      payload: { results, searchType }
    });
    for (const result of results) {
      dispatch(
        getProfile(result.user._id)
      );
    };
  }
}
// GET


// POST
export const register = (newUserInfo) => async (dispatch, getState) => {
  const data = await theFetcher({
    url: `sign-up`,
    method: 'POST',
    body: newUserInfo
  });
  if (data) {
    const { userId, token } = data;

    dispatch({
      type: "SET_CURRENT_USER",
      payload: { userId },
    });
    localStorage.setItem('token', token);
    localStorage.setItem('loggedUser', userId);
  }
};

export const login = (loginInfo) => async (dispatch, getState) => {
  const data = await theFetcher({
    url: 'sign-in',
    method: 'POST',
    body: loginInfo
  });
  if (data) {
    const { userId, token } = data;

    dispatch({
      type: "SET_CURRENT_USER",
      payload: { userId },
    });
    localStorage.setItem('token', token);
    localStorage.setItem('loggedUser', userId);
  }
};

export const addCollection = (userId, newCollection) => async (dispatch, getState) => {
  const collection = await theFetcher({
    url: `users/${userId}/add-collection`,
    method: 'POST',
    body: newCollection
  });
  if (collection) {
    dispatch({
      type: "ADD_NEW_COLLECTION",
      payload: { userId, collection },
    });
  }
};

export const addItem = (userId, collectionId, newItem) => async (dispatch, getState) => {
  const item = await theFetcher({
    url: `users/${userId}/collections/${collectionId}/add-item`,
    method: 'POST',
    body: newItem
  });
  if (item) {
    dispatch({
      type: "ADD_NEW_ITEM",
      payload: { userId, collectionId, item },
    });
  }
};
// POST

// PUT
export const editUser = (userId, user) => async (dispatch, getState) => {
  const updatedUser = await theFetcher({
    url: `users/${userId}`,
    method: 'PUT',
    body: user
  });

  if (updatedUser) {
    dispatch({
      type: "EDIT_USER",
      payload: { user: updatedUser }
    });
  }
}

export const editCollection = (userId, collectionId, collection) => async (dispatch, getState) => {
  const updatedCollection = await theFetcher({
    url: `users/${userId}/collections/${collectionId}`,
    method: 'PUT',
    body: collection
  });
  if (updatedCollection) {
    dispatch({
      type: "EDIT_COLLECTION",
      payload: { userId, updatedCollection }
    });
  }
}

export const editItem = (userId, collectionId, itemId, item) => async (dispatch, getState) => {
  const updatedItem = await theFetcher({
    url: `users/${userId}/collections/${collectionId}/items/${itemId}`,
    method: 'PUT',
    body: item
  });
  if (updatedItem) {
    dispatch({
      type: "EDIT_ITEM",
      payload: { userId, collectionId, updatedItem }
    });
  }
}
// PUT

// DELETE
export const deleteItem = (userId, collectionId, itemId) => (dispatch, getState) => {
  theFetcher({
    url: `users/${userId}/collections/${collectionId}/items/${itemId}`,
    method: 'DELETE'
  });
  dispatch({
    type: "DELETE_ITEM",
    payload: { userId, collectionId, itemId },
  });
};

export const deleteCollection = (userId, collectionId) => (dispatch, getState) => {
  theFetcher({
    url: `users/${userId}/collections/${collectionId}`,
    method: 'DELETE'
  });
  dispatch({
    type: "DELETE_COLLECTION",
    payload: { userId, collectionId },
  });
};
// DELETE

// No fetch
export const fetchLocalUser = () => (dispatch, getState) => {
  const token = localStorage.getItem('token');
  const loggedUser = localStorage.getItem('loggedUser');

  if (token) {
    dispatch({
      type: "SET_CURRENT_USER",
      payload: { userId: loggedUser },
    });
  }
};

export const clearHomeCollections = () => (dispatch, getState) => {
  dispatch({
    type: "CHOSEN_COLLECTIONS",
    payload: {},
  });
}

export const logout = () => (dispatch, getState) => {
  dispatch({
    type: "REMOVE_CURRENT_USER",
  });
  localStorage.clear();
};
// No fetch
