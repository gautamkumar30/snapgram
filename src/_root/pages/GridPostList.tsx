import { useUserContext } from "@/context/AuthContext";
import { Models } from "appwrite";

type GridPostListProps = {
  posts: Models.Document[] | undefined;
};

const GridPostList = ({ posts }: GridPostListProps) => {
  const { user } = useUserContext();

  return (
    <ul>
      {posts?.map((post) => {
        return (
          <li key={post.$id}>
            {/* <img src={post.imageUrl} width={100} height={100} /> */}
            {post.caption} <br /> {post.location}
          </li>
        );
      })}
    </ul>
  );
  return <div>GridPostList</div>;
};

export default GridPostList;
