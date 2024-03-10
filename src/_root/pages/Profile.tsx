import PostCard from "@/components/shared/PostCard";
import {
  useGetCurrentUser,
  useGetPostById,
} from "@/lib/react-query/queriesAndMutations";
import { Models } from "appwrite";

type CardProps = {
  // postId: string;
  post: Models.Document;
};

// const Card = ({ postId }: CardProps) => {
//   const { data: post, isPending } = useGetPostById(postId);

//   console.log(post);
//   return (
//     <>
//       {isPending ? (
//         <div className="animate-pulse">Loading</div>
//       ) : (
//         <div className="flex flex-row gap-10">
//           {/* <img src={post?.imageUrl} width={70}></img> */}
//           <div className="flex flex-col gap-2">
//             <p>{post?.caption}</p>
//             <p>{post?.location}</p>
//             <p>{post?.tags}</p>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

const Card = ({ post }: CardProps) => {
  console.log(post);
  return (
    <div className="flex flex-row gap-10 border-2">
      <img src={post?.imageUrl} width={70}></img>
      <div className="flex flex-col gap-2">
        <p>{post?.caption}</p>
        <p>{post?.location}</p>
        <p>{post?.tags}</p>
      </div>
    </div>
  );
};

const Profile = () => {
  const { data: user } = useGetCurrentUser();

  return (
    <div>
      Profile
      <div>Name: {user?.name}</div>
      <div>Posts Length: {user?.posts.length}</div>
      {console.log(user?.posts)}
      {user?.posts.map((post: Models.Document) => {
        console.log("entered");
        return <Card post={post} key={post.$id} />;
      })}
    </div>
  );
};

export default Profile;
