import React, { useState } from 'react';
import {Button, Confirm, Icon} from "semantic-ui-react";
import { useMutation } from '@apollo/react-hooks'
import gql from "graphql-tag";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

function DeleteButton({ postId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update(proxy) {
      setConfirmOpen(false);
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      });
      const filteredPosts =  data.getPosts.filter(p => p.id !== postId);
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data: {
          getPosts: filteredPosts
      } });
      if (callback) callback();
    },
    variables: {
      postId
    }
  });
  return (
    <>
      <Button
        as="div"
        color="red"
        onClick={() => setConfirmOpen(true)}
        floated="right"
      >
        <Icon name="trash" style={{ margin: 0 }}/>
      </Button>
      <Confirm
      open={confirmOpen}
      onCancel={() => setConfirmOpen(false)}
      onConfirm={deletePost}
      />
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!){
      deletePost(postId: $postId)
  }
`;

export default DeleteButton;