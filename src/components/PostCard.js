import React, { useContext } from 'react';
import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import LikeButton from './LikeButton'
import DeleteButton from "./DeleteButton";
import moment from "moment";
import MyPopUp from "../utils/MyPopUp";

function PostCard({ post: { body, createdAt, id, username, likeCount, commentCount, likes }}) {

  const { user } = useContext(AuthContext);

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
        />
        <Card.Header>{ username }</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={{ id, likes, likeCount }} />
        <MyPopUp
          content='Comment on post'
        >
          <Button labelPosition='right' as={Link} to={`/posts/${id}`}>
          <Button color='blue' basic>
            <Icon name='comments' />
          </Button>
          <Label basic color='blue' pointing='left'>
            {commentCount}
          </Label>
          </Button>
        </MyPopUp>
        { user && user.username === username && (<DeleteButton postId={id}/>)}
      </Card.Content>
    </Card>  );
}

export default PostCard;