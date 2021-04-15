import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Grid } from 'semantic-ui-react'

import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";

function Home() {
  const user = useContext(AuthContext);
  const { loading, data: { getPosts: posts } = {} } = useQuery(FETCH_POSTS_QUERY);
  const content =
    loading ?
      <h1>Posts are loading...</h1> :
      posts && posts.map(post =>
        <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
          <PostCard post={post} />
        </Grid.Column>
      );

  return (
    <Grid columns={3} divided>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        { content }
      </Grid.Row>
    </Grid>
  )
}

const FETCH_POSTS_QUERY = gql`
    {
        getPosts {
            id
            body
            createdAt
            username
            likeCount
            likes {
                username
            }
            commentCount
            comments {
                id
                username
                createdAt
                body
            }
        }
    }
`;

export default Home;
