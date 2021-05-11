import React, { useState } from 'react';
import {Button, Confirm, Icon} from "semantic-ui-react";
import { useMutation } from '@apollo/react-hooks'
import gql from "graphql-tag";

function DeleteButton({ postId }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update() {
      setConfirmOpen(false);
      // todo: remove post from cache
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