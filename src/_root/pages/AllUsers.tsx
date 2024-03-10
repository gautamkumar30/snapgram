import { useGetAllUsers } from "@/lib/react-query/queriesAndMutations";
import { multiFormatDateString } from "@/lib/utils";
import { Models } from "appwrite";

const AllUsers = () => {
  const {
    data: users,
    isPending: isUsersLoading,
    isError: isErrorPosts,
  } = useGetAllUsers(10);

  if (!isUsersLoading) console.log(users);

  return (
    <div>
      All Users
      {isUsersLoading ? (
        <p className="animate-pulse">Users Loading</p>
      ) : (
        <ul className="flex flex-col gap-10">
          {users?.documents.map((user: Models.Document) => {
            return (
              <li className="flex gap-6" key={user.$id}>
                <img
                  src={user.imageUrl}
                  alt=""
                  width={100}
                  className="rounded-full"
                />
                <div>
                  <p>Name: {user.name}</p>
                  <p>Username: {user.username}</p>
                  <p>
                    Account created: {multiFormatDateString(user.$createdAt)}
                  </p>
                  <p>Username: {user.posts.length}</p>
                </div>
              </li>
            );
          })}
        </ul>
      )}{" "}
    </div>
  );
};

export default AllUsers;
