import { useUserContext } from "@/context/AuthContext";
import {
  useGetCurrentUser,
  useGetSavedPosts,
} from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";
import { useEffect, useState } from "react";

const Saved = () => {
  const { data: currentUser, isPending: isLoadingUser } = useGetCurrentUser();
  console.log(currentUser);

  // const { data: savedPosts, isPending: isFetchingSavedPosts } =
  //   useGetSavedPosts(currentUser?.$id || "");

  // console.log(savedPosts);

  // const test = currentUser?.save;
  // console.log(test);

  const savePosts = currentUser?.save
    .map((savePost: Models.Document) => {
      console.log(savePost);
      return {
        ...savePost.post,
        creator: {
          imageUrl: currentUser.imageUrl,
        },
      };
    })
    .reverse();

  // console.log(savePosts);

  return <div>Saved</div>;
};

export default Saved;
