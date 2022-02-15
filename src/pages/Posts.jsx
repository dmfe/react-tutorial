import React, {useEffect, useState} from 'react';
import PostService from '../API/PostService';
import PostFilter from '../components/PostFilter';
import PostForm from '../components/PostForm';
import PostList from '../components/PostList';
import MyButton from '../components/UI/button/MyButton';
import Loader from '../components/UI/loader/Loader';
import MyModal from '../components/UI/modal/MyModal';
import Pagination from '../components/UI/pagination/Pagination';
import {useFetching} from '../hooks/useFetching';
import {usePosts} from '../hooks/usePosts';
import {getPageCount} from '../utils/pages';

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({sort: '', query: ''});
  const [modal, setModal] = useState(false);
  const [postsTotalPages, setPostsTotalPages] = useState(0);
  const [postsLimit, setPostsLimit] = useState(10);
  const [postsPage, setPostsPage] = useState(1);
  const sortedAndFilteredPosts = usePosts(posts, filter.sort, filter.query);

  const [fetchPosts, isPostsLoading, postsLoadingError] = useFetching(async () => {
      const response = await PostService.getAll(postsLimit, postsPage);
      setPosts(response.data);
      const total = response.headers['x-total-count'];
      setPostsTotalPages(getPageCount(total, postsLimit));
  });

  useEffect(() => {
    fetchPosts()
  }, [postsPage])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePostsPage = (page) => {
    setPostsPage(page)
  }

  return (
    <div className="App">
      <MyButton style={{marginTop: 30}} onClick={() => setModal(true)}>
        Add Post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{margin: '15px'}} />
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      {postsLoadingError &&
        <h1>Error ocurred during loading posts: {postsLoadingError}</h1>
      }
      {isPostsLoading
        ? <div style={{display: 'flex', justifyContent: 'center', marginTop: 50}}><Loader /></div>
        : <PostList remove={removePost} posts={sortedAndFilteredPosts} title="Posts List One" />
      }
      <Pagination
        currentPage={postsPage}
        changePage={changePostsPage}
        totalPages={postsTotalPages}
      />
    </div>
  );
}

export default Posts;

