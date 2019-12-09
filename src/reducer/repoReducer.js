export const repoReducer = (state, action) => {
  switch (action.type) { 
    case 'changeRepo': {
      return { ...state, repo: action.payload };
    }
    default: throw new Error('Unexpected action');
  }
};