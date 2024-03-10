import PostCard from "@/components/shared/PostCard";
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

const Home = () => {
  const {
    data: posts,
    isPending: isPostLoading,
    isError: isErrorPosts,
  } = useGetRecentPosts();

  return (
    <>
      <div>Home Layout</div>
      {isPostLoading && !posts ? (
        <p className="animate-pulse">Posts loading</p>
      ) : (
        <ul>
          <li>Under posts received</li>
          {posts?.documents.map((post: Models.Document) => (
            // <li>{post.caption}</li>
            <PostCard post={post} key={post.$id} />
          ))}
        </ul>
      )}
    </>
  );
};

export default Home;
