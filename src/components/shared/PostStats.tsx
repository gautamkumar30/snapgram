import React, { useEffect, useState } from "react";
import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

type PostStatsProps = {
  post?: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const likesList = post?.likes.map((user: Models.Document) => user.$id);

  const [likes, setLikes] = useState(likesList);
  const [isSavedPost, setIsSavedPost] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isDeletingSavedPost } =
    useDeleteSavedPost();

  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post?.$id
  );

  useEffect(() => {
    setIsSavedPost(!!savedPostRecord);
  }, [currentUser]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];

    const hasLiked = newLikes.includes(userId);

    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }

    setLikes(newLikes);
    likePost({ postId: post?.$id || "", likesArray: newLikes });
  };

  const handleSavedPost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSavedPost(false);
      deleteSavedPost(savedPostRecord.$id);
    } else {
      savePost({ postId: post?.$id || "", userId });
      setIsSavedPost(true);
    }
  };
  return (
    <>
      <div className="flex gap-2 justify-between select-none">
        <p>Likes: {likes.length}</p>
        <p onClick={handleLikePost} className="cursor-pointer">
          {/* {hasLiked ? "Unlike this post" : "Like this post"} */}
          Like this post
        </p>
      </div>
      <div className="flex gap-2 justify-between select-none">
        <p>IsSaved: {isSavedPost ? "1" : "0"}</p>
        {isSavingPost || isDeletingSavedPost ? (
          "Loading"
        ) : (
          <p onClick={handleSavedPost} className="cursor-pointer">
            Save this post
          </p>
        )}
      </div>
    </>
  );
};

export default PostStats;
